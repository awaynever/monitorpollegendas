const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=disable') ? false : { rejectUnauthorized: false }
});

app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT caption, sentimento1, sentimento, categorias1, categorias
      FROM media
      WHERE sentimento1 IS NOT NULL
      ORDER BY id DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('API online!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express API listening at http://0.0.0.0:${port}`);
});
