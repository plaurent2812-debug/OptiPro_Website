'use client';

import { useState } from 'react';

export default function OptiboardTeaser() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Waitlist OptiBoard',
          email,
          message: 'Inscription liste d\'attente OptiBoard',
        }),
      });
      setSubmitted(true);
    } catch {
      // silent fail — not critical
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="teaser-section">
      <span className="teaser-badge">Bientôt disponible</span>
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: 'var(--primary)',
          marginBottom: '0.75rem',
        }}
      >
        OptiBoard
      </h2>
      <p
        style={{
          color: 'var(--secondary)',
          maxWidth: '500px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.7,
        }}
      >
        Un outil d&apos;administration automatisée pour les artisans du BTP.
        Devis par Telegram, synchronisation Pennylane, planning chantiers —
        le tout piloté par l&apos;IA.
      </p>

      {/* Blurred mockup placeholder */}
      <div className="teaser-mockup">
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            padding: '2rem',
            borderRadius: '12px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', color: '#475569' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              📊
            </div>
            <div style={{ fontSize: '0.9rem' }}>Aperçu OptiBoard</div>
          </div>
        </div>
      </div>

      {submitted ? (
        <p
          style={{
            color: 'var(--success)',
            fontWeight: 600,
          }}
        >
          Merci ! Vous serez informé du lancement.
        </p>
      ) : (
        <form className="teaser-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : 'Me prévenir'}
          </button>
        </form>
      )}
    </div>
  );
}
