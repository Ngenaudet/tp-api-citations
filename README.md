# 01 · Ton premier serveur Node.js

Lis le [parcours et les consignes de rendu](PARCOURS.md), puis lance `npm start`. Aucune dépendance à installer pour cette branche.

## Mini-cours

Node.js exécute du JavaScript hors du navigateur. Le module natif `node:http` permet de créer un serveur. À chaque requête, `req` fournit notamment la méthode et l’URL. Avec `res`, tu choisis le statut, les en-têtes et le corps de la réponse. `JSON.stringify` transforme un tableau ou un objet JavaScript en texte JSON.

## À toi de jouer

1. Lance le serveur et observe la réponse de `GET /`.
2. Dans `server.js`, ajoute `GET /citations`. Renvoie le tableau fourni avec le statut 200 et un en-tête `Content-Type: application/json`.
3. Remplace la réponse 501 par un statut 404 et le JSON `{"message":"Route introuvable"}`. Après chaque réponse, le traitement doit s’arrêter.

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/citations
curl -i http://localhost:3000/inconnue
```

Dans `RENDU.md`, relève les résultats de `/citations` et `/inconnue`. Explique la différence entre `req` et `res`, puis indique à quoi sert `Content-Type`.
