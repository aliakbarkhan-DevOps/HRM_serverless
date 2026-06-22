# DevOps Dashboard

Standalone React application built with Vite to monitor the health and traffic of the microservices.
It is completely decoupled from the main HRMS frontend and can be deployed separately to an S3 bucket or CDN.

## Dependencies
- Node.js (v20+)
- React
- Lucide React (Icons)
- Vite

## Environment Variables
- `VITE_API_BASE_URL`: The URL of the API Gateway or Nginx load balancer to ping. Must include the protocol (e.g., `http://localhost:8000`). Default is `http://localhost:8000`.

## How to Run

**Local Development:**
```bash
npm install
npm run dev
```
Navigate to the local dev server URL provided by Vite.

## Functionality
The dashboard automatically polls the base endpoints of the microservices (`/auth`, `/employees`, `/attendance`, `/leave`, `/payroll`, `/jobs`, `/performance`) every 30 seconds. It determines health by detecting `502` or `504` errors (indicating container failure) versus any other response (indicating the application is alive).
