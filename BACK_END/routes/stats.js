// Les points d'entrée d'API
// 

import { Router } from 'express';
import pool from '../db.js';

const statsRouter = Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Nombre d'objets par statut
statsRouter.get("/par-statut", async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT statut, COUNT(*)::integer AS nombre_objets
            FROM objet
            GROUP BY statut;
        `);

        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

// Poids total reçu (en kg)
statsRouter.get("/poids-total", async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT COALESCE(SUM(poids_kg), 0)::float AS poids_total_recu_kg
            FROM objet;
        `);

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Nombre d'objets en rayon
statsRouter.get("/en-rayon", async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*)::integer AS objets_en_rayon
            FROM objet
            WHERE statut = 'en_rayon';
        `);

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

export default statsRouter;