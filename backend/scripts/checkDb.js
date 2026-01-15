require('dotenv').config();

const prisma = require('../db/prisma');

async function main() {
  const [flightCount, userCount, bookingCount] = await Promise.all([
    prisma.flight.count(),
    prisma.user.count(),
    prisma.booking.count(),
  ]);

  console.log(JSON.stringify({ flightCount, userCount, bookingCount }, null, 2));
}

main()
  .catch((e) => {
    console.error('DB_CHECK_ERROR:', e?.message || e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
