'use client';

import { useEffect } from 'react';
import styles from './HomePage.module.css';
import Button from '@/components/ui/Button';
import ProjectCard from '@/components/ui/ProjectCard';
import AuditMockup from '@/components/visuals/AuditMockup';
import AnalyseMockup from '@/components/visuals/AnalyseMockup';
import CreationMockup from '@/components/visuals/CreationMockup';
import AutomationMockup from '@/components/visuals/AutomationMockup';
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

      {/* ===== SERVICE 1: AUDIT ===== */}
      <section className="reveal service-showcase">
        <div className="container">
          <div className="service-showcase-grid">
            <div className="service-showcase-text">
              <span className="service-showcase-label">Étape 1 · Audit</span>
              <h2 className="service-showcase-title">
                On commence par comprendre<br />votre réalité
              </h2>
              <p className="service-showcase-desc">
                Je passe en revue vos outils, vos process quotidiens et
                vos points de friction. Vous repartez avec un diagnostic
                clair et des recommandations priorisées.
              </p>
              <ul className="service-showcase-features">
                <li>Cartographie complète de vos outils</li>
                <li>Identification des points de friction</li>
                <li>Rapport détaillé avec plan d&apos;action</li>
                <li>Remboursé si contrat signé</li>
              </ul>
            </div>
            <div className="service-showcase-visual">
              <AuditMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE 2: ANALYSE ===== */}
      <section className="reveal-right service-showcase">
        <div className="container">
          <div className="service-showcase-grid reversed">
            <div className="service-showcase-text">
              <span className="service-showcase-label">Étape 2 · Analyse</span>
              <h2 className="service-showcase-title">
                Chaque minute perdue<br />a un coût
              </h2>
              <p className="service-showcase-desc">
                À partir de l&apos;audit, je priorise les sujets qui vous
                bloquent ou vous coûtent le plus. On définit ensemble un
                plan d&apos;action concret, adapté à votre budget.
              </p>
              <ul className="service-showcase-features">
                <li>Blocages priorisés par impact</li>
                <li>Estimation des gains de temps</li>
                <li>Solutions recommandées et chiffrées</li>
              </ul>
            </div>
            <div className="service-showcase-visual">
              <AnalyseMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE 3: CRÉATION ===== */}
      <section className="reveal service-showcase">
        <div className="container">
          <div className="service-showcase-grid">
            <div className="service-showcase-text">
              <span className="service-showcase-label">Étape 3 · Création</span>
              <h2 className="service-showcase-title">
                Des outils construits<br />pour votre métier
              </h2>
              <p className="service-showcase-desc">
                Site vitrine, application web, tableau de bord, espace
                client — chaque solution est conçue sur mesure. Pas de
                template générique, pas de compromis.
              </p>
              <ul className="service-showcase-features">
                <li>Design sur mesure, responsive</li>
                <li>Maquettes validées avant développement</li>
                <li>Formation et accompagnement inclus</li>
              </ul>
            </div>
            <div className="service-showcase-visual">
              <CreationMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE 4: AUTOMATISATION ===== */}
      <section className="reveal-left service-showcase">
        <div className="container">
          <div className="service-showcase-grid reversed">
            <div className="service-showcase-text">
              <span className="service-showcase-label">Étape 4 · Automatisation</span>
              <h2 className="service-showcase-title">
                Vos outils se parlent.<br />Le répétitif disparaît.
              </h2>
              <p className="service-showcase-desc">
                Je connecte vos outils entre eux et j&apos;automatise les
                tâches répétitives. Devis, relances, synchronisations,
                exports — tout tourne sans que vous y pensiez.
              </p>
              <ul className="service-showcase-features">
                <li>Workflows automatisés sur mesure</li>
                <li>Intégrations entre vos outils existants</li>
                <li>Zéro intervention manuelle au quotidien</li>
              </ul>
            </div>
            <div className="service-showcase-visual">
              <AutomationMockup />
            </div>
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
