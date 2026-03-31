'use client'

import { useTransition, useState } from 'react'
import { archiveDevisAction, syncDevisFromPennylaneAction, pushDevisToPennylaneAction } from '../actions'
import styles from '../../clients/clients.module.css'

interface DevisActionsProps {
  devisId: string
  statut: string
  hasPennylaneId: boolean
}

export default function DevisActions({ devisId, statut, hasPennylaneId }: DevisActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const handlePush = () => {
    setMessage(null)
    startTransition(async () => {
      const result = await pushDevisToPennylaneAction(devisId)
      if (result?.error) {
        setMessage({ type: 'error', text: result.error })
      } else if (result?.success) {
        setMessage({ type: 'success', text: result.message || 'Envoyé !' })
      }
    })
  }

  const handleSync = () => {
    setMessage(null)
    startTransition(async () => {
      const result = await syncDevisFromPennylaneAction(devisId)
      if (result?.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: result.message || 'Synchronisé' })
      }
    })
  }

  const handleArchive = () => {
    setMessage(null)
    startTransition(async () => {
      const result = await archiveDevisAction(devisId)
      if (result?.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: result.message || 'Archivé' })
      }
    })
  }

  const canPush = statut === 'brouillon'
  const canSync = hasPennylaneId
  const canArchive = statut !== 'archive'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        
        {/* Bouton Push OptiPro → Pennylane (brouillon uniquement) */}
        {canPush && (
          <button
            className={styles.primaryBtn}
            onClick={handlePush}
            disabled={isPending}
            title="Envoyer ce devis vers Pennylane"
          >
            {isPending ? '⏳ Envoi...' : '🚀 Envoyer vers Pennylane'}
          </button>
        )}

        {/* Bouton Sync Pennylane → OptiPro (quand le devis existe sur Pennylane) */}
        {canSync && (
          <button
            className={styles.secondaryBtn}
            style={{ borderColor: '#4F46E5', color: '#4F46E5' }}
            onClick={handleSync}
            disabled={isPending}
            title="Synchroniser le statut depuis Pennylane"
          >
            {isPending ? '⏳ Sync...' : '↻ Sync Pennylane'}
          </button>
        )}

        {/* Bouton Archiver */}
        {canArchive && (
          <button
            className={styles.secondaryBtn}
            style={{ color: '#6B7280' }}
            onClick={handleArchive}
            disabled={isPending}
          >
            {isPending ? '⏳...' : '📦 Archiver'}
          </button>
        )}
      </div>

      {/* Message de retour */}
      {message && (
        <span style={{ 
          fontSize: '0.85rem', 
          color: message.type === 'error' ? '#DC2626' : '#059669',
          maxWidth: '350px',
          textAlign: 'right'
        }}>
          {message.text}
        </span>
      )}
    </div>
  )
}
