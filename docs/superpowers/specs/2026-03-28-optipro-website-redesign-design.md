# OptiPro — Refonte du site web

## Contexte

Le site actuel est entièrement centré sur OptiBoard, un produit SaaS de gestion admin pour artisans BTP. OptiBoard n'est pas prêt et ne doit plus être le sujet principal. Le site doit repositionner OptiPro comme un cabinet de conseil et développement d'outils sur mesure, avec OptiBoard relégué à un teasing discret.

## Positionnement

**OptiPro** = cabinet de conseil & développement d'outils numériques sur mesure.

- Expert technique accessible : "Je comprends votre métier et je traduis ça en outils qui marchent"
- Partenaire de confiance : un interlocuteur unique (Pierre Laurent) qui accompagne dans la durée

**Cible :** Artisans, TPE, professions libérales, indépendants.

**Proposition de valeur :** Audit des outils et process existants, identification des blocages admin, création de solutions sur mesure (sites, web apps, tableaux de bord), automatisation des tâches répétitives.

## Services — La démarche en 4 étapes

1. **Audit de l'existant** — Analyse des outils, process et points de friction. Rapport détaillé avec recommandations. Service payant, remboursé si contrat signé.
2. **Analyse des blocages** — Identification des tâches chronophages, outils inadaptés, opportunités d'amélioration.
3. **Création sur mesure** — Sites web, web apps, tableaux de bord — conçus pour l'activité du client, pas un template générique.
4. **Automatisation** — Workflows, intégrations, synchronisations — les outils se parlent et le répétitif disparaît.

## Architecture des pages

### Page Accueil (`/`)

**Hero :**
- Layout : texte à gauche + visuel démarche 4 étapes à droite
- Badge : "Conseil · Développement · Automatisation"
- Titre : accroche sur le problème (ex: "Vos outils ralentissent votre activité ?") + résolution en accent orange
- Sous-titre : description courte de la méthode de Pierre
- CTA primaire : "Demander un contact" → `/contact`
- CTA secondaire : "Voir les services" → `/services`
- Visuel droite : les 4 étapes (Audit, Analyse, Création, Automatisation) en mini-timeline verticale

**Section 1 — Le problème :**
- 2-3 phrases d'identification des douleurs : outils mal adaptés, temps perdu en admin, devis manuels, pas de vision claire.
- Objectif : le visiteur se reconnaît.

**Section 2 — La démarche en 4 étapes :**
- Version détaillée de la mini-timeline du hero.
- Chaque étape avec icône, titre, description 2-3 lignes.
- Mention "Audit remboursé si contrat" sur l'étape 1.

**Section 3 — Réalisations :**
- Aperçu des 2 projets réalisés.
- Cartes avec : nom du projet, contexte, solution apportée, résultat concret.
- Lien "Voir les détails" → `/realisations`.

**Section 4 — CTA Audit :**
- Bandeau de conversion.
- Message : "Commencez par un audit" ou équivalent.
- Mention "Remboursé si contrat signé" pour lever l'objection.
- Bouton → `/contact`.

**Section 5 — Teasing OptiBoard :**
- Section "Bientôt" en bas de page.
- Aperçu visuel flouté (screenshot ou mockup d'OptiBoard).
- Pitch en 2 lignes : ce que c'est, pourquoi c'est intéressant.
- Formulaire d'inscription à la liste d'attente (email).

### Page Services (`/services`)

**Hero :** Titre + sous-titre présentant la démarche.

**Timeline verticale :**
- Les 4 étapes présentées en timeline verticale.
- Chaque étape : numéro, titre, description détaillée (5-10 lignes), livrables concrets.
- Étape 1 (Audit) : mention "remboursé si contrat signé".

**Section Qui est Pierre :**
- Présentation courte de Pierre Laurent.
- Philosophie : expert technique, interlocuteur unique, accompagnement dans la durée.
- Photo optionnelle.

**CTA Audit :**
- Même bandeau de conversion que sur l'accueil.

### Page Réalisations (`/realisations`)

**Hero :** Titre + sous-titre.

**2 projets, chacun avec :**
- Nom / titre du projet
- Contexte : qui est le client, quel métier, quelle taille
- Problème : qu'est-ce qui ne marchait pas
- Solution : ce qui a été construit (site, app, automatisation)
- Résultat : impact concret (temps gagné, chiffres si possible)
- Screenshot ou visuel

La page est conçue pour grandir au fil des projets.

### Page Contact (`/contact`)

**Formulaire :**
- Nom, entreprise, email, téléphone
- Métier / secteur d'activité
- Description du besoin (champ libre)
- Bouton "Envoyer"

**Contexte autour du formulaire :**
- Mention de l'audit comme point d'entrée recommandé.
- "Audit payant, remboursé si contrat signé."
- "Pierre vous recontacte sous 24h."
- Fallback : email direct (contact@optipro.fr).

## Navigation

**Header (sticky) :**
- Logo OptiPro → `/`
- Services → `/services`
- Réalisations → `/realisations`
- Contact → `/contact`
- CTA bouton : "Demander un contact" → `/contact`

**Footer :**
- Logo OptiPro + tagline ("Conseil & développement sur mesure pour artisans, TPE et indépendants")
- Navigation : Services, Réalisations, Contact
- Contact : Pierre Laurent — contact@optipro.fr — LinkedIn
- Mentions légales, Confidentialité
- Copyright OptiPro (plus de mention OptiBoard)

## Changements par rapport au site actuel

### Supprimé
- Tout le contenu OptiBoard (hero Telegram, chat mockup, plans tarifaires, secteurs BTP dédiés)
- Page `/sectors` (cible élargie au-delà du BTP)
- Page `/about` (contenu intégré dans `/services`)
- PricingCard, PackCard, AddonCard (composants liés aux plans OptiBoard)
- Fichiers data : `packs.ts`, `addons.ts`, `sectors.ts`
- Le CTA "Essai gratuit 14 jours"
- Mention OptiBoard dans les metadata et le footer

### Conservé
- Stack technique : Next.js, TypeScript, CSS Modules
- Design system : palette de couleurs (navy + orange), typographie Outfit, glass cards, animations
- Composants layout : Header, Footer, PageTransition (adaptés)
- Composant Button (inchangé)
- FaqAccordion (potentiellement réutilisable)
- Page Contact (formulaire adapté)
- API contact via Resend

### Nouveau
- Hero avec layout texte + démarche visuelle
- Section "Le problème"
- Timeline verticale des 4 étapes (accueil + services)
- Cartes de réalisations (composant)
- Section teasing OptiBoard avec formulaire liste d'attente
- Page `/realisations`
- Section "Qui est Pierre" sur la page services
- Bandeau CTA Audit réutilisable

## Contraintes techniques

- Pas de nouvelle dépendance majeure. On reste sur le stack actuel (Next.js, CSS Modules, Resend).
- Le formulaire liste d'attente OptiBoard peut réutiliser l'API Resend existante.
- Le mockup flou d'OptiBoard peut être une image statique ou un composant CSS avec `filter: blur()`.
- Les pages de réalisations doivent être facilement extensibles (ajouter un 3e, 4e projet).
- Le site doit rester responsive (mobile-first).
- SEO : metadata adaptées au nouveau positionnement sur chaque page.
