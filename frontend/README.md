# HRMS Main Frontend

React application built with Vite for the main Human Resources Management System UI.

## Dependencies
- Node.js (v20+)
- React
- React Router DOM
- Lucide React (Icons)
- Vite

## Environment Variables
- `VITE_API_BASE_URL`: Base URL for the API. When running in docker behind Nginx, this is typically not needed because requests are proxied via `/`. If running standalone, set it to the API gateway (e.g., `http://localhost:8000`).

## How to Run

**Local Development:**
```bash
npm install
npm run dev
```

**Docker:**
Service name `frontend`. Runs on port 5173 inside docker, proxied to `http://localhost:8000/` by Nginx.

## Functionality
Provides the main application dashboard, employee management, attendance tracking, leave requests, payroll overviews, and performance reviews.
