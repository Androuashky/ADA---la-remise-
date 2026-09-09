import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import express from "express";
import cors from "cors";
import benevoleRouter from "./routes/benevole.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/api/benevole', benevoleRouter);



app.use((err, req, res, next) => {
  console.error("Erreur centralisée :", err.stack); // pour debugger : renvoie une chaîne de caractères qui décrit le chemin d'exécution depuis le point où l'erreur a été levée jusqu'à sa capture

  if (err.code === "23503") {
    return res.status(404).json({ error: "Ressource liée introuvable (clé étrangère inexistante)." });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message || "Erreur interne du serveur" });
});

app.listen(3000, () => {
  console.log(`🚀 Serveur express démarré sur http://localhost:3000`);
});
