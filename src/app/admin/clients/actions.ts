'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ClientStatut } from '@/types/admin'

export async function createClientAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    nom: formData.get('nom') as string,
    prenom: formData.get('prenom') as string,
    email: formData.get('email') as string || null,
    telephone: formData.get('telephone') as string || null,
    entreprise: formData.get('entreprise') as string || null,
    adresse: formData.get('adresse') as string || null,
    ville: formData.get('ville') as string || null,
    code_postal: formData.get('code_postal') as string || null,
    siret: formData.get('siret') as string || null,
    notes: formData.get('notes') as string || null,
    statut: (formData.get('statut') as ClientStatut) || 'prospect',
  }

  const { data, error } = await supabase
    .from('clients')
    .insert([rawData])
    .select()
    .single()

  if (error) {
    console.error('Erreur lors de la création du client:', error)
    return { error: 'Une erreur est survenue lors de la sauvegarde.' }
  }

  // Rafrachaîrit la liste des clients et redirige vers la liste
  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}
