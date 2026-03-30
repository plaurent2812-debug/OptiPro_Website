import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from '../clients.module.css'
import { CLIENT_STATUT_LABELS, formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function ClientDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  const supabase = await createClient()

  // On récupère le client avec les futurs devis associés
  const { data: client, error } = await supabase
    .from('clients')
    .select(`
      *,
      devis (id, numero, statut, date_emission, montant_ht),
      factures (id, numero, statut, date_emission, montant_ht)
    `)
    .eq('id', id)
    .single()

  if (error || !client) {
    notFound()
  }

  return (
    <div className={styles.pageContainer}>
      {/* En-tête de la fiche client */}
      <div className={styles.header}>
        <div>
          <Link href="/admin/clients" className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Liste des clients
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
            <h1 className={styles.title}>{client.prenom} {client.nom}</h1>
            <span className={`${styles.badge} ${styles[`badge--${client.statut}`]}`}>
              {CLIENT_STATUT_LABELS[client.statut] || client.statut}
            </span>
          </div>
          {client.entreprise && <p className={styles.subtitle} style={{ color: '#4F46E5', fontWeight: 600 }}>{client.entreprise}</p>}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href={`/admin/clients/${client.id}/edit`} className={styles.secondaryBtn}>Modifier</Link>
          <Link href={`/admin/devis/new?client_id=${client.id}`} className={styles.primaryBtn}>
            + Nouveau devis
          </Link>
        </div>
      </div>

      <div className={styles.formGrid}>
        
        {/* Colonne de gauche : Coordonnées */}
        <div className={styles.card} style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB' }}>
            Coordonnées
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', fontSize: '0.95rem' }}>
            <strong style={{ color: '#6B7280' }}>Email:</strong>
            {client.email ? (
              <a href={`mailto:${client.email}`} style={{ color: '#4F46E5', textDecoration: 'none' }}>{client.email}</a>
            ) : '—'}

            <strong style={{ color: '#6B7280' }}>Téléphone:</strong>
            {client.telephone ? (
              <a href={`tel:${client.telephone}`} style={{ color: '#374151', textDecoration: 'none' }}>{client.telephone}</a>
            ) : '—'}

            <strong style={{ color: '#6B7280' }}>Adresse:</strong>
            <span style={{ color: '#374151' }}>
              {client.adresse || client.ville || client.code_postal ? (
                <>
                  {client.adresse && <>{client.adresse}<br/></>}
                  {client.code_postal} {client.ville}
                </>
              ) : '—'}
            </span>
            
            <strong style={{ color: '#6B7280' }}>SIRET:</strong>
            <span style={{ color: '#374151', fontFamily: 'monospace' }}>{client.siret || '—'}</span>
            
            <strong style={{ color: '#6B7280' }}>Ajouté le:</strong>
            <span style={{ color: '#374151' }}>{formatDate(client.created_at)}</span>
          </div>
          
          {client.notes && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#F9FAFB', borderRadius: '8px', fontSize: '0.9rem', color: '#4B5563' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>Notes:</strong>
              {client.notes}
            </div>
          )}
        </div>

        {/* Colonne de droite : Historique (Devis / Factures) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className={styles.card} style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Derniers Devis</h2>
            
            {!client.devis || client.devis.length === 0 ? (
              <div style={{ padding: '1rem', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
                Aucun devis pour le moment.
              </div>
            ) : (
              <p style={{ color: '#4B5563', fontSize: '0.95rem' }}>
                <i>L'historique des devis apparaîtra ici.</i>
              </p>
            )}
          </div>

          <div className={styles.card} style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Factures récentes</h2>
            
            {!client.factures || client.factures.length === 0 ? (
              <div style={{ padding: '1rem', background: '#F9FAFB', borderRadius: '8px', textAlign: 'center', color: '#6B7280', fontSize: '0.9rem' }}>
                Aucune facture émise.
              </div>
            ) : (
              <p style={{ color: '#4B5563', fontSize: '0.95rem' }}>
                <i>L'historique des factures apparaîtra ici.</i>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
