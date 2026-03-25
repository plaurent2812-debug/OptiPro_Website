'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { FormEvent, useState } from 'react';

function ContactForm() {
    const searchParams = useSearchParams();
    const initialPlan = searchParams.get('plan') || '';
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    if (status === 'success') {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--surface)', padding: '3rem 2rem', borderRadius: '1.25rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
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
            {status === 'error' && (
                <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.08)', color: '#991b1b', borderRadius: '0.75rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.25)', fontWeight: 500 }}>
                    ⚠️ Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
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
                <label htmlFor="activity" className="form-label">Corps de métier</label>
                <select id="activity" name="activity" className="form-select">
                    <option value="">Sélectionnez votre métier</option>
                    <option value="plombier">Plombier / Chauffagiste</option>
                    <option value="electricien">Électricien</option>
                    <option value="menuisier">Menuisier / Charpentier</option>
                    <option value="peintre">Peintre / Décorateur</option>
                    <option value="macon">Maçon / Carreleur</option>
                    <option value="multi">Entreprise multi-corps</option>
                    <option value="autre">Autre artisan BTP</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="chantiers" className="form-label">Chantiers par mois (environ)</label>
                <select id="chantiers" name="chantiers" className="form-select">
                    <option value="">Sélectionner</option>
                    <option value="5-10">5-10 chantiers/mois</option>
                    <option value="10-20">10-20 chantiers/mois</option>
                    <option value="20+">20+ ou équipe</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="plan" className="form-label">Plan envisagé</label>
                <select id="plan" name="plan" className="form-select" defaultValue={initialPlan}>
                    <option value="">Je ne sais pas encore</option>
                    <option value="accompagne">Accompagné — 299€/mois</option>
                    <option value="premium">Premium — 499€/mois</option>
                </select>
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
        </form>
    );
}

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)' }}>
            <div className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="section-label">🚀 Démarrer</div>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        Essai gratuit 14 jours
                    </h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                        <strong style={{ color: 'var(--foreground)' }}>1 appel de 30 minutes</strong> avec Pierre —
                        il configure tout, vous êtes opérationnel dès le lendemain.
                    </p>
                </div>

                <Suspense fallback={<div style={{ textAlign: 'center', color: 'var(--muted)' }}>Chargement du formulaire...</div>}>
                    <ContactForm />
                </Suspense>

                <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--muted)' }}>
                    <p style={{ fontSize: '0.95rem' }}>Ou contactez Pierre directement :</p>
                    <p style={{ marginTop: '0.5rem', fontWeight: 700, color: '#fb923c' }}>
                        <a href="mailto:contact@optipro.fr" style={{ color: '#fb923c' }}>contact@optipro.fr</a>
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
