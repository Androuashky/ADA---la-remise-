// Les points d'entrée d'API
// 

import { Router } from 'express';
import pool from '../db.js';

const statutsRouter = Router();

// --------------------------------------------------
// GET
// --------------------------------------------------

// Liste des statuts disponibles (issus de l'enum statut_objet)
statutsRouter.get("/", async (req, res, next) => {
    try {
        const result = await pool.query(`
            SELECT enumlabel
            FROM pg_enum
            JOIN pg_type ON pg_type.oid = pg_enum.enumtypid
            WHERE pg_type.typname = 'statut_objet'
            ORDER BY enumsortorder;
        `);
        res.json(result.rows.map(r => r.enumlabel));
    } catch (err) {
        next(err);
    }
});

export default statutsRouter;
