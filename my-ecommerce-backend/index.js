const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Mock product data
const products = [
  { id: 1, name: 'Artistic Pen', description: 'A beautiful artistic pen.', price: 9.99 },
  { id: 2, name: 'Sketchbook', description: 'A perfect sketchbook for your drawings.', price: 12.99 },
  { id: 3, name: 'Watercolor Set', description: '24 colors watercolor set.', price: 19.99 }
];

// Endpoint to get products
app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
