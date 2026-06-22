# Employee Service

Node.js microservice for managing employee records. Provides APIs for retrieving, creating, and updating employees.

## Dependencies
- Node.js (v18+)
- Express
- pg (PostgreSQL client)
- serverless-http

## Environment Variables
- `PORT`: Local HTTP port (default: 3002)
- `LOCAL`: Set to `true` to enable local listener
- Database variables: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
npm install
LOCAL=true node index.js
```

**Docker:**
Service name `employee-service`. Runs on port 3002.

## API Paths
- `GET /employees`
- `POST /employees`
- `GET /employees/:id`
