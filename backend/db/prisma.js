const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Prisma v7 (engineType "client") requires an adapter or accelerateUrl.
// Using the pg adapter keeps this project working with Neon/Postgres.
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
