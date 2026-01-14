// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const flightsRouter = require('./routes/flights');
const bookingsRouter = require('./routes/bookings');
const walletRouter = require('./routes/wallet');
const authRouter = require('./routes/authRoutes');

const app = express();

// When deployed behind a reverse proxy (Render, Railway, etc.), this ensures
// req.ip works correctly for rate limiting.
app.set('trust proxy', 1);

app.use(
  helmet({
    // Ticket PDFs may be downloaded cross-origin from the frontend.
    crossOriginResourcePolicy: false,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Stricter rate limit for auth endpoints
app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors({
  origin: corsOrigin ? corsOrigin.split(',').map((s) => s.trim()) : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '1mb' }));

// Serve generated ticket PDFs
app.use('/tickets', express.static(path.join(__dirname, '..', 'tickets')));


app.use('/api/flights', flightsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.send('XTechon Flight Booking System API'));

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
