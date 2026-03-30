'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { updateClientAction } from '../../actions'
import styles from '../../clients.module.css'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? <span className={styles.spinner} /> : 'Enregistrer'}
    </button>
  )
}

type ClientData = {
  id: string
  nom: string
  prenom: string | null
  email: string | null
  telephone: string | null
  entreprise: string | null
  adresse: string | null
  ville: string | null
  code_postal: string | null
  siret: string | null
  notes: string | null
  statut: string
}

export default function EditClientForm({ client }: { client: ClientData }) {
  const [state, formAction] = useActionState(updateClientAction, null)

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <Link href={`/admin/clients/${client.id}`} className={styles.actionBtn} style={{ marginBottom: '1rem' }}>
            ← Retour à la fiche
          </Link>
          <h1 className={styles.title}>Modifier — {client.prenom} {client.nom}</h1>
        </div>
      </div>

      <div className={styles.card}>
        <form action={formAction} style={{ padding: '2rem' }}>
          <input type="hidden" name="id" value={client.id} />

          {state?.error && (
            <div className={styles.errorBanner} style={{ marginBottom: '1.5rem' }}>
              {state.error}
            </div>
          )}

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="prenom" className={styles.label}>Prénom</label>
              <input type="text" id="prenom" name="prenom" className={styles.input} defaultValue={client.prenom || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="nom" className={styles.label}>Nom <span style={{ color: '#EF4444' }}>*</span></label>
              <input type="text" id="nom" name="nom" required className={styles.input} defaultValue={client.nom} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="entreprise" className={styles.label}>Entreprise / Société</label>
              <input type="text" id="entreprise" name="entreprise" className={styles.input} defaultValue={client.entreprise || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="statut" className={styles.label}>Statut</label>
              <select id="statut" name="statut" className={styles.select} required defaultValue={client.statut}>
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
              <input type="email" id="email" name="email" className={styles.input} defaultValue={client.email || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telephone" className={styles.label}>Téléphone</label>
              <input type="tel" id="telephone" name="telephone" className={styles.input} defaultValue={client.telephone || ''} />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="adresse" className={styles.label}>Adresse postale</label>
              <input type="text" id="adresse" name="adresse" className={styles.input} defaultValue={client.adresse || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="code_postal" className={styles.label}>Code Postal</label>
              <input type="text" id="code_postal" name="code_postal" className={styles.input} defaultValue={client.code_postal || ''} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ville" className={styles.label}>Ville</label>
              <input type="text" id="ville" name="ville" className={styles.input} defaultValue={client.ville || ''} />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <hr style={{ borderTop: '1px solid #E5E7EB', margin: '1rem 0' }} />
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>Informations de Facturation</h3>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="siret" className={styles.label}>Numéro SIRET</label>
              <input type="text" id="siret" name="siret" className={styles.input} defaultValue={client.siret || ''} />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="notes" className={styles.label}>Notes / Contexte</label>
              <textarea id="notes" name="notes" className={styles.textarea} defaultValue={client.notes || ''}></textarea>
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href={`/admin/clients/${client.id}`} className={styles.secondaryBtn}>Annuler</Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
