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
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
            <div className="page-background"></div>
            
            {/* Minimal Header */}
            <header style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', zIndex: 10, borderBottom: '1px solid rgba(226, 232, 240, 0.5)', position: 'sticky', top: 0 }}>
                <span style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.02em' }}>
                    Opti<span style={{ color: 'var(--accent)' }}>Pro</span>
                </span>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 5%', zIndex: 1 }}>
                <style>{`
                    @keyframes pulse-ring {
                        0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                        70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                        100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
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
                    
                    .hero-layout {
                        display: flex;
                        flex-direction: column;
                        gap: 3rem;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto 6rem auto;
                        align-items: center;
                    }
                    @media (min-width: 1024px) {
                        .hero-layout {
                            flex-direction: row;
                            align-items: center;
                            justify-content: space-between;
                            gap: 5rem;
                            margin: 2rem auto 8rem auto;
                        }
                    }
                    
                    .hero-text-side {
                        flex: 1.2;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    @media (min-width: 1024px) {
                        .hero-text-side {
                            text-align: left;
                            align-items: flex-start;
                        }
                    }
                    
                    .hero-form-side {
                        flex: 0.8;
                        width: 100%;
                        max-width: 500px;
                        animation: float 6s ease-in-out infinite;
                    }

                    .hero-title {
                        font-size: 3rem;
                        font-weight: 800;
                        line-height: 1.1;
                        color: var(--primary);
                        margin-bottom: 1.5rem;
                        letter-spacing: -0.02em;
                    }
                    @media (min-width: 768px) {
                        .hero-title {
                            font-size: 4rem;
                        }
                    }
                    
                    .glassmorphism-card {
                        background: rgba(255, 255, 255, 0.7);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.8);
                        box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.05);
                        padding: 2.5rem;
                        border-radius: 1.5rem;
                        position: relative;
                        overflow: hidden;
                    }
                    .glassmorphism-card::before {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0;
                        height: 5px;
                        background: linear-gradient(90deg, var(--accent), #fef08a);
                    }
                    
                    .feature-card {
                        padding: 3rem 2rem;
                        background-color: rgba(255, 255, 255, 0.8);
                        backdrop-filter: blur(10px);
                        border-radius: 1.5rem;
                        border: 1px solid rgba(226, 232, 240, 0.8);
                        box-shadow: 0 4px 20px -2px rgb(0 0 0 / 0.05);
                        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
                        position: relative;
                        overflow: hidden;
                    }
                    .feature-card:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
                        border-color: rgba(249, 115, 22, 0.2);
                    }
                    
                    .page-background {
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background: 
                            radial-gradient(circle at 80% 10%, rgba(249, 115, 22, 0.12) 0%, transparent 40%),
                            radial-gradient(circle at 20% 90%, rgba(15, 23, 42, 0.08) 0%, transparent 40%),
                            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 60%);
                        z-index: 0;
                        pointer-events: none;
                    }

                    .input-premium {
                        width: 100%;
                        padding: 0.875rem 1rem;
                        border-radius: 0.75rem;
                        border: 1px solid var(--border);
                        font-size: 1rem;
                        outline: none;
                        transition: all 0.2s ease;
                        background: rgba(255, 255, 255, 0.9);
                    }
                    .input-premium:focus {
                        border-color: var(--accent);
                        box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
                        background: #ffffff;
                    }
                    
                    .pill-badge {
                        display: inline-flex;
                        align-items: center;
                        padding: 0.35rem 1.25rem;
                        background: linear-gradient(90deg, #fff7ed, #ffedd5);
                        color: #ea580c;
                        border-radius: 2rem;
                        font-weight: 700;
                        font-size: 0.875rem;
                        margin-bottom: 2rem;
                        border: 1px solid #fed7aa;
                        box-shadow: 0 2px 10px rgba(234, 88, 12, 0.1);
                    }

                    .status-badge {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 0.5rem 1.25rem;
                        background-color: #f8fafc;
                        border-radius: 2rem;
                        border: 1px solid #e2e8f0;
                        width: fit-content;
                        margin-bottom: 2rem;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                    }
                `}</style>
                
                <div className="hero-layout">
                    {/* Left Side: Copy & Value Proposition */}
                    <div className="hero-text-side">
                        <div className="status-badge">
                            <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse-ring 2s infinite' }}></div>
                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }} className="animated-status-text"></span>
                        </div>

                        <div className="pill-badge">
                            🚀 Lancement très prochainement
                        </div>

                        <h1 className="hero-title">
                            Votre travail,<br />
                            <span style={{ color: 'var(--accent)', position: 'relative' }}>
                                notre gestion.
                                <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00032 9.5C40.0003 -1.49999 154.5 -2.49999 198 9.5" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </h1>
                        
                        <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.7, fontWeight: 500 }}>
                            Le premier service d'administration externalisée dédié au bâtiment, 3x moins cher et disponible 7j/7. 
                        </p>
                        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '540px', lineHeight: 1.6 }}>
                            <strong>Générez et envoyez vos devis en 2 min par simple vocal Telegram.</strong> Vous l'envoyez au client depuis le chantier, et OptiBoard prend le relais pour tout le reste (facturation, relances, suivi, comptabilité).
                        </p>
                        
                        {/* Trust indicators */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '3rem', opacity: 0.8 }}>
                           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                               <div style={{ display: 'flex' }}>
                                   {/* Star icons */}
                                   {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#eab308', fontSize: '1.25rem' }}>★</span>)}
                               </div>
                               <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>Pensé pour les artisans</span>
                           </div>
                           <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--border)' }}></div>
                           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                               <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>14</span>
                               <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary)' }}>Jours d'essai gratuit</span>
                           </div>
                        </div>
                    </div>

                    {/* Right Side: Waitlist Form */}
                    <div className="hero-form-side">
                        <div className="glassmorphism-card">
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 800 }}>Accès en Avant-Première</h2>
                            <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                Inscrivez-vous sur liste d'attente pour être averti du lancement de la plateforme <strong>OptiBoard</strong> et bénéficier d'un mois à -50%.
                            </p>

                            {status === 'success' ? (
                                <div style={{ textAlign: 'center', padding: '2rem 1rem', animation: 'float 3s ease-in-out infinite' }}>
                                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem', textShadow: '0 4px 10px rgba(22, 101, 52, 0.2)' }}>✅</div>
                                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#166534', fontWeight: 800 }}>Inscription confirmée !</h3>
                                    <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>Vous êtes sur la liste. Pierre vous contactera très vite avec vos accès.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {status === 'error' && (
                                        <div style={{ padding: '0.875rem', background: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center', fontWeight: 500 }}>
                                            Une erreur est survenue. Veuillez réessayer.
                                        </div>
                                    )}
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary)' }}>Prénom & Nom</label>
                                        <input className="input-premium" type="text" id="name" name="name" required placeholder="Jean Dupont" />
                                    </div>
                                    <div style={{ marginBottom: '1.25rem' }}>
                                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary)' }}>Email professionnel</label>
                                        <input className="input-premium" type="email" id="email" name="email" required placeholder="jean@entreprise.fr" />
                                    </div>
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label htmlFor="activity" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary)' }}>Corps de métier</label>
                                        <select className="input-premium" id="activity" name="activity" required style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}>
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
                                    <Button type="submit" variant="primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: '0.75rem', opacity: isLoading ? 0.7 : 1, boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.2)' }} disabled={isLoading}>
                                        {isLoading ? 'Inscription en cours...' : 'Rejoindre la liste d\'attente'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section style={{ maxWidth: '1200px', width: '100%', textAlign: 'center', margin: '2rem 0 4rem 0' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                        Concrètement, qu'est-ce qu'OptiBoard ?
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: 'var(--secondary)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
                        C'est votre plateforme d'administration pensée pour le terrain. Prenez vos frais en photo, consultez votre planning et vos clients sur l'application, et laissez OptiBoard gérer la paperasse en arrière-plan.
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
                        <div className="feature-card">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1.25rem', boxShadow: '0 4px 10px rgba(56, 189, 248, 0.2)' }}>🎙️</div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>1. Vous dictez</h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.7 }}>Sur le chantier, envoyez un simple vocal via Telegram à votre assistant avec les informations du client et les travaux à chiffrer.</p>
                        </div>
                        <div className="feature-card">
                            <div style={{ position: 'absolute', top: '10%', right: '-15%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(250, 204, 21, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.75rem', fontWeight: '800', padding: '0.35rem 0.85rem', borderRadius: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)' }}>Magie</div>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #fef08a, #fde047)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1.25rem', boxShadow: '0 4px 10px rgba(250, 204, 21, 0.2)', position: 'relative', zIndex: 1 }}>⚡️</div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)', position: 'relative', zIndex: 1 }}>2. L'IA génère</h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>En 2 minutes, OptiBoard rédige, chiffre, formate et vous renvoie le devis PDF. Vous validez ou modifiez, et ça part au client.</p>
                        </div>
                        <div className="feature-card">
                            <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1.25rem', boxShadow: '0 4px 10px rgba(74, 222, 128, 0.2)' }}>💻</div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>3. La plateforme gère</h3>
                            <p style={{ color: 'var(--secondary)', lineHeight: 1.7 }}>Retrouvez vos clients, factures et chantiers. <strong>Générez en 1 clic l'export comptable</strong> de tous vos frais et recettes, avec relances automatiques des impayés.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Minimal Footer */}
            <footer style={{ padding: '2.5rem 5%', textAlign: 'center', borderTop: '1px solid rgba(226, 232, 240, 0.5)', color: 'var(--muted)', fontSize: '0.875rem', backgroundColor: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1, backdropFilter: 'blur(5px)' }}>
                <p>&copy; {new Date().getFullYear()} <strong>OptiPro</strong>. OptiBoard est un service exclusif pour les professionnels du bâtiment.</p>
            </footer>
        </div>
    );
}

