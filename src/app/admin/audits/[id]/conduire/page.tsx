import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AuditWizard from '@/components/admin/AuditWizard'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ConduireAuditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch audit with client + existing responses
  const { data: audit, error } = await supabase
    .from('audits')
    .select('*, clients(nom, prenom, entreprise), audit_reponses(*)')
    .eq('id', id)
    .single()

  if (error || !audit) {
    notFound()
  }

  const client = audit.clients as any
  const clientName = client
    ? `${client.prenom || ''} ${client.nom}${client.entreprise ? ` — ${client.entreprise}` : ''}`.trim()
    : 'Client inconnu'

  const initialReponses = (audit.audit_reponses || []).map((r: any) => ({
    question_id: r.question_id,
    score: r.score,
    commentaire: r.commentaire,
  }))

  return (
    <AuditWizard
      auditId={id}
      clientName={clientName}
      initialReponses={initialReponses}
    />
  )
}
