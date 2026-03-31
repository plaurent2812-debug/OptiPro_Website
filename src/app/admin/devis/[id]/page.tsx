import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from '../../clients/clients.module.css'
import { DEVIS_STATUT_LABELS, formatDate, formatMontant } from '@/lib/utils'
import PennylaneButton from './PennylaneButton'
import DevisActions from './DevisActions'

export const dynamicConfig = 'force-dynamic'

export default async function DevisDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  const supabase = await createClient()

  // On récupère le devis + Lignes + Client fusionnés
  const { data: devis, error } = await supabase
    .from('devis')
    .select(`
      *,
      clients (*),
      devis_lignes (*)
    `)
    .eq('id', id)
    .single()

  if (error || !devis) {
    notFound()
  }

  // Tri des lignes pour un affichage cohérent
  const lignesAffichees = devis.devis_lignes?.sort((a: any, b: any) => a.ordre - b.ordre) || []

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/devis" className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Retour à la liste
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
            <h1 className={styles.title}>Devis {devis.numero}</h1>
            <span className={`${styles.badge} ${styles[`badge--${devis.statut}`]}`}>
              {DEVIS_STATUT_LABELS[devis.statut] || devis.statut}
            </span>
          </div>
          {devis.clients && (
            <p className={styles.subtitle}>
              Pour : <Link href={`/admin/clients/${devis.clients.id}`} style={{ color: '#4F46E5', fontWeight: 600, textDecoration: 'none' }}>
                {devis.clients.prenom} {devis.clients.nom} {devis.clients.entreprise && `(${devis.clients.entreprise})`}
              </Link>
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          {devis.statut === 'brouillon' && (
            <Link href={`/admin/devis/${devis.id}/edit`} className={styles.secondaryBtn}>
              Modifier infos
            </Link>
          )}
          <DevisActions
            devisId={devis.id}
            statut={devis.statut}
            hasPennylaneId={!!devis.pennylane_quote_id}
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        
        {/* Résumé textuel */}
        <div className={styles.card} style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0, paddingBottom: '1rem', borderBottom: '1px solid #E5E7EB' }}>
            Informations clés
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', fontSize: '0.95rem' }}>
            <strong style={{ color: '#6B7280' }}>Émis le:</strong>
            <span style={{ color: '#374151', fontWeight: 500 }}>{formatDate(devis.date_emission)}</span>

            <strong style={{ color: '#6B7280' }}>Expiration le:</strong>
            <span style={{ color: '#374151' }}>{formatDate(devis.date_validite) || '—'}</span>

            <strong style={{ color: '#6B7280' }}>Total (TTC):</strong>
            <span style={{ color: '#111827', fontWeight: 800, fontSize: '1.2rem' }}>
              {formatMontant(devis.montant_ht)}
            </span>
            <span style={{ gridColumn: '2', color: '#6B7280', fontSize: '0.8rem', marginTop: '-10px' }}>
              TVA non applicable
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', margin: '1rem 0 0 0', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
            Prestations incluses
          </h3>
          <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#4B5563', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {lignesAffichees.map((l: any) => (
              <li key={l.id}>
                <strong>{l.description}</strong> — {l.quantite} {l.unite !== 'forfait' && l.unite} ({formatMontant(l.prix_unitaire_ht * l.quantite)})
              </li>
            ))}
          </ul>
        </div>

        {/* Section Ex-PDF (Nouvelle Architecture Pennylane) */}
        <div className={styles.card} style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column', padding: '2rem', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#F9FAFB' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
          <h3 style={{ fontSize: '1.25rem', color: '#111827', margin: 0 }}>Génération Déportée</h3>
          <p style={{ color: '#6B7280', fontSize: '0.95rem', maxWidth: '400px' }}>
            Ce devis est géré via le nouveau système de facturation certifiée. Les PDF sont générés directement par le logiciel partenaire.
          </p>
          {devis.statut === 'brouillon' ? (
            <PennylaneButton devisId={devis.id} />
          ) : (
            <div style={{ marginTop: '1rem', color: '#059669', fontWeight: 500 }}>
              ✓ Devis envoyé / synchronisé
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
