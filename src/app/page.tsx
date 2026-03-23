'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

/* ── DATA ─────────────────────────────────────────── */

const steps = [
    {
        icon: '💬',
        title: 'Décrivez vos travaux sur Telegram',
        description: 'Depuis le chantier, envoyez un message vocal ou texte à votre assistant IA avec les infos du client et les travaux à chiffrer.',
    },
    {
        icon: '⚡',
        title: "L'IA génère votre devis en 2 min",
        description: 'OptiBoard rédige, chiffre et formate votre devis PDF. Vous validez ou modifiez en un clic, puis ça part au client.',
        badge: '✨ Magie',
    },
    {
        icon: '✅',
        title: 'Tout arrive dans Pennylane automatiquement',
        description: 'Devis, factures, paiements — tout est synchronisé dans Pennylane. Votre comptabilité est toujours à jour, sans saisie.',
    },
];

const formules = [
    {
        id: 'accompagne',
        name: 'Accompagné',
        price: '299',
        tagline: 'Gestion admin complète — Pierre s\'occupe de tout au quotidien',
        highlighted: true,
        badge: 'POPULAIRE',
        features: [
            'Bot Telegram + IA dévis en 2 min',
            'Planning chantiers intégré',
            'Sync automatique Pennylane',
            'Gestion admin quotidienne par Pierre',
            'Relances impayés automatiques',
            'Export comptable FEC mensuel',
            'Accès consultatif client (lecture seule)',
            'Onboarding 30 min · Support prioritaire',
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '499',
        tagline: 'Équipe 3–10 personnes — reporting avancé + suivi stratégique',
        features: [
            'Tout le plan Accompagné',
            'Multi-utilisateurs avec rôles',
            'Appel hebdo stratégique avec Pierre',
            'Reporting mensuel détaillé (CA, marges, délais)',
            'Accès client avancé (suivi factures + planning)',
            'Traitement & intégrations prioritaires',
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
    { icon: '📱', title: 'OptiBoard Dashboard', text: 'Vue centralisée de tous vos chantiers, factures et indicateurs en temps réel.' },
    { icon: '📅', title: 'Planning intégré', text: 'Planification automatique des interventions, délais et charges par chantier.' },
    { icon: '📊', title: 'Exports compta mensuels', text: 'FEC, bilan CA, marges — tout prêt le 1er du mois pour votre expert-comptable.' },
    { icon: '🔗', title: 'Pennylane natif', text: 'Synchronisation bidirectionnelle : devis, factures, paiements en temps réel.' },
    { icon: '👁️', title: 'Accès client consultatif', text: 'Vos clients voient leurs indicateurs, factures et planning — sans rien modifier.' },
    { icon: '🔒', title: 'Données sécurisées', text: 'Chiffrement bout-en-bout, hébergement Europe, RGPD conforme.' },
];

/* ── HERO MOCKUP ─────────────────────────────────── */

function HeroMockup() {
    return (
        <>
            <style>{`
                @keyframes blink-dot {
                    0%, 100% { opacity: 1; box-shadow: 0 0 6px #10b981; }
                    50% { opacity: 0.25; box-shadow: none; }
                }
                @keyframes typing-bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-4px); opacity: 1; }
                }
                @keyframes slide-msg-right {
                    from { opacity: 0; transform: translateX(10px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slide-msg-left {
                    from { opacity: 0; transform: translateX(-10px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .chat-user { animation: slide-msg-right 0.35s ease forwards; opacity: 0; }
                .chat-bot  { animation: slide-msg-left  0.35s ease forwards; opacity: 0; }
                .delay-1 { animation-delay: 0.3s; }
                .delay-2 { animation-delay: 0.9s; }
                .delay-3 { animation-delay: 1.5s; }
                .delay-4 { animation-delay: 2.1s; }
                .typing-dot { animation: typing-bounce 1.2s ease infinite; }
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }
            `}</style>

            <div className="animate-fade-up-3" style={{ flex: '0 0 auto', width: '100%', maxWidth: '440px' }}>

                {/* Pennylane chip — top right */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem', paddingRight: '0.5rem' }}>
                    <div className="animate-float" style={{
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        borderRadius: '2rem',
                        padding: '0.35rem 0.85rem',
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                    }}>
                        <span style={{ fontSize: '0.7rem' }}>🔗</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981' }}>Pennylane synced ✓</span>
                    </div>
                </div>

                {/* Main window */}
                <div style={{
                    borderRadius: '1.25rem',
                    background: '#0d1b2e',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.07)',
                    overflow: 'hidden',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 44px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(249,115,22,0.12)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.07)';
                    }}
                >
                    {/* Chrome bar */}
                    <div style={{
                        background: 'rgba(5,12,26,0.97)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        padding: '0.6rem 0.85rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                        <div style={{ display: 'flex', gap: '5px', marginRight: '0.25rem' }}>
                            {['#ff5f57','#febc2e','#28c840'].map(c => (
                                <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />
                            ))}
                        </div>
                        <div style={{
                            width: '26px', height: '26px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #229ED9, #1a6fab)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', flexShrink: 0,
                        }}>🤖</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#f0f4ff', lineHeight: 1 }}>OptiBoard IA</div>
                            <div style={{ fontSize: '0.63rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', animation: 'blink-dot 1.8s ease-in-out infinite' }} />
                                En ligne
                            </div>
                        </div>
                        <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>Telegram</div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        padding: '0.8rem 0.85rem',
                        display: 'flex', flexDirection: 'column', gap: '0.55rem',
                        background: 'linear-gradient(180deg, #0a1628, #0d1b2e)',
                    }}>
                        <div style={{ textAlign: 'center', fontSize: '0.58rem', color: 'rgba(255,255,255,0.18)', marginBottom: '0.1rem' }}>Aujourd&apos;hui 09:14</div>

                        {/* User */}
                        <div className="chat-user delay-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{
                                maxWidth: '83%', padding: '0.5rem 0.8rem',
                                borderRadius: '1rem 1rem 0.2rem 1rem',
                                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                                color: '#fff', fontSize: '0.73rem', lineHeight: 1.5,
                                boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
                            }}>
                                🎙️ Terrasse 80m² Bordeaux, client Dupont — carrelage ext. fourniture + pose
                            </div>
                        </div>

                        {/* Bot */}
                        <div className="chat-bot delay-2" style={{ display: 'flex', gap: '0.35rem', alignItems: 'flex-end' }}>
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                background: 'linear-gradient(135deg, #229ED9, #1a6fab)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem',
                            }}>🤖</div>
                            <div style={{
                                maxWidth: '83%', padding: '0.5rem 0.8rem',
                                borderRadius: '1rem 1rem 1rem 0.2rem',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.09)',
                                color: '#f0f4ff', fontSize: '0.73rem', lineHeight: 1.6,
                            }}>
                                ✅ Devis généré en <strong style={{ color: '#fb923c' }}>1m52s</strong><br />
                                📄 #2024-047 — <strong>8 640 € HT</strong><br />
                                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.67rem' }}>Envoyer à dupont@email.fr ?</span>
                            </div>
                        </div>

                        {/* User confirm */}
                        <div className="chat-user delay-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{
                                padding: '0.4rem 0.8rem',
                                borderRadius: '1rem 1rem 0.2rem 1rem',
                                background: 'linear-gradient(135deg, #f97316, #fb923c)',
                                color: '#fff', fontSize: '0.73rem',
                                boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
                            }}>Oui, envoie ! ✔️</div>
                        </div>

                        {/* Bot confirm */}
                        <div className="chat-bot delay-4" style={{ display: 'flex', gap: '0.35rem', alignItems: 'flex-end' }}>
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                background: 'linear-gradient(135deg, #229ED9, #1a6fab)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem',
                            }}>🤖</div>
                            <div style={{
                                padding: '0.5rem 0.8rem',
                                borderRadius: '1rem 1rem 1rem 0.2rem',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(16,185,129,0.2)',
                                color: '#f0f4ff', fontSize: '0.73rem',
                            }}>
                                📤 <strong style={{ color: '#10b981' }}>Envoyé !</strong> Synchro Pennylane ✓
                            </div>
                        </div>

                        {/* Typing indicator */}
                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'flex-end' }}>
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                                background: 'linear-gradient(135deg, #229ED9, #1a6fab)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem',
                            }}>🤖</div>
                            <div style={{
                                padding: '0.45rem 0.75rem',
                                borderRadius: '1rem 1rem 1rem 0.2rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                display: 'flex', gap: '3px', alignItems: 'center',
                            }}>
                                {[0,1,2].map(i => (
                                    <div key={i} className="typing-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        background: 'rgba(5,12,26,0.6)',
                    }}>
                        {[
                            { label: 'Devis / mois', value: '14', color: '#38bdf8', icon: '📄' },
                            { label: 'CA généré', value: '67k€', color: '#f97316', icon: '💰' },
                            { label: 'Sync Pennylane', value: '✓', color: '#10b981', icon: '🔗' },
                        ].map(({ label, value, color, icon }, i) => (
                            <div key={label} style={{
                                flex: 1, textAlign: 'center',
                                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            }}>
                                <div style={{ fontSize: '0.58rem', marginBottom: '1px' }}>{icon}</div>
                                <div style={{ fontSize: '0.88rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
                                <div style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px', lineHeight: 1.2 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devis en cours chip — bottom left */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.75rem', paddingLeft: '0.5rem' }}>
                    <div className="animate-float" style={{
                        background: 'linear-gradient(135deg, #0d1b2e, #162236)',
                        border: '1px solid rgba(16,185,129,0.35)',
                        borderRadius: '2rem',
                        padding: '0.4rem 0.9rem',
                        display: 'flex', alignItems: 'center', gap: '0.45rem',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 12px rgba(16,185,129,0.1)',
                        animationDelay: '0.5s',
                    }}>
                        <div style={{
                            width: '7px', height: '7px', borderRadius: '50%', background: '#10b981',
                            animation: 'blink-dot 1.2s ease-in-out infinite',
                            boxShadow: '0 0 6px #10b981', flexShrink: 0,
                        }} />
                        <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#f0f4ff' }}>Devis en cours…</span>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ── PAGE ────────────────────────────────────────── */

export default function Home() {
    const { theme } = useTheme();

    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--background)', transition: 'background 0.4s ease, color 0.4s ease' }}>
            <div className="page-background" />

            <main style={{ flex: 1, zIndex: 1, paddingTop: 'var(--header-height)' }}>

                {/* ── HERO ─────────────────────────────────────── */}
                <section style={{ padding: 'clamp(2rem, 5vw, 5rem) 5% clamp(2rem, 4vw, 4rem)', maxWidth: '1300px', margin: '0 auto' }}>
                    <div className="hero-layout" style={{ position: 'relative' }}>

                        {/* Text side */}
                        <div className="hero-text-side">
                            <div className="pill-badge animate-fade-up">
                                💬 Telegram · 🤖 IA · 📋 Planning · 📊 Pennylane
                            </div>

                            <h1 className="hero-title animate-fade-up-1">
                                Votre travail,{' '}
                                <br />
                                <span className="gradient-text" style={{ position: 'relative' }}>
                                    notre gestion.
                                    <svg
                                        style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '10px', opacity: 0.6 }}
                                        viewBox="0 0 200 10" fill="none"
                                    >
                                        <path d="M2 8C40 -1 155 -1 198 8" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="animate-fade-up-2" style={{ fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '2rem', maxWidth: '520px', lineHeight: 1.75, fontWeight: 500 }}>
                                Devis Telegram en 2 min, sync Pennylane automatique, planning chantiers, exports compta — <strong style={{ color: 'var(--foreground)' }}>Pierre pilote votre admin</strong> selon la formule choisie.
                            </p>

                            <div className="animate-fade-up-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                                <Button href="/contact" variant="primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: '0.75rem' }}>
                                    Essai gratuit 14 jours →
                                </Button>
                                <Button href="/services" variant="outline" style={{ padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: '0.75rem' }}>
                                    Voir les formules
                                </Button>
                            </div>

                            {/* Trust row */}
                            <div className="animate-fade-up-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'nowrap' }}>
                                {[
                                    { emoji: '⚡', label: 'Devis en 2 min' },
                                    { emoji: '🔗', label: 'Sync Pennylane' },
                                    { emoji: '🎁', label: '14j gratuits' },
                                ].map(({ emoji, label }) => (
                                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                        <span>{emoji}</span>
                                        <span>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mockup side */}
                        <HeroMockup />
                    </div>
                </section>

                {/* ── COMMENT ÇA MARCHE ────────────────────────── */}
                <section className="reveal" style={{ padding: '5rem 5% 6rem', maxWidth: '1300px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="section-label">⚡ Processus</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Comment ça marche ?
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--secondary)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
                            Envoyez un message depuis votre chantier, on s&apos;occupe du reste.
                        </p>
                    </div>

                    <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {steps.map((step, i) => (
                            <div key={i} className="glass-card reveal-delay-1" style={{ position: 'relative', padding: '2rem 1.75rem' }}>
                                {step.badge && (
                                    <div style={{
                                        position: 'absolute', top: '1.25rem', right: '1.25rem',
                                        background: 'linear-gradient(135deg, #f97316, #fb923c)',
                                        color: '#fff', fontSize: '0.7rem', fontWeight: 800,
                                        padding: '0.25rem 0.75rem', borderRadius: '2rem',
                                    }}>{step.badge}</div>
                                )}
                                <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem' }}>{step.icon}</div>
                                <h3 style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>{step.title}</h3>
                                <p style={{ color: 'var(--secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── PIERRE CALLOUT ───────────────────────────── */}
                <section className="reveal" style={{ padding: '0 5% 5rem', maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        background: theme === 'dark'
                            ? 'linear-gradient(135deg, rgba(249,115,22,0.07), rgba(139,92,246,0.05))'
                            : 'linear-gradient(135deg, rgba(249,115,22,0.06), rgba(255,255,255,0.8))',
                        border: '1px solid rgba(249,115,22,0.25)',
                        borderRadius: '1.5rem',
                        padding: '2.5rem 2rem',
                        display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
                    }}>
                        <div style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>👨‍💼</div>
                        <div>
                            <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                Pierre gère tout pour vous — ce n&apos;est pas que de l&apos;IA
                            </h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.75, fontSize: '0.97rem' }}>
                                Selon la formule choisie, je prends en charge votre admin au quotidien : saisie des devis, suivi des impayés, exports comptables, coordination Pennylane. <strong style={{ color: 'var(--foreground)' }}>Vous avez un vrai interlocuteur humain</strong>, pas juste un logiciel.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── FORMULES ─────────────────────────────────── */}
                <section className="reveal" style={{ padding: '5rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="section-label">💰 Tarifs</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Choisissez votre formule
                        </h2>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
                            Selon la formule choisie, Pierre gère plus ou moins de votre admin. L&apos;IA automatise, Pierre pilote. Vous faites votre métier.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
                        {formules.map((f) => (
                            <div
                                key={f.id}
                                style={{
                                    borderRadius: '1.5rem',
                                    padding: '2rem 1.75rem',
                                    background: f.highlighted
                                        ? (theme === 'dark'
                                            ? 'linear-gradient(145deg, #162236, #1e2f47)'
                                            : 'linear-gradient(145deg, #fff7ed, #fff)')
                                        : 'var(--surface)',
                                    position: 'relative',
                                    border: f.highlighted
                                        ? '1px solid rgba(249,115,22,0.4)'
                                        : '1px solid var(--border)',
                                    boxShadow: f.highlighted
                                        ? (theme === 'dark'
                                            ? '0 25px 50px rgba(0,0,0,0.4), 0 0 30px rgba(249,115,22,0.1)'
                                            : '0 25px 50px rgba(249,115,22,0.12), 0 0 30px rgba(249,115,22,0.08)')
                                        : '0 4px 20px rgba(0,0,0,0.08)',
                                    transform: f.highlighted ? 'scale(1.03)' : 'none',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                {f.badge && (
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                                        background: 'linear-gradient(135deg, #f97316, #fb923c)',
                                        color: '#fff', padding: '0.3rem 1.25rem', borderRadius: '2rem',
                                        fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '0.06em',
                                    }}>{f.badge}</div>
                                )}
                                <h3 style={{
                                    fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem',
                                    color: f.highlighted && theme === 'dark' ? '#f0f4ff' : 'var(--foreground)',
                                }}>{f.name}</h3>
                                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#f97316', marginBottom: '0.3rem', lineHeight: 1 }}>
                                    {f.price}€<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--secondary)' }}>/mois</span>
                                </div>
                                <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.tagline}</p>
                                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {f.features.map((feat, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: f.highlighted && theme === 'dark' ? 'rgba(240,244,255,0.85)' : 'var(--secondary)' }}>
                                            <span style={{ color: '#f97316', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    href={`/contact?plan=${f.id}`}
                                    variant={f.highlighted ? 'primary' : 'outline'}
                                    style={{ width: '100%', textAlign: 'center', padding: '0.875rem', borderRadius: '0.75rem', fontWeight: 700, display: 'block' }}
                                >
                                    {f.highlighted ? "Démarrer l'essai gratuit" : 'Essayer gratuitement'}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link href="/services" style={{ color: '#f97316', fontWeight: 600, fontSize: '1rem' }}>
                            Voir tous les détails sur la page tarifs →
                        </Link>
                    </p>
                </section>

                {/* ── POUR QUI ─────────────────────────────────── */}
                <section className="reveal" style={{ padding: '5rem 5%', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="section-label">👷 Secteurs</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Pour qui ?
                        </h2>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
                            Idéal pour les artisans solo ou les petites équipes (moins de 10 personnes).
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
                        {metiers.map((m) => (
                            <div key={m.nom} className="glass-card" style={{ padding: '1.25rem 0.75rem', cursor: 'default' }}>
                                <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{m.icon}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{m.nom}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CONFIANCE ─────────────────────────────────── */}
                <section className="reveal" style={{ padding: '5rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                        {trustItems.map((item) => (
                            <div
                                key={item.title}
                                className="glass-card"
                                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                            >
                                <div style={{ fontSize: '1.75rem' }}>{item.icon}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.title}</div>
                                <p style={{ color: 'var(--secondary)', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA FINAL ─────────────────────────────────── */}
                <section className="reveal" style={{ padding: '0 5% 6rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        textAlign: 'center',
                        background: theme === 'dark'
                            ? 'linear-gradient(135deg, #0d1b2e 0%, #1a1040 50%, #0d1b2e 100%)'
                            : 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fef3c7 100%)',
                        borderRadius: '2rem',
                        padding: '5rem 2rem',
                        border: '1px solid rgba(249,115,22,0.25)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            position: 'absolute', top: '-60px', right: '-60px',
                            width: '300px', height: '300px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-60px', left: '-60px',
                            width: '300px', height: '300px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                            pointerEvents: 'none',
                        }} />
                        <div className="section-label" style={{ position: 'relative' }}>🚀 DÉMARRER</div>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
                            letterSpacing: '-0.04em', marginBottom: '1rem', position: 'relative',
                            color: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'var(--foreground)',
                            WebkitBackgroundClip: 'text',
                            backgroundImage: theme === 'dark' ? 'linear-gradient(135deg, #f0f4ff 30%, rgba(249,115,22,0.7))' : 'linear-gradient(135deg, #0d1b2e 30%, #f97316)',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Prêt à automatiser votre admin ?
                        </h2>
                        <p style={{ color: 'var(--secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto 2.5rem auto', lineHeight: 1.7, position: 'relative' }}>
                            Envoyez un message depuis votre chantier, on s&apos;occupe du reste.
                            <br />Essai gratuit 14 jours, sans engagement.
                        </p>
                        <Button
                            href="/contact"
                            variant="primary"
                            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '0.875rem', fontWeight: 700, position: 'relative' }}
                        >
                            Démarrer l&apos;essai gratuit →
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
