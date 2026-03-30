// OptiPro — Business Configuration
// Used in PDF generation and email sending

export const BUSINESS_CONFIG = {
  nom: 'OptiPro',
  nom_complet: 'Pierre Laurent — OptiPro',
  siret: '934 301 987 00020',
  email: 'p.laurent@opti-pro.fr',
  site: 'www.opti-pro.fr',

  // Fiscal
  statut: 'Auto-entrepreneur',
  tva_mention: 'TVA non applicable, art. 293B du CGI',
  tva_applicable: false,

  // Paiement
  delai_paiement_jours: 30,
  penalite_retard: '3 fois le taux légal en vigueur',
  indemnite_recouvrement: '40 €',

  // Devis
  devis_validite_jours: 30,
} as const
