import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from '../clients/clients.module.css'
import { FACTURE_STATUT_LABELS, formatMontant, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function FacturesPage() {
  const supabase = await createClient()

  // On récupère toutes les factures
  const { data: facturesList, error } = await supabase
    .from('factures')
    .select(`
      *,
      clients ( prenom, nom, entreprise )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Factures</h1>
          <p className={styles.subtitle}>Suivez vos encaissements et gérez les relances</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Client</th>
                <th>Émise le</th>
                <th>Montant TTC</th>
                <th>Statut</th>
                <th className={styles.actionsBox}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {facturesList?.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    <div className={styles.emptyState} style={{ padding: 0 }}>
                      <p>Aucune facture émise.</p>
                      <small style={{ color: '#6B7280' }}>
                        Pour générer une facture, convertissez un devis accepté ou facturez un abonnement.
                      </small>
                    </div>
                  </td>
                </tr>
              ) : (
                facturesList?.map((facture) => {
                  const isLate = facture.statut !== 'payee' && facture.statut !== 'annulee' 
                                 && facture.date_echeance && facture.date_echeance < new Date().toISOString().split('T')[0]
                  
                  return (
                    <tr key={facture.id}>
                      <td><strong>{facture.numero}</strong></td>
                      <td>
                        {facture.clients ? (
                          <>
                            <div>{facture.clients.prenom} {facture.clients.nom}</div>
                            {facture.clients.entreprise && (
                              <small style={{ color: '#6B7280' }}>({facture.clients.entreprise})</small>
                            )}
                          </>
                        ) : '—'}
                      </td>
                      <td>{formatDate(facture.date_emission)}</td>
                      <td style={{ fontWeight: 600 }}>{formatMontant(facture.montant_ht || 0)}</td>
                      <td>
                        <span className={`${styles.badge} ${isLate ? styles['badge--prospect'] : styles[`badge--${facture.statut}`]}`}>
                          {isLate ? 'En retard ⚠️' : FACTURE_STATUT_LABELS[facture.statut] || facture.statut}
                        </span>
                      </td>
                      <td className={styles.actionsBox}>
                        <Link href={`/admin/factures/${facture.id}`} className={styles.actionBtn}>
                          Voir la facture
                        </Link>
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
