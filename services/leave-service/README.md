# Leave Service

Java-based microservice for managing employee leave balances, leave requests, and approval workflows.

## Dependencies
- Java 17
- Maven
- AWS Lambda Core dependencies
- JDBC / PostgreSQL Driver

## Environment Variables
- `PORT`: Local HTTP port used by `LocalServer.java` (default: 3005)
- PostgreSQL variables: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
mvn clean package
java -cp target/leave-service-1.0.jar com.hrm.leave.LocalServer
```
Ensure you have `PORT=3005` in your environment or rely on the default.

**Docker:**
Service name `leave-service`. Multi-stage build compiles Java 17 and runs `LocalServer` on port 3005.

## API Paths
- `POST /leave/request`
- `GET /leave/employee/:id`
- `PUT /leave/approve/:id`
