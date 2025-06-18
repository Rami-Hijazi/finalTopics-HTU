
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();


router.get('/organizer/:username', async (req, res, next) => {
  const username = req.params.username;
  try {
    const { rows } = await pool.query(
      `SELECT
         e.*,
         COALESCE(
           (SELECT array_agg(username)
              FROM rsvps r
             WHERE r.event_id = e.id),
           ARRAY[]::text[]
         ) AS attendees
       FROM events e
      WHERE e.organizer = $1
      ORDER BY e.date`,
      [username]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
