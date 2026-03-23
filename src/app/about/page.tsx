import type { Metadata } from "next";

import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Notre approche — OptiBoard",
    description: "OptiBoard, c'est Pierre Laurent, fondateur. Un service humain augmenté par l'IA pour les artisans du bâtiment. Pas un logiciel, un vrai service.",
};

const securityItems = [
    { icon: '🇪🇺', title: 'Hébergement Europe', desc: 'Vos données ne quittent jamais le territoire européen.', color: '#3b82f6', glow: 'rgba(59,130,246,0.2)' },
    { icon: '🔒', title: 'Chiffrement', desc: 'Données chiffrées en transit et au repos.', color: '#10b981', glow: 'rgba(16,185,129,0.2)' },
    { icon: '💾', title: 'Sauvegardes quotidiennes', desc: 'Sauvegarde automatique, restauration garantie.', color: '#8b5cf6', glow: 'rgba(139,92,246,0.2)' },
    { icon: '📋', title: 'RGPD conforme', desc: 'Vous restez propriétaire de vos données.', color: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
];

const notUs = [
    "❌ Pas un SaaS en self-service (Obat, Henrri, Tolteck) — vous alimentez, vous gérez",
    "❌ Pas un logiciel de comptabilité (EBP, Sage) — on ne fait pas votre compta",
    "❌ Pas un outil que l'artisan doit apprendre à utiliser",
];

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)', transition: 'background 0.4s ease' }}>
            <style>{`
                .sec-card { transition: border-color .25s, box-shadow .25s; }
                .sec-card:hover { border-color: rgba(249,115,22,0.35) !important; box-shadow: 0 0 25px rgba(249,115,22,0.12) !important; }
                .sec-card:nth-child(2):hover { border-color: rgba(16,185,129,0.35) !important; box-shadow: 0 0 25px rgba(16,185,129,0.12) !important; }
                .sec-card:nth-child(3):hover { border-color: rgba(139,92,246,0.35) !important; box-shadow: 0 0 25px rgba(139,92,246,0.12) !important; }
                .sec-card:nth-child(4):hover { border-color: rgba(245,158,11,0.35) !important; box-shadow: 0 0 25px rgba(245,158,11,0.12) !important; }
            `}</style>
            <div className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="section-label">👷 Notre approche</div>
                        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--foreground)' }}>
                            Un service humain,{' '}
                            <span className="gradient-text">augmenté par l&apos;IA</span>
                        </h1>
                        <p style={{ textAlign: 'center', color: 'var(--secondary)', fontSize: '1.15rem', lineHeight: 1.6 }}>
                            Pas un logiciel. Un vrai service, taillé pour les artisans du bâtiment.
                        </p>
                    </div>

                    {/* OptiBoard c'est quoi */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <div style={{
                            background: 'var(--surface)',
                            borderRadius: '1.5rem',
                            padding: '2.25rem',
                            border: '1px solid var(--border)',
                        }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                                OptiBoard, c&apos;est quoi exactement ?
                            </h2>
                            <div style={{ lineHeight: '1.8', color: 'var(--secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <p>
                                    <strong style={{ color: 'var(--foreground)' }}>OptiBoard est un service d&apos;administration externalisée pour artisans du bâtiment.</strong>{' '}
                                    Ce n&apos;est pas un logiciel en self-service que vous devez apprendre à utiliser.
                                </p>
                                <p>
                                    Vous, vous posez. <strong style={{ color: 'var(--foreground)' }}>Pierre pilote</strong>. L&apos;artisan envoie un vocal depuis le chantier —
                                    il reçoit son devis formaté. Il n&apos;entre rien dans un logiciel, il ne crée rien,
                                    il ne configure rien.
                                </p>
                                <p>
                                    L&apos;IA génère les devis et synchronise Pennylane. Mais c&apos;est <strong style={{ color: '#fb923c' }}>Pierre</strong> qui
                                    suit vos chantiers, relance les impayés, capture vos frais, prépare vos exports
                                    mensuels — et qui est là quand il y a un problème.
                                </p>
                                <p>
                                    C&apos;est comme avoir une secrétaire spécialisée bâtiment à temps partiel —
                                    mais <strong style={{ color: '#fb923c' }}>3x moins cher</strong>, disponible 7j/7, et équipée des meilleurs outils IA.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* IA vs Pierre roles */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                            <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '1.25rem', padding: '1.75rem' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🤖</div>
                                <h4 style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.75rem', fontSize: '1rem' }}>Ce que fait l&apos;IA</h4>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {[
                                        'Génère les devis PDF en 2 minutes',
                                        'Synchronise Pennylane en temps réel',
                                        'Planifie les chantiers automatiquement',
                                        'Produit les exports FEC chaque mois',
                                    ].map((item, i) => (
                                        <li key={i} style={{ fontSize: '0.875rem', color: 'var(--secondary)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#38bdf8', flexShrink: 0 }}>⚡</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: '1.25rem', padding: '1.75rem' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>👨‍💻</div>
                                <h4 style={{ fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.75rem', fontSize: '1rem' }}>Ce que fait Pierre</h4>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    {[
                                        'Suit vos chantiers au quotidien',
                                        'Relance les impayés manuellement',
                                        'Capture vos frais et justificatifs',
                                        'Prépare vos bilans et rapports mensuels',
                                        'Répond présent quand il y a un problème',
                                    ].map((item, i) => (
                                        <li key={i} style={{ fontSize: '0.875rem', color: 'var(--secondary)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#fb923c', flexShrink: 0 }}>✓</span>{item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Ce qu'on n'est PAS */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <div style={{
                            background: 'rgba(249,115,22,0.05)',
                            borderRadius: '1.5rem',
                            padding: '2.25rem',
                            border: '1px solid rgba(249,115,22,0.2)',
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
                                Ce qu&apos;on n&apos;est PAS
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {notUs.map((point, i) => (
                                    <li key={i} style={{
                                        color: 'var(--secondary)', fontSize: '0.95rem', lineHeight: 1.5,
                                        paddingLeft: '0', display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                                    }}>
                                        <span style={{ flexShrink: 0 }}>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Pierre Laurent */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <div style={{
                            background: 'var(--surface)',
                            borderRadius: '1.5rem',
                            padding: '2.25rem',
                            border: '1px solid var(--border)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Accent top border */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                                {/* Avatar */}
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
                                    background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2rem',
                                    boxShadow: '0 0 20px rgba(249,115,22,0.3)',
                                }}>
                                    👨‍💻
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                                        Pierre Laurent
                                    </h2>
                                    <p style={{ color: '#fb923c', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Fondateur</p>
                                    <div style={{ lineHeight: '1.8', color: 'var(--secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <p>
                                            J&apos;ai créé OptiBoard pour une raison simple : les artisans du bâtiment sont parmi
                                            les meilleurs professionnels du terrain, mais ils perdent des heures chaque semaine
                                            dans une paperasse qui les épuise.
                                        </p>
                                        <p>
                                            Mon rôle : prendre tout ça à votre charge. Je configure votre système d&apos;entrée de jeu
                                            (1 appel de 30 minutes), je gère votre administration au quotidien, et je vous envoie
                                            un rapport mensuel le 1er de chaque mois.
                                        </p>
                                        <p>
                                            Vous n&apos;avez pas à vous connecter à quoi que ce soit si vous ne le souhaitez pas.
                                            <strong style={{ color: 'var(--foreground)' }}> Un vocal suffit.</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sécurité */}
                    <section style={{ marginBottom: '3.5rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div className="section-label">🔐 Sécurité</div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Sécurité & données</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
                            {securityItems.map((item) => (
                                 <div
                                    key={item.title}
                                    className="sec-card"
                                    style={{
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '1.25rem',
                                        padding: '1.5rem',
                                    }}
                                >

                                    <div style={{
                                        fontSize: '1.75rem', marginBottom: '0.75rem',
                                        width: '48px', height: '48px', borderRadius: '0.75rem',
                                        background: `${item.color}15`,
                                        border: `1px solid ${item.color}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {item.icon}
                                    </div>
                                    <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--foreground)', fontSize: '0.95rem' }}>{item.title}</strong>
                                    <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            href="/contact"
                            variant="primary"
                            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '0.875rem', fontWeight: 700 }}
                        >
                            Parler à Pierre — Essai 14 jours gratuit →
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
