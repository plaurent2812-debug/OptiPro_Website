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
    title: 'Projet 1',
    client: 'Client 1',
    sector: 'Secteur',
    context: 'Contexte du projet à compléter.',
    problem: 'Problème rencontré à compléter.',
    solution: 'Solution apportée à compléter.',
    results: ['Résultat concret 1', 'Résultat concret 2'],
    tags: ['Site web', 'Automatisation'],
  },
  {
    id: 'projet-2',
    title: 'Projet 2',
    client: 'Client 2',
    sector: 'Secteur',
    context: 'Contexte du projet à compléter.',
    problem: 'Problème rencontré à compléter.',
    solution: 'Solution apportée à compléter.',
    results: ['Résultat concret 1', 'Résultat concret 2'],
    tags: ['Web app', 'Workflow'],
  },
];
