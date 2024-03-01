require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send('Server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
// ...
app.get('/GraffitiCategory', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT products.*, graffiti_category.image_url 
      FROM products
      JOIN graffiti_category ON products.id = graffiti_category.product_id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching graffiti category:", error);
    res.status(500).send('Server error');
  }
});
// ...
