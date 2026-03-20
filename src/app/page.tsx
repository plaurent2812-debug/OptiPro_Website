import Button from '@/components/ui/Button';
import Link from 'next/link';

const steps = [
    {
        icon: '💬',
        bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
        shadow: 'rgba(56, 189, 248, 0.2)',
        title: '1. Décrivez vos travaux sur Telegram',
        description: 'Depuis le chantier, envoyez un simple message vocal ou texte à votre assistant IA avec les infos du client et les travaux à chiffrer.',
    },
    {
        icon: '⚡',
        bg: 'linear-gradient(135deg, #fef08a, #fde047)',
        shadow: 'rgba(250, 204, 21, 0.2)',
        title: "2. L'IA génère votre devis en 2 min",
        description: 'OptiBoard rédige, chiffre et formate votre devis PDF. Vous validez ou modifiez, et ça part au client.',
        badge: 'Magie',
    },
    {
        icon: '✅',
        bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
        shadow: 'rgba(74, 222, 128, 0.2)',
        title: '3. Tout arrive dans Pennylane automatiquement',
        description: 'Devis, factures, paiements — tout est synchronisé dans Pennylane. Votre comptabilité est toujours à jour.',
    },
];

const formules = [
    {
        id: 'self-service',
        name: 'Self-service',
        price: '59',
        tagline: 'Le logiciel seul — automatisez votre admin sans aide',
        features: [
            'Bot Telegram + IA',
            'Devis PDF en 2 min',
            'Sync automatique Pennylane',
            'Planning & suivi projets',
            'Export comptable FEC',
            'Essai gratuit 14 jours',
        ],
    },
    {
        id: 'accompagne',
        name: 'Accompagné',
        price: '299',
        tagline: 'Logiciel + assistant dédié — on gère votre admin au quotidien',
        highlighted: true,
        badge: 'RECOMMANDÉ',
        features: [
            'Tout le Self-service',
            'Captures frais & justificatifs',
            'Gestion admin quotidienne par Pierre',
            'Relances impayés automatiques',
            'Onboarding personnalisé',
            'Support prioritaire',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '499',
        tagline: 'Accompagnement complet avec reporting et suivi stratégique',
        features: [
            'Tout le plan Accompagné',
            'Appel hebdomadaire avec Pierre',
            'Reporting mensuel détaillé',
            'Multi-utilisateurs avec rôles',
            'Traitement prioritaire',
        ],
    },
];

const metiers = [
    { icon: '🔧', nom: 'Plombiers' },
    { icon: '⚡', nom: 'Électriciens' },
    { icon: '🧱', nom: 'Maçons' },
    { icon: '🎨', nom: 'Peintres' },
    { icon: '🏗️', nom: 'Couvreurs' },
    { icon: '🪵', nom: 'Menuisiers' },
];

const trustItems = [
    { icon: '🔗', text: 'Connecté à Pennylane, votre comptabilité est toujours à jour' },
    { icon: '🤖', text: 'Devis générés par IA, calibrés sur le marché du bâtiment 2026' },
    { icon: '🔒', text: 'Données chiffrées, hébergées en Europe' },
    { icon: '🎁', text: 'Essai gratuit 14 jours, sans engagement' },
];

export default function Home() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div className="page-background" />

            <main style={{ flex: 1, zIndex: 1 }}>
                {/* Hero Section */}
                <section style={{ padding: '5rem 5% 4rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="hero-layout">
                        <div className="hero-text-side">
                            <div className="pill-badge">
                                💬 Telegram + 🤖 IA + 📊 Pennylane
                            </div>

                            <h1 className="hero-title">
                                Votre travail,<br />
                                <span style={{ color: 'var(--accent)', position: 'relative' }}>
                                    notre gestion.
                                    <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.00032 9.5C40.0003 -1.49999 154.5 -2.49999 198 9.5" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>

                            <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.7, fontWeight: 500 }}>
                                Créez vos devis en 2 minutes depuis Telegram. La compta suit automatiquement dans Pennylane.
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                                <Button href="/contact" variant="primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.2)' }}>
                                    Essai gratuit 14 jours
                                </Button>
                                <Button href="/services" variant="outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: '0.75rem' }}>
                                    Voir les tarifs
                                </Button>
                            </div>

                            {/* Trust indicators */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.8 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: '#eab308', fontSize: '1.25rem' }}>★</span>)}
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>Pensé pour les artisans</span>
                                </div>
                                <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>14</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>Jours d&apos;essai gratuit</span>
                                </div>
                                <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>59€</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>/mois pour démarrer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comment ça marche */}
                <section style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Comment ça marche ?
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            Envoyez un message depuis votre chantier, on s&apos;occupe du reste.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {steps.map((step) => (
                            <div key={step.title} className="feature-card">
                                {step.badge && (
                                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '0.35rem 0.85rem', borderRadius: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)' }}>
                                        {step.badge}
                                    </div>
                                )}
                                <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: step.bg, width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1.25rem', boxShadow: `0 4px 10px ${step.shadow}` }}>
                                    {step.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>{step.title}</h3>
                                <p style={{ color: 'var(--secondary)', lineHeight: 1.7 }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Deux formules */}
                <section style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Nos formules
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            Zéro paperasse, que vous soyez autonome ou que vous préfériez tout déléguer.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                        {formules.map((f) => (
                            <div
                                key={f.id}
                                style={{
                                    border: f.highlighted ? '2px solid var(--accent)' : '1px solid var(--border)',
                                    borderRadius: '1.5rem',
                                    padding: '2.5rem 2rem',
                                    background: 'white',
                                    position: 'relative',
                                    boxShadow: f.highlighted ? '0 10px 30px -5px rgba(0,0,0,0.12)' : '0 4px 20px -2px rgb(0 0 0 / 0.05)',
                                }}
                            >
                                {f.badge && (
                                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', padding: '0.3rem 1rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                                        {f.badge}
                                    </div>
                                )}
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>{f.name}</h3>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', lineHeight: 1 }}>
                                    {f.price}€<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--muted)' }}>/mois</span>
                                </div>
                                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.tagline}</p>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                                    {f.features.map((feat, i) => (
                                        <li key={i} style={{ marginBottom: '0.6rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    href={`/contact?plan=${f.id}`}
                                    variant={f.highlighted ? 'primary' : 'outline'}
                                    style={{ width: '100%', textAlign: 'center', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: 700 }}
                                >
                                    {f.highlighted ? 'Démarrer l\u2019essai gratuit' : 'Essayer gratuitement'}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link href="/services" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1.05rem' }}>
                            Voir tous les détails sur la page tarifs →
                        </Link>
                    </p>
                </section>

                {/* Pour qui ? */}
                <section style={{ padding: '4rem 5%', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Pour qui ?
                        </h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            Idéal pour les artisans solo ou les petites équipes (&lt; 5 personnes).
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
                        {metiers.map((m) => (
                            <div key={m.nom} style={{ padding: '1.5rem 1rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{m.icon}</div>
                                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.95rem' }}>{m.nom}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Confiance */}
                <section style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                        {trustItems.map((item) => (
                            <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</div>
                                <p style={{ color: 'var(--secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Badges partenaires */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '3rem', opacity: 0.6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em' }}>📊 Pennylane</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em' }}>💳 Stripe</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.05em' }}>💬 Telegram</span>
                    </div>
                </section>

                {/* CTA Final */}
                <section style={{ padding: '0 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', background: 'var(--primary)', borderRadius: '1.5rem', padding: '4rem 2rem', color: 'white' }}>
                        <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>
                            Prêt à automatiser votre admin ?
                        </h2>
                        <p style={{ opacity: 0.85, marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                            Envoyez un message depuis votre chantier, on s&apos;occupe du reste. Essai gratuit 14 jours.
                        </p>
                        <Button
                            href="/contact"
                            style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', fontSize: '1.125rem', padding: '1rem 2.5rem', borderRadius: '0.75rem', fontWeight: 700 }}
                        >
                            Démarrer l&apos;essai gratuit
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
