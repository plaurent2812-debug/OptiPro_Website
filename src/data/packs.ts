export interface Pack {
    id: string;
    level: string;
    name: string;
    tagline: string;
    price: string;
    priceNum: number;
    target: string;
    features: string[];
    highlighted?: boolean;
    highlightLabel?: string;
}

export const optiboardPacks: Pack[] = [
    {
        id: 'accompagne',
        level: 'Accompagné',
        name: 'Accompagné',
        tagline: 'Gestion admin complète — Pierre s\'occupe de tout au quotidien',
        price: '299€',
        priceNum: 299,
        target: 'Artisan solo · Gestion complète par Pierre',
        features: [
            'Bot Telegram + assistant IA (devis en 2 min)',
            'Planning chantiers intégré & automatisé',
            'Sync automatique Pennylane',
            'Gestion admin quotidienne par Pierre',
            'Captures frais & justificatifs',
            'Relances impayés automatiques',
            'Export comptable FEC mensuel',
            'Accès consultatif client (lecture seule)',
            'Onboarding 30 min · Support prioritaire',
        ],
        highlighted: true,
        highlightLabel: 'POPULAIRE',
    },
    {
        id: 'premium',
        level: 'Premium',
        name: 'Premium',
        tagline: 'Équipe 3–10 personnes — reporting avancé + suivi stratégique',
        price: '499€',
        priceNum: 499,
        target: 'Équipe 3–10 personnes · Multi-utilisateurs',
        features: [
            'Tout le plan Accompagné',
            'Multi-utilisateurs avec rôles',
            'Appel hebdo stratégique avec Pierre',
            'Reporting mensuel détaillé (CA, marges, délais, impayés)',
            'Accès client avancé (suivi factures + planning)',
            'Traitement & intégrations prioritaires',
        ],
    },
];
