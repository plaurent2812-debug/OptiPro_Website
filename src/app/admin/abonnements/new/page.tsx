'use client'

import { useState, useActionState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../clients/clients.module.css'
import { createAbonnementAction } from '../actions'
import { Client } from '@/types/admin'
import { createClient } from '@/lib/supabase/client'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? <span className={styles.spinner} /> : 'Valider le contrat'}
    </button>
  )
}

export default function NewAbonnementPage() {
  const [state, formAction] = useActionState(createAbonnementAction, null)
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const fetchClients = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('clients').select('id, prenom, nom, entreprise').order('nom')
      if (data) setClients(data)
    }
    fetchClients()
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/abonnements" className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Retour aux abonnements
          </Link>
          <h1 className={styles.title}>Nouveau Contrat</h1>
          <p className={styles.subtitle}>Enregistrez un nouveau contrat récurrent (maintenance, hébergement, etc.)</p>
        </div>
      </div>

      <div className={styles.card}>
        <form action={formAction} style={{ padding: '2rem' }}>
          
          {state?.error && (
            <div className={styles.errorBanner} style={{ marginBottom: '1.5rem' }}>
              {state.error}
            </div>
          )}

          <div className={styles.formGrid}>
            
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1', maxWidth: '400px' }}>
              <label htmlFor="client_id" className={styles.label}>Sélectionnez un Client <span style={{ color: '#EF4444' }}>*</span></label>
              <select id="client_id" name="client_id" className={styles.select} required defaultValue="">
                <option value="" disabled>-- Choisir dans la liste --</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.nom} {client.prenom} {client.entreprise ? `(${client.entreprise})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nom" className={styles.label}>Nom du contrat <span style={{ color: '#EF4444' }}>*</span></label>
              <input type="text" id="nom" name="nom" required className={styles.input} placeholder="Ex: Forfait Hébergement & Maintien à jour" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="periodicite" className={styles.label}>Périodicité de facturation</label>
              <select id="periodicite" name="periodicite" className={styles.select} required defaultValue="mensuel">
                <option value="mensuel">Mensuel</option>
                <option value="trimestriel">Trimestriel</option>
                <option value="annuel">Annuel</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="montant_mensuel_ht" className={styles.label}>Montant de base HT <span style={{ color: '#EF4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input type="number" step="0.5" id="montant_mensuel_ht" name="montant_mensuel_ht" required className={styles.input} style={{ width: '100%', paddingRight: '2rem' }} defaultValue="50" />
                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}>€</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date_debut" className={styles.label}>Date de début active</label>
              <input type="date" id="date_debut" name="date_debut" required className={styles.input} defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="description" className={styles.label}>Description et détails du contrat</label>
              <textarea id="description" name="description" className={styles.textarea} placeholder="Que comprend cet abonnement ?"></textarea>
            </div>

          </div>

          <div className={styles.formActions}>
            <Link href="/admin/abonnements" className={styles.secondaryBtn}>Annuler</Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
