# XTechon – Flight Booking System

Full‑stack flight search + booking demo.

## Tech
- Frontend: React (CRA) + Tailwind
- Backend: Node.js + Express
- DB: PostgreSQL (Neon) + Prisma
- Tickets: PDF generation (PDFKit) served via `/tickets`

## Quick start (Windows)

### 1) Install
```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2) Configure env
- Backend: copy `backend/.env.example` → `backend/.env`
- Frontend: copy `frontend/.env.example` → `frontend/.env`

### 3) Generate Prisma client
```bash
cd backend
npx prisma generate
```

### 4) Seed flights (optional)
```bash
cd backend
npm run prisma:seed
```

### 5) Run dev (both)
```bash
npm run dev
```
- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3002` (or next free port)

## Production build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
Set `DATABASE_URL` in your hosting provider and run:
```bash
cd backend
npm start
```

## Notes
- Auth uses JWT (Bearer token) returned from `/api/auth/login` and `/api/auth/register`.
- For production, set `JWT_SECRET` and restrict CORS origin.
