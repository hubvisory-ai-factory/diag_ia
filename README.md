# Diag IA — Portail de diagnostics IA Hubvisory

Crée des sites web interactifs pour présenter les résultats de tes diagnostics IA clients,
**sans coder et sans compte GitHub**. Tout se fait en discutant avec Claude Code.

**Site en ligne** : https://diag-ia.hubvisory.app/

## Ce qu'il te faut

- **Claude Code Desktop** installé. C'est tout.
- (Git est utile pour télécharger le projet ; si tu ne l'as pas, Claude t'aide à l'installer.)

## Comment l'utiliser

1. Ouvre **Claude Code Desktop**.
2. Copie-colle le **prompt ci-dessous**.
3. Laisse-toi guider : décris ce que tu veux, fournis tes fichiers de contexte, regarde
   le résultat en local et itère.
4. Quand c'est prêt, dis simplement « **publie** » → tu reçois un **lien de validation** à
   partager (le client ne le voit pas encore).
5. Quand tout est validé et que tu veux que **le client** voie le site, contacte un
   **AI engineer Hubvisory** (ex. Gaspard) : il le met en ligne.

## Prompt à copier-coller dans Claude Code

```
Tu vas m'aider à créer ou modifier un diagnostic IA Hubvisory.

1. Configure la clé de publication (une seule fois) :
   mkdir -p ~/.config/diag_ia && printf '%s' "[COLLER_LA_CLÉ_ICI]" > ~/.config/diag_ia/secret

2. Vérifie que Git est installé (git --version). S'il manque, guide-moi pour l'installer.

3. Clone le projet (dépôt public, aucun login) et entre dedans :
   git clone https://github.com/hubvisory-ai-factory/diag_ia.git
   cd diag_ia

4. Lis CLAUDE.md et REGISTRY.md pour comprendre le projet et les conventions.

5. Demande-moi ce que je veux faire (nouveau diagnostic, modifier un existant, autre).
   Pose les questions une par une. Ne suppose jamais les données du diagnostic :
   demande-moi toujours de les fournir ou de les confirmer.

Quand je dis « publie », mets en ligne un aperçu de validation et donne-moi le lien
à partager. Ne publie jamais le site client final toi-même : c'est un AI engineer
Hubvisory qui s'en charge.
```

> La `[COLLER_LA_CLÉ_ICI]` est fournie par ton admin (elle permet de publier sans compte
> GitHub). Claude la mémorise après la première fois.

## Besoin d'aide ?

- **Doc technique (agents)** : `CLAUDE.md`
- **Clients existants** : `REGISTRY.md`
- **Tous les composants** : ouvre `components/index.html` dans un navigateur
- **Mise en ligne pour le client** : contacte un AI engineer Hubvisory
