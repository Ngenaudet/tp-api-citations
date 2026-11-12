# 01 · Premier serveur Node.js avec Express et EJS

Lis le [parcours et les consignes de rendu](PARCOURS.md), puis lance `npm install` et `npm start`.

## Mini-cours · De la requête à la réponse

| Route | Méthode Express | Résultat |
|---|---|---|
| `GET /` | `res.render("index", { citations })` | Une page HTML générée par EJS |
| `GET /ping` | `res.send()` | Un message en texte brut |
| `GET /citations` | `res.json()` | Le tableau de citations au format JSON |

Express associe une méthode HTTP et un chemin à une fonction. `req` représente la requête du client et `res` permet de construire la réponse. Avec `res.json()`, Express sérialise le tableau en JSON et ajoute l’en-tête adapté.

### Lire une requête et y répondre

Quand tu ouvres `/ping`, le navigateur envoie une requête `GET /ping`. Express cherche une route avec cette méthode et ce chemin. Dans la fonction de la route, `req` contient les informations envoyées par le client. Avec `res`, tu choisis le statut et le contenu de la réponse.

Voici une route d’exemple qui renvoie un objet JSON.

```js
app.get("/exemple", (req, res) => {
  res.status(200).json({ message: "Bonjour" });
});
```

`200` indique que la requête a réussi. Si aucune route ne traite la requête, Express arrive au dernier `app.use()`. C’est là que tu renvoies `404` et un message. Place ce middleware après les routes.

### Reconnaître le format reçu

L’en-tête `Content-Type` indique au navigateur le format du contenu renvoyé. La commande `curl -i` affiche les en-têtes avant le corps de la réponse. Dans le code de `/ping`, `res.type("text/plain")` définit le format texte. `res.json()` définit automatiquement le format JSON. Sur `/`, `res.render()` transmet les citations à la vue EJS et Express renvoie le HTML généré.

## Exercice

1. Ouvre [la page EJS](http://localhost:3000/) dans ton navigateur. Repère dans `views/index.ejs` la boucle qui affiche les citations et les expressions `<%= ... %>` qui insèrent leurs valeurs.
2. Dans `server.js`, fais renvoyer le tableau par `GET /citations` avec `res.json()`. Vérifie que le statut est 200.
3. Dans le dernier `app.use()`, renvoie un statut 404 et le JSON `{"message":"Route introuvable"}` pour les routes inconnues.

```bash
curl -i http://localhost:3000/ping
curl -i http://localhost:3000/citations
curl -i http://localhost:3000/inconnue
```

Dans `RENDU.md`, note le code HTTP et le contenu de la réponse pour `/citations` et `/inconnue`. Explique à quoi servent `req` et `res`. Avec `curl -i`, relève la valeur de `Content-Type` pour `/ping` et `/citations`. Quel format chaque route renvoie-t-elle ?
