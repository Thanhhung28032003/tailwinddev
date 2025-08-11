const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    optionsSuccessStatus: 200,
  })
);

// Views (server-side templates)
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'ejs');

// Static for the backend (optional assets like admin CSS/JS)
const backendPublicDir = path.join(__dirname, 'public');
app.use('/assets', express.static(backendPublicDir, { maxAge: '1h' }));

// Serve the existing site from project /public as the main UI
const sitePublicDir = path.join(__dirname, '..', '..', 'public');
app.use(express.static(sitePublicDir, { maxAge: '1h' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Demo products
const products = [
  {
    id: 's25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    price: 39990000,
    salePrice: 44990000,
    image: '/img/s24-ultra-den.jpg',
    category: 'smartphone',
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    price: 29990000,
    salePrice: 34990000,
    image: '/img/iphone-16-pro-max-titan-den.jpg',
    category: 'smartphone',
  },
  {
    id: 'galaxy-a55',
    name: 'Samsung Galaxy A55',
    price: 8990000,
    salePrice: 9990000,
    image: '/img/a55xanh.jpg',
    category: 'smartphone',
  },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// Backend view (example admin page)
app.get('/admin', (req, res) => {
  res.render('home', { title: 'Admin Dashboard', products });
});

// Fallback for non-API routes → serve the site index.html
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(sitePublicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


