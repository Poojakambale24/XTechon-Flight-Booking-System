// backend/server.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const flightsRouter = require('./routes/flights');
const bookingsRouter = require('./routes/bookings');
const walletRouter = require('./routes/wallet');
const authRouter = require('./routes/authRoutes');

const app = express();
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors({
  origin: corsOrigin ? corsOrigin.split(',').map((s) => s.trim()) : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

// Serve generated ticket PDFs
app.use('/tickets', express.static(path.join(__dirname, '..', 'tickets')));


app.use('/api/flights', flightsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.send('XTechon Flight Booking System API'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
