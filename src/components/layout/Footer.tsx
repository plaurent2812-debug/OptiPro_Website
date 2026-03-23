'use client';

import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem', position: 'relative', overflow: 'hidden', transition: 'background 0.4s ease' }}>
            {/* Top accent line */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            }} />

            {/* Background glow */}
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '300px',
                background: 'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <span style={{ fontWeight: 900, fontSize: '1.6rem', letterSpacing: '-0.04em', color: 'var(--foreground)' }}>
                                Opti<span style={{ color: '#f97316' }}>Pro</span>
                            </span>
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '260px' }}>
                            Fait avec soin par Pierre, pour les artisans qui ont mieux à faire que de l&apos;admin.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--muted)', marginBottom: '1.25rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Navigation</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { href: '/services', label: 'Tarifs' },
                                { href: '/sectors', label: 'Secteurs BTP' },
                                { href: '/about', label: 'Notre approche' },
                                { href: '/contact', label: 'Contact' },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        style={{ color: 'var(--secondary)', fontSize: '0.95rem', transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--secondary)')}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--muted)', marginBottom: '1.25rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--secondary)', fontSize: '0.95rem' }}>
                            <li>Pierre Laurent — Fondateur</li>
                            <li>
                                <a href="mailto:contact@optipro.fr" style={{ color: 'var(--secondary)', transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--secondary)')}
                                >
                                    contact@optipro.fr
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/pierre-laurent-809410123"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--secondary)', transition: 'color 0.2s' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--secondary)')}
                                >
                                    LinkedIn →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                        &copy; {new Date().getFullYear()} OptiBoard. Admin chantier automatisée via Telegram et Pennylane.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.5 }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>📊 Pennylane</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>💬 Telegram</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>💳 Stripe</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
