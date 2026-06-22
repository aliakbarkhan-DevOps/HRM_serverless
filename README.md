# Serverless HR Management System

This is a comprehensive HR Management System (HRMS) built using a microservices architecture. It is designed to be fully serverless, deploying onto AWS Lambda and API Gateway, with a PostgreSQL database on AWS RDS.

## Microservices
1. **Lambda Authorizer (Node.js)**: Validates JWT tokens for API Gateway endpoints.
2. **Auth Service (Node.js/Express)**: Handles user registration and login. Issues JWTs.
3. **Employee Service (Node.js/Express)**: Manages employee data (CRUD).
4. **Attendance Service (Node.js/Express)**: Tracks employee clock-ins and clock-outs.
5. **Payroll Service (Python/FastAPI)**: Calculates and stores payroll records.
6. **Leave Service (Java/Plain Handler)**: Manages leave requests.
7. **Recruitment Service (Java/Plain Handler)**: Manages job postings.
8. **Performance Service (Golang)**: Tracks performance reviews and scores.

## Prerequisites
- Node.js 18.x
- Python 3.9
- Java 17 and Maven (if building Java locally)
- Go 1.x (if building Go locally)
- Docker & Docker Compose (for local PostgreSQL)
- AWS CLI configured with appropriate credentials
- Serverless Framework installed globally (`npm install -g serverless`)

## Local Testing

### 1. Start the Database
Use Docker Compose to spin up a local PostgreSQL database with the required schema initialized:
```bash
docker-compose up -d
```
*Note: The `db/init.sql` file is automatically executed on the first run to create all tables.*

### 2. Required Secrets / Environment Variables
Each microservice uses the following environment variables (defined in their respective `serverless.yml` files, falling back to these defaults):

```env
DB_HOST=localhost
DB_NAME=hrm_db
DB_USER=hrm_user
DB_PASSWORD=hrm_password
JWT_SECRET=fallback_secret
```
*In a production environment, you must store these in AWS Secrets Manager and inject them during deployment or runtime.*

### 3. Run Services Locally
**Node.js Services (Auth, Employee, Attendance):**
```bash
cd services/auth-service
npm install
serverless offline
```
*This will start a local API Gateway emulator at `http://localhost:3000`.*

**Python Service (Payroll):**
```bash
cd services/payroll-service
pip install -r requirements.txt
serverless plugin install -n serverless-python-requirements
serverless offline
```

## Deployment to AWS

To deploy the services to AWS Lambda, navigate to each service directory and use the Serverless Framework.

1. **Deploy Node.js Services:**
```bash
cd services/auth-service
serverless deploy
```

2. **Deploy Python Service:**
```bash
cd services/payroll-service
serverless deploy
```

3. **Deploy Java Services:**
```bash
cd services/leave-service
mvn clean package
serverless deploy
```

4. **Deploy Go Service:**
```bash
cd services/performance-service
GOOS=linux GOARCH=amd64 go build -o bin/performance main.go
serverless deploy
```

## Frontend (ReactJS)

The frontend is built with React and Vite.

### Local Development
```bash
cd frontend
npm run dev
```

### Deployment to S3
1. Build the production bundle:
```bash
cd frontend
npm run build
```
2. Sync the `dist/` directory to your S3 bucket configured for static website hosting:
```bash
aws s3 sync dist/ s3://your-hrm-frontend-bucket-name
```
