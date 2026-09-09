import express from "express";
import cors from "cors";
import objetsRouter from './routes/objets.js';
import categoriesRouter from './routes/categories.js';
import statutsRouter from './routes/statuts.js';
import depotsRouter from './routes/depots.js';
import personnesRouter from './routes/personnes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/objets', objetsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/statuts', statutsRouter);
app.use('/api/depots', depotsRouter);
app.use('/api/personnes', personnesRouter);

app.use((err, req, res, next) => {
  console.error("Erreur centralisée :", err.stack); // pour debugger : renvoie une chaîne de caractères qui décrit le chemin d'exécution depuis le point où l'erreur a été levée jusqu'à sa capture

  if (err.code === "23503") {
    return res.status(404).json({ error: "Ressource liée introuvable (clé étrangère inexistante)." });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message || "Erreur interne du serveur" });
});

app.listen(process.env.PORT);

