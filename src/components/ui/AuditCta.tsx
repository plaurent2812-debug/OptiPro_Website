'use client';

import { useRef, useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function AuditCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="audit-cta"
      style={{
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Animated background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      {/* Decorative corner accent */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(249, 115, 22, 0.08)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2>Commencez par un audit</h2>
        <p>
          On regarde ensemble vos outils et vos process. Vous repartez avec un
          diagnostic clair et des recommandations concrètes.
        </p>
        <p className="audit-cta-note">Remboursé si contrat signé</p>
        <Button href="/contact" variant="primary">
          Demander un contact
        </Button>
      </div>
    </div>
  );
}
