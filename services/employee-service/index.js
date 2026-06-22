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

app.post('/employees', async (req, res) => {
  const { user_id, first_name, last_name, email, department, designation, hire_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO employees (user_id, first_name, last_name, email, department, designation, hire_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [user_id, first_name, last_name, email, department, designation, hire_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports.handler = serverless(app);
