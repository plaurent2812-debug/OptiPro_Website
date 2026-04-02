'use client'

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import type { AuditPilierKey } from '@/data/audit-grid'

// ── Register font ─────────────────────────────────────────
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf', fontWeight: 800 },
  ],
})

// Disable hyphenation (can cause crashes with some text)
Font.registerHyphenationCallback(word => [word])

const s = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Inter', fontSize: 10, color: '#1F2937' },
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: '#E5E7EB' },
  logo: { fontSize: 16, fontWeight: 800, color: '#4F46E5' },
  logoSub: { fontSize: 8, color: '#6B7280', marginTop: 2 },
  headerRight: { textAlign: 'right' },
  headerLabel: { fontSize: 8, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1 },
  headerValue: { fontSize: 11, fontWeight: 600, marginTop: 2 },
  // Title
  title: { fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#6B7280', marginBottom: 25 },
  // Score box
  scoreBox: { flexDirection: 'row', alignItems: 'center', gap: 20, marginBottom: 25, padding: 20, backgroundColor: '#F9FAFB', borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  scoreCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
  scoreValue: { fontSize: 28, fontWeight: 800 },
  scoreMax: { fontSize: 10, fontWeight: 600 },
  scoreInfo: { flex: 1 },
  scoreLabel: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  scoreDesc: { fontSize: 9, color: '#6B7280', lineHeight: 1.5 },
  // Section
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 10, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  // Pilier bars
  pilierRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  pilierLabel: { width: 150, fontSize: 9, fontWeight: 600 },
  pilierTrack: { flex: 1, height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, overflow: 'hidden' },
  pilierFill: { height: 8, borderRadius: 4 },
  pilierScore: { width: 45, textAlign: 'right', fontSize: 9, fontWeight: 700 },
  // Pilier icon circle
  pilierIcon: { width: 14, height: 14, borderRadius: 7, marginRight: 6, justifyContent: 'center', alignItems: 'center' },
  pilierIconText: { fontSize: 6, fontWeight: 800, color: 'white' },
  // Friction
  frictionRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6, paddingBottom: 6, borderBottomWidth: 0.5, borderBottomColor: '#F3F4F6' },
  frictionDot: { width: 8, height: 8, borderRadius: 4, marginTop: 2, marginRight: 8 },
  frictionContent: { flex: 1 },
  frictionDesc: { fontSize: 9, fontWeight: 600, marginBottom: 1 },
  frictionImpact: { fontSize: 8, color: '#6B7280' },
  // Action
  actionRow: { marginBottom: 8, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 6, borderWidth: 0.5, borderColor: '#E5E7EB' },
  actionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  actionPriority: { fontSize: 7, fontWeight: 800, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, color: 'white' },
  actionProblem: { fontSize: 9, fontWeight: 700, flex: 1 },
  actionSolution: { fontSize: 8, color: '#4B5563', marginBottom: 4, paddingLeft: 8, borderLeftWidth: 2, borderLeftColor: '#E5E7EB' },
  actionMeta: { flexDirection: 'row', gap: 8 },
  actionBadge: { fontSize: 7, color: '#6B7280', backgroundColor: '#F3F4F6', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2 },
  // Gains
  gainsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  gainBox: { flex: 1, textAlign: 'center', padding: 12, backgroundColor: '#F0FDF4', borderRadius: 8 },
  gainValue: { fontSize: 18, fontWeight: 800, color: '#059669' },
  gainLabel: { fontSize: 7, color: '#6B7280', marginTop: 3 },
  // Footer
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  footerText: { fontSize: 7, color: '#9CA3AF' },
  // Page break hint
  pageBreak: { marginTop: 10 },
})

const PILIER_COLORS: Record<AuditPilierKey, string> = {
  outils: '#6366F1',
  process: '#F59E0B',
  communication: '#10B981',
  admin: '#3B82F6',
  digital: '#EC4899',
  automatisation: '#F97316',
}

// NOTE: No emojis! @react-pdf/renderer cannot render emoji glyphs
const PILIER_DISPLAY: Record<AuditPilierKey, { label: string; abbr: string }> = {
  outils: { label: 'Outils & Logiciels', abbr: 'OL' },
  process: { label: 'Process & Organisation', abbr: 'PO' },
  communication: { label: 'Communication & Relances', abbr: 'CR' },
  admin: { label: 'Gestion Administrative', abbr: 'GA' },
  digital: { label: 'Presence Digitale', abbr: 'PD' },
  automatisation: { label: 'Automatisation', abbr: 'AU' },
}

const SCORE_LEVELS = [
  { min: 0, max: 2.9, label: 'Critique', color: '#EF4444' },
  { min: 3, max: 4.9, label: 'Preoccupant', color: '#F59E0B' },
  { min: 5, max: 6.9, label: 'Moyen', color: '#EAB308' },
  { min: 7, max: 8.4, label: 'Bon', color: '#22C55E' },
  { min: 8.5, max: 10, label: 'Excellent', color: '#3B82F6' },
]

function getLevel(score: number) {
  return SCORE_LEVELS.find(l => score >= l.min && score <= l.max) || SCORE_LEVELS[0]
}

// Helper: format number with space thousands separator (avoids locale issues)
function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

interface AuditReportPDFProps {
  audit: any
  client: any
  frictions: any[]
  actions: any[]
  pilierScores: Record<AuditPilierKey, number>
}

export default function AuditReportPDF({ audit, client, frictions, actions, pilierScores }: AuditReportPDFProps) {
  const level = getLevel(audit.score_global || 0)
  const heuresSemaine = audit.heures_recuperables_semaine || 0
  const heuresAn = heuresSemaine * 47
  const valorisation = Math.round(heuresAn * 35)

  const dateStr = new Date(audit.date_audit).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const clientName = client?.entreprise || `${client?.prenom || ''} ${client?.nom || ''}`.trim()

  return (
    <Document>
      {/* PAGE 1: Score + Piliers */}
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.logo}>OptiPro</Text>
            <Text style={s.logoSub}>Audit - Developpement - Automatisation</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.headerLabel}>Rapport d'audit</Text>
            <Text style={s.headerValue}>{dateStr}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={s.title}>{clientName}</Text>
        <Text style={s.subtitle}>
          {audit.secteur && `${audit.secteur} - `}
          {audit.effectif && `${audit.effectif} pers. - `}
          Audit realise par Pierre Laurent
        </Text>

        {/* Score global */}
        <View style={s.scoreBox}>
          <View style={[s.scoreCircle, { backgroundColor: `${level.color}20`, borderWidth: 3, borderColor: level.color }]}>
            <Text style={[s.scoreValue, { color: level.color }]}>{(audit.score_global || 0).toFixed(1)}</Text>
            <Text style={[s.scoreMax, { color: level.color }]}>/10</Text>
          </View>
          <View style={s.scoreInfo}>
            <Text style={[s.scoreLabel, { color: level.color }]}>Niveau : {level.label}</Text>
            <Text style={s.scoreDesc}>
              {"Ce score reflete l'efficacite operationnelle globale de votre entreprise, evaluee sur 6 piliers ponderes : outils, process, communication, gestion, presence digitale et automatisation."}
            </Text>
          </View>
        </View>

        {/* Scores par pilier */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Detail par pilier</Text>
          {(Object.keys(PILIER_DISPLAY) as AuditPilierKey[]).map(key => {
            const score = pilierScores[key] || 0
            const color = PILIER_COLORS[key]
            const pilier = PILIER_DISPLAY[key]
            return (
              <View key={key} style={s.pilierRow}>
                <View style={[s.pilierIcon, { backgroundColor: color }]}>
                  <Text style={s.pilierIconText}>{pilier.abbr}</Text>
                </View>
                <Text style={s.pilierLabel}>{pilier.label}</Text>
                <View style={s.pilierTrack}>
                  <View style={[s.pilierFill, { width: `${score * 10}%`, backgroundColor: color }]} />
                </View>
                <Text style={[s.pilierScore, { color }]}>{score.toFixed(1)}/10</Text>
              </View>
            )
          })}
        </View>

        {/* Gains */}
        {heuresSemaine > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Estimation des gains</Text>
            <View style={s.gainsRow}>
              <View style={s.gainBox}>
                <Text style={s.gainValue}>{heuresSemaine}h</Text>
                <Text style={s.gainLabel}>recuperables / semaine</Text>
              </View>
              <View style={s.gainBox}>
                <Text style={s.gainValue}>{Math.round(heuresAn)}h</Text>
                <Text style={s.gainLabel}>soit ~{Math.round(heuresAn / 7)} jours / an</Text>
              </View>
              <View style={s.gainBox}>
                <Text style={s.gainValue}>{formatNumber(valorisation)}EUR</Text>
                <Text style={s.gainLabel}>valorisation annuelle</Text>
              </View>
            </View>
          </View>
        )}

        <View style={s.footer}>
          <Text style={s.footerText}>OptiPro - opti-pro.fr - p.laurent@opti-pro.fr</Text>
          <Text style={s.footerText}>Page 1/2</Text>
        </View>
      </Page>

      {/* PAGE 2: Frictions + Plan d'action */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.logo}>OptiPro</Text>
            <Text style={s.logoSub}>Rapport d'audit - {clientName}</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.headerValue}>{dateStr}</Text>
          </View>
        </View>

        {/* Points de friction */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Points de friction identifies ({frictions.length})</Text>
          {frictions.map((f: any, i: number) => (
            <View key={i} style={s.frictionRow}>
              <View style={[s.frictionDot, {
                backgroundColor: f.severite === 'critical' ? '#EF4444' : f.severite === 'warning' ? '#F59E0B' : '#3B82F6',
              }]} />
              <View style={s.frictionContent}>
                <Text style={s.frictionDesc}>{f.description}</Text>
                {f.impact_estime && <Text style={s.frictionImpact}>Impact : {f.impact_estime}</Text>}
              </View>
            </View>
          ))}
        </View>

        {/* Plan d'action */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Plan d'action recommande ({actions.length})</Text>
          {actions.map((a: any, i: number) => {
            const bgColor = a.priorite === 'P1' ? '#EF4444' : a.priorite === 'P2' ? '#F59E0B' : '#3B82F6'
            return (
              <View key={i} style={s.actionRow}>
                <View style={s.actionHeader}>
                  <Text style={[s.actionPriority, { backgroundColor: bgColor }]}>{a.priorite}</Text>
                  <Text style={s.actionProblem}>{a.probleme}</Text>
                </View>
                <Text style={s.actionSolution}>{"-> "}{a.solution}</Text>
                <View style={s.actionMeta}>
                  {a.gain_estime && <Text style={s.actionBadge}>Gain: {a.gain_estime}</Text>}
                  {a.delai && <Text style={s.actionBadge}>Delai: {a.delai}</Text>}
                  {a.budget_indicatif && <Text style={s.actionBadge}>Budget: {a.budget_indicatif}</Text>}
                </View>
              </View>
            )
          })}
        </View>

        {/* Prochaines étapes */}
        <View style={[s.section, { padding: 15, backgroundColor: '#EEF2FF', borderRadius: 8, borderWidth: 1, borderColor: '#C7D2FE' }]}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: '#312E81', marginBottom: 6 }}>Prochaines etapes</Text>
          <Text style={{ fontSize: 9, color: '#4338CA', lineHeight: 1.6 }}>
            {"1. Rendez-vous de restitution pour parcourir ce rapport ensemble\n2. Choix des priorites et validation du perimetre\n3. Devis sur mesure base sur les actions retenues\n4. Lancement du projet - un interlocuteur unique du debut a la fin"}
          </Text>
        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>OptiPro - opti-pro.fr - p.laurent@opti-pro.fr</Text>
          <Text style={s.footerText}>Page 2/2</Text>
        </View>
      </Page>
    </Document>
  )
}
