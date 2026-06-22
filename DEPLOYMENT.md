# AWS Production Deployment Guide

This document outlines the architecture, dependencies, and Continuous Integration/Continuous Deployment (CI/CD) strategy for deploying the Nexus HRMS to AWS using GitHub Actions.

## Target AWS Architecture

The production environment is fully serverless and utilizes the following AWS services:

- **Frontend & DevOps UIs**: Hosted statically on **Amazon S3**. Distributed globally via **Amazon CloudFront** for low latency and HTTPS termination. DNS is managed by **Amazon Route 53**.
- **Backend Microservices**: Deployed as independent **AWS Lambda** functions (Node.js, Python, Java, Go).
- **API Routing**: **Amazon API Gateway** acts as the single entry point for all backend traffic. It routes requests to the respective Lambda functions.
- **Security**: The **Lambda Authorizer** is attached to API Gateway routes to validate JWT tokens on every request before invoking the backend services.
- **Database**: Amazon RDS for PostgreSQL (or Aurora Serverless).

## GitHub Actions CI/CD Pipeline

The deployment process is automated via GitHub Actions. When changes are pushed to the `main` branch, the pipeline will build, package, and deploy the updated services.

### Required GitHub Secrets
To authenticate GitHub Actions with AWS, configure the following secrets in your repository settings:

- `AWS_ACCESS_KEY_ID`: IAM User access key with permissions for S3, CloudFront, Lambda, and API Gateway.
- `AWS_SECRET_ACCESS_KEY`: IAM User secret key.
- `AWS_REGION`: The target AWS region (e.g., `us-east-1`).
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: Production database credentials (injected as environment variables into Lambda).
- `JWT_SECRET`: The secret key used by the Lambda Authorizer.

### Deployment Workflow Steps

1. **Frontend Deployment (S3 + CloudFront)**
   - Checkout code.
   - Run `npm install` and `npm run build` in `/frontend` and `/devops-dashboard`.
   - Ensure `VITE_API_BASE_URL` is set to the production API Gateway URL during the build.
   - Sync the `dist/` folders to their respective S3 buckets using `aws s3 sync`.
   - Create a CloudFront invalidation using `aws cloudfront create-invalidation` to clear the edge cache.

2. **Backend Microservices Deployment (AWS Lambda)**
   - **Node.js Services**: Run `npm install`, zip the directory, and use `aws lambda update-function-code` to deploy.
   - **Python Service**: Create a virtual environment, install dependencies to a target directory, zip the application code and dependencies, and deploy.
   - **Java Services**: Run `mvn clean package` to generate the shaded JAR, then upload the JAR to Lambda.
   - **Go Service**: Compile the Go binary targeting Linux/amd64 (`GOOS=linux GOARCH=amd64`), zip the binary, and deploy.

3. **API Gateway Configuration**
   - API Gateway routing is typically managed via Infrastructure as Code (e.g., Serverless Framework, AWS SAM, or Terraform).
   - Ensure CORS is configured on the API Gateway to allow requests from the S3/CloudFront domains.
   - Attach the compiled Lambda Authorizer to all protected routes.

## Dependencies for Deployment
- AWS CLI (pre-installed on GitHub Actions runners)
- Node.js, Python, Java 17, and Go environments for building the respective microservices.
- (Optional) Serverless Framework or AWS SAM for declarative infrastructure management.
