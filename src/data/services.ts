export interface ServiceStep {
  id: string;
  number: number;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  deliverables: string[];
  note?: string;
}

export const services: ServiceStep[] = [
  {
    id: 'audit',
    number: 1,
    icon: '🔍',
    title: 'Audit de l\'existant',
    shortDescription: 'Analyse de vos outils, process et points de friction.',
    longDescription: 'Je passe en revue vos outils actuels, vos process quotidiens et vos points de friction. L\'objectif : comprendre précisément où vous perdez du temps et de l\'énergie, et identifier les leviers d\'amélioration.',
    deliverables: [
      'Cartographie de vos outils et process',
      'Identification des points de friction',
      'Rapport détaillé avec recommandations priorisées',
    ],
    note: 'L\'audit est gratuit',
  },
  {
    id: 'analyse',
    number: 2,
    icon: '📊',
    title: 'Analyse des blocages',
    shortDescription: 'Identification des tâches chronophages et opportunités d\'amélioration.',
    longDescription: 'À partir de l\'audit, je priorise les sujets admin qui vous bloquent ou vous coûtent le plus de temps. On définit ensemble un plan d\'action concret, avec les solutions adaptées à votre budget et vos contraintes.',
    deliverables: [
      'Liste priorisée des blocages identifiés',
      'Plan d\'action avec solutions recommandées',
      'Estimation des gains de temps attendus',
    ],
  },
  {
    id: 'creation',
    number: 3,
    icon: '🛠️',
    title: 'Création sur mesure',
    shortDescription: 'Sites web, web apps, tableaux de bord — conçus pour votre activité.',
    longDescription: 'Je conçois et développe les outils dont vous avez besoin : site vitrine, application web dédiée, tableau de bord, espace client. Pas de template générique — chaque solution est construite pour votre métier.',
    deliverables: [
      'Maquettes et validation avant développement',
      'Développement sur mesure',
      'Mise en production et formation',
    ],
  },
  {
    id: 'automatisation',
    number: 4,
    icon: '⚡',
    title: 'Automatisation',
    shortDescription: 'Workflows, intégrations, synchros — le répétitif disparaît.',
    longDescription: 'Je connecte vos outils entre eux et j\'automatise les tâches répétitives : envoi de documents, relances, synchronisations, exports comptables. Vous gagnez du temps chaque jour sans y penser.',
    deliverables: [
      'Workflows automatisés entre vos outils',
      'Intégrations et synchronisations',
      'Documentation et support',
    ],
  },
];
