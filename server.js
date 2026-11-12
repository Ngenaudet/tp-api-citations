import express from "express";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
const citationSchema = new mongoose.Schema({
  // TODO : déclarer texte et auteur comme chaînes requises et nettoyées.
});
const Citation = mongoose.model("Citation", citationSchema);

const app = express();
app.set("view engine", "ejs");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const citations = await Citation.find();
  res.render("index", { citations, erreur: null });
});

app.post("/ajouter-citation", async (req, res) => {
  const texte = req.body?.texte;
  const auteur = req.body?.auteur;

  if (typeof texte !== "string" || typeof auteur !== "string" ||
      !texte.trim() || !auteur.trim()) {
    const citations = await Citation.find();
    return res.status(400).render("index", {
      citations,
      erreur: "Renseigne la citation et son auteur.",
    });
  }

  await Citation.create({ texte: texte.trim(), auteur: auteur.trim() });
  res.redirect(303, "/");
});

app.get("/ping", (req, res) => {
  res.type("text/plain").send("Serveur de citations prêt.");
});

app.get("/citations", async (req, res) => {
  const citations = await Citation.find();
  res.json(citations);
});

app.post("/citations", async (req, res) => {
  // TODO : valider le corps et enregistrer une citation avec le modèle.
  res.status(501).json({ message: "À compléter" });
});

app.get("/citations/:id", async (req, res) => {
  // TODO : vérifier le format de l’ID et chercher le document.
  res.status(501).json({ message: "À compléter" });
});

app.put("/citations/:id", async (req, res) => {
  // Bonus : modifier une citation et renvoyer la version mise à jour.
  res.status(501).json({ message: "À compléter" });
});

app.delete("/citations/:id", async (req, res) => {
  // Bonus : supprimer une citation et gérer les identifiants invalides ou absents.
  res.status(501).json({ message: "À compléter" });
});

app.use((error, req, res, next) => {
  if (error.status === 400 || error.name === "ValidationError") {
    return res.status(400).json({ message: "Données invalides" });
  }

  res.status(500).json({ message: "Erreur serveur" });
});

async function demarrer() {
  // TODO : attendre mongoose.connect avec MONGODB_URI et dbName « tp_citations ».
  app.listen(3000, () => {
    console.log("API disponible sur http://localhost:3000");
  });
}

demarrer().catch(() => {
  console.error("Connexion Atlas impossible. Vérifie .env et la configuration Atlas.");
  process.exitCode = 1;
});
