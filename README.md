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

## Deploy (Vercel)

This repo is a monorepo (`frontend/` + `backend/`). If you deploy the repo root to Vercel without configuration, you may see a blank page with a Vercel `404: NOT_FOUND`.

This project includes a root [vercel.json](vercel.json) that tells Vercel to:
- Build the React app from `frontend/`
- Serve the output from `frontend/build`
- Rewrite all routes to `/index.html` (required for React Router)

After deploying the frontend, set this environment variable in Vercel:
- `REACT_APP_API_BASE_URL` = your deployed backend URL (example: `https://your-backend.onrender.com`)

Note: the Express backend is not deployed by Vercel in this setup. Deploy `backend/` separately (Render/Railway/Fly.io/etc.) and point the frontend at it.

## Notes
- Auth uses JWT (Bearer token) returned from `/api/auth/login` and `/api/auth/register`.
- For production, set `JWT_SECRET` and restrict CORS origin.

## Landing hero image
- The landing page hero uses `frontend/src/assets/airplane-hero.jpg`.
- If that file is missing/empty, it falls back to `frontend/src/assets/airplane-hero-fallback.svg`.
- To use your own image, replace `airplane-hero.jpg` with a real JPG (recommended ~1600×900).
