const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

const products = [
  { id: 1, name: 'Wild horses', description: 'Horses, Pair, Wild horses image', price: 200.99 },
  { id: 2, name: 'Grafitti', description: 'Color, Acrylic paint, Art image', price: 120.99 },
  { id: 3, name: 'Watercolor', description: 'colors watercolor .', price: 109.99 }
];

// Endpoint to get products
app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
