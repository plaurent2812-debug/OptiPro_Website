'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { getPennylaneQuote, mapPennylaneQuoteStatus, getPennylaneInvoice, mapPennylaneInvoiceStatus } from '@/lib/pennylane'

export async function syncAllFromPennylaneAction() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Session expirée. Veuillez vous reconnecter.' }
  }

  const results = { devis: 0, factures: 0, errors: [] as string[] }

  // 1. Sync tous les devis ayant un pennylane_quote_id
  const { data: devisList } = await supabase
    .from('devis')
    .select('id, numero, statut, pennylane_quote_id')
    .not('pennylane_quote_id', 'is', null)
    .neq('statut', 'archive')

  if (devisList) {
    for (const devis of devisList) {
      try {
        const pennylaneQuote = await getPennylaneQuote(devis.pennylane_quote_id)
        const newStatus = mapPennylaneQuoteStatus(pennylaneQuote.status)

        if (newStatus && newStatus !== devis.statut) {
          await supabase
            .from('devis')
            .update({ statut: newStatus })
            .eq('id', devis.id)
          results.devis++
        }
      } catch (err: any) {
        results.errors.push(`Devis ${devis.numero}: ${err.message}`)
      }
    }
  }

  // 2. Sync toutes les factures ayant un pennylane_invoice_id
  const { data: facturesList } = await supabase
    .from('factures')
    .select('id, numero, statut, pennylane_invoice_id')
    .not('pennylane_invoice_id', 'is', null)
    .not('statut', 'in', '("payee","annulee")')

  if (facturesList) {
    for (const facture of facturesList) {
      try {
        const pennylaneInvoice = await getPennylaneInvoice(facture.pennylane_invoice_id)
        const newStatus = mapPennylaneInvoiceStatus(pennylaneInvoice.status)

        if (newStatus && newStatus !== facture.statut) {
          await supabase
            .from('factures')
            .update({ statut: newStatus })
            .eq('id', facture.id)
          results.factures++
        }
      } catch (err: any) {
        results.errors.push(`Facture ${facture.numero}: ${err.message}`)
      }
    }
  }

  revalidatePath('/admin')
  revalidatePath('/admin/devis')
  revalidatePath('/admin/factures')

  const parts = []
  if (results.devis > 0) parts.push(`${results.devis} devis`)
  if (results.factures > 0) parts.push(`${results.factures} facture(s)`)

  if (parts.length === 0 && results.errors.length === 0) {
    return { success: true, message: 'Tout est déjà à jour.' }
  }

  const message = parts.length > 0
    ? `Mis à jour : ${parts.join(', ')}.`
    : ''

  if (results.errors.length > 0) {
    return { success: true, message: `${message} ${results.errors.length} erreur(s).`, errors: results.errors }
  }

  return { success: true, message }
}
