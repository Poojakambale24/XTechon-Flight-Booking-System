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
- Frontend: `http://localhost:3002`

If you see CRA prompting about ports, something else is already using `3002`/`4000`. The repo includes a best‑effort `predev` cleanup to free those ports.

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

## Landing hero image
- The landing page hero uses `frontend/src/assets/airplane-hero.jpg`.
- If that file is missing/empty, it falls back to `frontend/src/assets/airplane-hero-fallback.svg`.
- To use your own image, replace `airplane-hero.jpg` with a real JPG (recommended ~1600×900).
