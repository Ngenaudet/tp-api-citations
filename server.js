import { createServer } from "node:http";

const citations = [
  { id: 1, texte: "Apprendre en pratiquant.", auteur: "Équipe du TP" },
];

const server = createServer((req, res) => {
  // Exemple : traiter une méthode et un chemin.
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Bienvenue dans l’API de citations !");
  }

  // TODO 1 : répondre à GET /citations avec le tableau au format JSON.
  // TODO 2 : renvoyer 404 et un message JSON pour les autres requêtes.
  res.writeHead(501);
  res.end("À compléter");
});

server.listen(3000, () => {
  console.log("Serveur disponible sur http://localhost:3000");
});
