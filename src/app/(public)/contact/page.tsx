'use client';

import { Suspense } from 'react';
import Button from '@/components/ui/Button';
import { FormEvent, useState } from 'react';

function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<string>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const resData = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(resData?.details || resData?.error || 'Erreur inattendue lors de l\'envoi');
            }
            
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error(error);
            setStatus(error.message || 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'success') {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--surface)', padding: '3rem 2rem', borderRadius: '1.25rem', border: '1px solid var(--border)', textAlign: 'center', animation: 'fadeUp 0.5s ease-out' }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  animation: 'numberPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                }}>
                  ✓
                </div>
                <h2 style={{ marginBottom: '1rem' }}>Demande envoyée !</h2>
                <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Merci. Pierre vous contactera dans les 24h pour organiser votre onboarding de 30 minutes.
                </p>
                <Button onClick={() => setStatus('idle')} variant="outline">Envoyer une autre demande</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--surface)', padding: '2.25rem', borderRadius: '1.25rem', border: '1px solid var(--border)' }}>
            {status !== 'idle' && status !== 'success' && (
                <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.08)', color: '#991b1b', borderRadius: '0.75rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.25)', fontWeight: 500 }}>
                    ⚠️ {status}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="name" className="form-label">Nom complet</label>
                <input type="text" id="name" name="name" className="form-input" required placeholder="Jean Dupont" />
            </div>

            <div className="form-group">
                <label htmlFor="company" className="form-label">Nom de l&apos;entreprise</label>
                <input type="text" id="company" name="company" className="form-input" required placeholder="Dupont Plomberie" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input type="tel" id="phone" name="phone" className="form-input" required />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="activity" className="form-label">Secteur d&apos;activité</label>
                <input
                    className="form-input"
                    id="activity"
                    name="activity"
                    placeholder="Votre secteur d'activité"
                />
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">Ce qui vous prend le plus de temps en ce moment</label>
                <textarea id="message" name="message" className="form-textarea" placeholder="Ex : je passe mes soirées à faire des devis, j'ai des impayés depuis 3 mois..."></textarea>
            </div>

            <Button
                type="submit"
                variant="primary"
                style={{ width: '100%', opacity: isLoading ? 0.85 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <span style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255,255,255,0.35)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spinSlow 0.7s linear infinite',
                            flexShrink: 0,
                        }} />
                        Envoi en cours...
                    </>
                ) : (
                    'Démarrer l\'essai gratuit — Pierre me contacte sous 24h'
                )}
            </Button>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                L&apos;audit est notre point d&apos;entrée recommandé. Il est <strong>100% gratuit et sans engagement</strong>.
            </p>
        </form>
    );
}

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)' }}>
            <div className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-label">Contactez-nous</div>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        Parlons de votre projet
                    </h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                        Décrivez votre besoin, Pierre vous recontacte sous 24h.
                    </p>
                </div>

                <Suspense fallback={<div style={{ textAlign: 'center', color: 'var(--muted)' }}>Chargement du formulaire...</div>}>
                    <ContactForm />
                </Suspense>

                <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--muted)' }}>
                    <p style={{ fontSize: '0.95rem' }}>Ou contactez Pierre directement :</p>
                    <p style={{ marginTop: '0.5rem', fontWeight: 700, color: '#fb923c' }}>
                        <a href="mailto:p.laurent@opti-pro.fr" style={{ color: '#fb923c' }}>p.laurent@opti-pro.fr</a>
                    </p>
                    <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                        Réponse garantie sous 24h ·{' '}
                        <a href="https://www.linkedin.com/in/pierre-laurent-809410123" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--secondary)' }}>
                            LinkedIn
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
