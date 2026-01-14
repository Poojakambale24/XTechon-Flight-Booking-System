import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node ./db/seed.js',
  },
  datasource: {
    // Prisma ORM v7: configure connection URL here instead of schema.prisma
    url: env('DATABASE_URL'),
  },
});
