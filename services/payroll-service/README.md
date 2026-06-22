# Payroll Service

Python microservice to manage and calculate payroll data, deductions, and generate payslips.

## Dependencies
- Python 3.9+
- FastAPI
- Uvicorn
- Mangum (for AWS Lambda compatibility)
- psycopg2-binary / asyncpg

## Environment Variables
- `PORT`: Exposed local port (default: 3004)
- PostgreSQL variables: `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

## How to Run

**Local Development:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 3004 --reload
```

**Docker:**
Service name `payroll-service`. Runs internally on port 3004.

## API Paths
- `POST /payroll/calculate`
- `GET /payroll/employee/:id`
