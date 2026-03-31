'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createPennylaneInvoice, PennylaneInvoicePayload } from '@/lib/pennylane'

/**
 * Envoie une facture existante "Brouillon" du CRM vers Pennylane
 */
export async function pushFactureToPennylaneAction(factureId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Session expirée. Veuillez vous reconnecter.' }
  }

  // 1. Récupération des données CRM
  const { data: facture, error } = await supabase
    .from('factures')
    .select(`
      *,
      clients (*),
      factures_lignes (*)
    `)
    .eq('id', factureId)
    .single()

  if (error || !facture) {
    return { error: "Facture introuvable." }
  }

  // 2. Construction du payload API Pennylane (sans TVA car optipro = Autoentrepreneur)
  const payload: PennylaneInvoicePayload = {
    draft: true, // Toujours brouillon par sécurité pour validation finale sur Pennylane
    create_customer: {
      name: facture.clients.entreprise || `${facture.clients.prenom} ${facture.clients.nom}`,
      emails: facture.clients.email ? [facture.clients.email] : undefined,
      registration_number: facture.clients.siret || undefined,
      address: facture.clients.adresse || undefined,
      postal_code: facture.clients.code_postal || undefined,
      city: facture.clients.ville || undefined,
    },
    invoice: {
      issue_date: facture.date_emission,
      due_date: facture.date_echeance || undefined,
      line_items: facture.factures_lignes.map((l: any) => ({
        label: l.description,
        quantity: l.quantite,
        unit: 'piece',
        raw_currency_unit_price: String(l.prix_unitaire_ht),
        vat_rate: 'exempt' // Franchise en base de TVA (auto-entrepreneur)
      }))
    }
  }

  // 3. Appel API
  try {
    const pennylaneRes = await createPennylaneInvoice(payload)
    
    // 4. Si succès, on met à jour la base de données
    await supabase
      .from('factures')
      .update({ statut: 'envoyee', pennylane_invoice_id: String(pennylaneRes.id) })
      .eq('id', factureId)

    revalidatePath(`/admin/factures/${factureId}`)
    return { success: true, message: "Brouillon de facture créé sur Pennylane avec succès !" }

  } catch (err: any) {
    return { error: err.message || "Erreur de connexion avec l'API Pennylane." }
  }
}
