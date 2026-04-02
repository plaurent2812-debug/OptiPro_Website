'use client'

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import AuditReportPDF from '@/components/pdf/AuditReportPDF'
import type { AuditPilierKey } from '@/data/audit-grid'

interface DownloadAuditPDFProps {
  audit: any
  client: any
  frictions: any[]
  actions: any[]
  pilierScores: Record<AuditPilierKey, number>
}

export default function DownloadAuditPDF({ audit, client, frictions, actions, pilierScores }: DownloadAuditPDFProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      const blob = await pdf(
        <AuditReportPDF
          audit={audit}
          client={client}
          frictions={frictions}
          actions={actions}
          pilierScores={pilierScores}
        />
      ).toBlob()

      const clientName = client?.entreprise || `${client?.prenom || ''}-${client?.nom || ''}`
      const date = new Date(audit.date_audit).toISOString().split('T')[0]
      const filename = `Audit-OptiPro-${clientName}-${date}.pdf`.replace(/\s+/g, '-')

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Erreur génération PDF:', err)
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.2rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        fontWeight: 600,
        border: '1px solid #4F46E5',
        background: 'white',
        color: '#4F46E5',
        cursor: isGenerating ? 'wait' : 'pointer',
        opacity: isGenerating ? 0.7 : 1,
        transition: 'all 0.15s ease',
      }}
    >
      {isGenerating ? (
        <>
          <span style={{
            width: '14px',
            height: '14px',
            border: '2px solid rgba(79,70,229,0.3)',
            borderTopColor: '#4F46E5',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          Génération...
        </>
      ) : (
        <>📥 Télécharger le rapport PDF</>
      )}
    </button>
  )
}
