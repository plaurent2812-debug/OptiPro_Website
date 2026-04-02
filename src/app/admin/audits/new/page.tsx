'use client'

import { useActionState } from 'react'
import { createAuditAction } from '../actions'
import styles from '../../clients/clients.module.css'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NewAuditPage() {
  const [state, formAction, isPending] = useActionState(createAuditAction, null)
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    async function loadClients() {
      const supabase = createClient()
      const { data } = await supabase
        .from('clients')
        .select('id, nom, prenom, entreprise')
        .order('nom')
      setClients(data || [])
    }
    loadClients()
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Nouvel Audit</h1>
          <p className={styles.subtitle}>Sélectionnez un client et renseignez les informations de base</p>
        </div>
      </div>

      <div className={styles.card} style={{ padding: '2rem' }}>
        {state?.error && (
          <div className={styles.errorBanner} style={{ marginBottom: '1.5rem' }}>
            <p>{state.error}</p>
          </div>
        )}

        <form action={formAction}>
          <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
            {/* Client */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="client_id" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                Client *
              </label>
              <select
                id="client_id"
                name="client_id"
                required
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  background: 'white',
                  color: '#111827',
                }}
              >
                <option value="">Sélectionnez un client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.prenom} {c.nom} {c.entreprise ? `— ${c.entreprise}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Secteur */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="secteur" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                Secteur d&apos;activité
              </label>
              <input
                id="secteur"
                name="secteur"
                type="text"
                placeholder="Ex: Menuiserie, Boulangerie, Plomberie..."
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            {/* Effectif */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="effectif" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                Effectif
              </label>
              <select
                id="effectif"
                name="effectif"
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  background: 'white',
                  color: '#111827',
                }}
              >
                <option value="">Non renseigné</option>
                <option value="1">Indépendant (1 personne)</option>
                <option value="2-5">2 à 5 personnes</option>
                <option value="6-10">6 à 10 personnes</option>
                <option value="11-20">11 à 20 personnes</option>
                <option value="20+">Plus de 20 personnes</option>
              </select>
            </div>

            {/* CA annuel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="ca_annuel" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                Tranche de CA annuel
              </label>
              <select
                id="ca_annuel"
                name="ca_annuel"
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  background: 'white',
                  color: '#111827',
                }}
              >
                <option value="">Non renseigné</option>
                <option value="<50k">&lt; 50 000 €</option>
                <option value="50k-100k">50 000 € — 100 000 €</option>
                <option value="100k-200k">100 000 € — 200 000 €</option>
                <option value="200k-500k">200 000 € — 500 000 €</option>
                <option value="500k+">500 000 € +</option>
              </select>
            </div>

            {/* Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="notes_generales" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                Notes générales
              </label>
              <textarea
                id="notes_generales"
                name="notes_generales"
                rows={3}
                placeholder="Contexte, objectifs du client, observations initiales..."
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={styles.primaryBtn}
              style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            >
              {isPending ? 'Création...' : '🔍 Lancer l\'audit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
