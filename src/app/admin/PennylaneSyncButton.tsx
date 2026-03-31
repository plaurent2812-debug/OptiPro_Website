'use client'

import { useTransition, useState } from 'react'
import { syncAllFromPennylaneAction } from './sync-actions'
import styles from './clients/clients.module.css'

export default function PennylaneSyncButton() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  const handleSync = () => {
    setMessage(null)
    startTransition(async () => {
      const result = await syncAllFromPennylaneAction()
      if (result?.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: result.message || 'Synchronisé' })
      }
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <button
        className={styles.secondaryBtn}
        onClick={handleSync}
        disabled={isPending}
        style={{ whiteSpace: 'nowrap' }}
      >
        {isPending ? '⏳ Synchronisation...' : '↻ Synchroniser Pennylane'}
      </button>
      {message && (
        <span style={{ fontSize: '0.85rem', color: message.type === 'error' ? '#DC2626' : '#059669' }}>
          {message.text}
        </span>
      )}
    </div>
  )
}
