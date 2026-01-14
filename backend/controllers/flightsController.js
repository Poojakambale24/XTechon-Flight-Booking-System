// backend/controllers/flightsController.js
const prisma = require('../db/prisma');

// GET /api/flights?departure_city=&arrival_city=&sort=price
exports.searchFlights = async (req, res) => {
  try {
    const { departure_city, arrival_city, sort } = req.query;
    const where = {};
    if (departure_city) where.departure_city = departure_city;
    if (arrival_city) where.arrival_city = arrival_city;
    const flights = await prisma.flight.findMany({
      where,
      orderBy: sort === 'price' ? { current_price: 'asc' } : undefined,
      take: 10,
    });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flights', details: err.message });
  }
};
