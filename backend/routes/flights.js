// backend/routes/flights.js
const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', flightsController.searchFlights);

module.exports = router;
