'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '../ui/Button';
import Logo from '../ui/Logo';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = useCallback(() => {
        setMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const navLinks = [
        { href: '/services', label: 'Tarifs' },
        { href: '/sectors', label: 'Secteurs BTP' },
        { href: '/about', label: 'Notre approche' },
    ];

    return (
        <header style={{
            height: 'var(--header-height)',
            borderBottom: '1px solid var(--border)',
            position: 'fixed',
            width: '100%',
            backgroundColor: 'rgba(248, 250, 252, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 1000,
            top: 0,
        }}>
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} onClick={closeMenu}>
                    <Logo size="1.9rem" />
                </Link>

                {/* Desktop nav */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    {navLinks.map(({ href, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                style={{
                                    fontWeight: isActive ? 600 : 500,
                                    color: isActive ? 'var(--accent)' : 'var(--secondary)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.2s, background 0.2s',
                                    textDecoration: isActive ? 'underline' : 'none',
                                    textUnderlineOffset: '4px',
                                    textDecorationThickness: '2px',
                                    background: isActive ? 'rgba(249,115,22,0.07)' : 'transparent',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)';
                                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,0.05)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--secondary)';
                                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                                    }
                                }}
                            >
                                {label}
                            </Link>
                        );
                    })}
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

            {/* Mobile nav — slide-down animated */}
            <div
                className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}
                style={{
                    position: 'fixed',
                    top: 'var(--header-height)',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(5, 12, 26, 0.97)',
                    backdropFilter: 'blur(20px)',
                    flexDirection: 'column',
                    padding: '2rem 1.5rem',
                    gap: '0.5rem',
                    zIndex: 999,
                    borderTop: '1px solid var(--border)',
                    /* animation handled via CSS classes */
                    display: menuOpen ? 'flex' : 'none',
                    animation: menuOpen ? 'mobileMenuIn 0.25s cubic-bezier(0.22,1,0.36,1) both' : 'none',
                }}
            >
                {navLinks.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={closeMenu}
                            style={{
                                padding: '1rem 0',
                                fontWeight: isActive ? 700 : 500,
                                fontSize: '1.125rem',
                                color: isActive ? 'var(--accent)' : '#94a3b8',
                                borderBottom: '1px solid rgba(255,255,255,0.07)',
                            }}
                        >
                            {label}
                        </Link>
                    );
                })}
                <div style={{ marginTop: '1rem' }}>
                    <Button href="/contact" variant="primary" style={{ width: '100%', textAlign: 'center' }}>
                        Essai gratuit 14 jours
                    </Button>
                </div>
            </div>
        </header>
    );
}
