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
