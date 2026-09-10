// Les points d'entrée d'API
// 

import { Router } from 'express';
import pool from '../db.js';

const benevoleRouter = Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Liste des bénévoles (pour l'écran « Qui es-tu ? »)
benevoleRouter.get("/", async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT nom, prenom
            FROM benevole
            ORDER BY nom ASC;
        `);

        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

export default benevoleRouter;