# Local Testing & Development Guide

This document explains how the Nexus HRMS serverless architecture is adapted to run locally on your machine for rapid development and testing.

## Local Architecture Overview

In a production AWS environment, API Gateway routes traffic to Lambda functions. To replicate this locally without relying on cloud resources or proprietary emulators, we use:

- **Docker Compose**: Orchestrates all services, including a local PostgreSQL database.
- **Nginx Gateway**: Acts as our local "API Gateway," routing requests on port `8000` to the respective microservice containers.
- **HTTP Wrappers**: Lightweight code wrappers that allow AWS Lambda handler functions to run as standard HTTP servers listening on a local port.

## Files: Local vs. Production

To maintain a unified codebase, certain files are exclusively used for local testing, while others are strictly for the AWS production environment.

### Local-Only Files (Do not deploy to AWS)
- `docker-compose.yml`: Defines the local containers, networks, and PostgreSQL database.
- `gateway/nginx.conf`: Our local API Gateway equivalent. Handles routing and CORS for local testing.
- `Dockerfile` (in every service): Used to build the container images for local execution.
- `LocalServer.java` (in Java services): A built-in JDK HTTP server that wraps the Lambda `handleRequest` method.
- Local HTTP Listeners: At the bottom of Node.js (`index.js`) and Go (`main.go`) files, you will see `if (process.env.LOCAL === 'true')` blocks. These start local Express/Go web servers.

### Production-Only Configurations
- `serverless-http` or `Mangum` wrappers: These map the Express/FastAPI apps to AWS Lambda proxy events.
- **Lambda Authorizer**: While the code exists locally, Nginx does *not* automatically execute the Lambda Authorizer before routing traffic. For local testing, authentication headers are validated within the services themselves, or mocked.
- **API Gateway Configurations**: CORS and route mapping in production are handled by AWS API Gateway, not Nginx.

## How to Run Locally

1. **Start the environment:**
   From the root of the project, run:
   ```bash
   docker compose build
   docker compose up -d
   ```

2. **Access the Application:**
   - **Main UI**: Open your browser to `http://localhost:8000/`. The Nginx proxy will serve the Vite frontend development server.
   - **DevOps UI**: The DevOps dashboard is standalone. Open a new terminal, navigate to `/devops-dashboard`, run `npm install` and `npm run dev`, and access the provided local URL (e.g., `http://localhost:5174`).
   - **APIs**: You can hit backend endpoints directly via the gateway, e.g., `http://localhost:8000/auth/login`.

3. **Database:**
   The `docker-compose.yml` spins up a local PostgreSQL container mapped to port `5432`. The schema is automatically initialized via `db/init.sql`.

4. **Hot Reloading:**
   - The React frontends support hot module replacement natively.
   - Node.js services map local volumes in Docker. Depending on the `docker-compose` setup, restarting a specific container may be required to apply backend code changes: `docker compose restart employee-service`.
