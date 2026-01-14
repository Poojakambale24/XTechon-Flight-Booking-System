// backend/controllers/bookingsController.js
const pdfkit = require('pdfkit');
const fs = require('fs');
const path = require('path');
const prisma = require('../db/prisma');

function generatePNR() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { flight_id, passenger_name } = req.body;
    const user_id = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const flight = await prisma.flight.findUnique({ where: { id: flight_id } });
    if (!flight) return res.status(404).json({ error: 'Flight not found' });

    // Dynamic pricing engine
    const now = new Date();
    const fiveMinAgo = new Date(now.getTime() - 5 * 60000);
    const tenMinAgo = new Date(now.getTime() - 10 * 60000);
    const recentAttempts = await prisma.bookingAttempt.findMany({
      where: {
        flight_id,
        attempted_at: { gte: fiveMinAgo },
      },
    });
    if (recentAttempts.length >= 3) {
      await prisma.flight.update({
        where: { id: flight_id },
        data: { current_price: Math.round(flight.current_price * 1.1) },
      });
    }
    // Reset price if no bookings in 10 min
    const lastAttempt = await prisma.bookingAttempt.findFirst({
      where: { flight_id },
      orderBy: { attempted_at: 'desc' },
    });
    if (lastAttempt && lastAttempt.attempted_at < tenMinAgo) {
      await prisma.flight.update({
        where: { id: flight_id },
        data: { current_price: flight.base_price },
      });
    }
    // Record booking attempt
    await prisma.bookingAttempt.create({
      data: { flight_id },
    });
    // Get updated price
    const updatedFlight = await prisma.flight.findUnique({ where: { id: flight_id } });
    const final_price = updatedFlight.current_price;
    if (user.wallet_balance < final_price) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }
    // Deduct wallet
    const updatedUser = await prisma.user.update({
      where: { id: user_id },
      data: { wallet_balance: user.wallet_balance - final_price },
    });
    // Create booking
    const pnr = generatePNR();
    const booking = await prisma.booking.create({
      data: {
        user_id,
        flight_id,
        passenger_name,
        final_price,
        booking_time: now,
        pnr,
        pdf_url: '', // Will be set after PDF generation
      },
    });
    // Generate PDF ticket
    const pdfPath = path.join(__dirname, `../../tickets/${pnr}.pdf`);
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
    const doc = new pdfkit();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(20).text('Flight Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Passenger Name: ${passenger_name}`);
    doc.text(`Airline: ${updatedFlight.airline}`);
    doc.text(`Flight ID: ${updatedFlight.id}`);
    doc.text(`Route: ${updatedFlight.departure_city} → ${updatedFlight.arrival_city}`);
    doc.text(`Final Price: ₹${final_price}`);
    doc.text(`Booking Date: ${now.toLocaleString()}`);
    doc.text(`PNR: ${pnr}`);
    doc.end();
    // Update booking with PDF URL
    await prisma.booking.update({
      where: { id: booking.id },
      data: { pdf_url: `/tickets/${pnr}.pdf` },
    });
    res.json({
      success: true,
      booking_id: booking.id,
      pnr,
      pdf_url: `/tickets/${pnr}.pdf`,
      final_price,
      wallet_balance: updatedUser.wallet_balance,
    });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed', details: err.message });
  }
};

// GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const user_id = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { user_id },
      include: { flight: true },
      orderBy: { booking_time: 'desc' },
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
  }
};

// GET /api/bookings/:id/ticket
exports.getPdfTicket = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({ where: { id: Number(req.params.id) } });
    if (!booking || !booking.pdf_url) return res.status(404).json({ error: 'Ticket not found' });
    const pdfPath = path.join(__dirname, `../../${booking.pdf_url}`);
    if (!fs.existsSync(pdfPath)) return res.status(404).json({ error: 'PDF file not found' });
    res.sendFile(pdfPath);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch PDF ticket', details: err.message });
  }
};
