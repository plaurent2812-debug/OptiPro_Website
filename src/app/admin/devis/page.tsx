import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from '../clients/clients.module.css' // On réutilise les styles pour rester cohérent
import { DEVIS_STATUT_LABELS, formatMontant, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function DevisPage() {
  const supabase = await createClient()

  // On récupère tous les devis avec le nom du client associé
  const { data: devisList, error } = await supabase
    .from('devis')
    .select(`
      *,
      clients ( prenom, nom, entreprise )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Devis</h1>
          <p className={styles.subtitle}>Supervisez l'ensemble de vos propositions commerciales</p>
        </div>
        <Link href="/admin/devis/new" className={styles.primaryBtn}>
          <span className={styles.icon}>+</span> Nouveau Devis
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Client</th>
                <th>Date d'émission</th>
                <th>Montant HT</th>
                <th>Statut</th>
                <th className={styles.actionsBox}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devisList?.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className={styles.emptyState} style={{ padding: 0 }}>
                      <p>Aucun devis créé pour le moment.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                devisList?.map((devis) => (
                  <tr key={devis.id}>
                    <td><strong>{devis.numero}</strong></td>
                    <td>
                      {devis.clients ? (
                        <>
                          <div>{devis.clients.prenom} {devis.clients.nom}</div>
                          {devis.clients.entreprise && (
                            <small style={{ color: '#6B7280' }}>({devis.clients.entreprise})</small>
                          )}
                        </>
                      ) : (
                        <span style={{ color: '#9CA3AF' }}>Client supprimé</span>
                      )}
                    </td>
                    <td>{formatDate(devis.date_emission)}</td>
                    <td style={{ fontWeight: 600 }}>{formatMontant(devis.montant_ht || 0)}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge--${devis.statut}`]}`}>
                        {DEVIS_STATUT_LABELS[devis.statut] || devis.statut}
                      </span>
                    </td>
                    <td className={styles.actionsBox}>
                      <Link href={`/admin/devis/${devis.id}`} className={styles.actionBtn}>
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}
