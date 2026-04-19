export interface Offer {
  id: string;
  name: string;
  description: string;
  price: string;
  delay?: string;
  features: string[];
}

export interface OfferCategory {
  id: 'artisans' | 'tpe' | 'projets';
  icon: string;
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
  offers: Offer[];
  ctaLabel: string;
  ctaHref: string;
}

export const offerCategories: OfferCategory[] = [
  {
    id: 'artisans',
    icon: '🔧',
    tagline: 'Pour les indépendants',
    title: 'Artisans & commerçants',
    subtitle: 'Des outils simples, livrés rapidement.',
    description:
      'Vous êtes seul ou à quelques personnes. Vous avez besoin de visibilité et de gagner du temps sur l\'admin, sans vous lancer dans un gros projet.',
    offers: [
      {
        id: 'pack-visibilite',
        name: 'Pack Visibilité',
        description: 'Pour exister en ligne proprement et capter les clients qui cherchent sur Google.',
        price: '690 € HT',
        delay: '3-5 jours',
        features: [
          'Fiche Google Business optimisée',
          'Mini-site 1 page (présentation, contact, horaires)',
          'Formation 1h pour gérer votre fiche',
        ],
      },
      {
        id: 'sheets-devis',
        name: 'Sheets Devis / Factures',
        description: 'Un fichier prêt à l\'emploi pour ne plus jamais refaire un devis à la main.',
        price: '290 € HT',
        delay: '2-3 jours',
        features: [
          'Modèles de devis et factures personnalisés',
          'Calculs automatiques (HT / TVA / TTC)',
          'Suivi des paiements intégré',
          'Formation à l\'utilisation',
        ],
      },
      {
        id: 'bot-telegram',
        name: 'Bot Telegram Notifs',
        description: 'Recevez une notification sur votre téléphone à chaque événement important.',
        price: '190 € HT',
        delay: '1-2 jours',
        features: [
          'Nouvelle demande de contact sur votre site',
          'Paiement reçu',
          'Rappel de devis à envoyer',
          'Configuration sur mesure',
        ],
      },
      {
        id: 'formation-1h',
        name: 'Formation ponctuelle',
        description: 'Une heure en visio sur le sujet de votre choix.',
        price: '90 € HT',
        delay: '1h visio',
        features: [
          'Fiche Google, gestion admin, prise en main outil',
          'Bases de l\'IA pour le quotidien',
          'Au choix selon votre besoin',
        ],
      },
    ],
    ctaLabel: 'Parler de mon besoin',
    ctaHref: '/contact?cible=artisans',
  },
  {
    id: 'tpe',
    icon: '🏢',
    tagline: 'Pour les TPE structurées',
    title: 'TPE & PME',
    subtitle: 'Des outils pros, pensés pour votre métier.',
    description:
      'Vous avez une équipe, des process qui s\'alourdissent, et vous voulez structurer sans tout casser. Chaque outil est construit sur mesure.',
    offers: [
      {
        id: 'site-pro',
        name: 'Site vitrine pro',
        description: 'Un vrai site sur mesure, pas un template. Pensé comme un outil commercial.',
        price: 'à partir de 2 400 € HT',
        delay: '2-3 semaines',
        features: [
          '3-5 pages, design unique, responsive',
          'SEO local + fiche Google optimisée',
          'Formulaire de contact intelligent',
          'Formation 2h incluse',
        ],
      },
      {
        id: 'sheets-pro',
        name: 'Sheets automatisé pro',
        description: 'Un fichier métier avec des automatisations avancées (formules, scripts, liaisons).',
        price: '590 € - 890 € HT',
        delay: '3-5 jours',
        features: [
          'Devis, factures, suivi clients, indicateurs',
          'Scripts et automatisations avancées',
          'Documentation personnalisée',
        ],
      },
      {
        id: 'bot-telegram-pro',
        name: 'Bot Telegram avancé',
        description: 'Bien plus que des notifs : interagir avec vos outils depuis votre téléphone.',
        price: '390 € - 590 € HT',
        delay: '2-4 jours',
        features: [
          'Créer un devis depuis Telegram',
          'Recevoir un rapport quotidien automatisé',
          'Actions personnalisées selon votre métier',
        ],
      },
      {
        id: 'formation-pro',
        name: 'Formation sur mesure',
        description: 'Une heure ou plus sur l\'usage pro de l\'IA ou sur un outil livré.',
        price: '120 € - 220 € HT',
        delay: '1h ou 2h visio',
        features: [
          'IA pour votre métier (prompts, outils)',
          'Prise en main complète d\'un outil livré',
          'Documentation personnalisée',
        ],
      },
    ],
    ctaLabel: 'Discuter de mon projet',
    ctaHref: '/contact?cible=tpe',
  },
  {
    id: 'projets',
    icon: '🚀',
    tagline: 'Projets structurants',
    title: 'Projets sur mesure',
    subtitle: 'Pour les transformations complètes.',
    description:
      'Site complet avec espace client, web app, intégrations API, automatisations multi-outils. Des projets ambitieux qui demandent un vrai cadrage.',
    offers: [
      {
        id: 'audit',
        name: 'Audit approfondi',
        description: 'Avant tout devis complexe, on cadre le projet ensemble. Cet audit est déduit si la mission est signée.',
        price: '490 € HT',
        delay: '1 semaine',
        features: [
          '3-4h d\'analyse de votre activité',
          'Rapport écrit avec recommandations',
          'Devis précis pour la suite',
          'Déduit du devis final si mission signée',
        ],
      },
      {
        id: 'site-complet',
        name: 'Site complet + espace client',
        description: 'Un site avec catalogue, espace client, mode édition en ligne et admin dédiée.',
        price: 'à partir de 5 000 € HT',
        delay: '4-6 semaines',
        features: [
          'Catalogue produits (jusqu\'à 1000+ références)',
          'Espace client (devis, factures, commandes)',
          'Mode édition en ligne pour l\'admin',
          'Suivi des performances intégré',
        ],
      },
      {
        id: 'web-app',
        name: 'Web app sur mesure',
        description: 'Une application dédiée à votre activité : CRM, planning, outil métier spécifique.',
        price: 'Sur devis',
        delay: '4-12 semaines',
        features: [
          'Cahier des charges co-construit',
          'Architecture adaptée à votre volume',
          'Intégrations avec vos outils existants',
          'Formation et documentation complète',
        ],
      },
      {
        id: 'transformation',
        name: 'Transformation complète',
        description: 'Site + espace client + admin + automatisations + intégrations. Le projet qui change tout.',
        price: 'à partir de 10 000 € HT',
        delay: '6-10 semaines',
        features: [
          'Audit approfondi inclus',
          'Site complet avec catalogue et espace client',
          'Intégration API (Pennylane, CRM, etc.)',
          'Automatisations et notifications sur mesure',
          'Formation + accompagnement 1 mois',
        ],
      },
    ],
    ctaLabel: 'Cadrer mon projet',
    ctaHref: '/contact?cible=projets',
  },
];

export interface Subscription {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const subscription: Subscription = {
  name: 'Suivi & Évolution',
  price: '180 € HT / mois',
  description:
    'Pour les clients qui veulent garder leur outil à jour et le faire évoluer sans re-devis à chaque fois.',
  features: [
    'Maintenance technique (hébergement, mises à jour)',
    '1h d\'évolution incluse par mois (reportable 3 mois)',
    'Support prioritaire sous 24h ouvrées',
    'Point trimestriel pour anticiper les besoins',
    'Engagement 6 mois minimum',
  ],
};
