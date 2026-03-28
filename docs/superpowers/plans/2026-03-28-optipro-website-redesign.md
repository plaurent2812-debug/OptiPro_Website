# OptiPro Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the OptiPro website from an OptiBoard SaaS product page to a consulting & custom development services site.

**Architecture:** Content-first refonte. Replace all OptiBoard-specific data, pages, and components with new OptiPro positioning. Keep the existing tech stack (Next.js, CSS Modules, Resend), design system (navy + orange palette, Outfit font), and component patterns (inline styles + CSS modules). New data files drive new components; old OptiBoard-specific files are removed.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, CSS Modules, Resend (email API)

**Spec:** `docs/superpowers/specs/2026-03-28-optipro-website-redesign-design.md`

---

## File Map

### New files
| File | Responsibility |
|------|---------------|
| `src/data/services.ts` | 4 service steps (audit, analyse, création, automatisation) |
| `src/data/projects.ts` | 2 portfolio project entries |
| `src/components/ui/ServiceStep.tsx` | Single timeline step in the vertical timeline |
| `src/components/ui/ProjectCard.tsx` | Portfolio project card (context, problem, solution, result) |
| `src/components/ui/AuditCta.tsx` | Reusable CTA banner "Commencez par un audit" |
| `src/components/ui/OptiboardTeaser.tsx` | OptiBoard teasing section with blurred mockup + waitlist form |
| `src/app/realisations/page.tsx` | New portfolio page |

### Modified files
| File | What changes |
|------|-------------|
| `src/app/layout.tsx` | Metadata: OptiPro instead of OptiBoard |
| `src/app/globals.css` | Add timeline, teaser, audit-cta styles |
| `src/app/page.tsx` | Complete rewrite — new hero + 5 sections |
| `src/app/HomePage.module.css` | Adapt hero styles for new layout |
| `src/app/services/page.tsx` | Rewrite — timeline + "Qui est Pierre" + CTA |
| `src/app/contact/page.tsx` | Adapt form fields (remove BTP-specific selects) |
| `src/app/api/contact/route.ts` | Adapt to new form fields |
| `src/components/layout/Header.tsx` | New nav links: Services, Réalisations, Contact |
| `src/components/layout/Footer.tsx` | New content, remove OptiBoard mentions |
| `src/app/sitemap.ts` | Update routes |
| `src/app/robots.ts` | No change expected, verify only |

### Deleted files
| File | Why |
|------|-----|
| `src/data/sectors.ts` | BTP-specific sectors no longer used |
| `src/data/packs.ts` | OptiBoard pricing plans no longer used |
| `src/data/addons.ts` | OptiBoard addons no longer used |
| `src/components/ui/SectorCard.tsx` | Replaced by ProjectCard |
| `src/components/ui/SectorCard.module.css` | Goes with SectorCard |
| `src/components/ui/PricingCard.tsx` | OptiBoard-specific |
| `src/components/ui/PackCard.tsx` | OptiBoard-specific |
| `src/components/ui/PackCard.module.css` | Goes with PackCard |
| `src/components/ui/AddonCard.tsx` | OptiBoard-specific |
| `src/components/ui/AddonCard.module.css` | Goes with AddonCard |
| `src/app/sectors/page.tsx` | Page removed |
| `src/app/about/page.tsx` | Content merged into /services |
| `src/data/__tests__/data-integrity.test.ts` | Tests old data files, rewrite needed |
| `src/components/ui/__tests__/*` | Tests for removed components |

---

## Task 1: New data layer

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create services data file**

```typescript
// src/data/services.ts
export interface ServiceStep {
  id: string;
  number: number;
  icon: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  deliverables: string[];
  note?: string;
}

export const services: ServiceStep[] = [
  {
    id: 'audit',
    number: 1,
    icon: '🔍',
    title: 'Audit de l\'existant',
    shortDescription: 'Analyse de vos outils, process et points de friction.',
    longDescription: 'Je passe en revue vos outils actuels, vos process quotidiens et vos points de friction. L\'objectif : comprendre précisément où vous perdez du temps et de l\'énergie, et identifier les leviers d\'amélioration.',
    deliverables: [
      'Cartographie de vos outils et process',
      'Identification des points de friction',
      'Rapport détaillé avec recommandations priorisées',
    ],
    note: 'Remboursé si contrat signé',
  },
  {
    id: 'analyse',
    number: 2,
    icon: '📊',
    title: 'Analyse des blocages',
    shortDescription: 'Identification des tâches chronophages et opportunités d\'amélioration.',
    longDescription: 'À partir de l\'audit, je priorise les sujets admin qui vous bloquent ou vous coûtent le plus de temps. On définit ensemble un plan d\'action concret, avec les solutions adaptées à votre budget et vos contraintes.',
    deliverables: [
      'Liste priorisée des blocages identifiés',
      'Plan d\'action avec solutions recommandées',
      'Estimation des gains de temps attendus',
    ],
  },
  {
    id: 'creation',
    number: 3,
    icon: '🛠️',
    title: 'Création sur mesure',
    shortDescription: 'Sites web, web apps, tableaux de bord — conçus pour votre activité.',
    longDescription: 'Je conçois et développe les outils dont vous avez besoin : site vitrine, application web dédiée, tableau de bord, espace client. Pas de template générique — chaque solution est construite pour votre métier.',
    deliverables: [
      'Maquettes et validation avant développement',
      'Développement sur mesure',
      'Mise en production et formation',
    ],
  },
  {
    id: 'automatisation',
    number: 4,
    icon: '⚡',
    title: 'Automatisation',
    shortDescription: 'Workflows, intégrations, synchros — le répétitif disparaît.',
    longDescription: 'Je connecte vos outils entre eux et j\'automatise les tâches répétitives : envoi de documents, relances, synchronisations, exports comptables. Vous gagnez du temps chaque jour sans y penser.',
    deliverables: [
      'Workflows automatisés entre vos outils',
      'Intégrations et synchronisations',
      'Documentation et support',
    ],
  },
];
```

- [ ] **Step 2: Create projects data file**

```typescript
// src/data/projects.ts
export interface Project {
  id: string;
  title: string;
  client: string;
  sector: string;
  context: string;
  problem: string;
  solution: string;
  results: string[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'projet-1',
    title: 'Projet 1',
    client: 'Client 1',
    sector: 'Secteur',
    context: 'Contexte du projet à compléter.',
    problem: 'Problème rencontré à compléter.',
    solution: 'Solution apportée à compléter.',
    results: ['Résultat concret 1', 'Résultat concret 2'],
    tags: ['Site web', 'Automatisation'],
  },
  {
    id: 'projet-2',
    title: 'Projet 2',
    client: 'Client 2',
    sector: 'Secteur',
    context: 'Contexte du projet à compléter.',
    problem: 'Problème rencontré à compléter.',
    solution: 'Solution apportée à compléter.',
    results: ['Résultat concret 1', 'Résultat concret 2'],
    tags: ['Web app', 'Workflow'],
  },
];
```

Note: The project data uses placeholder content. The user will fill in their real project details after implementation.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/data/services.ts src/data/projects.ts`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/data/services.ts src/data/projects.ts
git commit -m "feat: add services and projects data files for OptiPro redesign"
```

---

## Task 2: Add new CSS styles

**Files:**
- Modify: `src/app/globals.css` (append new sections)

- [ ] **Step 1: Add timeline styles to globals.css**

Append after the existing `.plan-card` section (around line 380):

```css
/* ===== Timeline ===== */
.timeline {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-step {
  position: relative;
  padding-left: 72px;
  margin-bottom: 3rem;
}

.timeline-step:last-child {
  margin-bottom: 0;
}

.timeline-number {
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
  z-index: 1;
}

.timeline-content h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: var(--secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.timeline-deliverables {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-deliverables li {
  position: relative;
  padding-left: 1.5rem;
  color: var(--secondary);
  margin-bottom: 0.35rem;
  font-size: 0.95rem;
}

.timeline-deliverables li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: 700;
}

.timeline-note {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.35rem 0.75rem;
  background: rgba(249, 115, 22, 0.1);
  color: var(--accent);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* ===== Audit CTA Banner ===== */
.audit-cta {
  background: linear-gradient(135deg, var(--primary) 0%, #1e293b 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  margin: 4rem 0;
}

.audit-cta h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: white;
}

.audit-cta p {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.audit-cta .audit-cta-note {
  color: var(--accent);
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

/* ===== OptiBoard Teaser ===== */
.teaser-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin: 4rem 0;
}

.teaser-badge {
  display: inline-block;
  padding: 0.35rem 1rem;
  background: rgba(249, 115, 22, 0.1);
  color: var(--accent);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.teaser-mockup {
  max-width: 500px;
  margin: 0 auto 2rem;
  border-radius: 12px;
  overflow: hidden;
  filter: blur(4px);
  opacity: 0.7;
  transition: filter 0.3s, opacity 0.3s;
}

.teaser-mockup:hover {
  filter: blur(2px);
  opacity: 0.85;
}

.teaser-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  gap: 0.5rem;
}

.teaser-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  background: var(--background);
  color: var(--primary);
}

.teaser-form input:focus {
  outline: none;
  border-color: var(--accent);
}

.teaser-form button {
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.teaser-form button:hover {
  opacity: 0.9;
}

/* ===== Project Card ===== */
.project-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 3rem;
}

.project-card-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border);
}

.project-card-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.25rem;
}

.project-card-meta {
  color: var(--muted);
  font-size: 0.9rem;
}

.project-card-body {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.project-card-section h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.project-card-section p {
  color: var(--secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

.project-card-results {
  padding: 1.5rem 2rem;
  background: rgba(249, 115, 22, 0.04);
  border-top: 1px solid var(--border);
}

.project-card-results h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.project-card-tags {
  display: flex;
  gap: 0.5rem;
  padding: 0 2rem 1.5rem;
}

.project-card-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(249, 115, 22, 0.1);
  color: var(--accent);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .project-card-body {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .teaser-form {
    flex-direction: column;
  }

  .timeline::before {
    left: 18px;
  }

  .timeline-number {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .timeline-step {
    padding-left: 56px;
  }

  .audit-cta {
    padding: 2rem 1.25rem;
  }

  .audit-cta h2 {
    font-size: 1.5rem;
  }
}

/* ===== Pierre Section ===== */
.pierre-section {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 3rem 0;
}

.pierre-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  flex-shrink: 0;
}

.pierre-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.pierre-content p {
  color: var(--secondary);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .pierre-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
}
```

- [ ] **Step 2: Verify CSS is valid**

Run: `npm run build`
Expected: Build succeeds (CSS parsing OK)

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add timeline, project card, audit CTA, teaser, and pierre section styles"
```

---

## Task 3: New UI components

**Files:**
- Create: `src/components/ui/ServiceStep.tsx`
- Create: `src/components/ui/ProjectCard.tsx`
- Create: `src/components/ui/AuditCta.tsx`
- Create: `src/components/ui/OptiboardTeaser.tsx`

- [ ] **Step 1: Create ServiceStep component**

```tsx
// src/components/ui/ServiceStep.tsx
import { ServiceStep as ServiceStepType } from '@/data/services';

interface Props {
  step: ServiceStepType;
  detailed?: boolean;
}

export default function ServiceStep({ step, detailed = false }: Props) {
  return (
    <div className="timeline-step">
      <div className="timeline-number">{step.number}</div>
      <div className="timeline-content">
        <h3>
          {step.icon} {step.title}
        </h3>
        <p>{detailed ? step.longDescription : step.shortDescription}</p>
        {detailed && step.deliverables.length > 0 && (
          <ul className="timeline-deliverables">
            {step.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
        {step.note && <span className="timeline-note">{step.note}</span>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create ProjectCard component**

```tsx
// src/components/ui/ProjectCard.tsx
import { Project } from '@/data/projects';

interface Props {
  project: Project;
  compact?: boolean;
}

export default function ProjectCard({ project, compact = false }: Props) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3>{project.title}</h3>
        <p className="project-card-meta">
          {project.client} · {project.sector}
        </p>
      </div>

      <div className="project-card-body">
        <div className="project-card-section">
          <h4>Contexte</h4>
          <p>{project.context}</p>
        </div>
        <div className="project-card-section">
          <h4>{compact ? 'Solution' : 'Problème'}</h4>
          <p>{compact ? project.solution : project.problem}</p>
        </div>
        {!compact && (
          <div className="project-card-section">
            <h4>Solution</h4>
            <p>{project.solution}</p>
          </div>
        )}
      </div>

      <div className="project-card-results">
        <h4>Résultats</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {project.results.map((r) => (
            <li
              key={r}
              style={{
                paddingLeft: '1.5rem',
                position: 'relative',
                color: 'var(--secondary)',
                marginBottom: '0.25rem',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--accent)',
                  fontWeight: 700,
                }}
              >
                →
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="project-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-card-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create AuditCta component**

```tsx
// src/components/ui/AuditCta.tsx
import Button from '@/components/ui/Button';

export default function AuditCta() {
  return (
    <div className="audit-cta">
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
  );
}
```

- [ ] **Step 4: Create OptiboardTeaser component**

```tsx
// src/components/ui/OptiboardTeaser.tsx
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
```

- [ ] **Step 5: Verify build compiles**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/ServiceStep.tsx src/components/ui/ProjectCard.tsx src/components/ui/AuditCta.tsx src/components/ui/OptiboardTeaser.tsx
git commit -m "feat: add ServiceStep, ProjectCard, AuditCta, OptiboardTeaser components"
```

---

## Task 4: Update layout — Header, Footer, metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update layout.tsx metadata**

In `src/app/layout.tsx`, replace the metadata object:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'OptiPro — Conseil & développement sur mesure',
    template: '%s | OptiPro',
  },
  description:
    'Audit, création de sites et web apps sur mesure, automatisation — OptiPro accompagne artisans, TPE et indépendants dans leur transformation numérique.',
};
```

- [ ] **Step 2: Update Header.tsx navigation**

Replace the nav links array and CTA in `src/components/layout/Header.tsx`. The existing nav structure uses inline `<a>` and `<Link>` elements. Replace them with:

Navigation links (replace all existing nav link `<Link>` elements in both desktop and mobile nav):
```tsx
<Link href="/services" ...>Services</Link>
<Link href="/realisations" ...>Réalisations</Link>
<Link href="/contact" ...>Contact</Link>
```

CTA button text change — replace:
```
Essai gratuit 14 jours
```
with:
```
Demander un contact
```

Remove the nav links to `/sectors` and `/about`. Keep the same styling, active-link detection logic, and mobile menu behavior.

- [ ] **Step 3: Update Footer.tsx**

Replace the footer content in `src/components/layout/Footer.tsx`:

Description text — replace:
```
Admin chantier automatisée via Telegram et Pennylane.
```
with:
```
Conseil & développement sur mesure pour artisans, TPE et indépendants.
```

Navigation links — replace existing links with:
```tsx
<Link href="/services">Services</Link>
<Link href="/realisations">Réalisations</Link>
<Link href="/contact">Contact</Link>
```

Remove the "Intégrations" section (Pennylane, Telegram, Stripe badges).

Copyright text — replace any mention of "OptiBoard" with "OptiPro".

Keep: Pierre Laurent contact info, LinkedIn link, legal links (Mentions légales, Confidentialité).

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat: update layout, header, and footer for OptiPro repositioning"
```

---

## Task 5: Rewrite Home page

**Files:**
- Modify: `src/app/page.tsx` (complete rewrite)
- Modify: `src/app/HomePage.module.css` (adapt)

- [ ] **Step 1: Rewrite page.tsx**

Replace the entire content of `src/app/page.tsx` with:

```tsx
// src/app/page.tsx
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
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.15 }
    );
    reveals.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className="container">
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
                <div className={styles.heroCardTitle}>Démarche OptiPro</div>
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

      {/* ===== LE PROBLÈME ===== */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--primary)',
              marginBottom: '1.5rem',
            }}
          >
            Vous perdez du temps sur des tâches qui ne sont pas votre métier
          </h2>
          <p
            style={{
              color: 'var(--secondary)',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Outils mal adaptés, tableurs à rallonge, process manuels,
            relances oubliées. Résultat : vous passez des heures sur
            l&apos;admin au lieu de vous concentrer sur votre activité. Et
            quand un outil ne marche pas, personne n&apos;est là pour le
            régler.
          </p>
        </div>
      </section>

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

      {/* ===== RÉALISATIONS ===== */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
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
```

- [ ] **Step 2: Update HomePage.module.css**

Replace the entire content of `src/app/HomePage.module.css` with styles for the new hero layout:

```css
/* src/app/HomePage.module.css */

/* ===== Hero ===== */
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  padding: 6rem 0 4rem;
  background: var(--primary);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 80% 50%,
    rgba(249, 115, 22, 0.08) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.heroGrid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 4rem;
  align-items: center;
}

.heroText {
  animation: pageEnter 0.6s ease-out;
}

.heroBadge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--accent);
  border: 1px solid rgba(249, 115, 22, 0.3);
  margin-bottom: 1.5rem;
}

.heroTitle {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: white;
  margin-bottom: 1.25rem;
}

.heroAccent {
  color: var(--accent);
}

.heroSub {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #94a3b8;
  margin-bottom: 2rem;
  max-width: 520px;
}

.heroCtas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Hero visual — mini timeline card */
.heroVisual {
  animation: pageEnter 0.6s ease-out 0.15s both;
}

.heroCard {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 16px;
  padding: 1.75rem;
  backdrop-filter: blur(12px);
}

.heroCardTitle {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1.25rem;
}

.heroStep {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.heroStep:last-child {
  margin-bottom: 0;
}

.heroStepNum {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 2px;
}

.heroStep strong {
  display: block;
  font-size: 0.95rem;
  color: #e2e8f0;
  margin-bottom: 0.15rem;
}

.heroStep p {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .heroGrid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .heroTitle {
    font-size: 2rem;
  }

  .heroCard {
    max-width: 380px;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: auto;
    padding: 5rem 0 3rem;
  }

  .heroTitle {
    font-size: 1.65rem;
  }

  .heroSub {
    font-size: 1rem;
  }

  .heroCtas {
    flex-direction: column;
  }
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds, home page renders

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/HomePage.module.css
git commit -m "feat: rewrite home page with OptiPro positioning"
```

---

## Task 6: Rewrite Services page

**Files:**
- Modify: `src/app/services/page.tsx` (complete rewrite)

- [ ] **Step 1: Rewrite services/page.tsx**

Replace the entire content of `src/app/services/page.tsx`:

```tsx
// src/app/services/page.tsx
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: rewrite services page with timeline and Pierre section"
```

---

## Task 7: Create Réalisations page

**Files:**
- Create: `src/app/realisations/page.tsx`

- [ ] **Step 1: Create realisations/page.tsx**

```tsx
// src/app/realisations/page.tsx
import type { Metadata } from 'next';
import ProjectCard from '@/components/ui/ProjectCard';
import AuditCta from '@/components/ui/AuditCta';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Réalisations',
  description:
    'Découvrez les projets réalisés par OptiPro — sites sur mesure, web apps, automatisations pour artisans et TPE.',
};

export default function RealisationsPage() {
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
            Réalisations
          </h1>
          <p
            style={{
              color: 'var(--secondary)',
              fontSize: '1.15rem',
              lineHeight: 1.7,
            }}
          >
            Chaque projet part d&apos;un problème concret et aboutit à une
            solution sur mesure. Voici quelques exemples.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding: '0 0 3rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <AuditCta />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds, page accessible at /realisations

- [ ] **Step 3: Commit**

```bash
git add src/app/realisations/page.tsx
git commit -m "feat: add realisations page"
```

---

## Task 8: Update Contact page

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/api/contact/route.ts`

- [ ] **Step 1: Update contact/page.tsx form fields**

In `src/app/contact/page.tsx`, make these changes:

Replace the page metadata title from `Contact | OptiBoard` pattern to use the new template.

Replace the `<h1>` content:
```
Parlons de votre projet
```

Replace the subtitle `<p>`:
```
Décrivez votre besoin, Pierre vous recontacte sous 24h.
```

Remove the "activité" select that lists BTP-specific trades. Replace with a simple text input:
```tsx
<input
  className="form-input"
  name="activity"
  placeholder="Votre secteur d'activité"
  value={form.activity}
  onChange={handleChange}
/>
```

Remove the "chantiers" select (monthly jobs count — OptiBoard-specific).

Remove the "plan" select (Accompagné/Premium — OptiBoard-specific).

Update the `form` state initial values: remove `chantiers` and `plan` fields.

Add a mention below the form:
```tsx
<p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
  L&apos;audit est notre point d&apos;entrée recommandé. Il est remboursé si vous
  signez un contrat.
</p>
```

- [ ] **Step 2: Update api/contact/route.ts**

In `src/app/api/contact/route.ts`, update the email template to remove `chantiers` and `plan` fields. Keep: name, company, email, phone, activity, message.

Update the email subject from any OptiBoard reference to:
```
Nouveau contact OptiPro — ${name}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx src/app/api/contact/route.ts
git commit -m "feat: update contact page and API for OptiPro positioning"
```

---

## Task 9: Update sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update sitemap.ts routes**

Replace the sitemap entries. Remove `/sectors` and `/about`. Add `/realisations`:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://optipro.fr';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/realisations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: update sitemap with new routes"
```

---

## Task 10: Remove old files

**Files:**
- Delete: `src/data/sectors.ts`
- Delete: `src/data/packs.ts`
- Delete: `src/data/addons.ts`
- Delete: `src/components/ui/SectorCard.tsx`
- Delete: `src/components/ui/SectorCard.module.css`
- Delete: `src/components/ui/PricingCard.tsx`
- Delete: `src/components/ui/PackCard.tsx`
- Delete: `src/components/ui/PackCard.module.css`
- Delete: `src/components/ui/AddonCard.tsx`
- Delete: `src/components/ui/AddonCard.module.css`
- Delete: `src/app/sectors/page.tsx`
- Delete: `src/app/about/page.tsx`

- [ ] **Step 1: Delete old data files**

```bash
git rm src/data/sectors.ts src/data/packs.ts src/data/addons.ts
```

- [ ] **Step 2: Delete old components**

```bash
git rm src/components/ui/SectorCard.tsx src/components/ui/SectorCard.module.css
git rm src/components/ui/PricingCard.tsx
git rm src/components/ui/PackCard.tsx src/components/ui/PackCard.module.css
git rm src/components/ui/AddonCard.tsx src/components/ui/AddonCard.module.css
```

- [ ] **Step 3: Delete old pages**

```bash
git rm src/app/sectors/page.tsx src/app/about/page.tsx
```

- [ ] **Step 4: Remove old test files that reference deleted modules**

```bash
git rm src/data/__tests__/data-integrity.test.ts
```

Check for component tests referencing deleted components:

```bash
find src/components/ui/__tests__ -name "*.test.*" -exec grep -l "SectorCard\|PricingCard\|PackCard\|AddonCard" {} \;
```

Delete any files found.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds with no import errors (no file references deleted modules)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove OptiBoard-specific data, components, and pages"
```

---

## Task 11: Final verification

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: Build succeeds, no errors.

- [ ] **Step 2: Run dev server and verify all pages**

```bash
npm run dev
```

Verify each route loads without errors:
- `http://localhost:3000` — Home page with new hero, 5 sections
- `http://localhost:3000/services` — Timeline + Pierre + CTA
- `http://localhost:3000/realisations` — 2 project cards + CTA
- `http://localhost:3000/contact` — Simplified form
- Navigation links all work
- Footer content is correct
- Mobile responsive: check at 768px and 480px

- [ ] **Step 3: Run existing tests**

```bash
npm test
```

Fix any failures caused by removed imports or changed components.

- [ ] **Step 4: Final commit if any fixes**

```bash
git add -A
git commit -m "fix: resolve test and build issues from redesign"
```
