# Hero Animation — Dashboard Holographique + Systeme Orbital

**Date**: 2026-03-29
**Statut**: Approuve
**Mockup**: `.superpowers/brainstorm/66480-1774814442/content/hero-combined-v2.html`

## Objectif

Remplacer la card "La Methode OptiPro" (timeline 4 etapes) dans le hero par une animation premium : un dashboard d'audit holographique au centre d'un systeme orbital. L'animation communique visuellement le coeur de metier OptiPro (analyse + optimisation) avec un rendu haut de gamme.

## Fichiers a modifier

| Fichier | Action |
|---------|--------|
| `src/components/visuals/HeroAnimation.tsx` | Creer — nouveau composant |
| `src/components/visuals/HeroAnimation.module.css` | Creer — styles + keyframes |
| `src/app/page.tsx` | Modifier — remplacer heroVisual par HeroAnimation |
| `src/app/HomePage.module.css` | Modifier — supprimer styles heroCard/heroStep, adapter heroGrid |

## Architecture du composant

### `HeroAnimation.tsx`

Composant client (`'use client'`) qui se decompose en 3 couches visuelles :

```
<div className={styles.heroAnimation}>     ← conteneur 560x560
  <div className={styles.orbitalLayer}>     ← z-index: 1
    <div className={styles.orbit1} />       ← ring 340px, rotation 35s
    <div className={styles.orbit2} />       ← ring 440px, rotation 50s reverse
    <div className={styles.orbit3} />       ← ring 530px, rotation 65s
    <PulseLine direction="top" />           ← 4 lignes pulsantes
    <PulseLine direction="right" />
    <PulseLine direction="bottom" />
    <PulseLine direction="left" />
    <OrbitalNode position="top" />          ← 4 noeuds
    <OrbitalNode position="right" />
    <OrbitalNode position="bottom" />
    <OrbitalNode position="left" />
  </div>
  <div className={styles.dashboard}>        ← z-index: 10, 260px wide
    <DashHeader />
    <BarChart />                             ← 7 barres animees
    <MetricRow label="Outils" value={72} color="orange" />
    <MetricRow label="Processus" value={89} color="green" />
    <MetricRow label="Automatisation" value={64} color="blue" />
    <ScoreBadge score={87} />
  </div>
  <Particles />                              ← 4 particules flottantes
  <Scanline />                               ← balayage horizontal
</div>
```

Tout est rendu cote client mais les animations sont 100% CSS (aucun JS runtime pour les mouvements).

### Noeuds orbitaux

4 noeuds aux points cardinaux, chacun avec :
- Icone (emoji ou SVG simple)
- Label texte en uppercase sous/a cote du noeud
- Couleur distincte : orange (Outils), vert (Donnees), bleu (Auto), violet (Process)
- Animation `floatV` (rebond vertical 5s)

| Position | Label | Couleur | Icone |
|----------|-------|---------|-------|
| top | Outils | `#f97316` | engrenage |
| right | Donnees | `#10b981` | graphique |
| bottom | Auto | `#3b82f6` | eclair |
| left | Process | `#a855f7` | cadenas |

### Dashboard central

Card glassmorphism contenant :

1. **Header** : "Audit OptiPro" + pastille "Live" verte clignotante
2. **Bar chart** : 7 barres (5 orange, 2 vertes), animation `growBar` staggeree (0.1s increments)
3. **3 metriques** : icone + label + barre de progression + valeur %, animation `fadeIn` staggeree
4. **Score** : cercle 40px border vert avec "87", glow vert, separateur au-dessus

Style de la card :
- `background: rgba(15,23,42,0.97)` (quasi-opaque pour bien se detacher)
- `border: 1px solid rgba(249,115,22,0.25)`
- `border-radius: 16px`
- `box-shadow: 0 0 50px rgba(249,115,22,0.08), 0 0 100px rgba(249,115,22,0.04)`

### Effets d'ambiance

- **Particules** : 4 divs avec `border-radius: 50%`, animation `drift` (6-9s, directions variees)
- **Scanline** : 1px de haut, gradient horizontal orange transparent, animation `scan` verticale 5s
- **Glow ambiant** : `radial-gradient` orange subtil derriere le systeme orbital (via `::before` sur le hero)

## Animations CSS

| Nom | Duree | Easing | Description |
|-----|-------|--------|-------------|
| `spinOrbit` | 35/50/65s | linear | Rotation 360deg des anneaux |
| `growBar` | 1.5s | `cubic-bezier(0.22,1,0.36,1)` | ScaleY 0→1 des barres du chart |
| `fadeInMetric` | 0.6s | ease | Opacity 0→1 + translateX(-8px)→0 |
| `fillBar` | 1.5s | `cubic-bezier(0.22,1,0.36,1)` | Width 0→var(--fill) des barres metriques |
| `floatV` | 5s | ease-in-out | TranslateY ±10px des noeuds |
| `pulseDot` | 3s | ease-in-out | Dot qui voyage le long des pulse lines |
| `blink` | 2s | ease-in-out | Opacity 1→0.3 du dot "Live" |
| `drift` | 6-9s | linear | Particules montantes |
| `scan` | 5s | ease-in-out | Scanline top→bottom |

Toutes les animations utilisent l'easing existant du projet : `cubic-bezier(0.22, 1, 0.36, 1)` sauf les rotations (linear) et les boucles infinies (ease-in-out).

## Integration dans page.tsx

### Avant (a supprimer)

```tsx
{/* Mini timeline visual */}
<div className={styles.heroVisual}>
  <div className={styles.heroCard}>
    <div className={styles.heroCardTitle}>...</div>
    {services.map((s) => (
      <div key={s.id} className={styles.heroStep}>...</div>
    ))}
  </div>
</div>
```

### Apres

```tsx
import HeroAnimation from '@/components/visuals/HeroAnimation';

{/* Hero animation */}
<div className={styles.heroVisual}>
  <HeroAnimation />
</div>
```

### Modification heroGrid

```css
.heroGrid {
  display: grid;
  grid-template-columns: 1fr 560px;  /* etait 380px */
  gap: 2rem;                          /* etait 4rem */
  align-items: center;
}
```

## Responsive

### Tablette (max-width: 900px)

```css
.heroAnimation {
  width: 400px;
  height: 400px;
}
/* Orbites reduites proportionnellement */
.orbit1 { width: 240px; height: 240px; }
.orbit2 { width: 320px; height: 320px; }
.orbit3 { width: 390px; height: 390px; }
/* Dashboard reduit */
.dashboard { width: 200px; padding: 1rem; }
```

Grid passe en 1 colonne, animation centree sous le texte.

### Mobile (max-width: 480px)

```css
.heroAnimation {
  width: 300px;
  height: 300px;
}
/* Orbites masquees */
.orbitalLayer { display: none; }
/* Dashboard seul, simplifie */
.dashboard { width: 260px; }
```

Seul le dashboard reste visible, sans orbites ni particules.

## Accessibilite

- `aria-hidden="true"` sur tout le composant HeroAnimation (decoratif uniquement)
- `prefers-reduced-motion: reduce` : toutes les animations passent a `animation: none`, les barres affichees a leur etat final directement
- Aucun contenu textuel significatif dans l'animation (les labels des noeuds sont decoratifs)

## Performance

- Zero librairie externe — CSS `@keyframes` uniquement
- `will-change: transform` sur `.orbit`, `.node`, `.particle`
- `transform` et `opacity` uniquement (compositing GPU, pas de reflow)
- Le composant ne provoque aucun re-render React (pas de state, pas d'effet)
- `backdrop-filter: blur()` limite a la card dashboard (un seul element)

## Styles a nettoyer dans HomePage.module.css

Supprimer apres migration :
- `.heroCard`
- `.heroCardTitle`
- `.heroStep` (+ nth-child delays)
- `.heroStepNum`
- `.heroStep strong`
- `.heroStep p`
- `@keyframes stepReveal`
- `@keyframes subtleFloat`

Conserver :
- `.hero`, `.heroGrid`, `.heroText`, `.heroBadge`, `.heroTitle`, `.heroAccent`, `.heroSub`, `.heroCtas`
- `.heroVisual` (conteneur reutilise)
