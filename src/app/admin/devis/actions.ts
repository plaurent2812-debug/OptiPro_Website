'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { generateDevisNumero } from '@/lib/utils'

export async function createDevisAction(formData: FormData) {
  const supabase = await createClient()

  const clientId = formData.get('client_id') as string

  if (!clientId) {
    return { error: "Vous devez sélectionner un client." }
  }

  // 1. Récupérer le nombre de devis pour générer le numéro séquentiel
  const { count } = await supabase
    .from('devis')
    .select('*', { count: 'exact', head: true })
  
  const devisNumero = generateDevisNumero(count || 0)

  // 2. Extraire toutes les lignes du formulaire
  // Format attendu: lignes[0][description], lignes[0][quantite], etc.
  const lignes = []
  let index = 0
  
  while (formData.has(`lignes[${index}][description]`)) {
    const prix = parseFloat(formData.get(`lignes[${index}][prix_unitaire_ht]`) as string || "0")
    const qte = parseFloat(formData.get(`lignes[${index}][quantite]`) as string || "1")

    lignes.push({
      description: formData.get(`lignes[${index}][description]`),
      quantite: qte,
      unite: formData.get(`lignes[${index}][unite]`) || 'forfait',
      prix_unitaire_ht: prix,
      ordre: index
    })
    index++
  }

  if (lignes.length === 0) {
    return { error: "Le devis doit contenir au moins une ligne de prestation." }
  }

  const montantHtTotal = lignes.reduce((acc, ligne) => acc + (ligne.prix_unitaire_ht * ligne.quantite), 0)

  // 3. Créer le devis (en brouillon)
  const devisData = {
    numero: devisNumero,
    client_id: clientId,
    statut: 'brouillon',
    date_emission: new Date().toISOString().split('T')[0],
    date_validite: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 jours
    montant_ht: montantHtTotal,
    notes: formData.get('notes') as string || null,
  }

  const { data: devisInsert, error: devisError } = await supabase
    .from('devis')
    .insert([devisData])
    .select()
    .single()

  if (devisError || !devisInsert) {
    console.error('Erreur devis_insert:', devisError)
    return { error: "Erreur lors de la création du devis principal." }
  }

  // 4. Insérer les lignes rattachées
  const lignesToInsert = lignes.map(l => ({
    ...l,
    devis_id: devisInsert.id
  }))

  const { error: lignesError } = await supabase
    .from('devis_lignes')
    .insert(lignesToInsert)

  if (lignesError) {
    console.error('Erreur lignes_insert:', lignesError)
    // En situation de prod, on ferait un rollback ou un clean-up ici.
    return { error: "Devis créé, mais erreur lors de la sauvegarde des lignes." }
  }

  // 5. Tout s'est bien passé
  revalidatePath('/admin/devis')
  redirect(`/admin/devis/${devisInsert.id}`)
}
