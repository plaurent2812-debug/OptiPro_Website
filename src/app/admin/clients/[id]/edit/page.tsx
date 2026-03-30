import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import EditClientForm from './EditClientForm'

export const dynamic = 'force-dynamic'

export default async function EditClientPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const supabase = await createClient()

  const { data: client, error } = await supabase
    .from('clients')
    .select('id, nom, prenom, email, telephone, entreprise, adresse, ville, code_postal, siret, notes, statut')
    .eq('id', params.id)
    .single()

  if (error || !client) {
    notFound()
  }

  return <EditClientForm client={client} />
}
