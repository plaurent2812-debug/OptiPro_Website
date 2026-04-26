# Playbook SEO + Visibilité IA

Guide complet et réutilisable pour optimiser le référencement classique (Google) et la visibilité dans les IA (ChatGPT, Claude, Perplexity) sur n'importe quel nouveau site web.

**Temps total estimé : 2 à 3 heures** pour une mise en place complète.

---

## ⚡ Mode rapide — Un seul prompt pour tout faire

Si tu veux **lancer l'audit + mise en place complète d'un coup** au lieu de suivre les étapes une par une, colle ce prompt dans Claude Code à la racine de ton projet :

```
Je veux optimiser ce site pour le SEO classique (Google) et la
visibilité IA (ChatGPT, Claude, Perplexity). Suis le playbook
docs/SEO_AI_PLAYBOOK.md à la lettre.

PHASE 1 — AUDIT (avant toute modification)
Scanne le projet et fais-moi un rapport structuré :
- Framework détecté (Next.js, Vue, statique, etc.) + hébergeur
- Pages publiques trouvées (chemins + URLs)
- État actuel : llms.txt, sitemap.xml, robots.txt, markdown
  mirrors, headers Content-Type, IndexNow — coche ce qui existe
  déjà, marque ce qui manque
- Fichiers auto-générés (sitemap.ts, robots.ts) qui pourraient
  écraser les statiques
- Infos business déjà détectables dans le code (nom, services,
  tarifs, contact, zone géo)

Présente le rapport puis attends ma validation avant de continuer.

PHASE 2 — INTERVIEW
Pose-moi UNE question à la fois (pas de gros bloc) pour récupérer
seulement ce qui manque pour rédiger un llms.txt complet. Ne me
demande pas ce que tu peux déjà voir dans le code.

PHASE 3 — MISE EN PLACE
Une fois l'interview finie, exécute toutes les étapes 1 à 8 du
playbook dans l'ordre :
1. llms.txt complet (toutes sections)
2. Markdown mirrors (script Python + génération)
3. Headers Content-Type pour .md et llms.txt
4. sitemap.xml (avec priorités proposées + ma validation rapide)
5. robots.txt avec bots IA (GPTBot, ClaudeBot, PerplexityBot,
   Google-Extended)
6. IndexNow (clé UUID + script postbuild + fichier de
   vérification)

Pour chaque étape : explique ce que tu fais en 1 phrase, fais-le,
puis passe à la suivante. Pas besoin de me demander validation
entre chaque.

PHASE 4 — DÉPLOIEMENT
Donne-moi la commande git exacte pour tout commiter et pousser.
Une fois poussé, vérifie en prod via curl que tous les fichiers
sont accessibles avec les bons headers.

PHASE 5 — GUIDES MANUELS
Liste les actions que je dois faire moi-même (Google Search
Console, Bing Webmaster Tools, Google Business Profile) avec les
URLs et étapes pas-à-pas. Pour chaque outil, demande-moi si je
veux le faire maintenant — si oui, guide-moi écran par écran.

CONTRAINTES
- Phrases courtes, chiffres précis, zéro blabla
- Si une étape échoue, debug avant de continuer
- Si tu as un doute (hébergeur, DNS, etc.), demande UNE fois en
  amont, pas pendant l'exécution
- Ne touche pas au code métier du site, uniquement aux fichiers
  SEO (public/, scripts/, configs)
```

**Ce que ça fait** :
1. **Audit** complet de l'existant (5 min)
2. **Interview rapide** pour les infos business manquantes (5-10 min)
3. **Mise en place automatique** des 8 étapes techniques (15 min)
4. **Déploiement** + vérification production (5 min)
5. **Guides manuels** pour Google/Bing/Business (toi à la manœuvre)

**Total** : 45 min à 1h30 selon la taille du site.

---

## 🎯 Quel mode choisir ? Prompt maître vs Étape par étape

Les deux modes existent. Ils ne donnent **pas le même résultat**. Lis ce tableau avant de choisir.

### Comparatif détaillé

| Critère | Prompt maître | Étape par étape |
|---|---|---|
| **Vitesse** | ✅ 1 lancement, ~1h | ❌ 8 lancements, ~2h |
| **Qualité du `llms.txt`** | ⚠️ Interview rapide, FAQ parfois superficielles | ✅ Questions ciblées, réponses creusées |
| **Adaptation aux cas particuliers** | ⚠️ Suit le playbook même quand il y a une exception | ✅ Possibilité de dévier à chaque étape |
| **Détection des pièges** (`sitemap.ts` qui écrase, etc.) | ⚠️ Dépend de la qualité de la phase audit | ✅ Vérification entre chaque étape |
| **Erreurs silencieuses** | ⚠️ Peut continuer sans signaler clairement | ✅ Tu valides chaque étape |
| **Contrôle utilisateur** | ❌ Peu de points d'arrêt | ✅ Validation systématique |
| **Charge mentale** | ✅ Tu suis, c'est tout | ❌ Tu dois orchestrer |
| **Apprentissage** | ❌ Tu reproduis sans comprendre | ✅ Tu apprends le pourquoi |

### Ce qui se dégrade vraiment en mode maître

1. **Le `llms.txt`** est la pièce la plus impactée. En mode étape par étape, l'interview se déroule sur 5 messages séparés, ce qui force à creuser. En mode maître, l'interview est plus expéditive — risque de réponses superficielles.

2. **Les pièges framework-spécifiques** (ex : Next.js App Router avec `sitemap.ts`/`robots.ts` qui écrasent les fichiers statiques `public/`). En mode étape par étape, le bug se voit en prod et se corrige immédiatement. En mode maître, ça doit être anticipé dans la phase audit, et c'est moins garanti.

3. **Les ajustements à chaud** (DNS chez IONOS au lieu d'OVH, configuration Vercel particulière, headers CSP qui bloquent un truc). En mode étape par étape, on s'adapte en 2 messages. En mode maître, soit l'audit l'a détecté, soit c'est zappé.

4. **Les différenciateurs business subtils** — ce qui rend ton offre unique vs concurrents. Une interview rapide capte les évidences, pas les nuances qui font la différence dans une recommandation IA.

### Tableau de décision

| Situation | Mode recommandé | Pourquoi |
|---|---|---|
| Site simple (5-10 pages, business clair, secteur standard) | **Maître** | Le gain de temps compense la perte de finesse |
| Site complexe ou positionnement nuancé | **Étape par étape** | Qualité du `llms.txt` >> rapidité |
| Tu refais ça pour la 3e fois et tu maîtrises le flux | **Maître** | Tu sais déjà ce qu'il faut, tu peux corriger à la volée |
| Première fois sur un type de site nouveau (e-commerce, SaaS, etc.) | **Étape par étape** | Tu apprends les pièges en même temps |
| Site avec stack non-standard (custom backend, headless CMS) | **Étape par étape** | Trop de variables, le maître va probablement se planter |
| Tu veux un audit rapide sans forcément tout déployer | **Maître** (s'arrêter après Phase 1) | L'audit est très bien fait dans le maître |
| Tu refais après une grosse refonte du site existant | **Maître** | L'audit détecte les fichiers obsolètes à mettre à jour |

### Hybride — la stratégie recommandée

La meilleure approche pour la plupart des sites :

1. **Lance le prompt maître** pour la **Phase 1 (audit)** uniquement
2. **Lis le rapport** d'audit attentivement
3. **Décide** :
   - Si tout est simple → continue en mode maître
   - Si tu vois des points sensibles (positionnement, framework custom) → bascule sur les prompts étape par étape pour ces étapes-là
4. **Reviens en maître** pour les étapes mécaniques (sitemap, robots, IndexNow)

Cette approche te donne **70% du gain de temps du maître** + **90% de la qualité de l'étape par étape**.

### Comment basculer du maître vers l'étape par étape

Si tu es en mode maître et tu sens que la qualité va se dégrader sur une étape (typiquement le `llms.txt`), interromps simplement Claude :

```
Stop. Pour le llms.txt, je veux qu'on fasse l'interview en mode
détaillé : pose-moi les questions UNE par UNE, attends ma réponse
complète, et creuse si tu sens que ma réponse est superficielle.
On reprendra le mode rapide pour la suite.
```

---

## Sommaire

1. [Pourquoi c'est important](#1-pourquoi-cest-important)
2. [Vue d'ensemble du système](#2-vue-densemble-du-système)
3. [Étape 1 — Créer le fichier `llms.txt`](#étape-1--créer-le-fichier-llmstxt)
4. [Étape 2 — Générer les Markdown Mirrors](#étape-2--générer-les-markdown-mirrors)
5. [Étape 3 — Configurer headers Content-Type](#étape-3--configurer-les-headers-content-type)
6. [Étape 4 — Sitemap.xml](#étape-4--sitemapxml)
7. [Étape 5 — Robots.txt avec bots IA](#étape-5--robotstxt-avec-bots-ia)
8. [Étape 6 — Google Search Console](#étape-6--google-search-console)
9. [Étape 7 — Bing Webmaster Tools](#étape-7--bing-webmaster-tools)
10. [Étape 8 — IndexNow (notification temps réel)](#étape-8--indexnow-notification-temps-réel)
11. [Étape 9 — Boosters de visibilité (post-mise en ligne)](#étape-9--boosters-de-visibilité)
12. [Calendrier réaliste de retombées](#calendrier-réaliste-de-retombées)
13. [Maintenance — Routine mensuelle](#maintenance--routine-mensuelle)

---

## 1. Pourquoi c'est important

**SEO classique (Google)** : 90% du trafic web mondial passe par Google. Sans présence indexée, ton site est invisible.

**Visibilité IA (ChatGPT, Claude, Perplexity)** : de plus en plus de gens posent leurs questions à une IA au lieu de Google. Si l'IA ne te connaît pas, tu n'es pas recommandé.

**Comment les IA te trouvent** :
- ChatGPT utilise principalement l'**index Bing** pour ses recherches web
- Perplexity et Claude crawlent directement les sites avec leurs bots (`PerplexityBot`, `ClaudeBot`)
- Tous lisent en priorité les fichiers structurés : `llms.txt`, sitemaps, JSON-LD, Markdown propre

Ce playbook couvre les deux fronts.

---

## 2. Vue d'ensemble du système

À la fin du processus, ton site servira ces fichiers à la racine :

```
https://www.tonsite.fr/
├── llms.txt              ← Présentation business pour les IA
├── sitemap.xml           ← Carte des pages pour les moteurs
├── robots.txt            ← Règles d'autorisation des bots
├── index.md              ← Version Markdown propre de la home
├── services.md           ← Idem pour /services
├── [autres-pages].md     ← Une par page principale
└── [clé-indexnow].txt    ← Vérification IndexNow
```

Tu auras aussi configuré :
- Google Search Console (avec sitemap soumis)
- Bing Webmaster Tools (avec sitemap soumis)
- IndexNow (notification automatique à chaque déploiement)

---

## Étape 1 — Créer le fichier `llms.txt`

**Quoi** : un fichier texte à la racine qui présente le business aux IA.
**Pourquoi** : c'est le fichier que les IA lisent en priorité quand elles découvrent ton site.

### Prompt à coller dans Claude Code

```
Crée un fichier llms.txt pour mon business. C'est un fichier texte
à la racine de mon site qui dit aux IA (ChatGPT, Claude, Perplexity)
ce que je fais, pour qu'elles me recommandent quand quelqu'un pose
une question dans mon secteur.

Avant d'écrire quoi que ce soit, interview-moi pour récupérer
toutes les infos qu'il te manque (nom, ce que je fais, zones
servies, contact, services + tarifs réels, ce qui me différencie,
crédibilité). Pose-moi les questions une par une, pas de gros bloc.

Si t'as accès à mon dossier de site, regarde déjà ce que tu peux
auto-détecter (homepage, pages services, contact) avant de me
demander.

Une fois que t'as tout, écris le llms.txt avec ces sections :
About, Services and Pricing, Locations, Contact, Service Area,
Key Facts, What Makes Us Different, FAQ (5-8 vraies questions
clients avec réponses courtes et chiffrées).

Phrases courtes, chiffres précis partout, zéro blabla marketing.
Sauvegarde-le sous llms.txt à la racine, et explique-moi comment
l'uploader sur mon hébergeur (demande-moi lequel si tu sais pas).
```

### Structure attendue du fichier

```
# [Nom entreprise] — llms.txt

## About
[3-5 phrases : qui, quoi, où, depuis quand]

## Services and Pricing
[Liste claire avec prix réels, délais, ce qui est inclus]

## Locations
[Adresse + zones servies]

## Contact
[Email, tél, délai de réponse]

## Service Area
[Géographie précise]

## Key Facts
[Chiffres clés, années d'expérience, différenciateurs factuels]

## What Makes Us Different
[2-3 paragraphes : pourquoi toi vs concurrents]

## FAQ
[5-8 questions clients réelles avec réponses courtes]

## Markdown Mirrors
[À ajouter après l'étape 2]
```

### Règles d'or pour le contenu

- ✅ Chiffres précis partout (`690 €`, pas "abordable")
- ✅ Délais concrets (`3-5 jours`, pas "rapide")
- ✅ Phrases courtes
- ❌ Pas de superlatifs ("le meilleur", "le plus innovant")
- ❌ Pas de blabla marketing

---

## Étape 2 — Générer les Markdown Mirrors

**Quoi** : une version Markdown propre de chaque page (sans nav, footer, scripts).
**Pourquoi** : les IA préfèrent lire du Markdown structuré que du HTML pollué.

### Prompt à coller

```
Je veux générer des markdown mirrors pour chaque page de mon site,
pour donner aux IA une version propre de chaque page (sans HTML,
scripts, ni junk visuel).

Avant de commencer :
1. Scanne mon dossier de site et dis-moi ce que tu vois (structure,
   nombre de pages, hébergeur détecté).
2. Demande-moi seulement ce que tu peux pas deviner.

Ensuite :
- Écris un script Python qui parcourt chaque page, strip
  nav/footer/scripts/popups, convertit en markdown propre via
  markdownify, ajoute en haut title/description/url/last_updated,
  et sauvegarde le résultat à côté de chaque page sous index.md.
- Lance-le et montre-moi combien de fichiers ont été générés.
- Configure mon hébergeur pour servir les .md en
  Content-Type: text/plain (sinon ils se téléchargent au lieu de
  s'afficher). Si t'as un doute sur l'hébergeur, demande.
- Ajoute une section "Markdown Mirrors" à mon llms.txt qui liste
  toutes les URLs générées.
```

### Cas particulier — sites Next.js / SPA

Pour les sites dynamiques (Next.js, Vue, React), le script doit :
1. Lancer le serveur de dev (`npm run dev`)
2. Faire un HTTP GET sur chaque page
3. Parser le HTML rendu, retirer nav/footer/scripts
4. Convertir en Markdown avec `markdownify`

Le script Python à la racine de ce projet (`scripts/generate_markdown_mirrors.py`) est réutilisable — modifier juste la liste `PAGES` en haut du fichier.

### Format frontmatter standard

```markdown
---
title: Page title
description: Page description
url: https://www.tonsite.fr/page
last_updated: 2026-04-26
---

[Contenu Markdown propre]
```

---

## Étape 3 — Configurer les headers Content-Type

**Problème** : par défaut, Vercel et la plupart des hébergeurs servent les fichiers `.md` avec `Content-Type: application/octet-stream`, ce qui force le téléchargement au lieu de l'affichage. Les IA ne peuvent pas lire un fichier qu'elles téléchargent.

### Solution Next.js — `next.config.ts`

```typescript
async headers() {
  return [
    // ... autres règles
    {
      source: '/(.*)\\.md',
      headers: [
        { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        { key: 'Cache-Control', value: 'public, max-age=86400' },
      ],
    },
    {
      source: '/llms.txt',
      headers: [
        { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        { key: 'Cache-Control', value: 'public, max-age=86400' },
      ],
    },
  ];
},
```

### Solution Apache — `.htaccess`

```apache
<FilesMatch "\.md$">
  ForceType text/plain
</FilesMatch>

<Files "llms.txt">
  ForceType text/plain
</Files>
```

### Solution Nginx — `nginx.conf`

```nginx
location ~* \.md$ {
  add_header Content-Type "text/plain; charset=utf-8";
}
location = /llms.txt {
  add_header Content-Type "text/plain; charset=utf-8";
}
```

### Vérification

```bash
curl -I https://www.tonsite.fr/llms.txt
# Doit afficher : Content-Type: text/plain; charset=utf-8
```

---

## Étape 4 — Sitemap.xml

**Quoi** : carte XML de toutes les pages publiques avec priorités.
**Pourquoi** : sans sitemap, Google et Bing peuvent passer à côté de pages importantes.

### Prompt à coller

```
Génère un sitemap.xml pour mon site.

Scanne d'abord mon dossier et propose-moi une répartition de
priorités basée sur ce que tu vois (homepage 1.0, pages services
0.9, about/contact 0.8, blog 0.7, etc.). Demande-moi confirmation
ou ajustement avant de générer.

Ensuite :
- Sauvegarde sitemap.xml à la racine avec date du jour en lastmod,
  changefreq "weekly" pour la home et "monthly" pour le reste,
  format XML standard sitemaps.org.
- Vérifie/crée mon robots.txt pour autoriser tous les crawlers,
  autoriser explicitement GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, et pointer vers le sitemap.
- Guide-moi pas-à-pas pour ajouter mon site à Google Search Console
  et soumettre le sitemap. Pose-moi les questions au fur et à
  mesure (où est mon DNS, etc.).
```

### Grille de priorités standard

| Type de page | Priorité | changefreq |
|---|---|---|
| Accueil | `1.0` | `weekly` |
| Services / Produits | `0.9` | `monthly` |
| Réalisations / Portfolio | `0.8` | `monthly` |
| Contact | `0.8` | `monthly` |
| Articles de blog (récents) | `0.7` | `weekly` |
| Articles de blog (anciens) | `0.5` | `monthly` |
| Mentions légales / CGV | `0.3` | `monthly` |

### Piège Next.js App Router

Si ton site est en Next.js avec App Router, vérifie l'existence de `src/app/sitemap.ts` — ce fichier prend la priorité sur `public/sitemap.xml`. Modifie-le directement :

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tonsite.fr';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    // ...
  ];
}
```

---

## Étape 5 — Robots.txt avec bots IA

**Quoi** : fichier qui autorise (ou interdit) les bots de crawler ton site.
**Pourquoi** : par défaut, certains bots IA peuvent être bloqués. Il faut les autoriser explicitement.

### Contenu type

```
User-agent: *
Allow: /
Disallow: /admin

# AI crawlers — explicitement autorisés
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://www.tonsite.fr/sitemap.xml
```

### Liste des bots IA à autoriser

| Bot | Société | Pourquoi |
|---|---|---|
| `GPTBot` | OpenAI | Indexe pour ChatGPT |
| `ClaudeBot` | Anthropic | Indexe pour Claude |
| `PerplexityBot` | Perplexity | Indexe pour Perplexity |
| `Google-Extended` | Google | Bard / Gemini |
| `CCBot` | Common Crawl | Source de données pour beaucoup de modèles |

### Piège Next.js App Router

Comme pour le sitemap, vérifie `src/app/robots.ts` — il écrase le fichier statique. Format Next.js :

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://www.tonsite.fr/sitemap.xml',
  };
}
```

---

## Étape 6 — Google Search Console

**Quoi** : tableau de bord Google qui te montre comment ton site est crawlé/indexé.
**Pourquoi** : indispensable pour le SEO classique + obligatoire pour soumettre ton sitemap.

### Procédure pas-à-pas

1. Va sur [search.google.com/search-console](https://search.google.com/search-console)
2. Connecte-toi avec ton compte Google
3. Clique **"Ajouter une propriété"**
4. Choisis **"Domaine"** (pas "Préfixe d'URL") — couvre www + non-www + http + https
5. Saisis `tonsite.fr` (sans http://)
6. Google te donne un enregistrement DNS TXT à ajouter

### Ajouter le TXT chez ton hébergeur DNS

**OVH** : Manager → Web Cloud → Noms de domaine → ton domaine → Zone DNS → Ajouter une entrée → TXT

**IONOS** : Domaines & SSL → ton domaine → Ajouter un enregistrement DNS → TXT

**Cloudflare** : Dashboard → ton domaine → DNS → Add record → TXT

**Configuration DNS** :
- Type : `TXT`
- Nom / Sous-domaine : laisse vide ou `@`
- Valeur : `google-site-verification=...` (chaîne fournie par Google)
- TTL : 1 heure (3600s)

### Soumettre le sitemap

1. Une fois validé, dans le menu de gauche : **Indexation → Sitemaps**
2. Saisis l'**URL complète** : `https://www.tonsite.fr/sitemap.xml` (pas juste `sitemap.xml` quand on est en mode "Domaine")
3. Clique **Envoyer**
4. Si "Impossible de récupérer", attends 1h et re-soumets

### À surveiller dans Search Console (chaque mois)

- **Pages → Indexées** : doit augmenter avec le temps
- **Performances** : impressions/clics par requête
- **Sécurité et actions manuelles** : doit être vide

---

## Étape 7 — Bing Webmaster Tools

**Quoi** : équivalent Bing de Google Search Console.
**Pourquoi** : **ChatGPT utilise l'index Bing** pour ses recherches web. Sans Bing, ChatGPT ne te trouve pas.

### Procédure rapide (5 min via import GSC)

1. Va sur [bing.com/webmasters](https://www.bing.com/webmasters)
2. **Sign in with Google** (le même compte que Google Search Console)
3. Bing détecte automatiquement ton site et propose **"Import from Google Search Console"**
4. Coche ton site → clique **Import**
5. La propriété est validée automatiquement (pas besoin de re-faire le DNS)

### Soumettre le sitemap

Bing ne récupère pas toujours le sitemap automatiquement :

1. Menu de gauche → **Sitemaps**
2. **Submit sitemap** (en haut à droite)
3. Saisis : `https://www.tonsite.fr/sitemap.xml`
4. Clique **Submit**

---

## Étape 8 — IndexNow (notification temps réel)

**Quoi** : protocole qui notifie Bing/Yandex en temps réel à chaque modification du site.
**Pourquoi** : sans IndexNow, Bing crawle quand il veut (parfois 2-4 semaines). Avec IndexNow, indexation en quelques heures → ChatGPT te voit beaucoup plus vite.

### Prompt à coller

```
Active IndexNow sur mon site Next.js pour notifier Bing en temps
réel à chaque déploiement Vercel.

1. Génère une clé UUID (32 chars hex)
2. Crée le fichier de vérification public/<clé>.txt qui contient
   juste la clé en texte
3. Crée scripts/notify_indexnow.mjs qui POST l'URL list à
   api.indexnow.org/IndexNow avec la clé, la liste des URLs
   publiques, et un skip si VERCEL_ENV != "production"
4. Ajoute "postbuild": "node scripts/notify_indexnow.mjs" dans le
   package.json pour que Vercel notifie auto à chaque build prod
5. Vérifie après déploiement que la clé est accessible via curl
```

### Code clé du script `notify_indexnow.mjs`

```javascript
const KEY = "TA_CLE_UUID_32_CHARS";
const HOST = "www.tonsite.fr";
const URLS = [`https://${HOST}/`, `https://${HOST}/services`, /* ... */];

async function notifyIndexNow() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    console.log(`[IndexNow] Skipped (${process.env.VERCEL_ENV})`);
    return;
  }
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: URLS,
    }),
  });
  console.log(`[IndexNow] status ${res.status}`);
}
notifyIndexNow();
```

### Hook `postbuild` dans `package.json`

```json
"scripts": {
  "build": "next build",
  "postbuild": "node scripts/notify_indexnow.mjs"
}
```

### Vérification

```bash
curl https://www.tonsite.fr/<ta-cle>.txt
# Doit afficher : <ta-cle>
```

---

## Étape 9 — Boosters de visibilité

Les étapes 1-8 sont la **base technique**. Sans signaux d'autorité externes, tu n'apparaîtras pas dans les recommandations IA pour des requêtes concurrentielles.

### Par ordre d'impact (du plus rentable au moins)

#### 1. Google Business Profile (CRITIQUE pour le local)

- Va sur [business.google.com](https://business.google.com)
- Crée ta fiche avec catégorie précise (ex : "Conseil en informatique")
- Ajoute photos, horaires, services, zone d'intervention
- **Indispensable** pour apparaître sur Google Maps et les recherches géo-locales

#### 2. Avis Google (3-5 minimum)

- Demande à tes premiers clients de laisser un avis Google
- Lien direct à partager : `https://search.google.com/local/writereview?placeid=TON_PLACE_ID`
- Les IA utilisent les avis comme signal de confiance

#### 3. Backlinks locaux (annuaires)

Pour artisan / TPE en France :
- Pages Jaunes (gratuit basique)
- CCI locale
- Annuaires sectoriels (BTP, artisans)
- LinkedIn entreprise
- Hellopro / Companeo (devis)

#### 4. Contenu (1 article/mois minimum)

Cible des requêtes longue traîne précises :
- Mauvais : "site web"
- Bon : "créer un site web pour entreprise de plomberie Alpes-Maritimes"

Format conseillé :
- 1500-2500 mots
- Titre H1 contenant la requête cible exacte
- 3-5 sous-titres H2
- Réponses concrètes avec chiffres
- Lien interne vers une page de service

#### 5. Schema.org JSON-LD

Ajouter dans le `<head>` du site les schemas :
- `LocalBusiness` (avec adresse, horaires, géo)
- `Service` pour chaque offre
- `FAQPage` pour les FAQ
- `BreadcrumbList` pour la navigation

Les IA utilisent ces métadonnées structurées en priorité.

---

## Calendrier réaliste de retombées

| Délai | Ce qui se passe |
|---|---|
| **24-48h** | Bing commence à crawler grâce à IndexNow |
| **3-7 jours** | Premières pages indexées chez Google |
| **2-3 semaines** | Apparition dans les recherches Bing/ChatGPT pour requêtes longues |
| **1-2 mois** | Premières mentions ChatGPT/Perplexity sur des requêtes spécifiques |
| **3-6 mois** | Présence stable (avec backlinks et avis Google) |
| **6-12 mois** | Recommandations IA fréquentes sur ton secteur |

**À ne pas faire** : abandonner après 1 mois en pensant que ça marche pas. Le SEO est un investissement long terme.

---

## Maintenance — Routine mensuelle

À faire **une fois par mois** (30 min max) :

### Check-up technique
- [ ] Vérifier Google Search Console : nouvelles erreurs d'indexation ?
- [ ] Vérifier Bing Webmaster : sitemap toujours OK ?
- [ ] Tester `curl -I https://www.tonsite.fr/llms.txt` : header `text/plain` ?
- [ ] Re-générer les Markdown Mirrors si le contenu a changé

### Contenu
- [ ] Publier 1 article de blog ciblant une requête longue traîne
- [ ] Mettre à jour `llms.txt` si tarifs/services ont changé
- [ ] Ajouter nouvelles réalisations dans `/realisations`

### Promotion
- [ ] Demander 1 nouvel avis Google à un client récent
- [ ] Partager les nouveaux articles sur LinkedIn
- [ ] Vérifier la fiche Google Business (avis à répondre, photos à ajouter)

### Mesure
- [ ] Noter dans un fichier le nombre d'impressions Search Console (suivre la progression)
- [ ] Tester quelques requêtes ChatGPT/Perplexity pour voir si tu apparais

---

## Annexes

### A. Récap des fichiers à avoir à la racine

```
public/
├── llms.txt                         # Présentation pour les IA
├── sitemap.xml                      # Carte des pages
├── robots.txt                       # Règles bots
├── index.md                         # Mirror Markdown home
├── services.md                      # Mirror Markdown services
├── realisations.md                  # Mirror Markdown réalisations
├── contact.md                       # Mirror Markdown contact
└── [clé-uuid].txt                   # Vérification IndexNow
```

### B. Récap des outils à configurer

- ✅ Google Search Console + sitemap soumis
- ✅ Bing Webmaster Tools + sitemap soumis
- ✅ IndexNow (clé + script postbuild)
- 🔥 Google Business Profile (à faire dès que possible)

### C. Liens utiles

- [search.google.com/search-console](https://search.google.com/search-console)
- [bing.com/webmasters](https://www.bing.com/webmasters)
- [business.google.com](https://business.google.com)
- [indexnow.org](https://www.indexnow.org)
- [sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html) (spec officielle)
- [llmstxt.org](https://llmstxt.org) (spec llms.txt)

### D. Commandes de vérification rapide

```bash
# Tout est en ligne ?
curl -I https://www.tonsite.fr/llms.txt
curl -I https://www.tonsite.fr/sitemap.xml
curl -I https://www.tonsite.fr/robots.txt

# Le sitemap contient bien les bonnes URLs ?
curl -s https://www.tonsite.fr/sitemap.xml | grep "<loc>"

# IndexNow fonctionne ?
curl https://www.tonsite.fr/<ta-cle>.txt
```

---

## Pour réutiliser ce playbook sur un nouveau site

1. **Crée le nouveau site** (Next.js / autre)
2. **Copie ce fichier** à la racine du nouveau projet : `docs/SEO_AI_PLAYBOOK.md`
3. **Suis les étapes 1 à 8** dans l'ordre, en collant les prompts dans Claude Code
4. **Réutilise les scripts** déjà écrits :
   - `scripts/generate_markdown_mirrors.py` (modifier la liste `PAGES`)
   - `scripts/notify_indexnow.mjs` (modifier `KEY`, `HOST`, `URLS`)
5. **Configure GSC + Bing + IndexNow** (étapes 6-8)
6. **Lance les boosters** dès que possible (étape 9)

Compter 2-3 heures la première fois, 1h pour les sites suivants.

---

*Playbook créé en avril 2026 sur la base de la mise en place réelle pour OptiPro.*
*Mettre à jour quand de nouveaux bots IA ou outils apparaissent.*
