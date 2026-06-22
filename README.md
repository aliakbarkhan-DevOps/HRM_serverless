# Nexus HRMS (Serverless Architecture)

Nexus HRMS is a comprehensive Human Resources Management System built on a highly scalable, serverless microservices architecture. It provides an end-to-end suite of tools for managing employees, attendance, payroll, leave requests, recruitment, and performance reviews.

## Application Functionalities

- **Dashboard**: High-level metrics and recent HR activities.
- **Employee Management**: Manage employee profiles, records, and organizational structure.
- **Attendance Tracking**: Clock-in/clock-out functionality with daily logs and late arrival tracking.
- **Leave Management**: Submit, review, and approve employee leave requests against allocated balances.
- **Payroll Processing**: Calculate base salary, deductions, and generate downloadable payslips.
- **Recruitment Pipeline**: Post job openings, track applicant numbers, and manage hiring statuses.
- **Performance Reviews**: Schedule evaluations, record metrics, and track company-wide performance averages.
- **DevOps Monitoring**: Real-time dashboard tracking the uptime and latency of all underlying microservices.

## Microservices Architecture

The backend is composed of polyglot microservices, designed to run as AWS Lambda functions in production and as containerized HTTP servers for local development.

1. **Auth Service** *(Node.js)*: Handles user login, registration, and issues JWT tokens.
2. **Employee Service** *(Node.js)*: Manages core employee data and profiles.
3. **Attendance Service** *(Node.js)*: Records daily clock-ins and clock-outs.
4. **Payroll Service** *(Python/FastAPI)*: Calculates deductions, taxes, and generates payslips.
5. **Leave Service** *(Java 17/Maven)*: Manages leave workflows, balances, and approvals.
6. **Recruitment Service** *(Java 17/Maven)*: Handles job postings and applicant tracking.
7. **Performance Service** *(Go)*: Records and tracks employee performance evaluations.
8. **Lambda Authorizer** *(Node.js)*: An API Gateway authorizer that intercepts requests and validates JWT tokens before allowing access to the internal services.

## User Interfaces

- **Frontend (`/frontend`)**: The primary React (Vite) application used by HR administrators and employees. Features a modern, glassmorphism-inspired dark mode UI.
- **DevOps Dashboard (`/devops-dashboard`)**: A standalone React (Vite) application designed for system administrators to monitor the health, uptime, and latency of the microservices.

## Documentation

- See **[LOCAL_TESTING.md](./LOCAL_TESTING.md)** for instructions on running the entire stack locally using Docker Compose.
- See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for instructions on deploying the application to AWS.
