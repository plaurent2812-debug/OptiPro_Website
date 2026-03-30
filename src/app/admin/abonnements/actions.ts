'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Periodicite } from '@/types/admin'

export async function createAbonnementAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const clientId = formData.get('client_id') as string

  if (!clientId) {
    return { error: 'Vous devez sélectionner un client.' }
  }

  const rawData = {
    client_id: clientId,
    nom: formData.get('nom') as string,
    description: formData.get('description') as string || null,
    montant_mensuel_ht: parseFloat(formData.get('montant_mensuel_ht') as string || '0'),
    periodicite: (formData.get('periodicite') as Periodicite) || 'mensuel',
    date_debut: formData.get('date_debut') as string,
    statut: 'actif',
  }

  // Calcul de la 1ère date de facturation en fonction de la périodicité
  const debut = new Date(rawData.date_debut)
  let prochaineDate = new Date(debut)

  if (rawData.periodicite === 'mensuel') {
    prochaineDate.setMonth(prochaineDate.getMonth() + 1)
  } else if (rawData.periodicite === 'trimestriel') {
    prochaineDate.setMonth(prochaineDate.getMonth() + 3)
  } else if (rawData.periodicite === 'annuel') {
    prochaineDate.setFullYear(prochaineDate.getFullYear() + 1)
  }

  const dataToInsert = {
    ...rawData,
    prochaine_facturation: prochaineDate.toISOString().split('T')[0]
  }

  const { error } = await supabase
    .from('abonnements')
    .insert([dataToInsert])

  if (error) {
    console.error('Erreur création abonnement:', error)
    return { error: 'Erreur lors de la sauvegarde du contrat.' }
  }

  revalidatePath('/admin/abonnements')
  redirect('/admin/abonnements')
}
