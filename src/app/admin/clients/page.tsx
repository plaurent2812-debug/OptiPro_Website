import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './clients.module.css'
import { CLIENT_STATUT_LABELS, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  const supabase = await createClient()
  
  const { data: clients, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Clients</h1>
          <p className={styles.subtitle}>Gérez votre base de contacts et prospects</p>
        </div>
        <Link href="/admin/clients/new" className={styles.primaryBtn}>
          <span className={styles.icon}>+</span> Nouveau Client
        </Link>
      </div>

      {error ? (
        <div className={styles.errorBanner}>
          <p>Une erreur est survenue lors du chargement des clients.</p>
          <small>{error.message}</small>
        </div>
      ) : (
        <div className={styles.card}>
          {clients?.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>👤</div>
              <h3>Aucun client</h3>
              <p>Commencez par ajouter votre premier prospect ou client.</p>
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Contact</th>
                    <th>Ajouté le</th>
                    <th>Statut</th>
                    <th className={styles.actionsBox}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients?.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div className={styles.clientName}>
                          {client.prenom} {client.nom}
                        </div>
                        {client.entreprise && <div className={styles.clientCompany}>{client.entreprise}</div>}
                      </td>
                      <td>
                        <div className={styles.contactInfo}>
                          {client.email && <a href={`mailto:${client.email}`}>{client.email}</a>}
                          {client.telephone && <span>{client.telephone}</span>}
                        </div>
                      </td>
                      <td>{formatDate(client.created_at)}</td>
                      <td>
                        <span className={`${styles.badge} ${styles[`badge--${client.statut}`]}`}>
                          {CLIENT_STATUT_LABELS[client.statut] || client.statut}
                        </span>
                      </td>
                      <td className={styles.actionsBox}>
                        <Link href={`/admin/clients/${client.id}`} className={styles.actionBtn}>
                          Voir la fiche
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
