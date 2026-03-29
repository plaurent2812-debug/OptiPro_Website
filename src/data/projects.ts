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
}

export const projects: Project[] = [
  {
    id: 'projet-1',
    title: 'Votre premier site',
    client: 'Nom du client',
    sector: 'Secteur d\'activité',
    context: 'Contexte du projet à compléter.',
    problem: 'Problème rencontré (le besoin du client).',
    solution: 'Solution apportée (ce que vous avez construit).',
    results: ['Résultat concret 1 (ex: Site en ligne en 2 semaines)', 'Rendu professionnel et rapide'],
    tags: ['Site web', 'Sur-mesure'],
  }
];
