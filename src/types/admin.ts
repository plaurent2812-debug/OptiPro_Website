// ── Statuts ──────────────────────────────────────────────
export type ClientStatut = 'prospect' | 'client_actif' | 'client_inactif'
export type DevisStatut = 'brouillon' | 'envoye' | 'accepte' | 'refuse' | 'expire'
export type FactureStatut = 'brouillon' | 'envoyee' | 'payee' | 'en_retard' | 'annulee'
export type AbonnementStatut = 'actif' | 'suspendu' | 'termine'
export type DocumentUnite = 'forfait' | 'heure' | 'jour' | 'mois'
export type LigneType = 'prestation' | 'abonnement'
export type Periodicite = 'mensuel' | 'trimestriel' | 'annuel'

// ── Entités ───────────────────────────────────────────────
export interface Client {
  id: string
  created_at: string
  updated_at: string
  nom: string
  prenom: string | null
  email: string | null
  telephone: string | null
  adresse: string | null
  ville: string | null
  code_postal: string | null
  siret: string | null
  notes: string | null
  statut: ClientStatut
}

export interface DevisLigne {
  id: string
  devis_id: string
  type: LigneType
  description: string
  quantite: number
  unite: DocumentUnite
  prix_unitaire_ht: number
  montant_ht: number
  ordre: number
}

export interface Devis {
  id: string
  created_at: string
  updated_at: string
  numero: string
  client_id: string | null
  statut: DevisStatut
  date_emission: string
  date_validite: string | null
  montant_ht: number
  notes: string | null
  clients?: Client
  devis_lignes?: DevisLigne[]
}

export interface Abonnement {
  id: string
  created_at: string
  updated_at: string
  client_id: string | null
  nom: string
  description: string | null
  montant_mensuel_ht: number
  periodicite: Periodicite
  date_debut: string
  date_fin: string | null
  statut: AbonnementStatut
  prochaine_facturation: string | null
  clients?: Client
}

export interface FactureLigne {
  id: string
  facture_id: string
  description: string
  quantite: number
  prix_unitaire_ht: number
  montant_ht: number
  ordre: number
}

export interface Facture {
  id: string
  created_at: string
  updated_at: string
  numero: string
  client_id: string | null
  devis_id: string | null
  abonnement_id: string | null
  statut: FactureStatut
  date_emission: string
  date_echeance: string | null
  montant_ht: number
  notes: string | null
  date_paiement: string | null
  clients?: Client
  devis?: Devis
  abonnements?: Abonnement
  factures_lignes?: FactureLigne[]
}

// ── Helpers de formulaire ─────────────────────────────────
export interface LigneForm {
  id: string // temp id for React key
  type: LigneType
  description: string
  quantite: number
  unite: DocumentUnite
  prix_unitaire_ht: number
}

// ── Audit System ─────────────────────────────────────────
export type AuditStatut = 'en_cours' | 'termine' | 'rapport_genere' | 'presente'
export type FrictionSeverite = 'critical' | 'warning' | 'info'
export type ActionPriorite = 'P1' | 'P2' | 'P3'
export type ActionComplexite = 'simple' | 'moyen' | 'complexe'
export type BudgetIndicatif = '€' | '€€' | '€€€'
export type ServiceOptiPro = 'creation' | 'automatisation' | 'les_deux'
export type AuditPilier = 'outils' | 'process' | 'communication' | 'admin' | 'digital' | 'automatisation'

export interface Audit {
  id: string
  created_at: string
  updated_at: string
  client_id: string | null
  date_audit: string
  secteur: string | null
  effectif: string | null
  ca_annuel: string | null
  notes_generales: string | null
  score_global: number
  score_outils: number
  score_process: number
  score_communication: number
  score_admin: number
  score_digital: number
  score_automatisation: number
  statut: AuditStatut
  heures_recuperables_semaine: number
  devis_id: string | null
  clients?: Client
  audit_reponses?: AuditReponse[]
  audit_frictions?: AuditFriction[]
  audit_actions?: AuditAction[]
}

export interface AuditReponse {
  id: string
  audit_id: string
  pilier: AuditPilier
  question_id: string
  score: number
  commentaire: string | null
}

export interface AuditFriction {
  id: string
  audit_id: string
  severite: FrictionSeverite
  pilier: AuditPilier
  description: string
  impact_estime: string | null
  question_id: string | null
}

export interface AuditAction {
  id: string
  audit_id: string
  priorite: ActionPriorite
  pilier: AuditPilier
  probleme: string
  solution: string
  gain_estime: string | null
  complexite: ActionComplexite | null
  budget_indicatif: BudgetIndicatif | null
  delai: string | null
  service_optipro: ServiceOptiPro | null
  ordre: number
}
