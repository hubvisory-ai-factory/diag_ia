---
name: git-setup
description: Walk novice users through Git installation, GitHub account creation, and repo access setup. Use when a user has never used Git before or gets "git not found" or "permission denied" errors.
---

# Git & GitHub Setup for Beginners

This skill helps users who have never used Git or GitHub before. Walk them through step by step, checking each step before moving on.

---

## Step 1: Check if Git is Installed

Run this command:
```bash
git --version
```

**If it shows a version** (e.g., `git version 2.39.0`): Git is installed. Skip to Step 3.

**If it shows "command not found"**: Git is not installed. Go to Step 2.

---

## Step 2: Install Git

### On Mac

The easiest way:
```bash
xcode-select --install
```

This opens a popup asking to install developer tools. Click "Install" and wait (~5 minutes).

After installation, verify:
```bash
git --version
```

### On Windows

1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default options
3. Restart Claude Code Desktop
4. Verify with `git --version`

### On Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install git -y
```

---

## Step 3: Check if User Has a GitHub Account

Ask the user:

> "Do you have a GitHub account? If you're not sure, have you ever signed up at github.com?"

**If YES**: Skip to Step 5.

**If NO or UNSURE**: Go to Step 4.

---

## Step 4: Create a GitHub Account

Walk them through:

1. **Open** https://github.com/signup in a browser

2. **Enter email** — Use a work email (hubvisory.com) if possible, or personal email

3. **Create password** — At least 8 characters

4. **Choose username** — Suggestion: `firstname-lastname` or `firstnamelastname`
   - Example: `pierre-dupont` or `pierredupont`

5. **Verify email** — GitHub sends a code, enter it

6. **Skip personalization** — Click "Skip" on the questionnaire (optional)

7. **Done!** They now have a GitHub account.

Tell them:
> "Great! Your GitHub account is ready. Your username is `<username>`. Now let's set up Git on your computer to use this account."

---

## Step 5: Configure Git Identity

Git needs to know who is making commits. Run these commands (replace with user's info):

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "email@example.com"
```

**Important**: The email should match their GitHub account email.

Verify:
```bash
git config --global user.name
git config --global user.email
```

---

## Step 6: Set Up GitHub Authentication

GitHub requires authentication to push code. The easiest method is GitHub CLI.

### Install GitHub CLI

**On Mac:**
```bash
brew install gh
```

If `brew` is not installed:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Then retry `brew install gh`.

**On Windows:**
Download from https://cli.github.com/ and run the installer.

**On Linux:**
```bash
sudo apt install gh -y
```

### Authenticate with GitHub

```bash
gh auth login
```

This starts an interactive flow:
1. **"What account do you want to log into?"** → Select `GitHub.com`
2. **"What is your preferred protocol?"** → Select `HTTPS`
3. **"Authenticate Git with your GitHub credentials?"** → Yes
4. **"How would you like to authenticate?"** → Select `Login with a web browser`
5. A code appears (e.g., `ABCD-1234`) — copy it
6. Press Enter — browser opens
7. Paste the code in the browser
8. Click "Authorize"
9. Return to terminal — should say "Logged in as <username>"

Verify:
```bash
gh auth status
```

Should show: `Logged in to github.com as <username>`

---

## Step 7: Fork and Clone the Repo

The diag_ia repo is public. Anyone can fork it and submit changes via Pull Request — **no special access needed**.

### Fork the Repo

```bash
cd ~/Documents
gh repo fork hubvisory-ai-factory/diag_ia --clone
cd diag_ia
```

This does three things:
1. Creates a copy (fork) of the repo under your GitHub account
2. Clones it to your computer
3. Sets up remotes: `origin` (your fork) and `upstream` (main repo)

Verify:
```bash
git remote -v
```

Should show:
```
origin    https://github.com/<your-username>/diag_ia.git (fetch)
origin    https://github.com/<your-username>/diag_ia.git (push)
upstream  https://github.com/hubvisory-ai-factory/diag_ia.git (fetch)
upstream  https://github.com/hubvisory-ai-factory/diag_ia.git (push)
```

### If They Already Cloned Without Forking

If they cloned the main repo directly and can't push:

```bash
# Fork it now
gh repo fork --remote

# Verify remotes are set up
git remote -v
```

---

## Step 8: Test the Setup

Verify everything works:

```bash
git status
```

Should show: `On branch main` with no errors.

Test that they can create branches:
```bash
git checkout -b test/setup-check
git checkout main
git branch -D test/setup-check
```

If all commands work, setup is complete!

---

## Summary Checklist

By the end, the user should have:

- [ ] Git installed (`git --version` works)
- [ ] GitHub account created
- [ ] Git identity configured (`user.name` and `user.email`)
- [ ] GitHub CLI installed and authenticated (`gh auth status` works)
- [ ] Repo forked and cloned locally (`~/Documents/diag_ia/`)
- [ ] Remotes configured (`origin` = their fork, `upstream` = main repo)

---

## Troubleshooting

### "Permission denied (publickey)"
GitHub CLI authentication failed. Re-run:
```bash
gh auth login
```

### "remote: Repository not found"
Wrong repo URL or typo. Verify:
```bash
git remote -v
```
Should show `https://github.com/hubvisory-ai-factory/diag_ia.git`

### "brew: command not found" (Mac)
Homebrew not installed. Install it:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### "xcode-select: error: command line tools are already installed"
Git is already installed. Run `git --version` to confirm.

### "fatal: destination path 'diag_ia' already exists"
Repo already cloned. Just `cd diag_ia` and continue.

### User forgot their GitHub password
Go to https://github.com/password_reset to reset it.

---

## After Setup

Once everything is ready, they can start the main workflow:

> "You're all set! Say **'I want to add a new client case'** to start creating a diagnostic."
