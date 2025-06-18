
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();


router.post('/events/:id/rsvp', async (req, res, next) => {
  const eventId = Number(req.params.id);
  const { username } = req.body;
  try {
    await pool.query(
      `INSERT INTO rsvps(event_id, username)
         VALUES ($1,$2)
       ON CONFLICT DO NOTHING`,
      [eventId, username]
    );
    const { rows } = await pool.query(
      'SELECT username FROM rsvps WHERE event_id=$1',
      [eventId]
    );
    
    res.status(201).json(rows.map(r => r.username));
  } catch (err) {
    next(err);
  }
});


router.delete('/events/:id/rsvp', async (req, res, next) => {
  const eventId = Number(req.params.id);
  const { username } = req.body;
  try {
    await pool.query(
      'DELETE FROM rsvps WHERE event_id=$1 AND username=$2',
      [eventId, username]
    );
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


router.get('/rsvps/:username', async (req, res, next) => {
  const username = req.params.username;
  try {
    const { rows } = await pool.query(
      `SELECT e.*
         FROM events e
         JOIN rsvps r ON r.event_id = e.id
        WHERE r.username=$1
        ORDER BY e.date`,
      [username]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

export default router;
