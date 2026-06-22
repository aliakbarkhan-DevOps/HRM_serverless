# Recruitment Service

Java microservice to handle job postings, applicant tracking, and recruitment pipelines.

## Dependencies
- Java 17
- Maven
- AWS Lambda Core dependencies
- JDBC / PostgreSQL Driver

## Environment Variables
- `PORT`: Local HTTP port (default: 3006)
- Database credentials: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
mvn clean package
java -cp target/recruitment-service-1.0.jar com.hrm.recruitment.LocalServer
```

**Docker:**
Service name `recruitment-service`. Internal docker port 3006.

## API Paths
- `GET /jobs`
- `POST /jobs`
- `POST /jobs/:id/apply`
