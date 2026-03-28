'use client';

import { useEffect } from 'react';
import styles from './HomePage.module.css';
import Button from '@/components/ui/Button';
import ServiceStep from '@/components/ui/ServiceStep';
import ProjectCard from '@/components/ui/ProjectCard';
import AuditCta from '@/components/ui/AuditCta';
import OptiboardTeaser from '@/components/ui/OptiboardTeaser';
import { services } from '@/data/services';
import { projects } from '@/data/projects';

export default function HomePage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!reveals.length) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.1 }
    );
    reveals.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className="container">
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.03)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.04)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className={styles.heroBadge}>
                Conseil · Développement · Automatisation
              </span>
              <h1 className={styles.heroTitle}>
                Vos outils ralentissent votre activité ?{' '}
                <span className={styles.heroAccent}>On règle ça.</span>
              </h1>
              <p className={styles.heroSub}>
                Audit de vos process, création de sites et d&apos;outils sur
                mesure, automatisation — Pierre analyse vos blocages admin et
                construit les solutions adaptées.
              </p>
              <div className={styles.heroCtas}>
                <Button href="/contact" variant="primary">
                  Demander un contact
                </Button>
                <Button href="/services" variant="outline">
                  Voir les services
                </Button>
              </div>
            </div>

            {/* Mini timeline visual */}
            <div className={styles.heroVisual}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardTitle}>
                  <span style={{ color: '#10b981', marginRight: '0.5rem', fontFamily: 'monospace' }}>$</span>
                  Démarche OptiPro
                </div>
                {services.map((s) => (
                  <div key={s.id} className={styles.heroStep}>
                    <div className={styles.heroStepNum}>{s.number}</div>
                    <div>
                      <strong>{s.title}</strong>
                      <p>{s.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== METRICS STRIP ===== */}
      <section style={{
        padding: '3rem 0',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            flexWrap: 'wrap',
          }}>
            {[
              { value: '50+', label: 'automatisations livrées' },
              { value: '12', label: 'clients accompagnés' },
              { value: '98%', label: 'de satisfaction' },
            ].map((metric) => (
              <div key={metric.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  lineHeight: 1,
                  marginBottom: '0.35rem',
                  fontFamily: 'var(--font-display), sans-serif',
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--muted)',
                  fontWeight: 500,
                }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== LE PROBLÈME ===== */}
      <section className="reveal-left" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="problem-grid">
            <div>
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                Vous perdez du temps sur des tâches qui ne sont pas votre métier
              </h2>
              <p
                style={{
                  color: 'var(--secondary)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                }}
              >
                Et quand un outil ne marche pas, personne n&apos;est là pour le régler.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Outils mal adaptés à votre activité',
                'Tableurs à rallonge, process manuels',
                'Relances oubliées, factures en retard',
                "Des heures perdues sur l'admin",
              ].map((item) => (
                <div key={item} className="pain-point">
                  <span style={{ color: 'var(--danger)', fontSize: '1.1rem', flexShrink: 0 }}>✕</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== DÉMARCHE 4 ÉTAPES ===== */}
      <section
        className="reveal"
        style={{
          padding: '5rem 0',
          background: 'var(--background)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--primary)',
                marginBottom: '0.75rem',
              }}
            >
              Une démarche en 4 étapes
            </h2>
            <p style={{ color: 'var(--secondary)', fontSize: '1.05rem' }}>
              De l&apos;audit à l&apos;automatisation, chaque étape est
              concrète et mesurable.
            </p>
          </div>
          <div className="timeline">
            {services.map((s) => (
              <ServiceStep key={s.id} step={s} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== RÉALISATIONS ===== */}
      <section className="reveal-right" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--primary)',
                marginBottom: '0.75rem',
              }}
            >
              Réalisations
            </h2>
            <p style={{ color: 'var(--secondary)', fontSize: '1.05rem' }}>
              Des solutions concrètes, des résultats mesurables.
            </p>
          </div>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} compact />
          ))}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Button href="/realisations" variant="outline">
              Voir les détails
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CTA AUDIT ===== */}
      <section className="reveal">
        <div className="container">
          <AuditCta />
        </div>
      </section>

      {/* ===== TEASING OPTIBOARD ===== */}
      <section className="reveal" style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          <OptiboardTeaser />
        </div>
      </section>
    </main>
  );
}
