'use client'

import { useTransition, useState } from 'react'
import { archiveDevisAction, syncDevisFromPennylaneAction } from '../actions'
import styles from '../../clients/clients.module.css'

interface DevisActionsProps {
  devisId: string
  statut: string
  hasPennylaneId: boolean
}

export default function DevisActions({ devisId, statut, hasPennylaneId }: DevisActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

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

  const canArchive = statut !== 'brouillon' && statut !== 'archive'
  const canSync = hasPennylaneId && statut !== 'archive'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {canSync && (
          <button
            className={styles.secondaryBtn}
            onClick={handleSync}
            disabled={isPending}
          >
            {isPending ? '⏳ Sync...' : '↻ Synchroniser Pennylane'}
          </button>
        )}
        {canArchive && (
          <button
            className={styles.secondaryBtn}
            style={{ color: '#6B7280' }}
            onClick={handleArchive}
            disabled={isPending}
          >
            {isPending ? '⏳...' : 'Archiver'}
          </button>
        )}
      </div>
      {message && (
        <span style={{ fontSize: '0.8rem', color: message.type === 'error' ? '#DC2626' : '#059669' }}>
          {message.text}
        </span>
      )}
    </div>
  )
}
