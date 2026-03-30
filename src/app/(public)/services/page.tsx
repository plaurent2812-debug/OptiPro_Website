import type { Metadata } from 'next';
import ServiceStep from '@/components/ui/ServiceStep';
import AuditCta from '@/components/ui/AuditCta';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Audit, analyse, création sur mesure et automatisation — découvrez la démarche OptiPro pour transformer vos outils et process.',
};

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '6rem' }}>
      {/* Hero */}
      <section style={{ padding: '3rem 0 4rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--primary)',
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
            }}
          >
            Une démarche complète, adaptée à votre métier
          </h1>
          <p
            style={{
              color: 'var(--secondary)',
              fontSize: '1.15rem',
              lineHeight: 1.7,
            }}
          >
            Pas de solution toute faite. On part de votre réalité, on identifie
            ce qui bloque, et on construit ce qu&apos;il vous faut.
          </p>
        </div>
      </section>

      {/* Timeline détaillée */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div className="timeline">
            {services.map((s) => (
              <ServiceStep key={s.id} step={s} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* Qui est Pierre */}
      <section style={{ padding: '3rem 0', background: 'var(--background)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="pierre-section">
            <div className="pierre-avatar">👨‍💻</div>
            <div className="pierre-content">
              <h3>Pierre Laurent</h3>
              <p style={{ marginBottom: '0.75rem' }}>
                Fondateur d&apos;OptiPro, j&apos;accompagne artisans, TPE et
                indépendants dans leur transformation numérique. Mon approche :
                comprendre votre métier avant de proposer des solutions.
              </p>
              <p>
                Un interlocuteur unique du début à la fin. Pas de commercial,
                pas de sous-traitance — c&apos;est moi qui analyse, conçoit et
                développe vos outils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Audit */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container">
          <AuditCta />
        </div>
      </section>
    </main>
  );
}
