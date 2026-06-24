---
name: git-setup
description: Install Git so the user can download (clone) the diag_ia project. Use when a user gets "git not found" / "git: command not found", or has never used Git. Publishing does NOT need Git auth, a GitHub account, gh, SSH, or a fork — that all goes through the publish backend.
---

# Git setup (just enough to download the project)

The only thing Git is needed for here is **cloning the public repo**. Cloning a public
repo needs **no GitHub account and no authentication**. Publishing later is handled by
the `publish` skill (a backend service) — so do **not** set up `gh`, SSH keys, a
GitHub account, or a fork. If a user asks about those for publishing, point them to the
`publish` skill instead.

---

## Step 1 — Is Git installed?

```bash
git --version
```

- Shows a version (e.g. `git version 2.39.0`) → **done**, skip to "Clone the project".
- "command not found" → go to Step 2.

## Step 2 — Install Git

### macOS
```bash
xcode-select --install
```
A popup appears — click **Install** and wait (~5 min). Then re-check `git --version`.

### Windows
1. Download from https://git-scm.com/download/win
2. Run the installer with default options
3. Restart Claude Code Desktop
4. Verify: `git --version`

### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install git -y
```

## Clone the project

```bash
cd ~/Documents
git clone https://github.com/hubvisory-ai-factory/diag_ia.git
cd diag_ia
```

No login is requested — it's a public repository.

## Done

Continue: read `CLAUDE.md` + `REGISTRY.md`, then ask what the user wants to do.
When ready to publish, use the **`publish`** skill (staging — no GitHub account).
Mise en ligne du site client = contacter un **AI engineer Hubvisory**.

---

## Troubleshooting

| Message | Fix |
|---|---|
| `xcode-select: ... already installed` | Git is already installed — run `git --version` to confirm |
| `destination path 'diag_ia' already exists` | Already cloned — just `cd diag_ia` and continue |
| Asked for a username/password on clone | You're cloning the wrong (private) URL — use exactly `https://github.com/hubvisory-ai-factory/diag_ia.git` |
| Anything about forking / `gh` / SSH for publishing | Not needed — publishing uses the `publish` skill (backend) |
