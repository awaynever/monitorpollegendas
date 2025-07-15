const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Libera CORS apenas para o domínio Hostinger
app.use(cors({
  origin: 'https://lavender-mantis-557138.hostingersite.com',
}));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode=disable') ? false : { rejectUnauthorized: false }
});

app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT caption, sentimento1, sentimento, categorias1, categorias
      FROM media
      WHERE sentimento IS NOT NULL
        AND sentimento <> ''
        AND LOWER(sentimento) <> 'neutro'
        AND sentimento <> 'Claro! Por favor'
      ORDER BY id DESC
      LIMIT 1000
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
