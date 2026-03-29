'use client';

import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--background)', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Top accent line */}
            <div
                className="footer-accent-line"
                style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            />

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
                            <Image
                                src="/logo.png"
                                alt="OptiPro"
                                width={320}
                                height={107}
                                style={{ objectFit: 'contain', mixBlendMode: 'multiply', maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '260px' }}>
                            Conseil &amp; développement sur mesure pour artisans, TPE et indépendants.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ color: 'var(--muted)', marginBottom: '1.25rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Navigation</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { href: '/services', label: 'Services' },
                                { href: '/realisations', label: 'Réalisations' },
                                { href: '/contact', label: 'Contact' },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="footer-link"
                                        style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}
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
                                <a
                                    href="mailto:contact@optipro.fr"
                                    className="footer-link"
                                    style={{ color: 'var(--secondary)' }}
                                >
                                    contact@optipro.fr
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/pierre-laurent-809410123"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                    style={{ color: 'var(--secondary)' }}
                                >
                                    LinkedIn →
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                        &copy; {new Date().getFullYear()} OptiPro. Conseil &amp; développement sur mesure.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <Link
                            href="/mentions-legales"
                            className="footer-link footer-link--muted"
                            style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}
                        >
                            Mentions légales
                        </Link>
                        <Link
                            href="/confidentialite"
                            className="footer-link footer-link--muted"
                            style={{ fontSize: '0.85rem', color: 'var(--muted)', textDecoration: 'none' }}
                        >
                            Confidentialité
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
