// ============================================================
// OptiPro — Grille d'audit complète
// Définit les 6 piliers, questions, et la logique de scoring
// ============================================================

export type AuditPilierKey = 'outils' | 'process' | 'communication' | 'admin' | 'digital' | 'automatisation'

export interface AuditOption {
  label: string
  score: number
}

export interface AuditQuestion {
  id: string
  text: string
  options: AuditOption[]
}

export interface AuditPilierDef {
  key: AuditPilierKey
  label: string
  icon: string
  description: string
  coefficient: number
  questions: AuditQuestion[]
}

// ── Points de friction auto-générés ─────────────────────
export interface FrictionTemplate {
  questionId: string
  maxScore: number // Score ≤ ce seuil pour déclencher la friction
  description: string
  impact: string
  severite: 'critical' | 'warning'
}

// ── Recommandations automatiques ────────────────────────
export interface ActionTemplate {
  questionId: string
  maxScore: number
  probleme: string
  solution: string
  gain: string
  complexite: 'simple' | 'moyen' | 'complexe'
  budget: '€' | '€€' | '€€€'
  delai: string
  service: 'creation' | 'automatisation' | 'les_deux'
}

// ============================================================
// GRILLE D'AUDIT — 6 PILIERS
// ============================================================

export const AUDIT_PILIERS: AuditPilierDef[] = [
  {
    key: 'outils',
    label: 'Outils & Logiciels',
    icon: '🔧',
    description: 'Évalue l\'adéquation et l\'efficacité de vos outils numériques',
    coefficient: 1.5,
    questions: [
      {
        id: '1.1',
        text: 'Comment créez-vous vos devis ?',
        options: [
          { label: 'Word / papier', score: 1 },
          { label: 'Excel', score: 2 },
          { label: 'Logiciel basique', score: 3 },
          { label: 'Outil dédié', score: 4 },
          { label: 'Automatisé', score: 5 },
        ],
      },
      {
        id: '1.2',
        text: 'Comment suivez-vous vos clients ?',
        options: [
          { label: 'Carnet / mémoire', score: 1 },
          { label: 'Tableur', score: 2 },
          { label: 'CRM basique', score: 3 },
          { label: 'CRM complet', score: 4 },
          { label: 'CRM + automatisations', score: 5 },
        ],
      },
      {
        id: '1.3',
        text: 'Comment gérez-vous votre planning / agenda ?',
        options: [
          { label: 'Papier', score: 1 },
          { label: 'Agenda perso', score: 2 },
          { label: 'Google/Outlook basique', score: 3 },
          { label: 'Outil planning pro', score: 4 },
          { label: 'Planning connecté', score: 5 },
        ],
      },
      {
        id: '1.4',
        text: 'Combien d\'outils différents utilisez-vous au quotidien ?',
        options: [
          { label: '8+ non connectés', score: 1 },
          { label: '6-7 outils', score: 2 },
          { label: '4-5 outils', score: 3 },
          { label: '2-3 bien intégrés', score: 4 },
          { label: 'Suite unifiée', score: 5 },
        ],
      },
      {
        id: '1.5',
        text: 'Vos outils sont-ils adaptés à votre métier spécifique ?',
        options: [
          { label: 'Pas du tout', score: 1 },
          { label: 'Peu adaptés', score: 2 },
          { label: 'Partiellement', score: 3 },
          { label: 'Bien adaptés', score: 4 },
          { label: 'Parfaitement', score: 5 },
        ],
      },
    ],
  },
  {
    key: 'process',
    label: 'Process & Organisation',
    icon: '⚙️',
    description: 'Évalue la structure et l\'efficacité de vos processus quotidiens',
    coefficient: 1.5,
    questions: [
      {
        id: '2.1',
        text: 'Quel est votre processus pour traiter un nouveau prospect ?',
        options: [
          { label: 'Aucun process', score: 1 },
          { label: 'Informel', score: 2 },
          { label: 'Steps identifiés', score: 3 },
          { label: 'Process documenté', score: 4 },
          { label: 'Automatisé', score: 5 },
        ],
      },
      {
        id: '2.2',
        text: 'Combien de temps passez-vous sur l\'admin par semaine ?',
        options: [
          { label: '15h+', score: 1 },
          { label: '10-15h', score: 2 },
          { label: '5-10h', score: 3 },
          { label: '2-5h', score: 4 },
          { label: 'Moins de 2h', score: 5 },
        ],
      },
      {
        id: '2.3',
        text: 'Avez-vous des tâches que vous oubliez régulièrement ?',
        options: [
          { label: 'Tout le temps', score: 1 },
          { label: 'Souvent', score: 2 },
          { label: 'Parfois', score: 3 },
          { label: 'Rarement', score: 4 },
          { label: 'Jamais', score: 5 },
        ],
      },
      {
        id: '2.4',
        text: 'Comment stockez-vous vos documents (devis, factures, contrats) ?',
        options: [
          { label: 'En vrac', score: 1 },
          { label: 'Dossiers basiques', score: 2 },
          { label: 'Cloud non organisé', score: 3 },
          { label: 'GED organisée', score: 4 },
          { label: 'GED + auto-classement', score: 5 },
        ],
      },
      {
        id: '2.5',
        text: 'Vos process sont-ils documentés / transmissibles ?',
        options: [
          { label: 'Tout est dans ma tête', score: 1 },
          { label: 'Notes éparses', score: 2 },
          { label: 'Partiellement documentés', score: 3 },
          { label: 'Documentation complète', score: 4 },
          { label: 'Procédures + formation', score: 5 },
        ],
      },
    ],
  },
  {
    key: 'communication',
    label: 'Communication & Relances',
    icon: '📞',
    description: 'Évalue votre gestion de la relation client et des relances',
    coefficient: 1.25,
    questions: [
      {
        id: '3.1',
        text: 'Comment relancez-vous vos devis en attente ?',
        options: [
          { label: 'Je ne relance pas', score: 1 },
          { label: 'Quand j\'y pense', score: 2 },
          { label: 'Manuellement / régulier', score: 3 },
          { label: 'Rappels automatiques', score: 4 },
          { label: 'Workflow complet', score: 5 },
        ],
      },
      {
        id: '3.2',
        text: 'Comment gérez-vous les impayés ?',
        options: [
          { label: 'Je ne fais rien', score: 1 },
          { label: 'Relance manuelle tardive', score: 2 },
          { label: 'Process mais manuel', score: 3 },
          { label: 'Relances automatiques', score: 4 },
          { label: 'Automatisé + escalade', score: 5 },
        ],
      },
      {
        id: '3.3',
        text: 'Comment communiquez-vous avec vos clients ?',
        options: [
          { label: 'Uniquement téléphone', score: 1 },
          { label: 'Tel + email basique', score: 2 },
          { label: 'Multi-canal', score: 3 },
          { label: 'Espace client', score: 4 },
          { label: 'Portail + notifs auto', score: 5 },
        ],
      },
      {
        id: '3.4',
        text: 'Vos clients peuvent-ils suivre l\'avancement de leur projet ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Sur demande', score: 2 },
          { label: 'Emails ponctuels', score: 3 },
          { label: 'Espace basique', score: 4 },
          { label: 'Portail temps réel', score: 5 },
        ],
      },
    ],
  },
  {
    key: 'admin',
    label: 'Gestion Administrative',
    icon: '📋',
    description: 'Évalue votre gestion comptable, fiscale et administrative',
    coefficient: 1.0,
    questions: [
      {
        id: '4.1',
        text: 'Comment gérez-vous votre facturation ?',
        options: [
          { label: 'Papier / Word', score: 1 },
          { label: 'Excel', score: 2 },
          { label: 'Logiciel basique', score: 3 },
          { label: 'Logiciel complet', score: 4 },
          { label: 'Auto + sync comptable', score: 5 },
        ],
      },
      {
        id: '4.2',
        text: 'Comment transmettez-vous vos données au comptable ?',
        options: [
          { label: 'Boîte à chaussures', score: 1 },
          { label: 'Email en vrac', score: 2 },
          { label: 'Export ponctuel', score: 3 },
          { label: 'Sync régulière', score: 4 },
          { label: 'Temps réel (Pennylane)', score: 5 },
        ],
      },
      {
        id: '4.3',
        text: 'Avez-vous une vision claire de votre CA en temps réel ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Approximative', score: 2 },
          { label: 'Mensuelle', score: 3 },
          { label: 'Hebdomadaire', score: 4 },
          { label: 'Tableau de bord temps réel', score: 5 },
        ],
      },
      {
        id: '4.4',
        text: 'Générez-vous des CGV / mentions légales conformes ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Copier-collé', score: 2 },
          { label: 'Template', score: 3 },
          { label: 'Validé par un pro', score: 4 },
          { label: 'Auto-intégré + à jour', score: 5 },
        ],
      },
    ],
  },
  {
    key: 'digital',
    label: 'Présence Digitale',
    icon: '🌐',
    description: 'Évalue votre visibilité et votre présence en ligne',
    coefficient: 1.0,
    questions: [
      {
        id: '5.1',
        text: 'Avez-vous un site internet ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Page Facebook uniquement', score: 2 },
          { label: 'Site vieillissant', score: 3 },
          { label: 'Site correct', score: 4 },
          { label: 'Site pro + optimisé', score: 5 },
        ],
      },
      {
        id: '5.2',
        text: 'Votre site est-il adapté au mobile ?',
        options: [
          { label: 'Pas de site', score: 1 },
          { label: 'Non responsive', score: 2 },
          { label: 'Partiellement', score: 3 },
          { label: 'Responsive', score: 4 },
          { label: 'Mobile-first', score: 5 },
        ],
      },
      {
        id: '5.3',
        text: 'Apparaissez-vous sur Google quand on cherche votre métier + ville ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Page 5+', score: 2 },
          { label: 'Page 2-3', score: 3 },
          { label: 'Page 1', score: 4 },
          { label: 'Top 3 + Google Maps', score: 5 },
        ],
      },
      {
        id: '5.4',
        text: 'Avez-vous un profil Google Business optimisé ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Créé mais vide', score: 2 },
          { label: 'Basique', score: 3 },
          { label: 'Complet + avis', score: 4 },
          { label: 'Optimisé + posts réguliers', score: 5 },
        ],
      },
      {
        id: '5.5',
        text: 'Collectez-vous des avis clients en ligne ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Rarement', score: 2 },
          { label: 'Parfois', score: 3 },
          { label: 'Régulièrement', score: 4 },
          { label: 'Automatisé', score: 5 },
        ],
      },
    ],
  },
  {
    key: 'automatisation',
    label: 'Automatisation',
    icon: '⚡',
    description: 'Évalue le niveau d\'automatisation et d\'intégration de vos outils',
    coefficient: 0.75,
    questions: [
      {
        id: '6.1',
        text: 'Vos outils se parlent-ils entre eux ?',
        options: [
          { label: 'Aucune connexion', score: 1 },
          { label: '1-2 connexions manuelles', score: 2 },
          { label: 'Quelques intégrations', score: 3 },
          { label: 'Bien connectés', score: 4 },
          { label: 'Écosystème fluide', score: 5 },
        ],
      },
      {
        id: '6.2',
        text: 'Avez-vous des tâches qui pourraient être automatisées ?',
        options: [
          { label: 'Tout est manuel', score: 1 },
          { label: 'Beaucoup', score: 2 },
          { label: 'Quelques-unes', score: 3 },
          { label: 'Peu', score: 4 },
          { label: 'Quasi rien', score: 5 },
        ],
      },
      {
        id: '6.3',
        text: 'Utilisez-vous des notifications / alertes automatiques ?',
        options: [
          { label: 'Non', score: 1 },
          { label: 'Emails basiques', score: 2 },
          { label: 'Quelques alertes', score: 3 },
          { label: 'Alertes structurées', score: 4 },
          { label: 'Système intelligent', score: 5 },
        ],
      },
      {
        id: '6.4',
        text: 'Combien de fois re-saisissez-vous la même information ?',
        options: [
          { label: 'Constamment', score: 1 },
          { label: 'Souvent', score: 2 },
          { label: 'Parfois', score: 3 },
          { label: 'Rarement', score: 4 },
          { label: 'Jamais', score: 5 },
        ],
      },
    ],
  },
]

// ============================================================
// FRICTION TEMPLATES — Auto-détection
// ============================================================

export const FRICTION_TEMPLATES: FrictionTemplate[] = [
  { questionId: '1.1', maxScore: 1, description: 'Devis manuels sur Word/papier — ~45min/devis', impact: '5-8h/semaine', severite: 'critical' },
  { questionId: '1.1', maxScore: 2, description: 'Devis sur Excel — erreurs fréquentes et temps perdu', impact: '3-5h/semaine', severite: 'warning' },
  { questionId: '1.2', maxScore: 1, description: 'Suivi clients sur papier/mémoire — prospects perdus', impact: '3-5h/semaine', severite: 'critical' },
  { questionId: '1.2', maxScore: 2, description: 'Suivi clients sur tableur — limité et fragile', impact: '2-3h/semaine', severite: 'warning' },
  { questionId: '1.4', maxScore: 2, description: 'Trop d\'outils non connectés — temps perdu en jonglage', impact: '2-4h/semaine', severite: 'warning' },
  { questionId: '1.5', maxScore: 2, description: 'Outils inadaptés au métier — frustration et inefficacité', impact: 'Variable', severite: 'warning' },
  { questionId: '2.2', maxScore: 1, description: 'Plus de 15h/semaine sur l\'admin — urgence', impact: '15h/semaine', severite: 'critical' },
  { questionId: '2.2', maxScore: 2, description: '10-15h/semaine sur l\'admin — trop de temps perdu', impact: '10-15h/semaine', severite: 'warning' },
  { questionId: '2.3', maxScore: 2, description: 'Tâches oubliées régulièrement — impact client', impact: 'Satisfaction client', severite: 'warning' },
  { questionId: '2.5', maxScore: 1, description: 'Aucune documentation des process — risque de perte de savoir', impact: 'Critique si absence', severite: 'critical' },
  { questionId: '3.1', maxScore: 1, description: 'Aucune relance de devis — CA perdu', impact: '20-40% du CA potentiel', severite: 'critical' },
  { questionId: '3.1', maxScore: 2, description: 'Relances irrégulières — CA sous-optimisé', impact: '10-20% CA', severite: 'warning' },
  { questionId: '3.2', maxScore: 1, description: 'Impayés non gérés — trésorerie en danger', impact: 'Trésorerie', severite: 'critical' },
  { questionId: '3.2', maxScore: 2, description: 'Relances impayés tardives et manuelles', impact: 'Trésorerie fragile', severite: 'warning' },
  { questionId: '4.1', maxScore: 2, description: 'Facturation manuelle — erreurs et retards', impact: '3-5h/semaine', severite: 'warning' },
  { questionId: '4.2', maxScore: 2, description: 'Transmission comptable désorganisée', impact: '2-3h/semaine', severite: 'warning' },
  { questionId: '4.3', maxScore: 2, description: 'Pas de visibilité sur le CA — pilotage à l\'aveugle', impact: 'Décisions retardées', severite: 'warning' },
  { questionId: '5.1', maxScore: 1, description: 'Pas de site internet — invisibilité totale', impact: 'Visibilité = 0', severite: 'critical' },
  { questionId: '5.1', maxScore: 2, description: 'Page Facebook uniquement — absence de site pro', impact: 'Crédibilité', severite: 'warning' },
  { questionId: '5.3', maxScore: 2, description: 'Introuvable sur Google — perte de prospects', impact: 'Prospects perdus', severite: 'warning' },
  { questionId: '5.4', maxScore: 2, description: 'Pas de fiche Google Business — SEO local absent', impact: 'Visibilité locale', severite: 'warning' },
  { questionId: '6.4', maxScore: 1, description: 'Re-saisie constante des données — double/triple travail', impact: '3-5h/semaine', severite: 'critical' },
  { questionId: '6.4', maxScore: 2, description: 'Re-saisie fréquente — erreurs et temps perdu', impact: '2-3h/semaine', severite: 'warning' },
]

// ============================================================
// ACTION TEMPLATES — Recommandations auto-générées
// ============================================================

export const ACTION_TEMPLATES: ActionTemplate[] = [
  {
    questionId: '1.1', maxScore: 2,
    probleme: 'Création de devis manuelle et chronophage',
    solution: 'Mise en place d\'un outil de devis automatisé / application sur mesure',
    gain: '5-8h/semaine', complexite: 'moyen', budget: '€€', delai: '2-4 semaines', service: 'creation',
  },
  {
    questionId: '1.2', maxScore: 2,
    probleme: 'Pas de suivi client structuré',
    solution: 'Déploiement d\'un CRM adapté à votre métier',
    gain: '3-5h/semaine', complexite: 'moyen', budget: '€€', delai: '2-4 semaines', service: 'creation',
  },
  {
    questionId: '1.4', maxScore: 2,
    probleme: 'Trop d\'outils non interconnectés',
    solution: 'Consolidation et intégration des outils existants',
    gain: '2-4h/semaine', complexite: 'moyen', budget: '€€', delai: '2-6 semaines', service: 'automatisation',
  },
  {
    questionId: '2.2', maxScore: 2,
    probleme: 'Temps excessif passé sur l\'administratif',
    solution: 'Plan de transformation complète : automatisation des tâches admin récurrentes',
    gain: '10h+/semaine', complexite: 'complexe', budget: '€€€', delai: '1-3 mois', service: 'les_deux',
  },
  {
    questionId: '2.5', maxScore: 2,
    probleme: 'Aucune documentation des processus',
    solution: 'Documentation et création de procédures standardisées',
    gain: 'Résilience de l\'entreprise', complexite: 'simple', budget: '€', delai: '1-2 semaines', service: 'creation',
  },
  {
    questionId: '3.1', maxScore: 2,
    probleme: 'Pas de système de relance des devis',
    solution: 'Workflow de relance automatique (email / SMS)',
    gain: '+20-40% de taux de conversion', complexite: 'simple', budget: '€', delai: '1-2 semaines', service: 'automatisation',
  },
  {
    questionId: '3.2', maxScore: 2,
    probleme: 'Impayés non relancés efficacement',
    solution: 'Automatisation des relances impayés avec escalade',
    gain: 'Trésorerie sécurisée', complexite: 'simple', budget: '€', delai: '1-2 semaines', service: 'automatisation',
  },
  {
    questionId: '4.1', maxScore: 2,
    probleme: 'Facturation encore manuelle',
    solution: 'Outil de facturation automatisé avec sync comptable',
    gain: '3-5h/semaine', complexite: 'moyen', budget: '€€', delai: '2-4 semaines', service: 'creation',
  },
  {
    questionId: '4.2', maxScore: 2,
    probleme: 'Transmission comptable désorganisée',
    solution: 'Synchronisation automatique avec le comptable (Pennylane)',
    gain: '2-3h/semaine', complexite: 'simple', budget: '€', delai: '1-2 semaines', service: 'automatisation',
  },
  {
    questionId: '5.1', maxScore: 2,
    probleme: 'Absence de site internet professionnel',
    solution: 'Création d\'un site vitrine responsive + SEO local',
    gain: 'Visibilité + crédibilité', complexite: 'moyen', budget: '€€', delai: '2-4 semaines', service: 'creation',
  },
  {
    questionId: '5.4', maxScore: 2,
    probleme: 'Fiche Google Business absente ou non optimisée',
    solution: 'Création et optimisation de la fiche Google Business',
    gain: 'SEO local + avis', complexite: 'simple', budget: '€', delai: '1 semaine', service: 'creation',
  },
  {
    questionId: '6.1', maxScore: 2,
    probleme: 'Outils non connectés entre eux',
    solution: 'Intégrations et synchronisations entre vos outils',
    gain: '2-4h/semaine', complexite: 'moyen', budget: '€€', delai: '2-4 semaines', service: 'automatisation',
  },
  {
    questionId: '6.4', maxScore: 2,
    probleme: 'Re-saisie manuelle des données',
    solution: 'Automatisation des flux de données entre outils',
    gain: '3-5h/semaine', complexite: 'moyen', budget: '€€', delai: '2-4 semaines', service: 'automatisation',
  },
]

// ============================================================
// GAINS ESTIMÉS PAR QUESTION (en heures/semaine)
// ============================================================

export const GAINS_PAR_QUESTION: Record<string, number> = {
  '1.1': 6,
  '1.2': 4,
  '1.3': 1,
  '1.4': 3,
  '1.5': 2,
  '2.1': 1,
  '2.2': 8,
  '2.3': 2,
  '2.4': 1,
  '2.5': 1,
  '3.1': 2,
  '3.2': 2,
  '3.3': 1,
  '3.4': 0,
  '4.1': 4,
  '4.2': 2,
  '4.3': 1,
  '4.4': 0,
  '5.1': 0,
  '5.2': 0,
  '5.3': 0,
  '5.4': 0,
  '5.5': 0,
  '6.1': 3,
  '6.2': 2,
  '6.3': 1,
  '6.4': 3,
}

// ============================================================
// HELPERS
// ============================================================

export const PILIER_LABELS: Record<AuditPilierKey, string> = {
  outils: 'Outils & Logiciels',
  process: 'Process & Organisation',
  communication: 'Communication & Relances',
  admin: 'Gestion Administrative',
  digital: 'Présence Digitale',
  automatisation: 'Automatisation',
}

export const PILIER_COLORS: Record<AuditPilierKey, string> = {
  outils: '#6366F1',
  process: '#F59E0B',
  communication: '#10B981',
  admin: '#3B82F6',
  digital: '#EC4899',
  automatisation: '#F97316',
}

export const SCORE_LEVELS = [
  { min: 0, max: 2.9, label: 'Critique', color: '#EF4444', emoji: '🔴' },
  { min: 3, max: 4.9, label: 'Préoccupant', color: '#F59E0B', emoji: '🟠' },
  { min: 5, max: 6.9, label: 'Moyen', color: '#EAB308', emoji: '🟡' },
  { min: 7, max: 8.4, label: 'Bon', color: '#22C55E', emoji: '🟢' },
  { min: 8.5, max: 10, label: 'Excellent', color: '#3B82F6', emoji: '🔵' },
] as const

export function getScoreLevel(score: number) {
  return SCORE_LEVELS.find(l => score >= l.min && score <= l.max) || SCORE_LEVELS[0]
}

export function getTotalQuestions(): number {
  return AUDIT_PILIERS.reduce((sum, p) => sum + p.questions.length, 0)
}
