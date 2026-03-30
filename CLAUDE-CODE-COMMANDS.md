# Claude Code — Commandes Terminal (Reference Complete)

---

## 1. Lancer Claude Code

```bash
claude                          # Session interactive
claude "question"               # Session avec prompt initial
claude -p "question"            # Mode print (reponse + exit)
claude -c                       # Reprendre la derniere conversation
claude -r "session"             # Reprendre une session par nom/ID
```

---

## 2. Mode Autonome (proceed sans demander)

```bash
# Le flag qui fait tout sans confirmation :
claude --dangerously-skip-permissions

# Ou specifier un mode de permissions :
claude --permission-mode bypassPermissions    # Skip tout
claude --permission-mode acceptEdits          # Auto-accepte les edits fichiers
claude --permission-mode plan                 # Analyse only, pas de modifs
claude --permission-mode dontAsk              # Refuse sauf pre-approuve
claude --permission-mode default              # Standard (demande a chaque outil)
```

---

## 3. Flags CLI

### Session & Conversation

| Flag | Description |
|------|-------------|
| `-c` / `--continue` | Reprendre la derniere conversation |
| `-r <session>` / `--resume` | Reprendre par nom ou ID |
| `-n <name>` / `--name` | Nommer la session |
| `--fork-session` | Creer un nouveau session ID en reprenant |
| `--from-pr <number>` | Reprendre sessions liees a une PR |

### Modele & Effort

| Flag | Description |
|------|-------------|
| `--model <model>` | Choisir le modele (`sonnet`, `opus`, `haiku`) |
| `--effort <level>` | Niveau d'effort : `low`, `medium`, `high`, `max`, `auto` |

### Outils & Permissions

| Flag | Description |
|------|-------------|
| `--dangerously-skip-permissions` | **Skip TOUTES les permissions** |
| `--permission-mode <mode>` | Mode permissions (voir section 2) |
| `--tools <liste>` | Restreindre les outils (`"Bash,Edit,Read"` ou `""`) |
| `--allowedTools <rules>` | Outils auto-approuves |
| `--disallowedTools <rules>` | Outils bloques |

### System Prompt

| Flag | Description |
|------|-------------|
| `--system-prompt <text>` | Remplacer le system prompt |
| `--system-prompt-file <path>` | System prompt depuis un fichier |
| `--append-system-prompt <text>` | Ajouter au system prompt |

### Output & Format

| Flag | Description |
|------|-------------|
| `-p` / `--print` | Mode print (pas interactif) |
| `--output-format <format>` | Format : `text`, `json`, `stream-json` |
| `--max-turns <n>` | Limiter le nombre de tours |
| `--max-budget-usd <montant>` | Budget max en dollars |
| `--verbose` | Logs detailles |

### Contexte

| Flag | Description |
|------|-------------|
| `--add-dir <path>` | Ajouter un repertoire de travail |
| `-w <name>` / `--worktree` | Demarrer dans un git worktree isole |
| `--mcp-config <files>` | Charger des serveurs MCP |
| `--agent <name>` | Specifier un agent |

### Divers

| Flag | Description |
|------|-------------|
| `-v` / `--version` | Version |
| `--debug [categories]` | Mode debug |
| `--chrome` / `--no-chrome` | Activer/desactiver Chrome |
| `--ide` | Connexion auto a l'IDE |
| `--remote <desc>` | Session web sur claude.ai |

---

## 4. Commandes Slash (dans la session)

### Essentielles

| Commande | Description |
|----------|-------------|
| `/help` | Aide et commandes disponibles |
| `/clear` | Effacer l'historique (alias: `/reset`, `/new`) |
| `/exit` | Quitter (alias: `/quit`) |
| `/compact [instructions]` | Compacter la conversation |
| `/cost` | Stats tokens et cout |
| `/context` | Visualiser l'utilisation du contexte |

### Modele & Mode

| Commande | Description |
|----------|-------------|
| `/model [model]` | Changer de modele |
| `/fast [on\|off]` | Toggle mode rapide |
| `/effort [level]` | Changer le niveau d'effort |
| `/vim` | Toggle mode Vim |
| `/plan` | Entrer en mode plan |

### Projet & Config

| Commande | Description |
|----------|-------------|
| `/init` | Initialiser CLAUDE.md |
| `/config` | Ouvrir les settings (alias: `/settings`) |
| `/permissions` | Voir/modifier les permissions |
| `/memory` | Editer les fichiers memoire |
| `/hooks` | Voir les configurations hooks |
| `/mcp` | Gerer les serveurs MCP |
| `/plugin` | Gerer les plugins |
| `/status` | Version, modele, compte, connexion |
| `/doctor` | Diagnostiquer l'installation |

### Session

| Commande | Description |
|----------|-------------|
| `/resume [session]` | Reprendre une conversation (alias: `/continue`) |
| `/rename [name]` | Renommer la session |
| `/branch [name]` | Brancher la conversation (alias: `/fork`) |
| `/export [filename]` | Exporter en texte |
| `/copy [N]` | Copier la derniere reponse |

### Git & Code

| Commande | Description |
|----------|-------------|
| `/diff` | Voir les changements non-commites |
| `/rewind` | Revenir a un point precedent (alias: `/checkpoint`) |
| `/review` | Revue de PR (deprecated, utiliser plugin) |
| `/pr-comments [PR]` | Afficher les commentaires PR GitHub |
| `/security-review` | Analyse securite des changements |
| `/simplify` | Revoir le code pour qualite et reuse |

### Divers

| Commande | Description |
|----------|-------------|
| `/add-dir <path>` | Ajouter un repertoire |
| `/btw <question>` | Question rapide hors conversation |
| `/color [couleur]` | Couleur barre prompt |
| `/theme` | Changer le theme |
| `/terminal-setup` | Configurer les keybindings terminal |
| `/keybindings` | Ouvrir le fichier keybindings |
| `/voice` | Toggle dictee vocale |
| `/login` / `/logout` | Connexion / Deconnexion |
| `/upgrade` | Changer de plan |
| `/usage` | Limites et rate limits |
| `/stats` | Stats d'utilisation |
| `/insights` | Rapport d'analyse des sessions |
| `/tasks` | Gerer les taches en arriere-plan |
| `/stickers` | Commander des stickers |
| `/skills` | Lister les skills disponibles |
| `/loop` | Lancer une commande en boucle |
| `/sandbox` | Toggle sandbox mode |
| `/remote-control` | Rendre la session controlable a distance |
| `/desktop` | Continuer dans l'app Desktop |

---

## 5. Raccourcis Clavier

### Controles Generaux

| Raccourci | Action |
|-----------|--------|
| `Ctrl+C` | Annuler la generation en cours |
| `Ctrl+D` | Quitter Claude Code |
| `Ctrl+L` | Effacer l'ecran (garde l'historique) |
| `Ctrl+R` | Recherche inversee dans l'historique |
| `Ctrl+O` | Toggle sortie verbose |
| `Ctrl+G` | Ouvrir dans l'editeur externe |
| `Ctrl+B` | Mettre les taches en arriere-plan |
| `Ctrl+T` | Toggle liste des taches |
| `Ctrl+F` | Kill tous les agents en arriere-plan (2x) |
| `Esc + Esc` | Rewind / Resumer |
| `Shift+Tab` | Changer de mode permissions |
| `Option+P` (mac) | Changer de modele |
| `Option+T` (mac) | Toggle thinking etendu |

### Saisie Multiligne

| Methode | Raccourci |
|---------|-----------|
| Escape newline | `\` + `Enter` |
| macOS | `Option+Enter` |
| iTerm2/WezTerm/Ghostty/Kitty | `Shift+Enter` |
| Line feed | `Ctrl+J` |

### Edition de Texte

| Raccourci | Action |
|-----------|--------|
| `Ctrl+K` | Supprimer jusqu'a la fin de la ligne |
| `Ctrl+U` | Supprimer toute la ligne |
| `Ctrl+Y` | Coller le texte supprime |
| `Alt+B` / `Alt+F` | Mot precedent / suivant |

### Prefixes Rapides

| Prefixe | Action |
|---------|--------|
| `/` | Menu commandes/skills |
| `!` | Executer une commande bash |
| `@` | Autocompletion chemin fichier |

---

## 6. Piping & Usage Non-interactif

```bash
# Pipe un fichier
cat fichier.ts | claude -p "explique ce code"

# Prompt direct avec sortie JSON
claude -p "liste les fichiers" --output-format json

# Continuer une conversation en mode SDK
claude -c -p "et maintenant fais X"

# Limiter les tours et le budget
claude -p "refactor tout" --max-turns 10 --max-budget-usd 5
```

---

## 7. Authentification

```bash
claude auth login                    # Se connecter
claude auth login --email x@y.com    # Avec email
claude auth login --sso              # Via SSO
claude auth logout                   # Se deconnecter
claude auth status                   # Statut (JSON)
claude auth status --text            # Statut (texte)
```

---

## 8. Fichiers de Configuration

| Fichier | Role |
|---------|------|
| `~/.claude/settings.json` | Settings utilisateur (global) |
| `.claude/settings.json` | Settings projet |
| `.claude/settings.local.json` | Settings projet local (gitignore) |
| `~/.claude/keybindings.json` | Raccourcis clavier custom |
| `CLAUDE.md` | Instructions projet |
| `~/.claude/CLAUDE.md` | Instructions globales |

---

## 9. Exemples Courants

```bash
# Lancer en mode full autonome sur un prompt
claude -p "fix tous les tests" --dangerously-skip-permissions

# Session nommee pour reprendre plus tard
claude -n "refactor-auth" "refactore le module auth"

# Reprendre cette session
claude -r "refactor-auth"

# Mode plan (analyse sans modifier)
claude --permission-mode plan

# Avec modele specifique et effort max
claude --model opus --effort max

# Debug
claude --debug "api,hooks"
```
