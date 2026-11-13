/* Deux points bloquent le démarrage de ton server.js :

Supprime le marqueur @@ -13,72 +15,146 @@. Il vient de l’affichage des différences dans Git et provoque une erreur de syntaxe.

Avant les routes, crée l’application avec const app = express(), configure le moteur EJS et le dossier views, puis ajoute app.use(express.json()) et app.use(express.urlencoded({ extended: false })). Le premier lit le JSON envoyé à l’API, le second lit les champs du formulaire.

Une fois ces corrections faites, lance node --check server.js, puis npm start. Ajoute une citation depuis le formulaire, redémarre le serveur et recharge la page. Si la citation est toujours là, tu as vérifié qu’elle est bien enregistrée dans MongoDB. */


import express from "express";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const citationSchema = new mongoose.Schema({
    texte: { type: String, required: true, trim: true },
    auteur: { type: String, required: true, trim: true },
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

    if (
        typeof texte !== "string" ||
        typeof auteur !== "string" ||
        !texte.trim() ||
        !auteur.trim()
    ) {
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
    const texte = req.body?.texte;
    const auteur = req.body?.auteur;

    if (
        typeof texte !== "string" ||
        typeof auteur !== "string" ||
        !texte.trim() ||
        !auteur.trim()
    ) {
        return res.status(400).json({ message: "Données invalides" });
    }

    const nouvelleCitation = await Citation.create({
        texte: texte.trim(),
        auteur: auteur.trim(),
    });

    res.status(201).json(nouvelleCitation);
});

app.get("/citations/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: "Identifiant invalide" });
    }

    const citation = await Citation.findById(id);

    if (!citation) {
        return res.status(404).json({ message: "Citation introuvable" });
    }

    res.status(200).json(citation);
});

app.put("/citations/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: "Identifiant invalide" });
    }

    const texte = req.body?.texte;
    const auteur = req.body?.auteur;

    if (
        typeof texte !== "string" ||
        typeof auteur !== "string" ||
        !texte.trim() ||
        !auteur.trim()
    ) {
        return res.status(400).json({ message: "Données invalides" });
    }

    const citationModifiee = await Citation.findByIdAndUpdate(
        id,
        { texte: texte.trim(), auteur: auteur.trim() },
        { new: true, runValidators: true },
    );

    if (!citationModifiee) {
        return res.status(404).json({ message: "Citation introuvable" });
    }

    res.status(200).json(citationModifiee);
});

app.delete("/citations/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ message: "Identifiant invalide" });
    }

    const citationSupprimee = await Citation.findByIdAndDelete(id);

    if (!citationSupprimee) {
        return res.status(404).json({ message: "Citation introuvable" });
    }

    res.status(204).send();
});

app.use((error, req, res, next) => {
    if (error.status === 400 || error.name === "ValidationError") {
        return res.status(400).json({ message: "Données invalides" });
    }

    res.status(500).json({ message: "Erreur serveur" });
});

async function demarrer() {
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "tp_citations",
    });

    app.listen(3000, () => {
        console.log("API disponible sur http://localhost:3000");
    });
}

demarrer().catch(() => {
    console.error(
        "Connexion Atlas impossible. Vérifie .env et la configuration Atlas.",
    );
    process.exitCode = 1;
});
