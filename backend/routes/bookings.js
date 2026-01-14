// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { authRequired } = require('../middleware/auth');

router.post('/', authRequired, bookingsController.createBooking);
router.get('/', authRequired, bookingsController.getBookings);
router.get('/:id/ticket', authRequired, bookingsController.getPdfTicket);

module.exports = router;
