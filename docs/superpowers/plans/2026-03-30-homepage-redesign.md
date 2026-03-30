# Homepage Redesign — Premium Gold + Sora/Inter + Sections Condensées

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformer la homepage OptiPro avec une palette gold premium, la typographie Sora+Inter, et condenser 7+ sections en 4 sections à fort impact.

**Architecture:** Mise à jour des CSS variables globales (fonts + couleurs), création d'un composant MethodSection condensé remplaçant les 4 sections services, restructuration du page.tsx de la homepage. Pas de changement sur Header/Footer/pages secondaires au-delà de la cascade CSS.

**Tech Stack:** Next.js 16, React 19, CSS Modules, next/font/google

---

## File Map

| Action | File | Responsabilité |
|--------|------|---------------|
| Modify | `src/app/layout.tsx` | Swap fonts Sora + Inter |
| Modify | `src/app/globals.css` | Palette gold, fallback fonts, hardcoded orange → gold |
| Modify | `src/app/HomePage.module.css` | Hardcoded orange → gold dans le hero |
| Create | `src/components/ui/MethodSection.tsx` | Composant 4 étapes compact en grid |
| Create | `src/components/ui/MethodSection.module.css` | Styles du composant MethodSection |
| Modify | `src/app/page.tsx` | Restructurer: Hero, Méthode, Réalisations, CTA |
| Modify | `src/components/visuals/HeroAnimation.module.css` | Hardcoded orange → gold (30 refs) |
| Modify | `src/components/ui/OptiboardTeaser.tsx` | Hardcoded orange → gold (reste sur /services mais pas homepage) |
| Modify | `src/components/visuals/AuditMockup.tsx` | Hardcoded orange → gold |
| Modify | `src/components/visuals/AnalyseMockup.tsx` | Hardcoded orange → gold |
| Modify | `src/components/visuals/AutomationMockup.tsx` | Hardcoded orange → gold |
| Modify | `src/components/visuals/CreationMockup.tsx` | Hardcoded orange → gold |
| Modify | `src/components/ui/AuditCta.tsx` | Hardcoded orange → gold |
| Modify | `src/components/ui/ProjectCard.tsx` | Hardcoded orange → gold |
| Modify | `src/components/layout/Footer.tsx` | Hardcoded orange → gold |
| Modify | `src/components/ui/FaqAccordion.tsx` | Hardcoded orange → gold |
| Modify | `src/app/contact/page.tsx` | Hardcoded orange → gold |

---

### Task 1: Swap fonts — Sora + Inter

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css` (font fallback lines only)

- [ ] **Step 1: Update layout.tsx font imports**

Replace the font imports in `src/app/layout.tsx`:

```tsx
// OLD
import { Outfit, Space_Grotesk } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

// NEW
import { Inter, Sora } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });
```

And update the body className:

```tsx
// OLD
<body className={`${outfit.variable} ${spaceGrotesk.variable}`}>

// NEW
<body className={`${inter.variable} ${sora.variable}`}>
```

- [ ] **Step 2: Update CSS fallback font names**

In `src/app/globals.css`, update the fallback font names:

```css
/* OLD - line ~147 */
font-family: var(--font-body), 'Outfit', sans-serif;

/* NEW */
font-family: var(--font-body), 'Inter', sans-serif;
```

```css
/* OLD - line ~165 */
font-family: var(--font-display), 'Space Grotesk', sans-serif;

/* NEW */
font-family: var(--font-display), 'Sora', sans-serif;
```

- [ ] **Step 3: Verify build**

Run: `cd "/Users/pierrelaurent/Desktop/Pierre/Projets Dev Pierre/OptiPro" && npm run build 2>&1 | tail -20`
Expected: Build succeeds, no font import errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(design): swap fonts to Sora + Inter for premium typography"
```

---

### Task 2: Update color palette — Orange → Gold

**Files:**
- Modify: `src/app/globals.css` (CSS variables + all hardcoded orange refs)

- [ ] **Step 1: Update CSS custom properties in :root**

In `src/app/globals.css`, replace the accent color variables:

```css
/* OLD */
--accent: #f97316;
--accent-hover: #fb923c;
--accent-glow: rgba(249, 115, 22, 0.25);
--accent-light: rgba(249, 115, 22, 0.1);

/* NEW */
--accent: #CA8A04;
--accent-hover: #EAB308;
--accent-glow: rgba(202, 138, 4, 0.25);
--accent-light: rgba(202, 138, 4, 0.1);
```

Update gradients:

```css
/* OLD */
--gradient-accent: linear-gradient(135deg, #f97316, #fb923c);
--gradient-orange-text: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);

/* NEW */
--gradient-accent: linear-gradient(135deg, #CA8A04, #EAB308);
--gradient-orange-text: linear-gradient(135deg, #CA8A04 0%, #EAB308 100%);
```

- [ ] **Step 2: Replace ALL hardcoded orange values in globals.css**

Do a full find-and-replace across the entire `globals.css` file:

| Find | Replace |
|------|---------|
| `#f97316` | `#CA8A04` |
| `#fb923c` | `#EAB308` |
| `#fbbf24` | `#EAB308` |
| `rgba(249, 115, 22,` | `rgba(202, 138, 4,` |
| `rgba(249,115,22,` | `rgba(202, 138, 4,` |

This covers: pill badges, glow effects, section labels, section dividers, service showcase labels, footer accent, timeline numbers, audit CTA, teaser, project card tags, pain points — everything in the global CSS.

- [ ] **Step 3: Verify no remaining orange refs in globals.css**

Run: `grep -n "f97316\|fb923c\|fbbf24\|249, 115, 22\|249,115,22" src/app/globals.css`
Expected: No matches.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): update color palette from orange to premium gold"
```

---

### Task 3: Update hardcoded orange in all components

**Files:**
- Modify: `src/app/HomePage.module.css`
- Modify: `src/components/visuals/HeroAnimation.module.css`
- Modify: `src/components/visuals/AuditMockup.tsx`
- Modify: `src/components/visuals/AnalyseMockup.tsx`
- Modify: `src/components/visuals/AutomationMockup.tsx`
- Modify: `src/components/visuals/CreationMockup.tsx`
- Modify: `src/components/ui/OptiboardTeaser.tsx`
- Modify: `src/components/ui/AuditCta.tsx`
- Modify: `src/components/ui/ProjectCard.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/FaqAccordion.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Replace in HomePage.module.css**

Same find-and-replace table as Task 2 Step 2, applied to `src/app/HomePage.module.css`.

- [ ] **Step 2: Replace in HeroAnimation.module.css**

Same find-and-replace table applied to `src/components/visuals/HeroAnimation.module.css`. This file has ~30 references.

- [ ] **Step 3: Replace in all component .tsx files**

Apply the same find-and-replace across each of these files:
- `src/components/visuals/AuditMockup.tsx`
- `src/components/visuals/AnalyseMockup.tsx`
- `src/components/visuals/AutomationMockup.tsx`
- `src/components/visuals/CreationMockup.tsx`
- `src/components/ui/OptiboardTeaser.tsx`
- `src/components/ui/AuditCta.tsx`
- `src/components/ui/ProjectCard.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/FaqAccordion.tsx`
- `src/app/contact/page.tsx`

Additionally in these files, replace:
| Find | Replace |
|------|---------|
| `#f59e0b` (warning-yellow used as accent) | `#CA8A04` |

Note: Keep `#f59e0b` ONLY when used as a genuine warning/status color (e.g. AuditMockup status dots). Only replace it when used as a brand accent.

- [ ] **Step 4: Verify no remaining orange refs in src/**

Run: `grep -rn "f97316\|fb923c" src/ --include="*.tsx" --include="*.css"`
Expected: No matches.

- [ ] **Step 5: Build check**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A src/
git commit -m "feat(design): replace all hardcoded orange with gold across components"
```

---

### Task 4: Create MethodSection component

**Files:**
- Create: `src/components/ui/MethodSection.tsx`
- Create: `src/components/ui/MethodSection.module.css`

- [ ] **Step 1: Create MethodSection.module.css**

```css
/* src/components/ui/MethodSection.module.css */

.section {
  padding: 6rem 0;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  background: rgba(202, 138, 4, 0.1);
  border: 1px solid rgba(202, 138, 4, 0.2);
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
}

.title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.03em;
}

.subtitle {
  color: var(--secondary);
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 2rem 1.5rem;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
  cursor: default;
}

.card:hover {
  transform: translateY(-6px);
  border-color: rgba(202, 138, 4, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08),
              0 0 0 1px rgba(202, 138, 4, 0.1);
}

.stepNumber {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gradient-accent);
  color: white;
  font-size: 0.9rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
}

.icon {
  width: 40px;
  height: 40px;
  color: var(--accent);
  margin-bottom: 1rem;
}

.cardTitle {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.cardDesc {
  color: var(--secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 4rem 0;
  }

  .title {
    font-size: 1.75rem;
  }
}
```

- [ ] **Step 2: Create MethodSection.tsx**

```tsx
// src/components/ui/MethodSection.tsx
import styles from './MethodSection.module.css';

const steps = [
  {
    number: 1,
    title: 'Audit',
    description:
      'Vos outils, vos process, vos points de friction — on fait le diagnostic complet. Gratuit, sans engagement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Analyse',
    description:
      'On priorise les blocages par impact et on chiffre les gains. Vous savez exactement quoi résoudre en premier.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 21H4.6c-.56 0-.84 0-1.05-.11a1 1 0 0 1-.44-.44C3 20.24 3 19.96 3 19.4V3" />
        <path d="m7 14 4-4 4 4 6-6" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Création',
    description:
      'Site, application, tableau de bord — chaque solution est conçue sur mesure pour votre métier. Pas de template.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M2 8h20" />
        <path d="m7 3 5 5 5-5" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Automatisation',
    description:
      'Vos outils se parlent, le répétitif disparaît. Devis, relances, synchros — tout tourne sans vous.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="m15.2 7.8 2.8-2.8" />
        <path d="M18 12h4" />
        <path d="m15.2 16.2 2.8 2.8" />
        <path d="M12 18v4" />
        <path d="m8.8 16.2-2.8 2.8" />
        <path d="M6 12H2" />
        <path d="m8.8 7.8-2.8-2.8" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
];

export default function MethodSection() {
  return (
    <section className={`${styles.section} reveal`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>La Méthode</span>
          <h2 className={styles.title}>
            Quatre étapes vers des outils qui travaillent pour vous
          </h2>
          <p className={styles.subtitle}>
            Un process clair, des résultats concrets à chaque étape.
          </p>
        </div>
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.card}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.icon}>{step.icon}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Build check**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds (component not yet used, but should compile).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/MethodSection.tsx src/components/ui/MethodSection.module.css
git commit -m "feat(design): create compact MethodSection component with 4-step grid"
```

---

### Task 5: Restructure homepage — 4 sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update imports**

In `src/app/page.tsx`, replace the imports:

```tsx
// REMOVE these imports:
import AuditMockup from '@/components/visuals/AuditMockup';
import AnalyseMockup from '@/components/visuals/AnalyseMockup';
import CreationMockup from '@/components/visuals/CreationMockup';
import AutomationMockup from '@/components/visuals/AutomationMockup';
import OptiboardTeaser from '@/components/ui/OptiboardTeaser';

// ADD this import:
import MethodSection from '@/components/ui/MethodSection';
```

- [ ] **Step 2: Update hero subtitle to integrate the "problem"**

Replace the hero subtitle text:

```tsx
// OLD
<p className={styles.heroSub}>
  Audit de vos process, création de sites et d&apos;outils sur
  mesure, automatisation — Pierre analyse vos blocages admin et
  construit les solutions adaptées.
</p>

// NEW
<p className={styles.heroSub}>
  Tableurs à rallonge, relances oubliées, outils mal adaptés — vous
  perdez du temps sur des tâches qui ne sont pas votre métier. Pierre
  audite vos blocages et construit les solutions sur mesure.
</p>
```

- [ ] **Step 3: Restructure the sections**

Replace everything below the hero section (from the first `<div className="section-divider" />` to `</main>`) with:

```tsx
      {/* ===== LA MÉTHODE ===== */}
      <MethodSection />

      <div className="section-divider" />

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
      <section className="reveal" style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <AuditCta />
        </div>
      </section>
    </main>
```

- [ ] **Step 4: Remove unused scrollY state and parallax decorations**

Since the parallax decorative blobs in the hero used `scrollY`, and we no longer have the Problem section, simplify the hero. Remove the `scrollY` state and the two decorative `<div style={{ position: 'absolute', ... transform: translateY(scrollY * ...) }}` elements from the hero section. Keep the HeroAnimation.

Remove from component:
```tsx
// REMOVE
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

And remove the `useState` import (keep `useEffect` for the IntersectionObserver).

Remove the two decorative parallax divs inside the hero section (the ones with `transform: translateY(scrollY * ...)`).

- [ ] **Step 5: Build & verify**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds with no unused import warnings.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(design): restructure homepage to 4 high-impact sections"
```

---

### Task 6: Final verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run tests**

Run: `npm test -- --passWithNoTests 2>&1 | tail -30`
Expected: All existing tests pass.

- [ ] **Step 3: Start dev server and verify visually**

Run: `npm run dev`
Expected: Dev server starts. Homepage loads with:
- Sora headings, Inter body text
- Gold accent color throughout
- 4 sections: Hero, Method grid, Réalisations, CTA
- No orange remnants visible
- HeroAnimation working with gold palette
- Scroll reveal animations functioning

- [ ] **Step 4: Verify no orange refs remain**

Run: `grep -rn "f97316\|fb923c" src/ --include="*.tsx" --include="*.css" --include="*.module.css"`
Expected: Zero matches.

- [ ] **Step 5: Final commit if any adjustments needed**

```bash
git add -A
git commit -m "fix(design): final adjustments after visual review"
```
