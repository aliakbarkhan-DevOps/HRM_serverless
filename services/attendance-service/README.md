# Attendance Service

Node.js microservice handling employee clock-ins, clock-outs, and daily attendance logs.

## Dependencies
- Node.js
- Express
- pg (PostgreSQL client)
- serverless-http

## Environment Variables
- `PORT`: Exposed local port (default: 3003)
- `LOCAL`: Set to `true` for local development
- PostgreSQL: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
npm install
node index.js
```

**Docker:**
Service name `attendance-service`. Internal port 3003.

## API Paths
- `POST /attendance/clock-in`
- `PUT /attendance/clock-out`
- `GET /attendance/employee/:id`
