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

            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 5%' }}>
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
                <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                    
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
                        <strong> Générez et envoyez vos devis en 2 min par simple vocal Telegram.</strong> Vous l'envoyez au client depuis le chantier, et notre équipe prend le relais pour tout le reste (facturation, relances, suivi).
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
            </main>

            {/* Minimal Footer */}
            <footer style={{ padding: '2rem 5%', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--muted)', fontSize: '0.875rem', backgroundColor: 'white' }}>
                &copy; {new Date().getFullYear()} OptiPro. OptiBoard est un service exclusif pour les artisans du bâtiment.
            </footer>
        </div>
    );
}
