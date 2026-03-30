'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { createClientAction } from '../actions'
import styles from '../clients.module.css'

// Bouton de soumission avec état de chargement natif React 19
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? <span className={styles.spinner} /> : 'Créer le client'}
    </button>
  )
}

export default function NewClientPage() {
  const [state, formAction] = useActionState(createClientAction, null)

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Link href="/admin/clients" className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Retour à la liste
          </Link>
          <h1 className={styles.title}>Nouveau Client</h1>
          <p className={styles.subtitle}>Ajoutez un nouveau prospect ou client à votre base.</p>
        </div>
      </div>

      <div className={styles.card}>
        <form action={formAction} style={{ padding: '2rem' }}>
          
          {/* Messages d'erreur retournés par la server action */}
          {state?.error && (
            <div className={styles.errorBanner} style={{ marginBottom: '1.5rem' }}>
              {state.error}
            </div>
          )}

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="prenom" className={styles.label}>Prénom</label>
              <input type="text" id="prenom" name="prenom" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nom" className={styles.label}>Nom <span style={{ color: '#EF4444' }}>*</span></label>
              <input type="text" id="nom" name="nom" required className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="entreprise" className={styles.label}>Entreprise / Société</label>
              <input type="text" id="entreprise" name="entreprise" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="statut" className={styles.label}>Statut initial</label>
              <select id="statut" name="statut" className={styles.select} required defaultValue="prospect">
                <option value="prospect">Prospect</option>
                <option value="client_actif">Client actif</option>
                <option value="client_inactif">Client inactif</option>
              </select>
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <hr style={{ borderTop: '1px solid #E5E7EB', margin: '1rem 0' }} />
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>Coordonnées</h3>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Adresse Email</label>
              <input type="email" id="email" name="email" className={styles.input} placeholder="contact@exemple.fr" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telephone" className={styles.label}>Téléphone</label>
              <input type="tel" id="telephone" name="telephone" className={styles.input} placeholder="06 12 34 56 78" />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="adresse" className={styles.label}>Adresse postale</label>
              <input type="text" id="adresse" name="adresse" className={styles.input} placeholder="123 rue de la République" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="code_postal" className={styles.label}>Code Postal</label>
              <input type="text" id="code_postal" name="code_postal" className={styles.input} placeholder="75001" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ville" className={styles.label}>Ville</label>
              <input type="text" id="ville" name="ville" className={styles.input} placeholder="Paris" />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <hr style={{ borderTop: '1px solid #E5E7EB', margin: '1rem 0' }} />
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>Informations de Facturation</h3>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="siret" className={styles.label}>Numéro SIRET</label>
              <input type="text" id="siret" name="siret" className={styles.input} placeholder="123 456 789 00012" />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="notes" className={styles.label}>Notes / Contexte</label>
              <textarea id="notes" name="notes" className={styles.textarea} placeholder="Informations complémentaires sur le client..."></textarea>
            </div>

          </div>

          <div className={styles.formActions}>
            <Link href="/admin/clients" className={styles.secondaryBtn}>Annuler</Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
