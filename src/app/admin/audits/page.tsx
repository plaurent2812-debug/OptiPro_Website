import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from '../clients/clients.module.css'
import { AUDIT_STATUT_LABELS, formatDate } from '@/lib/utils'
import { getScoreLevel } from '@/data/audit-grid'

export const dynamic = 'force-dynamic'

export default async function AuditsPage() {
  const supabase = await createClient()

  const { data: audits, error } = await supabase
    .from('audits')
    .select('*, clients(nom, prenom, entreprise)')
    .order('created_at', { ascending: false })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Audits</h1>
          <p className={styles.subtitle}>Conduisez et gérez vos audits clients selon la méthode OptiPro</p>
        </div>
        <Link href="/admin/audits/new" className={styles.primaryBtn}>
          <span className={styles.icon}>+</span> Nouvel Audit
        </Link>
      </div>

      {error ? (
        <div className={styles.errorBanner}>
          <p>Une erreur est survenue lors du chargement des audits.</p>
          <small>{error.message}</small>
        </div>
      ) : (
        <div className={styles.card}>
          {audits?.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>Aucun audit</h3>
              <p>Lancez votre premier audit client pour identifier les points de friction et proposer des solutions.</p>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Heures récup.</th>
                    <th>Statut</th>
                    <th className={styles.actionsBox}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {audits?.map((audit) => {
                    const level = getScoreLevel(audit.score_global || 0)
                    const client = audit.clients as any
                    return (
                      <tr key={audit.id}>
                        <td>
                          <div className={styles.clientName}>
                            {client?.prenom} {client?.nom}
                          </div>
                          {client?.entreprise && (
                            <div className={styles.clientCompany}>{client.entreprise}</div>
                          )}
                        </td>
                        <td>{formatDate(audit.date_audit)}</td>
                        <td>
                          {audit.statut !== 'en_cours' ? (
                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '6px',
                              background: `${level.color}15`,
                              color: level.color,
                              fontWeight: 700,
                              fontSize: '0.85rem',
                            }}>
                              {level.emoji} {audit.score_global}/10
                            </div>
                          ) : (
                            <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>—</span>
                          )}
                        </td>
                        <td>
                          {audit.heures_recuperables_semaine > 0 ? (
                            <span style={{ fontWeight: 600, color: '#059669' }}>
                              {audit.heures_recuperables_semaine}h/sem
                            </span>
                          ) : (
                            <span style={{ color: '#9CA3AF' }}>—</span>
                          )}
                        </td>
                        <td>
                          <span className={`${styles.badge} ${styles[`badge--${audit.statut}`]}`}>
                            {AUDIT_STATUT_LABELS[audit.statut] || audit.statut}
                          </span>
                        </td>
                        <td className={styles.actionsBox}>
                          {audit.statut === 'en_cours' ? (
                            <Link href={`/admin/audits/${audit.id}/conduire`} className={styles.actionBtn}>
                              Continuer
                            </Link>
                          ) : (
                            <Link href={`/admin/audits/${audit.id}`} className={styles.actionBtn}>
                              Voir
                            </Link>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
