'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AUDIT_PILIERS, type AuditPilierDef } from '@/data/audit-grid'
import { saveAuditReponseAction, finalizeAuditAction } from '@/app/admin/audits/actions'
import styles from '@/app/admin/audits/audits.module.css'
import crmStyles from '@/app/admin/clients/clients.module.css'

interface AuditWizardProps {
  auditId: string
  clientName: string
  initialReponses: Array<{
    question_id: string
    score: number
    commentaire: string | null
  }>
}

export default function AuditWizard({ auditId, clientName, initialReponses }: AuditWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, { score: number; commentaire: string | null }>>({})
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [isPending, startTransition] = useTransition()

  // Initialize responses from DB
  useEffect(() => {
    const init: Record<string, { score: number; commentaire: string | null }> = {}
    for (const r of initialReponses) {
      init[r.question_id] = { score: r.score, commentaire: r.commentaire }
    }
    setResponses(init)

    // Find the first pilier that isn't fully answered
    for (let i = 0; i < AUDIT_PILIERS.length; i++) {
      const allAnswered = AUDIT_PILIERS[i].questions.every(q => init[q.id] !== undefined)
      if (!allAnswered) {
        setCurrentStep(i)
        break
      }
    }
  }, [initialReponses])

  // Auto-save a response
  const saveResponse = useCallback(async (
    pilier: string,
    questionId: string,
    score: number,
    commentaire: string | null
  ) => {
    setSaveStatus('saving')
    await saveAuditReponseAction(auditId, pilier, questionId, score, commentaire)
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus('idle'), 2000)
  }, [auditId])

  // Handle score selection
  const handleSelect = (pilierKey: string, questionId: string, score: number) => {
    const current = responses[questionId]
    const newResp = { score, commentaire: current?.commentaire || null }
    setResponses(prev => ({ ...prev, [questionId]: newResp }))
    saveResponse(pilierKey, questionId, score, newResp.commentaire)
  }

  // Handle comment change
  const handleComment = (pilierKey: string, questionId: string, commentaire: string) => {
    const current = responses[questionId]
    if (!current) return
    const newResp = { ...current, commentaire: commentaire || null }
    setResponses(prev => ({ ...prev, [questionId]: newResp }))
    // Debounced save for comments
    const timer = setTimeout(() => {
      saveResponse(pilierKey, questionId, current.score, commentaire || null)
    }, 800)
    return () => clearTimeout(timer)
  }

  // Check completion
  const isStepComplete = (stepIndex: number) => {
    return AUDIT_PILIERS[stepIndex].questions.every(q => responses[q.id] !== undefined)
  }

  const totalAnswered = Object.keys(responses).length
  const totalQuestions = AUDIT_PILIERS.reduce((sum, p) => sum + p.questions.length, 0)
  const allComplete = totalAnswered >= totalQuestions

  const currentPilier = AUDIT_PILIERS[currentStep]

  // Finalize
  const handleFinalize = () => {
    startTransition(async () => {
      await finalizeAuditAction(auditId)
    })
  }

  return (
    <div className={crmStyles.pageContainer}>
      {/* Header */}
      <div className={crmStyles.header}>
        <div>
          <h1 className={crmStyles.title}>Audit — {clientName}</h1>
          <p className={crmStyles.subtitle}>
            {totalAnswered}/{totalQuestions} questions répondues
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={`${styles.saveIndicator} ${saveStatus === 'saved' ? styles.saveIndicatorVisible : ''}`}>
            ✓ Sauvegardé
          </div>
          {saveStatus === 'saving' && (
            <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Sauvegarde...</div>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className={styles.wizardProgress}>
        {AUDIT_PILIERS.map((pilier, index) => {
          const isDone = isStepComplete(index)
          const isActive = index === currentStep
          return (
            <div key={pilier.key} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                className={`${styles.wizardStep} ${isActive ? styles.wizardStepActive : ''} ${isDone && !isActive ? styles.wizardStepDone : ''}`}
                onClick={() => setCurrentStep(index)}
                type="button"
              >
                <span className={styles.wizardStepIcon}>
                  {isDone ? '✓' : pilier.icon}
                </span>
                <span>{pilier.label}</span>
              </button>
              {index < AUDIT_PILIERS.length - 1 && (
                <div className={`${styles.wizardConnector} ${isDone ? styles.wizardConnectorDone : ''}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Current Pilier */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{currentPilier.icon}</span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937', margin: 0 }}>
            {currentPilier.label}
          </h2>
          <span style={{
            fontSize: '0.7rem',
            background: '#F3F4F6',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            color: '#6B7280',
            fontWeight: 600,
          }}>
            Coeff. ×{currentPilier.coefficient}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#6B7280', margin: 0 }}>
          {currentPilier.description}
        </p>
      </div>

      {/* Questions */}
      {currentPilier.questions.map((question) => {
        const selected = responses[question.id]?.score
        const hasComment = expandedComments.has(question.id) || responses[question.id]?.commentaire
        return (
          <div key={question.id} className={styles.questionCard}>
            <div className={styles.questionTitle}>
              <span className={styles.questionNumber}>{question.id}</span>
              <span>{question.text}</span>
            </div>

            <div className={styles.scoreOptions}>
              {question.options.map((option) => (
                <button
                  key={option.score}
                  type="button"
                  className={`${styles.scoreOption} ${selected === option.score ? styles.scoreOptionSelected : ''}`}
                  onClick={() => handleSelect(currentPilier.key, question.id, option.score)}
                >
                  <div className={styles.scoreDot} />
                  <span className={styles.scoreLabel}>{option.label}</span>
                  <span className={`${styles.scoreBadge} ${styles[`scoreBadge${option.score}`]}`}>
                    {option.score}/5
                  </span>
                </button>
              ))}
            </div>

            {/* Comment */}
            <button
              type="button"
              className={styles.commentToggle}
              onClick={() => {
                setExpandedComments(prev => {
                  const next = new Set(prev)
                  if (next.has(question.id)) next.delete(question.id)
                  else next.add(question.id)
                  return next
                })
              }}
            >
              💬 {hasComment ? 'Masquer le commentaire' : 'Ajouter un commentaire'}
            </button>

            {hasComment && (
              <textarea
                className={styles.commentInput}
                placeholder="Notes, observations..."
                value={responses[question.id]?.commentaire || ''}
                onChange={(e) => handleComment(currentPilier.key, question.id, e.target.value)}
              />
            )}
          </div>
        )
      })}

      {/* Navigation */}
      <div className={styles.wizardNav}>
        <button
          type="button"
          className={styles.wizardNavBtn}
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          style={{ opacity: currentStep === 0 ? 0.4 : 1 }}
        >
          ← Précédent
        </button>

        <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
          {currentStep + 1} / {AUDIT_PILIERS.length}
        </div>

        {currentStep < AUDIT_PILIERS.length - 1 ? (
          <button
            type="button"
            className={`${styles.wizardNavBtn} ${styles.wizardNavBtnPrimary}`}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Suivant →
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.wizardNavBtn} ${styles.wizardNavBtnFinalize}`}
            onClick={handleFinalize}
            disabled={!allComplete || isPending}
            style={{ opacity: !allComplete ? 0.5 : 1 }}
          >
            {isPending ? 'Calcul en cours...' : '✓ Finaliser l\'audit'}
          </button>
        )}
      </div>

      {!allComplete && currentStep === AUDIT_PILIERS.length - 1 && (
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#F59E0B', marginTop: '0.75rem' }}>
          ⚠️ Répondez à toutes les questions pour finaliser l&apos;audit ({totalQuestions - totalAnswered} restante{totalQuestions - totalAnswered > 1 ? 's' : ''})
        </p>
      )}
    </div>
  )
}
