import { Router } from 'express'; 
import pool from '../db.js';


const benevoleRouter = Router();

benevoleRouter.get("/", async (req, res, next) => {

    try {
         const result = await pool.query(`
            SELECT *
            FROM benevole
            ORDER BY id ASC`)

            res.json(result.rows);

    }catch (err) {
        next(err);
    }

});

export default benevoleRouter;