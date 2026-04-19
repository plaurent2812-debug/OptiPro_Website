'use client';

import { Suspense, useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';

type Cible = 'artisans' | 'tpe' | 'projets' | 'abonnement' | 'default';

interface CibleConfig {
    intro: string;
    projectLabel: string;
    projectPlaceholder: string;
    showBudget: boolean;
    showUrgence: boolean;
    ctaLabel: string;
    footnote: string;
}

const cibleConfigs: Record<Cible, CibleConfig> = {
    artisans: {
        intro: 'Vous êtes artisan, commerçant ou indépendant. Dites-nous ce qui vous fait perdre du temps — on regarde ensemble.',
        projectLabel: 'Ce qui vous prend le plus de temps en ce moment',
        projectPlaceholder: 'Ex : je passe mes soirées à faire des devis, j\'ai des impayés depuis 3 mois, je n\'ai pas de site visible sur Google...',
        showBudget: true,
        showUrgence: true,
        ctaLabel: 'Envoyer ma demande — Pierre me recontacte sous 24h',
        footnote: 'Premier échange de 30 min gratuit et sans engagement.',
    },
    tpe: {
        intro: 'Vous dirigez une TPE ou une petite équipe. Parlons concrètement de ce que vous voulez structurer.',
        projectLabel: 'Décrivez votre besoin',
        projectPlaceholder: 'Ex : je veux un site pro qui génère des contacts, un outil pour automatiser mes devis, une application métier dédiée...',
        showBudget: true,
        showUrgence: true,
        ctaLabel: 'Discuter de mon projet — Réponse sous 24h',
        footnote: 'Premier échange de 30 min gratuit. Devis chiffré après cadrage.',
    },
    projets: {
        intro: 'Pour les projets complexes, un audit approfondi (490€ HT, déduit si mission signée) garantit un devis précis. Décrivez-nous votre projet.',
        projectLabel: 'Présentez votre projet',
        projectPlaceholder: 'Ex : je veux un site complet avec espace client et catalogue, une web app métier, une intégration complète avec ma compta...',
        showBudget: true,
        showUrgence: true,
        ctaLabel: 'Cadrer mon projet — Pierre me recontacte sous 24h',
        footnote: 'Premier échange de 30 min offert pour évaluer la pertinence de l\'audit approfondi.',
    },
    abonnement: {
        intro: 'Vous êtes déjà client ou vous envisagez l\'abonnement Suivi & Évolution (180€/mois HT). Dites-nous comment on peut vous accompagner.',
        projectLabel: 'Ce que vous souhaitez mettre en place ou faire évoluer',
        projectPlaceholder: 'Ex : je veux un suivi régulier de mon site, des évolutions mensuelles, un support prioritaire...',
        showBudget: false,
        showUrgence: false,
        ctaLabel: 'Demander un devis d\'abonnement',
        footnote: 'Engagement 6 mois minimum. Résiliable ensuite au mois.',
    },
    default: {
        intro: 'Décrivez votre besoin, Pierre vous recontacte sous 24h.',
        projectLabel: 'Ce qui vous prend le plus de temps en ce moment',
        projectPlaceholder: 'Ex : je passe mes soirées à faire des devis, j\'ai des impayés depuis 3 mois...',
        showBudget: true,
        showUrgence: true,
        ctaLabel: 'Envoyer ma demande — Pierre me contacte sous 24h',
        footnote: 'Premier échange de 30 min gratuit et sans engagement.',
    },
};

const cibleLabels: Record<Cible, string> = {
    artisans: '🔧 Artisan / Indépendant',
    tpe: '🏢 TPE / PME',
    projets: '🚀 Projet sur mesure',
    abonnement: '🔄 Abonnement Suivi & Évolution',
    default: 'Demande générale',
};

function ContactForm() {
    const searchParams = useSearchParams();
    const rawCible = searchParams.get('cible') as Cible | null;
    const cible: Cible = rawCible && cibleConfigs[rawCible] ? rawCible : 'default';
    const config = cibleConfigs[cible];

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
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : 'error';
            setStatus(message);
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
                    Merci. Pierre vous contactera sous 24h pour organiser un premier échange de 30 minutes.
                </p>
                <Button onClick={() => setStatus('idle')} variant="outline">Envoyer une autre demande</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '620px', margin: '0 auto', background: 'var(--surface)', padding: '2.25rem', borderRadius: '1.25rem', border: '1px solid var(--border)' }}>
            {/* Badge cible */}
            {cible !== 'default' && (
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.9rem',
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                }}>
                    {cibleLabels[cible]}
                </div>
            )}

            <p style={{ color: 'var(--secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                {config.intro}
            </p>

            {status !== 'idle' && status !== 'success' && (
                <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.08)', color: '#991b1b', borderRadius: '0.75rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(239,68,68,0.25)', fontWeight: 500 }}>
                    ⚠️ {status}
                </div>
            )}

            {/* Champ caché qui remonte la cible à l'API */}
            <input type="hidden" name="cible" value={cible} />

            <div className="form-group">
                <label htmlFor="name" className="form-label">Nom complet *</label>
                <input type="text" id="name" name="name" className="form-input" required placeholder="Jean Dupont" />
            </div>

            <div className="form-group">
                <label htmlFor="company" className="form-label">Nom de l&apos;entreprise</label>
                <input type="text" id="company" name="company" className="form-input" placeholder="Dupont Plomberie" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="email" id="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input type="tel" id="phone" name="phone" className="form-input" />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="activity" className="form-label">Secteur d&apos;activité</label>
                <input
                    className="form-input"
                    id="activity"
                    name="activity"
                    placeholder="Ex : plomberie, e-commerce, restauration..."
                />
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">{config.projectLabel}</label>
                <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder={config.projectPlaceholder}
                    rows={4}
                ></textarea>
            </div>

            {config.showBudget && (
                <div className="form-group">
                    <label htmlFor="budget" className="form-label">Enveloppe budgétaire envisagée</label>
                    <select id="budget" name="budget" className="form-input">
                        <option value="">— Sélectionnez —</option>
                        <option value="< 500 €">Moins de 500 €</option>
                        <option value="500 - 1 500 €">500 à 1 500 €</option>
                        <option value="1 500 - 3 000 €">1 500 à 3 000 €</option>
                        <option value="3 000 - 7 000 €">3 000 à 7 000 €</option>
                        <option value="7 000 - 15 000 €">7 000 à 15 000 €</option>
                        <option value="> 15 000 €">Plus de 15 000 €</option>
                        <option value="À définir ensemble">Je ne sais pas encore</option>
                    </select>
                </div>
            )}

            {config.showUrgence && (
                <div className="form-group">
                    <label htmlFor="urgence" className="form-label">Quand souhaitez-vous démarrer ?</label>
                    <select id="urgence" name="urgence" className="form-input">
                        <option value="">— Sélectionnez —</option>
                        <option value="Immédiat (moins d'1 mois)">Immédiat (moins d&apos;1 mois)</option>
                        <option value="Dans 1 à 3 mois">Dans 1 à 3 mois</option>
                        <option value="Dans 3 à 6 mois">Dans 3 à 6 mois</option>
                        <option value="Pas pressé / je me renseigne">Pas pressé, je me renseigne</option>
                    </select>
                </div>
            )}

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
                    config.ctaLabel
                )}
            </Button>
            <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                {config.footnote}
            </p>
        </form>
    );
}

export default function ContactPageClient() {
    const [titleReady, setTitleReady] = useState(false);

    useEffect(() => {
        setTitleReady(true);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: 'var(--header-height)' }}>
            <div className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: titleReady ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                    <div className="section-label">Contactez-nous</div>
                    <h1 style={{ fontSize: '2.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        Parlons de votre projet
                    </h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                        Quelques informations pour préparer notre échange.
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
