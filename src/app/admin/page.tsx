import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import styles from './clients/clients.module.css'
import { formatMontant, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // --- Récupération des KPIs ---
  
  // 1. Chiffre d'Affaires du mois (Factures payées)
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
  
  const { data: facturesPayees } = await supabase
    .from('factures')
    .select('montant_ht')
    .eq('statut', 'payee')
    .gte('date_paiement', firstDayOfMonth)

  const caMoisActuel = facturesPayees?.reduce((acc, f) => acc + (f.montant_ht || 0), 0) || 0

  // 2. MRR (Abonnements actifs)
  const { data: abosActifs } = await supabase
    .from('abonnements')
    .select('montant_mensuel_ht')
    .eq('statut', 'actif')

  const mrrTotal = abosActifs?.reduce((acc, a) => acc + (a.montant_mensuel_ht || 0), 0) || 0

  // 3. Devis en attente
  const { count: devisAttente } = await supabase
    .from('devis')
    .select('id', { count: 'exact', head: true })
    .eq('statut', 'envoye')

  // 4. Clients Actifs
  const { count: clientsActifs } = await supabase
    .from('clients')
    .select('id', { count: 'exact', head: true })
    .eq('statut', 'client_actif')


  // --- Activité récente ---
  const { data: devisRecents } = await supabase
    .from('devis')
    .select('id, numero, statut, date_emission, montant_ht, clients(nom, prenom, entreprise)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Vue d'ensemble</h1>
          <p className={styles.subtitle}>Bienvenue dans votre CRM OptiPro. Voici vos statistiques actuelles.</p>
        </div>
      </div>

      {/* KPIs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        
        {/* KPI 1: CA mensuel */}
        <div className={styles.card} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '4px solid #4F46E5' }}>
          <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CA encaissé (Ce mois)
          </span>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
            {formatMontant(caMoisActuel)}
          </span>
        </div>

        {/* KPI 2: MRR */}
        <div className={styles.card} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '4px solid #059669' }}>
          <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Abonnements / MRR
          </span>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
            {formatMontant(mrrTotal)} <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500 }}>/mois</span>
          </span>
        </div>

        {/* KPI 3: Devis Envoyés */}
        <div className={styles.card} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '4px solid #F59E0B' }}>
          <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Devis en attente
          </span>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
            {devisAttente || 0}
          </span>
        </div>

        {/* KPI 4: Clients */}
        <div className={styles.card} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '4px solid #3B82F6' }}>
          <span style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Clients Actifs
          </span>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
            {clientsActifs || 0}
          </span>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start', marginTop: '1rem' }}>
        
        {/* Derniers Devis */}
        <div className={styles.card}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>Derniers Devis Créés</h2>
            <Link href="/admin/devis" style={{ fontSize: '0.9rem', color: '#4F46E5', textDecoration: 'none', fontWeight: 500 }}>Voir tout</Link>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <tbody>
                {devisRecents?.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>Aucun devis</td>
                  </tr>
                ) : (
                  devisRecents?.map((devis) => (
                    <tr key={devis.id}>
                      <td style={{ fontWeight: 600 }}>{devis.numero}</td>
                      <td>{devis.clients?.prenom} {devis.clients?.nom}</td>
                      <td>{formatDate(devis.date_emission)}</td>
                      <td style={{ fontWeight: 600, textAlign: 'right' }}>{formatMontant(devis.montant_ht)}</td>
                      <td style={{ textAlign: 'center' }}>
                         <span className={`${styles.badge} ${styles[`badge--${devis.statut}`]}`}>
                           {devis.statut}
                         </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Raccourcis Rapides */}
        <div className={styles.card} style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', margin: '0 0 1.5rem 0' }}>Actions rapides</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link href="/admin/devis/new" className={styles.primaryBtn} style={{ justifyContent: 'center' }}>
              + Créer un Devis
            </Link>
            <Link href="/admin/abonnements/new" className={styles.secondaryBtn} style={{ textAlign: 'center' }}>
              + Nouveau Forfait
            </Link>
            <Link href="/admin/clients/new" className={styles.secondaryBtn} style={{ textAlign: 'center' }}>
              + Ajouter un Client
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
