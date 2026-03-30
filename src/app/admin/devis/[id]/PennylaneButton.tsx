'use client'

import { useTransition, useState } from 'react'
import { pushDevisToPennylaneAction } from '../actions'
import styles from '../../clients/clients.module.css'

export default function PennylaneButton({ devisId }: { devisId: string }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handlePush = () => {
    setError(null)
    setSuccess(null)
    startTransition(async () => {
      const result = await pushDevisToPennylaneAction(devisId)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(result.message || 'Succès')
      }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
      <button 
        className={styles.primaryBtn} 
        style={{ marginTop: '1rem', background: isPending || success ? '#9CA3AF' : '#4F46E5', width: '100%' }}
        onClick={handlePush}
        disabled={isPending || !!success}
      >
        {isPending ? '⏳ Génération...' : success ? '✓ Devis généré' : 'Générer via API Partenaire'}
      </button>
      
      {error && (
        <div style={{ marginTop: '0.8rem', color: '#DC2626', fontSize: '0.875rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ marginTop: '0.8rem', color: '#059669', fontSize: '0.875rem', textAlign: 'center' }}>
          {success}
        </div>
      )}
    </div>
  )
}
