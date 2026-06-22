import os
import psycopg2
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from mangum import Mangum

app = FastAPI()

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'hrm_db'),
            user=os.getenv('DB_USER', 'hrm_user'),
            password=os.getenv('DB_PASSWORD', 'hrm_password')
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

class PayrollRequest(BaseModel):
    employee_id: int
    month: str
    year: int
    base_salary: float
    deductions: float = 0.0

@app.get("/payroll/health")
def health_check():
    return {"status": "Payroll Service is running"}

@app.post("/payroll/calculate")
def calculate_payroll(req: PayrollRequest):
    net_salary = req.base_salary - req.deductions
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO payroll (employee_id, month, year, base_salary, deductions, net_salary, status)
            VALUES (%s, %s, %s, %s, %s, %s, 'PROCESSED') RETURNING id;
            """,
            (req.employee_id, req.month, req.year, req.base_salary, req.deductions, net_salary)
        )
        payroll_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        return {"message": "Payroll processed successfully", "payroll_id": payroll_id, "net_salary": net_salary}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

@app.get("/payroll/employee/{employee_id}")
def get_payroll(employee_id: int):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, month, year, base_salary, net_salary, status FROM payroll WHERE employee_id = %s", (employee_id,))
        records = cur.fetchall()
        cur.close()
        
        result = []
        for r in records:
            result.append({
                "id": r[0],
                "month": r[1],
                "year": r[2],
                "base_salary": float(r[3]),
                "net_salary": float(r[4]),
                "status": r[5]
            })
        return {"payrolls": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()

handler = Mangum(app)
