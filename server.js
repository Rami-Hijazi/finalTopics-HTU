
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import eventsRouter from './routes/events.js';
import rsvpsRouter from './routes/rsvps.js';
import organizerRouter from './routes/organizer.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/events', eventsRouter);
app.use('/api', rsvpsRouter);
app.use('/api', organizerRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`▶︎ Server listening on ${PORT}`));
