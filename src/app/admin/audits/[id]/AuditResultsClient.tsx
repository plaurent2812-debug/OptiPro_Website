'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RadarChart from '@/components/admin/RadarChart'
import DownloadAuditPDF from '@/components/admin/DownloadAuditPDF'
import { PILIER_LABELS, PILIER_COLORS, AUDIT_PILIERS, type AuditPilierKey } from '@/data/audit-grid'
import { formatDate, AUDIT_STATUT_LABELS } from '@/lib/utils'
import styles from '../../audits/audits.module.css'
import crmStyles from '../../clients/clients.module.css'

interface AuditResultsClientProps {
  audit: any
  client: any
  frictions: any[]
  actions: any[]
  pilierScores: Record<AuditPilierKey, number>
  level: { label: string; color: string; emoji: string }
  heuresAn: number
  valorisationSmic: number
  valorisationArtisan: number
}

export default function AuditResultsClient({
  audit,
  client,
  frictions,
  actions,
  pilierScores,
  level,
  heuresAn,
  valorisationSmic,
  valorisationArtisan,
}: AuditResultsClientProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [showBars, setShowBars] = useState(false)

  // Animate the score counter
  useEffect(() => {
    const target = audit.score_global || 0
    const duration = 1500
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.round(eased * target * 10) / 10)
      if (progress >= 1) clearInterval(interval)
    }, 16)
    return () => clearInterval(interval)
  }, [audit.score_global])

  // Delay bar animation
  useEffect(() => {
    const t = setTimeout(() => setShowBars(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={crmStyles.pageContainer}>
      {/* Header */}
      <div className={crmStyles.header}>
        <div>
          <h1 className={crmStyles.title}>
            Rapport d&apos;audit — {client?.entreprise || `${client?.prenom} ${client?.nom}`}
          </h1>
          <p className={crmStyles.subtitle}>
            Audit du {formatDate(audit.date_audit)}
            {audit.secteur && ` · ${audit.secteur}`}
            {audit.effectif && ` · ${audit.effectif} pers.`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <DownloadAuditPDF
            audit={audit}
            client={client}
            frictions={frictions}
            actions={actions}
            pilierScores={pilierScores}
          />
          <Link href={`/admin/audits/${audit.id}/conduire`} className={crmStyles.secondaryBtn || crmStyles.actionBtn} style={{ fontSize: '0.85rem' }}>
            ✏️ Modifier
          </Link>
          <Link href="/admin/audits" className={crmStyles.actionBtn} style={{ fontSize: '0.85rem' }}>
            ← Retour
          </Link>
        </div>
      </div>

      {/* Score Global + Radar */}
      <div className={styles.resultsGrid}>
        {/* Score Circle */}
        <div className={styles.resultCard} style={{ textAlign: 'center' }}>
          <div className={styles.resultCardTitle}>Score global</div>
          <div
            className={styles.scoreCircle}
            style={{
              background: `${level.color}12`,
              border: `3px solid ${level.color}`,
            }}
          >
            <div className={styles.scoreValue} style={{ color: level.color }}>
              {animatedScore.toFixed(1)}
            </div>
            <div className={styles.scoreMax} style={{ color: level.color }}>/10</div>
          </div>
          <div className={styles.scoreLevel} style={{ color: level.color }}>
            {level.emoji} {level.label}
          </div>
        </div>

        {/* Radar Chart */}
        <div className={styles.resultCard}>
          <div className={styles.resultCardTitle}>Vue par pilier</div>
          <div className={styles.radarContainer}>
            <RadarChart scores={pilierScores} size={260} />
          </div>
        </div>
      </div>

      {/* Pilier Score Bars */}
      <div className={`${styles.resultCard} ${styles.resultCardFull}`} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.resultCardTitle}>Détail par pilier</div>
        {AUDIT_PILIERS.map((pilier) => {
          const score = pilierScores[pilier.key] || 0
          const scoreColor = PILIER_COLORS[pilier.key]
          return (
            <div key={pilier.key} className={styles.pilierBar}>
              <div className={styles.pilierBarHeader}>
                <span className={styles.pilierBarLabel}>
                  {pilier.icon} {pilier.label}
                </span>
                <span className={styles.pilierBarScore} style={{ color: scoreColor }}>
                  {score.toFixed(1)}/10
                </span>
              </div>
              <div className={styles.pilierBarTrack}>
                <div
                  className={styles.pilierBarFill}
                  style={{
                    width: showBars ? `${score * 10}%` : '0%',
                    background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}99)`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Gains Summary */}
      {audit.heures_recuperables_semaine > 0 && (
        <div className={`${styles.resultCard} ${styles.resultCardFull}`} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.resultCardTitle}>💰 Gains estimés</div>
          <div className={styles.gainsGrid}>
            <div className={styles.gainCard}>
              <div className={styles.gainValue}>{audit.heures_recuperables_semaine}h</div>
              <div className={styles.gainLabel}>récupérables / semaine</div>
            </div>
            <div className={styles.gainCard}>
              <div className={styles.gainValue}>{Math.round(heuresAn)}h</div>
              <div className={styles.gainLabel}>soit ~{Math.round(heuresAn / 7)} jours / an</div>
            </div>
            <div className={styles.gainCard}>
              <div className={styles.gainValue}>{valorisationArtisan.toLocaleString('fr-FR')}€</div>
              <div className={styles.gainLabel}>valorisation / an (à 35€/h)</div>
            </div>
          </div>
        </div>
      )}

      {/* Frictions & Actions side by side */}
      <div className={styles.resultsGrid}>
        {/* Frictions */}
        <div className={styles.resultCard}>
          <div className={styles.resultCardTitle}>
            🔴 Points de friction ({frictions.length})
          </div>
          {frictions.length === 0 ? (
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Aucun point de friction majeur identifié.</p>
          ) : (
            frictions.map((f: any) => (
              <div key={f.id} className={styles.frictionItem}>
                <div
                  className={styles.frictionDot}
                  style={{
                    background: f.severite === 'critical' ? '#EF4444' : f.severite === 'warning' ? '#F59E0B' : '#3B82F6',
                  }}
                />
                <div className={styles.frictionText}>
                  <div className={styles.frictionDesc}>{f.description}</div>
                  {f.impact_estime && (
                    <div className={styles.frictionImpact}>Impact : {f.impact_estime}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className={styles.resultCard}>
          <div className={styles.resultCardTitle}>
            🎯 Plan d&apos;action ({actions.length})
          </div>
          {actions.length === 0 ? (
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Aucune action recommandée.</p>
          ) : (
            actions.map((a: any) => (
              <div key={a.id} className={styles.actionItem}>
                <div className={styles.actionHeader}>
                  <span className={`${styles.actionPriority} ${styles[`actionPriority${a.priorite}`]}`}>
                    {a.priorite}
                  </span>
                  <span className={styles.actionProblem}>{a.probleme}</span>
                </div>
                <div className={styles.actionSolution}>→ {a.solution}</div>
                <div className={styles.actionMeta}>
                  {a.gain_estime && <span className={styles.actionBadge}>📈 {a.gain_estime}</span>}
                  {a.delai && <span className={styles.actionBadge}>⏱️ {a.delai}</span>}
                  {a.budget_indicatif && <span className={styles.actionBadge}>💰 {a.budget_indicatif}</span>}
                  {a.complexite && <span className={styles.actionBadge}>📊 {a.complexite}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Notes */}
      {audit.notes_generales && (
        <div className={`${styles.resultCard} ${styles.resultCardFull}`} style={{ marginTop: '1.5rem' }}>
          <div className={styles.resultCardTitle}>📝 Notes</div>
          <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
            {audit.notes_generales}
          </p>
        </div>
      )}

      {/* CTA */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #EEF2FF, #F0FDF4)',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        textAlign: 'center',
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1F2937', marginBottom: '0.5rem' }}>
          Prochaines étapes
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1rem' }}>
          Présentez ce rapport au client et créez un devis basé sur les actions prioritaires.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            href={`/admin/devis/new?client_id=${audit.client_id || ''}`}
            className={crmStyles.primaryBtn}
          >
            📄 Créer un devis
          </Link>
          {audit.client_id && (
            <Link
              href={`/admin/clients/${audit.client_id}`}
              className={crmStyles.actionBtn}
            >
              👤 Fiche client
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
