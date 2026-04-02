import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { getScoreLevel, PILIER_LABELS, PILIER_COLORS, AUDIT_PILIERS, type AuditPilierKey } from '@/data/audit-grid'
import AuditResultsClient from './AuditResultsClient'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AuditDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: audit, error } = await supabase
    .from('audits')
    .select('*, clients(nom, prenom, entreprise, email, telephone), audit_reponses(*), audit_frictions(*), audit_actions(*)')
    .eq('id', id)
    .single()

  if (error || !audit) {
    notFound()
  }

  // If still in progress, redirect to wizard
  if (audit.statut === 'en_cours') {
    const { redirect } = await import('next/navigation')
    redirect(`/admin/audits/${id}/conduire`)
  }

  const client = audit.clients as any
  const frictions = (audit.audit_frictions || []).sort((a: any, b: any) => {
    const order = { critical: 0, warning: 1, info: 2 }
    return (order[a.severite as keyof typeof order] ?? 2) - (order[b.severite as keyof typeof order] ?? 2)
  })
  const actions = (audit.audit_actions || []).sort((a: any, b: any) => a.ordre - b.ordre)

  const pilierScores: Record<AuditPilierKey, number> = {
    outils: audit.score_outils || 0,
    process: audit.score_process || 0,
    communication: audit.score_communication || 0,
    admin: audit.score_admin || 0,
    digital: audit.score_digital || 0,
    automatisation: audit.score_automatisation || 0,
  }

  const level = getScoreLevel(audit.score_global || 0)
  const heuresAn = (audit.heures_recuperables_semaine || 0) * 47
  const valorisationSmic = Math.round(heuresAn * 11.88)
  const valorisationArtisan = Math.round(heuresAn * 35)

  return (
    <AuditResultsClient
      audit={audit}
      client={client}
      frictions={frictions}
      actions={actions}
      pilierScores={pilierScores}
      level={level}
      heuresAn={heuresAn}
      valorisationSmic={valorisationSmic}
      valorisationArtisan={valorisationArtisan}
    />
  )
}
