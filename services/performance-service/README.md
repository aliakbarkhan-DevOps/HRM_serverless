# Performance Service

Go microservice handling employee performance reviews, ratings, and evaluation metrics.

## Dependencies
- Go 1.20+
- `github.com/aws/aws-lambda-go/lambda`
- `github.com/aws/aws-lambda-go/events`
- `github.com/lib/pq` (Postgres driver)

## Environment Variables
- `LOCAL`: Set to `true` to run as a local HTTP server instead of an AWS Lambda handler
- `PORT`: HTTP port when running locally (default: 8080 or 3007 in docker)
- `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
go mod tidy
LOCAL=true PORT=3007 go run main.go
```

**Docker:**
Service name `performance-service`. Runs internally on port 3007.

## API Paths
- `POST /performance`
