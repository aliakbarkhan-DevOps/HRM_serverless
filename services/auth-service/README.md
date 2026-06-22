# Auth Service

Node.js microservice responsible for authentication and user sessions. Can run as an AWS Lambda function or a local HTTP server.

## Dependencies
- Node.js (v18+)
- Express
- serverless-http

## Environment Variables
- `PORT`: Local HTTP port (default: 3001)
- `LOCAL`: Set to `true` to run as local HTTP server
- Database connections: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
npm install
npm start # runs node index.js
```

**Docker:**
Included in the root `docker-compose.yml`. Runs natively in an alpine container on port 3001.

## API Paths
- `POST /auth/login`
- `POST /auth/register`
