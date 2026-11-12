# 02 · Un CRUD avec Express

[Parcours et rendu](PARCOURS.md) · Lance `npm install` puis `npm start`.

## Voir le résultat dans le navigateur

Ouvre [la page EJS](http://localhost:3000/) après avoir démarré le serveur. Rafraîchis-la après une requête d’ajout, de modification ou de suppression pour voir la liste à jour. Les requêtes CRUD se font avec curl, Postman ou Bruno. La route `/ping` renvoie du texte avec `res.send()`, et les routes de l’API utilisent `res.json()` pour les réponses JSON.

## Mini-cours

Express associe une méthode et un chemin à une fonction. `express.json()` lit le corps JSON d’une requête et le rend accessible dans `req.body`. Le segment `:id` est accessible sous forme de texte dans `req.params.id`. Pour chercher dans le tableau, convertis-le en nombre, puis utilise `find` ou `findIndex`. Le tableau est recréé à chaque démarrage du serveur.

## À toi de jouer

`GET /citations` fonctionne déjà. Complète les quatre autres routes dans cet ordre.

| Requête | Réponse attendue |
|---|---|
| `GET /citations/:id` | 200 et la citation, ou 404 si elle est absente |
| `POST /citations` | 201 et la citation avec un nouvel identifiant |
| `PUT /citations/:id` | 200 et la citation mise à jour, ou 404 |
| `DELETE /citations/:id` | 204 avec un corps vide, ou 404 |

Pour POST et PUT, vérifie que `texte` et `auteur` sont des chaînes non vides après `trim()`. Sinon, renvoie 400 et un message JSON. Pour PUT, garde le même identifiant. Utilise `prochainId` pour que les identifiants supprimés ne soient pas réutilisés pendant l’exécution.

```bash
curl -i http://localhost:3000/citations/1
curl -i -X POST http://localhost:3000/citations -H 'Content-Type: application/json' -d '{"texte":"On progresse en essayant.","auteur":"Ada"}'
curl -i -X POST http://localhost:3000/citations -H 'Content-Type: application/json' -d '{"texte":" ","auteur":"Ada"}'
curl -i -X PUT http://localhost:3000/citations/1 -H 'Content-Type: application/json' -d '{"texte":"Nouvelle version","auteur":"Ada"}'
curl -i -X DELETE http://localhost:3000/citations/1
curl -i http://localhost:3000/citations/1
```

Dans `RENDU.md`, relève le POST invalide et le GET après suppression. Explique d’où viennent les valeurs de `req.params.id` et `req.body`.
