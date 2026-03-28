# TODO — OptiPro

## Terminé — Refonte site vitrine (2026-03-28)
- [x] Repositionnement OptiBoard → OptiPro (conseil & dev sur mesure)
- [x] Nouveau hero avec "La Méthode OptiPro" (4 étapes)
- [x] 4 sections services immersives avec mockups HTML/CSS
- [x] Page Services (timeline + Pierre + CTA)
- [x] Page Réalisations (2 projets placeholder)
- [x] Page Contact (formulaire simplifié)
- [x] Mentions légales LCEN + Politique de confidentialité RGPD
- [x] Navigation et footer mis à jour
- [x] Animations premium (parallax, stagger, micro-interactions)
- [x] Typographie Space Grotesk + Outfit
- [x] Header scroll shadow + nav underline animations
- [x] Mockups animés (barres, entrées staggerées, tilt 3D, chat Telegram)
- [x] Suppression fichiers OptiBoard
- [x] Merge + déploiement en prod

## En cours — Back-office admin
### Brainstorming (validé)
- [x] Approche choisie : routes /admin/* dans le même Next.js
- [x] Stack : Supabase Auth + DB (nouveau projet "OptiPro")
- [x] Schéma BDD validé : tables clients, audits, audit_answers
- [x] Structure des pages validée (dashboard, clients, audit, PDF)
- [x] 5 catégories d'audit : outils, gestion admin, données, tâches répétitives, points de friction

### À faire — Design (reprendre ici)
- [ ] Finir le spec design (écrire le doc + self-review)
- [ ] Validation du spec par Pierre
- [ ] Écrire le plan d'implémentation

### À faire — Implémentation
- [ ] Créer projet Supabase "OptiPro" (eu-west-3 ou eu-central-1)
- [ ] Créer les tables (clients, audits, audit_answers) + RLS
- [ ] Supabase Auth (email/password)
- [ ] Middleware Next.js pour protéger /admin/*
- [ ] Page login (/admin/login)
- [ ] Dashboard (/admin)
- [ ] CRUD clients (/admin/clients, /admin/clients/new, /admin/clients/[id])
- [ ] Formulaire d'audit structuré (/admin/audit/new)
- [ ] Vue/édition audit (/admin/audit/[id])
- [ ] Génération rapport PDF (/admin/audit/[id]/pdf)
- [ ] Tests + vérification
- [ ] Déploiement

## À faire — Site vitrine (plus tard)
- [ ] Remplir les vrais projets dans src/data/projects.ts (SAPAL + autre)
- [ ] Ajouter photo de Pierre dans la section Services
- [ ] Enrichir la page Services (FAQ, détails par étape)
- [ ] Espace client (Niveau 3 — futur)
