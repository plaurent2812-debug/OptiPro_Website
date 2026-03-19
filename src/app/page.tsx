'use client';

import { FormEvent, useState } from 'react';
import Button from '@/components/ui/Button';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // Add a default message indicating this is from the waitlist
        data.message = "[INSCRIPTION LISTE D'ATTENTE] - Accès en avant-première demandé via la page teaser.";

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Erreur lors de l\'envoi');
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)' }}>
            {/* Minimal Header */}
            <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--border)', backgroundColor: 'white' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    Opti<span style={{ color: 'var(--accent)' }}>Pro</span>
                </span>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 5%' }}>
                <style>{`
                    @keyframes pulse-ring {
                        0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                        100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                    }
                    @keyframes typing-status {
                        0% { content: 'Installation des serveurs...'; }
                        25% { content: 'Synchronisation Telegram...'; }
                        50% { content: 'Configuration de l\\'IA OptiBoard...'; }
                        75% { content: 'Déploiement de la plateforme...'; }
                        100% { content: 'Installation des serveurs...'; }
                    }
                    .animated-status-text::after {
                        content: '';
                        animation: typing-status 8s infinite;
                    }
                `}</style>
                <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', marginBottom: '6rem' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.5rem 1rem', backgroundColor: '#f8fafc', borderRadius: '2rem', border: '1px solid #e2e8f0', width: 'fit-content', margin: '0 auto 2rem auto' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse-ring 2s infinite' }}></div>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }} className="animated-status-text"></span>
                    </div>

                    <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '2rem', fontWeight: '600', fontSize: '0.875rem', marginBottom: '1.5rem', border: '1px solid #bae6fd' }}>
                        🚀 Lancement très prochainement
                    </div>

                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Vous posez, <span style={{ color: 'var(--accent)' }}>on gère.</span>
                    </h1>
                    
                    <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                        Le premier service d'administration externalisée dédié au bâtiment, 3x moins cher et disponible 7j/7. 
                        <strong> Générez et envoyez vos devis en 2 min par simple vocal Telegram.</strong> Vous l'envoyez au client depuis le chantier, et OptiBoard prend le relais pour tout le reste (facturation, relances, suivi, export comptable).
                    </p>

                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)', maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>Accès en Avant-Première</h2>
                        <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem' }}>
                            Inscrivez-vous sur liste d'attente pour être averti du lancement de la plateforme <strong>OptiBoard</strong> et bénéficier d'un mois à -50%.
                        </p>

                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#166534' }}>Inscription confirmée !</h3>
                                <p style={{ color: 'var(--muted)' }}>Vous êtes sur la liste. Pierre vous contactera très vite avec vos accès.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {status === 'error' && (
                                    <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
                                        Une erreur est survenue. Veuillez réessayer.
                                    </div>
                                )}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Prénom & Nom</label>
                                    <input type="text" id="name" name="name" required placeholder="Jean Dupont" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
                                    <input type="email" id="email" name="email" required placeholder="jean@entreprise.fr" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }} />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label htmlFor="activity" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Corps de métier</label>
                                    <select id="activity" name="activity" required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none', backgroundColor: 'white' }}>
                                        <option value="">Sélectionnez votre métier</option>
                                        <option value="Plomberie / Chauffage">Plomberie / Chauffage</option>
                                        <option value="Électricité">Électricité</option>
                                        <option value="Maçonnerie / Gros oeuvre">Maçonnerie / Gros oeuvre</option>
                                        <option value="Menuiserie">Menuiserie</option>
                                        <option value="Peinture / Finitions">Peinture / Finitions</option>
                                        <option value="Multi-services / Rénovation globale">Multi-services / Rénovation globale</option>
                                        <option value="Autre BTP">Autre pro du bâtiment</option>
                                    </select>
                                </div>
                                <Button type="submit" variant="primary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
                                    {isLoading ? 'Inscription...' : 'Rejoindre la liste d\'attente'}
                                </Button>
                            </form>
                        )}
                    </div>

                </div>

                <section style={{ maxWidth: '1000px', width: '100%', textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                        Concrètement, qu'est-ce qu'OptiBoard ?
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
                        C'est votre plateforme d'administration pensée pour le terrain. Prenez vos frais en photo, consultez votre planning et vos clients sur l'application, et laissez OptiBoard gérer la paperasse en arrière-plan.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        <div style={{ padding: '2.5rem 2rem', backgroundColor: 'white', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', backgroundColor: '#e0f2fe', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>🎙️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--primary)' }}>1. Vous dictez</h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.6 }}>Sur le chantier, envoyez un simple vocal via Telegram à votre assistant avec les informations du client et les travaux à chiffrer.</p>
                        </div>
                        <div style={{ padding: '2.5rem 2rem', backgroundColor: 'white', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-12px', right: '24px', backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.75rem', borderRadius: '1rem', textTransform: 'uppercase' }}>Magie</div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', backgroundColor: '#fef08a', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>⚡️</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--primary)' }}>2. L'IA génère</h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.6 }}>En 2 minutes, OptiBoard rédige, chiffre, formate et vous renvoie le devis PDF. Vous validez ou modifiez, et ça part au client.</p>
                        </div>
                        <div style={{ padding: '2.5rem 2rem', backgroundColor: 'white', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', backgroundColor: '#dcfce7', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1rem' }}>💻</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', color: 'var(--primary)' }}>3. La plateforme gère</h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.6 }}>Retrouvez vos clients, factures et suivi de chantiers. Profitez d'un planning intelligent avec notifications intégrées pour vos rendez-vous, rappels et autres alertes. <strong>Générez en 1 clic l'export comptable</strong> de tous vos frais et recettes.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Minimal Footer */}
            <footer style={{ padding: '2rem 5%', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.875rem', backgroundColor: 'white' }}>
                &copy; {new Date().getFullYear()} OptiPro. OptiBoard est un service exclusif pour les artisans du bâtiment.
            </footer>
        </div>
    );
}
