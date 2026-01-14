// Seed script for flights
// Run with: npx prisma db seed

require('dotenv').config();

const prisma = require('./prisma');

const flights = [
  { airline: 'IndiGo', departure_city: 'Delhi', arrival_city: 'Mumbai', base_price: 2200 },
  { airline: 'Air India', departure_city: 'Bangalore', arrival_city: 'Delhi', base_price: 2500 },
  { airline: 'SpiceJet', departure_city: 'Chennai', arrival_city: 'Kolkata', base_price: 2300 },
  { airline: 'Vistara', departure_city: 'Hyderabad', arrival_city: 'Goa', base_price: 2700 },
  { airline: 'GoAir', departure_city: 'Pune', arrival_city: 'Jaipur', base_price: 2100 },
  { airline: 'IndiGo', departure_city: 'Mumbai', arrival_city: 'Delhi', base_price: 2400 },
  { airline: 'Air India', departure_city: 'Kolkata', arrival_city: 'Chennai', base_price: 2600 },
  { airline: 'SpiceJet', departure_city: 'Goa', arrival_city: 'Hyderabad', base_price: 2200 },
  { airline: 'Vistara', departure_city: 'Jaipur', arrival_city: 'Pune', base_price: 2800 },
  { airline: 'GoAir', departure_city: 'Delhi', arrival_city: 'Bangalore', base_price: 2300 },
  { airline: 'IndiGo', departure_city: 'Chennai', arrival_city: 'Delhi', base_price: 2500 },
  { airline: 'Air India', departure_city: 'Mumbai', arrival_city: 'Goa', base_price: 2700 },
  { airline: 'SpiceJet', departure_city: 'Hyderabad', arrival_city: 'Kolkata', base_price: 2200 },
  { airline: 'Vistara', departure_city: 'Pune', arrival_city: 'Jaipur', base_price: 2100 },
  { airline: 'GoAir', departure_city: 'Delhi', arrival_city: 'Chennai', base_price: 2300 },
  { airline: 'IndiGo', departure_city: 'Bangalore', arrival_city: 'Goa', base_price: 2600 },
  { airline: 'Air India', departure_city: 'Kolkata', arrival_city: 'Hyderabad', base_price: 2400 },
  { airline: 'SpiceJet', departure_city: 'Goa', arrival_city: 'Delhi', base_price: 2500 },
  { airline: 'Vistara', departure_city: 'Jaipur', arrival_city: 'Mumbai', base_price: 2700 },
  { airline: 'GoAir', departure_city: 'Delhi', arrival_city: 'Goa', base_price: 2200 },
];

async function main() {
  for (const flight of flights) {
    await prisma.flight.create({
      data: {
        ...flight,
        current_price: flight.base_price,
      },
    });
  }
  console.log('Flights seeded');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
