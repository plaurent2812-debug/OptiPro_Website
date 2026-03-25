import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FaqAccordion from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
    title: "Tarifs & Services — OptiBoard",
    description: "2 formules à partir de 299€/mois. Gestion admin complète : devis Telegram, planning intégré, sync Pennylane, exports compta. Essai gratuit 14 jours.",
};


const plans = [
    {
        id: 'accompagne',
        name: 'Accompagné',
        price: '299€',
        billing: '/mois',
        target: 'Artisan solo · Gestion complète par Pierre',
        highlighted: true,
        badge: 'POPULAIRE',
        features: [
            'Bot Telegram + assistant IA (devis en 2 min)',
            'Planning chantiers intégré & automatisé',
            'Sync automatique Pennylane (devis, factures, paiements)',
            'Gestion admin quotidienne par Pierre',
            'Captures frais & justificatifs',
            'Relances impayés automatiques',
            'Export comptable FEC mensuel',
            'Accès consultatif client (lecture seule)',
            'Onboarding 30 min · Support prioritaire',
            'Essai gratuit 14 jours',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '499€',
        billing: '/mois',
        target: 'Équipe 3–10 personnes · Multi-utilisateurs',
        highlighted: false,
        features: [
            'Tout le plan Accompagné',
            'Multi-utilisateurs avec rôles (techniciens, gérant)',
            'Appel hebdo stratégique avec Pierre',
            'Reporting mensuel détaillé (CA, marges, délais, impayés)',
            'Accès client avancé (factures + planning + indicateurs)',
            'Import/export données personnalisé',
            'Traitement & intégrations prioritaires',
        ],
    },
];

const comparaison = [
    { alternative: 'Secrétaire mi-temps', cout: '800–1 200€/mois', limites: 'Chère, pas spécialisée bâtiment' },
    { alternative: 'Assistante freelance', cout: '400–700€/mois', limites: "Pas de planning ni d'accès client" },
    { alternative: 'Logiciel de devis classique', cout: '20–80€/mois', limites: 'Il faut tout saisir soi-même, zéro gestion' },
    { alternative: "L'artisan fait tout seul", cout: '0€ + 10h/sem + stress', limites: 'Oublie les relances, perd des tickets' },
    { alternative: 'OptiBoard Accompagné', cout: '299€/mois', isUs: true, limites: 'Telegram + IA + planning + Pennylane + accès client' },
];

const faq = [
    {
        q: "C'est quoi exactement OptiBoard ?",
        a: "OptiBoard est votre outil de gestion centralisé. Vous dictez depuis le chantier, Pierre gère l'admin, et vos clients ont un accès consultatif pour suivre leurs chantiers, factures et planning — sans pouvoir modifier quoi que ce soit.",
    },
    {
        q: "Qu'est-ce que l'accès consultatif client ?",
        a: "Vos clients peuvent se connecter à un espace dédié (lecture seule) pour voir : l'état de leurs chantiers, les factures associées, le planning des interventions, et des indicateurs synthétiques. C'est un vrai avantage commercial — la transparence totale, sans vous exposer.",
    },
    {
        q: "Je ne suis pas à l'aise avec l'informatique.",
        a: "Si vous savez envoyer un message sur Telegram, vous savez utiliser OptiBoard. Aucun logiciel à apprendre — vous parlez, l'IA fait le reste. Pierre s'occupe de tout ce qui est derrière.",
    },
    {
        q: "C'est quoi le planning intégré ?",
        a: "Chaque chantier créé (via Telegram ou manuellement) génère automatiquement une entrée dans votre planning. Vous voyez vos interventions, délais, charges prévues et avancement réel. Vos clients accèdent à leur propre vue simplifiée.",
    },
    {
        q: "Comment fonctionnent les exports comptables mensuels ?",
        a: "Le 1er de chaque mois, vous recevez automatiquement : fichier FEC, bilan CA du mois, récapitulatif marges, liste des impayés. Tout est prêt à transmettre à votre expert-comptable. Aucune saisie de votre part.",
    },
    {
        q: "Comment ça se connecte à Pennylane ?",
        a: "La synchronisation est automatique et bidirectionnelle. Chaque devis, facture et paiement est poussé dans votre Pennylane en temps réel. Votre comptable a toujours une vue à jour sans que vous ayez rien à faire.",
    },
    {
        q: "Y a-t-il un engagement ?",
        a: "Non. Sans engagement, préavis d'un mois. Vous pouvez arrêter quand vous voulez.",
    },
    {
        q: "Comment se passe l'onboarding ?",
        a: "Un appel de 30 minutes avec Pierre. Il configure tout pour vous : Telegram, Pennylane, planning, accès client. Vous êtes opérationnel dès le lendemain.",
    },
];

export default function ServicesPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)' }}>
            <div className="container" style={{ padding: '4rem 1.5rem' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="section-label">💰 Tarifs</div>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        Tarifs simples et transparents
                    </h1>
                    <p style={{ color: 'var(--secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
                        Pierre gère votre administration au quotidien. Vos clients ont un accès consultatif.
                        Vous, vous vous concentrez sur votre métier.
                    </p>
                </div>

                {/* Client Access Callout */}
                <section style={{ marginBottom: '3rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(249,115,22,0.05))',
                        border: '1px solid rgba(139,92,246,0.25)',
                        borderRadius: '1.25rem',
                        padding: '1.75rem 2rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.25rem',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{ fontSize: '2rem', flexShrink: 0 }}>👁️</div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                                Accès consultatif client inclus dans chaque formule
                            </h3>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                                Vos clients se connectent à <strong style={{ color: 'var(--foreground)' }}>leur espace lecture seule</strong> pour suivre l&apos;état de leurs chantiers,
                                leurs factures, le planning des interventions et des indicateurs clés.
                                Vous gardez le contrôle total — ils ont la transparence.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Plans */}
                <section style={{ marginBottom: '6rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`plan-card${plan.highlighted ? ' plan-highlighted plan-card--highlighted' : ''}`}
                                style={{
                                    borderRadius: '1.5rem',
                                    padding: '2.25rem 2rem',
                                    background: plan.highlighted ? undefined : 'var(--surface)',
                                    position: 'relative',
                                    border: plan.highlighted
                                        ? '1px solid rgba(249,115,22,0.45)'
                                        : '1px solid var(--border)',
                                    boxShadow: plan.highlighted
                                        ? '0 25px 50px rgba(0,0,0,0.25), 0 0 40px rgba(249,115,22,0.1)'
                                        : '0 4px 20px rgba(0,0,0,0.08)',
                                }}
                            >
                                {plan.highlighted && plan.badge && (
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                                        color: 'white', padding: '0.3rem 1.25rem', borderRadius: '2rem',
                                        fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '0.08em',
                                        boxShadow: '0 4px 12px rgba(249,115,22,0.4)',
                                    }}>
                                        {plan.badge}
                                    </div>
                                )}
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--foreground)' }}>{plan.name}</h3>
                                <div style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>{plan.target}</div>
                                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: plan.highlighted ? '#fb923c' : 'var(--foreground)', marginBottom: '1.75rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
                                    {plan.price}
                                    <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--muted)' }}>{plan.billing}</span>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                    {plan.features.map((f, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem' }}>
                                            <span style={{ color: '#fb923c', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                                            <span style={{ color: 'var(--secondary)' }}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    href={`/contact?plan=${plan.id}`}
                                    variant={plan.highlighted ? 'primary' : 'outline'}
                                    style={{ width: '100%', textAlign: 'center', padding: '0.9rem', borderRadius: '0.75rem', fontWeight: 700 }}
                                >
                                    Démarrer l&apos;essai gratuit
                                </Button>
                            </div>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                        * Sans engagement · Préavis d&apos;un mois · Essai gratuit 14 jours
                    </p>
                </section>

                {/* Comparaison */}
                <section style={{ marginBottom: '6rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <div className="section-label">⚡ Comparatif</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>OptiBoard vs les alternatives</h2>
                    </div>
                    <div style={{ overflowX: 'auto', borderRadius: '1.25rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ background: 'var(--surface-2)' }}>
                                    {['Alternative', 'Coût', 'Limites / Avantages'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '1rem 1.25rem', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {comparaison.map((row, i) => (
                                    <tr key={row.alternative} style={{
                                        borderBottom: i < comparaison.length - 1 ? '1px solid var(--border)' : 'none',
                                        background: row.isUs ? 'rgba(249,115,22,0.06)' : (i % 2 === 0 ? 'var(--surface)' : 'var(--table-stripe)'),
                                        fontWeight: row.isUs ? 700 : 400,
                                    }}>
                                        <td style={{ padding: '1rem 1.25rem', color: row.isUs ? '#fb923c' : 'var(--foreground)', fontSize: '0.95rem' }}>
                                            {row.isUs && '⭐ '}{row.alternative}
                                        </td>
                                        <td style={{ padding: '1rem 1.25rem', color: row.isUs ? '#fb923c' : 'var(--secondary)', fontSize: '0.95rem' }}>{row.cout}</td>
                                        <td style={{ padding: '1rem 1.25rem', color: row.isUs ? '#fb923c' : 'var(--muted)', fontSize: '0.9rem' }}>{row.limites}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: '5rem', maxWidth: '780px', margin: '0 auto 5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="section-label">❓ FAQ</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Questions fréquentes</h2>
                    </div>
                    <FaqAccordion items={faq} />
                </section>

                {/* CTA */}
                <div className="cta-section" style={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '2rem',
                    padding: '4rem 2rem',
                    border: '1px solid rgba(249,115,22,0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem', color: '#fff' }}>
                        Prêt à automatiser votre admin ?
                    </h2>
                    <p style={{ opacity: 0.75, marginBottom: '2.5rem', fontSize: '1.1rem', color: '#fff', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                        14 jours d&apos;essai gratuit. Un appel de 30 min avec Pierre, et vous êtes opérationnel dès le lendemain.
                    </p>
                    <Button href="/contact" variant="primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '0.875rem', fontWeight: 700 }}>
                        Démarrer l&apos;essai gratuit →
                    </Button>
                </div>
            </div>
        </div>
    );
}
