import express from "express";

const app = express();
app.use(express.json());

const citations = [
  { id: 1, texte: "Apprendre en pratiquant.", auteur: "Équipe du TP" },
];
let prochainId = 2;

app.get("/citations", (req, res) => {
  res.json(citations);
});

app.get("/citations/:id", (req, res) => {
  // TODO : convertir l’ID en nombre, chercher la citation et gérer son absence.
  res.status(501).json({ message: "À compléter" });
});

app.post("/citations", (req, res) => {
  // TODO : valider req.body, créer une citation et incrémenter prochainId.
  res.status(501).json({ message: "À compléter" });
});

app.put("/citations/:id", (req, res) => {
  // TODO : retrouver la citation et remplacer texte et auteur après validation.
  res.status(501).json({ message: "À compléter" });
});

app.delete("/citations/:id", (req, res) => {
  // TODO : retirer la citation du tableau et terminer la réponse.
  res.status(501).json({ message: "À compléter" });
});

app.listen(3000, () => {
  console.log("API disponible sur http://localhost:3000");
});
