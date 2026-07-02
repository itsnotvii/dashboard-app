# Dashboard App

Full-stack academic and work management dashboard built with React, Node.js, and PostgreSQL.

## Features

- **Work Shift Tracking** — Add, track, and manage work shifts with automatic time calculations
- **Assignment Dashboard** — View and mark assignments complete (Canvas integration pending)
- **Weekly Stats** — See total shifts, hours worked, and upcoming deadlines at a glance
- **Weather Integration** — Real-time weather from OpenWeatherMap API
- **Smooth Animations** — Glass morphism UI with modern animations
- **Undo Functionality** — Delete shifts with the ability to undo within 5 seconds

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Glass morphism design

**Backend:**
- Node.js + Express
- RESTful API architecture
- Environment variables for secrets management

**Database:**
- PostgreSQL (Supabase)
- Row-level security
- Automatic timestamps

**Deployment:**
- Frontend: Vercel (auto-deploys on GitHub push)
- Backend: Render (free tier)
- Database: Supabase (free tier PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 22+
- Git

### Local Development

**Backend:**
```bash
