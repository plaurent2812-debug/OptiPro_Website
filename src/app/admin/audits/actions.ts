'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {
  AUDIT_PILIERS,
  FRICTION_TEMPLATES,
  ACTION_TEMPLATES,
  GAINS_PAR_QUESTION,
  type AuditPilierKey,
} from '@/data/audit-grid'

// ── Créer un nouvel audit ─────────────────────────────────
export async function createAuditAction(prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Session expirée. Veuillez vous reconnecter.' }
  }

  const rawData = {
    client_id: formData.get('client_id') as string || null,
    secteur: formData.get('secteur') as string || null,
    effectif: formData.get('effectif') as string || null,
    ca_annuel: formData.get('ca_annuel') as string || null,
    notes_generales: formData.get('notes_generales') as string || null,
    date_audit: new Date().toISOString().split('T')[0],
    statut: 'en_cours',
  }

  const { data, error } = await supabase
    .from('audits')
    .insert([rawData])
    .select()
    .single()

  if (error) {
    console.error('Erreur lors de la création de l\'audit:', error)
    return { error: `Erreur Supabase: ${error.message}` }
  }

  revalidatePath('/admin/audits')
  redirect(`/admin/audits/${data.id}/conduire`)
}

// ── Sauvegarder une réponse (auto-save) ──────────────────
export async function saveAuditReponseAction(
  auditId: string,
  pilier: string,
  questionId: string,
  score: number,
  commentaire: string | null
) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Session expirée.' }
  }

  // Upsert: insert or update on conflict
  const { error } = await supabase
    .from('audit_reponses')
    .upsert(
      {
        audit_id: auditId,
        pilier,
        question_id: questionId,
        score,
        commentaire,
      },
      { onConflict: 'audit_id,question_id' }
    )

  if (error) {
    console.error('Erreur sauvegarde réponse:', error)
    return { error: error.message }
  }

  return { success: true }
}

// ── Finaliser l'audit : calculer scores, frictions, actions ───
export async function finalizeAuditAction(auditId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Session expirée.' }
  }

  // 1. Récupérer toutes les réponses
  const { data: reponses, error: repError } = await supabase
    .from('audit_reponses')
    .select('*')
    .eq('audit_id', auditId)

  if (repError || !reponses) {
    return { error: 'Impossible de récupérer les réponses.' }
  }

  // 2. Calculer les scores par pilier
  const scoresByPilier: Record<string, { total: number; count: number; max: number }> = {}
  for (const pilier of AUDIT_PILIERS) {
    scoresByPilier[pilier.key] = { total: 0, count: 0, max: pilier.questions.length * 5 }
  }

  for (const rep of reponses) {
    if (scoresByPilier[rep.pilier]) {
      scoresByPilier[rep.pilier].total += rep.score
      scoresByPilier[rep.pilier].count++
    }
  }

  // Calcul des scores normalisés /10 par pilier
  const pilierScores: Record<string, number> = {}
  let weightedSum = 0
  let totalCoeff = 0

  for (const pilier of AUDIT_PILIERS) {
    const s = scoresByPilier[pilier.key]
    const normalized = s.max > 0 ? (s.total / s.max) * 10 : 0
    pilierScores[pilier.key] = Math.round(normalized * 10) / 10
    weightedSum += normalized * pilier.coefficient
    totalCoeff += pilier.coefficient
  }

  const scoreGlobal = Math.round((weightedSum / totalCoeff) * 10) / 10

  // 3. Générer les frictions
  const frictions: Array<{
    audit_id: string
    severite: string
    pilier: string
    description: string
    impact_estime: string
    question_id: string
  }> = []

  for (const rep of reponses) {
    const matchingFrictions = FRICTION_TEMPLATES.filter(
      (f) => f.questionId === rep.question_id && rep.score <= f.maxScore
    )
    // Use the best (most specific) match
    const best = matchingFrictions.sort((a, b) => a.maxScore - b.maxScore)[0]
    if (best) {
      frictions.push({
        audit_id: auditId,
        severite: best.severite,
        pilier: rep.pilier,
        description: best.description,
        impact_estime: best.impact,
        question_id: rep.question_id,
      })
    }
  }

  // 4. Générer les actions recommandées
  const actions: Array<{
    audit_id: string
    priorite: string
    pilier: string
    probleme: string
    solution: string
    gain_estime: string
    complexite: string
    budget_indicatif: string
    delai: string
    service_optipro: string
    ordre: number
  }> = []

  let ordre = 0
  for (const rep of reponses) {
    const matchingActions = ACTION_TEMPLATES.filter(
      (a) => a.questionId === rep.question_id && rep.score <= a.maxScore
    )
    for (const act of matchingActions) {
      // Determine priority based on score and coefficient
      const pilier = AUDIT_PILIERS.find((p) => p.key === rep.pilier)
      const coeff = pilier?.coefficient || 1
      const priority = rep.score === 1 && coeff >= 1.25 ? 'P1' : rep.score <= 2 ? 'P2' : 'P3'

      actions.push({
        audit_id: auditId,
        priorite: priority,
        pilier: rep.pilier,
        probleme: act.probleme,
        solution: act.solution,
        gain_estime: act.gain,
        complexite: act.complexite,
        budget_indicatif: act.budget,
        delai: act.delai,
        service_optipro: act.service,
        ordre: ordre++,
      })
    }
  }

  // Sort actions by priority
  actions.sort((a, b) => {
    const pOrder = { P1: 0, P2: 1, P3: 2 }
    return (pOrder[a.priorite as keyof typeof pOrder] || 2) - (pOrder[b.priorite as keyof typeof pOrder] || 2)
  })
  actions.forEach((a, i) => (a.ordre = i))

  // 5. Calculer les heures récupérables
  const heuresRecup = reponses
    .filter((r) => r.score <= 2)
    .reduce((sum, r) => sum + (GAINS_PAR_QUESTION[r.question_id] || 0), 0)

  // 6. Nettoyer les anciennes frictions et actions
  await supabase.from('audit_frictions').delete().eq('audit_id', auditId)
  await supabase.from('audit_actions').delete().eq('audit_id', auditId)

  // 7. Insérer les nouvelles
  if (frictions.length > 0) {
    await supabase.from('audit_frictions').insert(frictions)
  }
  if (actions.length > 0) {
    await supabase.from('audit_actions').insert(actions)
  }

  // 8. Mettre à jour l'audit
  const { error: updateError } = await supabase
    .from('audits')
    .update({
      score_global: scoreGlobal,
      score_outils: pilierScores['outils'] || 0,
      score_process: pilierScores['process'] || 0,
      score_communication: pilierScores['communication'] || 0,
      score_admin: pilierScores['admin'] || 0,
      score_digital: pilierScores['digital'] || 0,
      score_automatisation: pilierScores['automatisation'] || 0,
      heures_recuperables_semaine: heuresRecup,
      statut: 'termine',
    })
    .eq('id', auditId)

  if (updateError) {
    console.error('Erreur mise à jour audit:', updateError)
    return { error: updateError.message }
  }

  revalidatePath(`/admin/audits/${auditId}`)
  revalidatePath('/admin/audits')
  redirect(`/admin/audits/${auditId}`)
}

// ── Supprimer un audit ────────────────────────────────────
export async function deleteAuditAction(auditId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Session expirée.' }
  }

  const { error } = await supabase
    .from('audits')
    .delete()
    .eq('id', auditId)

  if (error) {
    console.error('Erreur suppression audit:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/audits')
  redirect('/admin/audits')
}
