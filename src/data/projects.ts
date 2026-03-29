export interface Project {
  id: string;
  title: string;
  client: string;
  sector: string;
  context: string;
  problem: string;
  solution: string;
  results: string[];
  tags: string[];
  image?: string;
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'probalab',
    title: 'ProbaLab',
    client: 'ProbaLab.net',
    sector: 'Application SaaS & Probabilités Sportives',
    context: 'Conception d\'une plateforme web spécialisée dans l\'analyse et le calcul de probabilités sportives (Football européen et NHL).',
    problem: 'Le client avait besoin d\'une plateforme technique capable de traiter des algorithmes de calcul complexes et de présenter des probabilités de succès claires par type de pari pour aider à la décision, sans que les paris ne soient pris sur l\'application.',
    solution: 'Développement complet d\'une Web App intégrant des modèles de Machine Learning pour générer des pronostics fiables. Création d\'une infrastructure robuste avec un modèle d\'abonnement Freemium géré de bout en bout via des paiements Stripe.',
    results: [
      'Algorithmes d\'analyse et calculs prédictifs via Machine Learning',
      'Plateforme prête au "scale" pour analyser des milliers de matchs et cotes chaque jour',
      'Parcours utilisateur d\'abonnement fluide intégré avec Stripe (Freemium)'
    ],
    tags: ['SaaS', 'Web App', 'Machine Learning', 'Stripe API'],
    url: 'https://probalab.net',
  }
];
