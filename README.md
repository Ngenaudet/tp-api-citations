# 01 · Premier serveur Node.js avec Express et EJS

Lis le [parcours et les consignes de rendu](PARCOURS.md), puis lance `npm install` et `npm start`.

## Trois formats de réponse

| Route | Méthode Express | Résultat |
|---|---|---|
| `GET /` | `res.render("index", { citations })` | Une page HTML générée par EJS |
| `GET /ping` | `res.send()` | Un message en texte brut |
| `GET /citations` | `res.json()` | Le tableau de citations au format JSON |

Express associe une méthode HTTP et un chemin à une fonction. `req` représente la requête du client et `res` permet de construire la réponse. Avec `res.json()`, Express sérialise le tableau en JSON et ajoute l’en-tête adapté.

## Exercice

1. Ouvre [la page EJS](http://localhost:3000/) dans ton navigateur. Repère dans `views/index.ejs` la boucle qui affiche les citations et les expressions `<%= ... %>` qui insèrent leurs valeurs.
2. Dans `server.js`, fais renvoyer le tableau par `GET /citations` avec `res.json()`. Vérifie que le statut est 200.
3. Dans le dernier `app.use()`, renvoie un statut 404 et le JSON `{"message":"Route introuvable"}` pour les routes inconnues.

```bash
curl -i http://localhost:3000/ping
curl -i http://localhost:3000/citations
curl -i http://localhost:3000/inconnue
```

Dans `RENDU.md`, relève les résultats de `/citations` et `/inconnue`. Explique la différence entre `req` et `res`, puis compare les en-têtes `Content-Type` de `/ping` et de `/citations`.
