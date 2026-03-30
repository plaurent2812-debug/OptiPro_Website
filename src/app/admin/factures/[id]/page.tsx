import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from '../../clients/clients.module.css'
import { FACTURE_STATUT_LABELS, formatDate, formatMontant } from '@/lib/utils'
import { pushFactureToPennylaneAction } from '../actions'

export const dynamicConfig = 'force-dynamic'

export default async function FactureDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  const supabase = await createClient()

  const { data: facture, error } = await supabase
    .from('factures')
    .select(`
      *,
      clients (*),
      factures_lignes (*)
    `)
    .eq('id', id)
    .single()

  if (error || !facture) {
    notFound()
  }

  const lignesAffichees = facture.factures_lignes?.sort((a: any, b: any) => a.ordre - b.ordre) || []

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/factures" className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Retour aux factures
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
            <h1 className={styles.title}>Facture {facture.numero}</h1>
            <span className={`${styles.badge} ${styles[`badge--${facture.statut}`]}`}>
              {FACTURE_STATUT_LABELS[facture.statut] || facture.statut}
            </span>
          </div>
          {facture.clients && (
            <p className={styles.subtitle}>
              Pour : <Link href={`/admin/clients/${facture.clients.id}`} style={{ color: '#4F46E5', fontWeight: 600, textDecoration: 'none' }}>
                {facture.clients.prenom} {facture.clients.nom} {facture.clients.entreprise && `(${facture.clients.entreprise})`}
              </Link>
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {facture.statut === 'brouillon' && (
            <button className={styles.primaryBtn} style={{ backgroundColor: '#2563EB' }}>Valider & Envoyer</button>
          )}
          {(facture.statut === 'envoyee' || facture.statut === 'en_retard') && (
            <button className={styles.primaryBtn} style={{ backgroundColor: '#059669' }}>
              ✓ Marquer comme payée
            </button>
          )}
        </div>
      </div>

      <div className={styles.formGrid}>
        
        <div className={styles.card} style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB' }}>
            Informations de paiement
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', fontSize: '0.95rem' }}>
            <strong style={{ color: '#6B7280' }}>Date facturation:</strong>
            <span style={{ color: '#374151', fontWeight: 500 }}>{formatDate(facture.date_emission)}</span>

            <strong style={{ color: '#6B7280' }}>À régler avant le:</strong>
            <span style={{ color: '#374151', fontWeight: 500 }}>{formatDate(facture.date_echeance) || '—'}</span>

            <strong style={{ color: '#6B7280' }}>Net à payer:</strong>
            <span style={{ color: '#4F46E5', fontWeight: 800, fontSize: '1.2rem' }}>
              {formatMontant(facture.montant_ht)}
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', margin: '1rem 0 0 0', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
            Détails
          </h3>
          <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#4B5563', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {lignesAffichees.map((l: any) => (
              <li key={l.id}>
                <strong>{l.description}</strong> — Qte: {l.quantite} ({formatMontant(l.prix_unitaire_ht * l.quantite)})
              </li>
            ))}
          </ul>
        </div>

        {/* Aperçu iFrame du PDF (Remplacé par API Pennylane) */}
        <div className={styles.card} style={{ padding: '2rem', background: '#F9FAFB', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
          <h3 style={{ fontSize: '1.25rem', color: '#111827', margin: 0 }}>Facture Électronique (Factur-X)</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem', maxWidth: '400px' }}>
            Cette facture est gérée par Pennylane pour garantir la conformité anti-fraude et la norme Factur-X 2026.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            {facture.statut === 'brouillon' ? (
               <form action={async () => {
                 'use server';
                 await pushFactureToPennylaneAction(facture.id);
               }}>
                 <button className={styles.primaryBtn} style={{ background: '#2563EB' }}>
                   Synchroniser avec Pennylane (Draft)
                 </button>
               </form>
            ) : (
               <a href="#" className={styles.primaryBtn} style={{ background: '#111827' }} target="_blank">
                 Ouvrir dans Pennylane
               </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
