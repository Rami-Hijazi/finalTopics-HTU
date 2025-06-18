
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM events ORDER BY date');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      'SELECT * FROM events WHERE id=$1',
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const {
      title, description, date, time,
      location, category, image_url, organizer
    } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO events
         (title, description, date, time, location, category, image_url, organizer)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [title, description, date, time, location, category, image_url, organizer]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM events WHERE id=$1', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;
