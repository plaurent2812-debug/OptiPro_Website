import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from '../clients/clients.module.css'
import { ABONNEMENT_STATUT_LABELS, PERIODICITE_LABELS, formatMontant, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AbonnementsPage() {
  const supabase = await createClient()

  const { data: abonnements, error } = await supabase
    .from('abonnements')
    .select(`
      *,
      clients ( prenom, nom, entreprise )
    `)
    .order('prochaine_facturation', { ascending: true }) // Prochaines factu en premier

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Abonnements & Contrats</h1>
          <p className={styles.subtitle}>Gérez les contrats de maintenance et les revenus récurrents</p>
        </div>
        <Link href="/admin/abonnements/new" className={styles.primaryBtn}>
          <span className={styles.icon}>+</span> Nouveau Contrat
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Contrat</th>
                <th>Client</th>
                <th>Montant Base HT</th>
                <th>Rythme</th>
                <th>Prochaine Facture</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {abonnements?.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className={styles.emptyState} style={{ padding: 0 }}>
                      <p>Aucun abonnement ou contrat en cours.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                abonnements?.map((sub) => {
                  const today = new Date().toISOString().split('T')[0]
                  const isLate = sub.prochaine_facturation && sub.prochaine_facturation <= today && sub.statut === 'actif'
                  
                  return (
                    <tr key={sub.id}>
                      <td>
                        <strong>{sub.nom}</strong>
                      </td>
                      <td>
                        {sub.clients ? (
                          <>
                            {sub.clients.prenom} {sub.clients.nom}
                            <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{sub.clients.entreprise}</div>
                          </>
                        ) : '—'}
                      </td>
                      <td style={{ fontWeight: 600 }}>{formatMontant(sub.montant_mensuel_ht)}</td>
                      <td>{PERIODICITE_LABELS[sub.periodicite] || sub.periodicite}</td>
                      <td>
                        {sub.statut === 'actif' ? (
                          <span style={{ 
                            color: isLate ? '#DC2626' : '#111827', 
                            fontWeight: isLate ? 600 : 400 
                          }}>
                            {formatDate(sub.prochaine_facturation)}
                            {isLate && ' ⚠️'}
                          </span>
                        ) : (
                          <span style={{ color: '#9CA3AF' }}>—</span>
                        )}
                      </td>
                      <td>
                        <span className={`${styles.badge} ${sub.statut === 'actif' ? styles['badge--client_actif'] : styles['badge--client_inactif']}`}>
                          {ABONNEMENT_STATUT_LABELS[sub.statut]}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
