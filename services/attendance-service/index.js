const express = require('express');
const serverless = require('serverless-http');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'hrm_db',
  user: process.env.DB_USER || 'hrm_user',
  password: process.env.DB_PASSWORD || 'hrm_password',
  port: 5432,
});

app.post('/attendance/clock-in', async (req, res) => {
  const { employee_id, date, clock_in } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO attendance (employee_id, date, clock_in, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [employee_id, date, clock_in, 'PRESENT']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/attendance/clock-out', async (req, res) => {
  const { employee_id, date, clock_out } = req.body;
  try {
    const result = await pool.query(
      'UPDATE attendance SET clock_out = $1 WHERE employee_id = $2 AND date = $3 RETURNING *',
      [clock_out, employee_id, date]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Attendance record not found for today' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/attendance/employee/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendance WHERE employee_id = $1 ORDER BY date DESC', [req.params.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports.handler = serverless(app);

if (require.main === module || process.env.LOCAL === 'true') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Attendance service running on port ${port}`));
}

