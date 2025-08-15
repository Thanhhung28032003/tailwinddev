const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { dbPool, testConnection } = require('./config/database');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

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

// Health check (API + DB)
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await dbPool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: rows?.[0]?.ok === 1 ? 'connected' : 'unknown', timestamp: Date.now() });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', message: err.message });
  }
});

// Ensure DB schema exists
async function ensureSchema() {
  await dbPool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      salePrice INT NULL,
      image VARCHAR(500) NULL,
      category VARCHAR(100) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

ensureSchema().catch((e) => console.error('ensureSchema failed:', e));

// CRUD: Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.update(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.delete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tìm kiếm sản phẩm
app.get('/api/products/search/:query', async (req, res) => {
  try {
    const products = await Product.search(req.params.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy sản phẩm theo danh mục
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await Product.getByCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed sample data (optional)
app.post('/api/products/seed', async (req, res) => {
  try {
    const samples = [
      { name: 'Samsung Galaxy S25 Ultra', price: 39990000, salePrice: 44990000, image: '/img/s24-ultra-den.jpg', category: 'smartphone' },
      { name: 'iPhone 16 Pro Max', price: 29990000, salePrice: 34990000, image: '/img/iphone-16-pro-max-titan-den.jpg', category: 'smartphone' },
      { name: 'Samsung Galaxy A55', price: 8990000, salePrice: 9990000, image: '/img/a55xanh.jpg', category: 'smartphone' },
    ];
    for (const p of samples) {
      await dbPool.query(
        'INSERT INTO products (name, price, salePrice, image, category) VALUES (?, ?, ?, ?, ?)',
        [p.name, p.price, p.salePrice, p.image, p.category]
      );
    }
    res.json({ inserted: samples.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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


