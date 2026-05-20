# Dashboard App

A full-stack academic and work dashboard that integrates with Canvas LMS and tracks work shifts.

## Features

- **Canvas Integration** — Pull assignments and due dates from Canvas LMS
- **Work Shift Tracking** — Manually add and track work shifts
- **Real-time Dashboard** — View all deadlines and shifts in one place
- **Deployed & Live** — Frontend on Vercel, backend on Render, database on Supabase

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Supabase)
- **Deployment:** Vercel (frontend), Render (backend)

## Getting Started

### Local Development

1. Clone the repo
2. **Backend setup:**
```bash
   cd server
   npm install
   touch .env
```
   Add to `.env`:
```
   PORT=3001
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
```
```bash
   node index.js
```

3. **Frontend setup:**
```bash
   cd client
   npm install
   npm run dev
```

4. Open `http://localhost:5173`

## Live Deployment

- **Frontend:** https://dashboard-app-xxxxx.vercel.app
- **Backend:** https://dashboard-app-server-90rn.onrender.com

## Architecture
