// Utilitaires partagés pour l'admin OptiPro

export function formatMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(montant)
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export function generateDevisNumero(existingCount: number): string {
  const year = new Date().getFullYear()
  const seq = String(existingCount + 1).padStart(3, '0')
  return `DEV-${year}-${seq}`
}

export function generateFactureNumero(existingCount: number): string {
  const year = new Date().getFullYear()
  const seq = String(existingCount + 1).padStart(3, '0')
  return `FAC-${year}-${seq}`
}

// Libellés lisibles pour les statuts
export const CLIENT_STATUT_LABELS: Record<string, string> = {
  prospect: 'Prospect',
  client_actif: 'Client actif',
  client_inactif: 'Client inactif',
}

export const DEVIS_STATUT_LABELS: Record<string, string> = {
  brouillon: 'Brouillon',
  envoye: 'Envoyé',
  accepte: 'Accepté',
  refuse: 'Refusé',
  expire: 'Expiré',
  archive: 'Archivé',
}

export const FACTURE_STATUT_LABELS: Record<string, string> = {
  brouillon: 'Brouillon',
  envoyee: 'Envoyée',
  payee: 'Payée',
  en_retard: 'En retard',
  annulee: 'Annulée',
}

export const ABONNEMENT_STATUT_LABELS: Record<string, string> = {
  actif: 'Actif',
  suspendu: 'Suspendu',
  termine: 'Terminé',
}

export const PERIODICITE_LABELS: Record<string, string> = {
  mensuel: 'Mensuel',
  trimestriel: 'Trimestriel',
  annuel: 'Annuel',
}

export const UNITE_LABELS: Record<string, string> = {
  forfait: 'Forfait',
  heure: 'Heure',
  jour: 'Jour',
  mois: 'Mois',
}

export const AUDIT_STATUT_LABELS: Record<string, string> = {
  en_cours: 'En cours',
  termine: 'Terminé',
  rapport_genere: 'Rapport généré',
  presente: 'Présenté',
}

export function generateAuditNumero(existingCount: number): string {
  const year = new Date().getFullYear()
  const seq = String(existingCount + 1).padStart(3, '0')
  return `AUD-${year}-${seq}`
}
