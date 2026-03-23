'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

import Button from '../ui/Button';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggle } = useTheme();

    const toggleMenu = useCallback(() => {
        setMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    return (
        <header style={{
            height: 'var(--header-height)',
            borderBottom: '1px solid var(--border)',
            position: 'fixed',
            width: '100%',
            backgroundColor: theme === 'dark' ? 'rgba(5, 12, 26, 0.85)' : 'rgba(248, 250, 252, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 1000,
            top: 0,
        }}>
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} onClick={closeMenu}>
                    <span style={{
                        fontSize: '1.625rem',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        color: 'var(--foreground)',
                        lineHeight: 1,
                    }}>
                        Opti<span style={{ color: '#f97316' }}>Pro</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    {[
                        { href: '/services', label: 'Tarifs' },
                        { href: '/sectors', label: 'Secteurs BTP' },
                        { href: '/about', label: 'Notre approche' },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                fontWeight: 500,
                                color: 'var(--secondary)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.95rem',
                                transition: 'color 0.2s, background 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                (e.target as HTMLAnchorElement).style.color = 'var(--foreground)';
                                (e.target as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                            }}
                            onMouseLeave={(e) => {
                                (e.target as HTMLAnchorElement).style.color = 'var(--secondary)';
                                (e.target as HTMLAnchorElement).style.background = 'transparent';
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                    {/* Theme toggle */}
                    <button
                        onClick={toggle}
                        aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                        title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                        style={{
                            marginLeft: '0.5rem',
                            background: 'none',
                            border: '1px solid var(--border-strong)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            color: 'var(--secondary)',
                            fontSize: '1.1rem',
                            width: '38px',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--surface-2)';
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(249,115,22,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = 'none';
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)';
                        }}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <Button
                        href="/contact"
                        variant="primary"
                        style={{ marginLeft: '0.75rem', fontSize: '0.9rem', padding: '0.6rem 1.25rem' }}
                    >
                        Essai gratuit 14 jours
                    </Button>
                </nav>

                {/* Hamburger button */}
                <button
                    className="hamburger-btn"
                    onClick={toggleMenu}
                    aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    aria-expanded={menuOpen}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        zIndex: 1001,
                    }}
                >
                    <div style={{
                        width: '24px',
                        height: '18px',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <span style={{
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: 'var(--foreground)',
                            borderRadius: '2px',
                            transition: 'all 0.3s ease',
                            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                        }} />
                        <span style={{
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: 'var(--foreground)',
                            borderRadius: '2px',
                            transition: 'all 0.3s ease',
                            opacity: menuOpen ? 0 : 1,
                        }} />
                        <span style={{
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: 'var(--foreground)',
                            borderRadius: '2px',
                            transition: 'all 0.3s ease',
                            transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
                        }} />
                    </div>
                </button>
            </div>

            {/* Mobile nav overlay */}
            <div
                className="mobile-nav"
                style={{
                    position: 'fixed',
                    top: 'var(--header-height)',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(5, 12, 26, 0.97)',
                    backdropFilter: 'blur(20px)',
                    display: menuOpen ? 'flex' : 'none',
                    flexDirection: 'column',
                    padding: '2rem 1.5rem',
                    gap: '0.5rem',
                    zIndex: 999,
                    borderTop: '1px solid var(--border)',
                }}
            >
                {[
                    { href: '/services', label: 'Tarifs' },
                    { href: '/sectors', label: 'Secteurs BTP' },
                    { href: '/about', label: 'Notre approche' },
                ].map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={closeMenu}
                        style={{
                            padding: '1rem 0',
                            fontWeight: 500,
                            fontSize: '1.125rem',
                            color: 'var(--secondary)',
                            borderBottom: '1px solid var(--border)',
                        }}
                    >
                        {label}
                    </Link>
                ))}
                <div style={{ marginTop: '1rem' }}>
                    <Button href="/contact" variant="primary" style={{ width: '100%', textAlign: 'center' }}>
                        Essai gratuit 14 jours
                    </Button>
                </div>
                <button
                    onClick={toggle}
                    style={{
                        marginTop: '1rem',
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border-strong)',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        color: 'var(--foreground)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    {theme === 'dark' ? '☀️ Passer en mode clair' : '🌙 Passer en mode sombre'}
                </button>
            </div>
        </header>
    );
}
