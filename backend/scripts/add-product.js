const { dbPool } = require('../src/config/database');

async function addProduct() {
  try {
    const productData = {
      name: 'iPhone 15 Pro Max',
      price: 30000000,
      salePrice: 35000000,
      image: '/img/iphone-15-pro-max.jpg',
      category: 'smartphone',
      description: 'iPhone 15 Pro Max với chip A17 Pro',
      stock: 100
    };

    const [result] = await dbPool.query(
      'INSERT INTO products (name, price, salePrice, image, category, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [productData.name, productData.price, productData.salePrice, productData.image, productData.category, productData.description, productData.stock]
    );

    console.log('✅ Sản phẩm đã được thêm thành công!');
    console.log('ID:', result.insertId);
    console.log('Dữ liệu:', productData);

  } catch (error) {
    console.error('❌ Lỗi khi thêm sản phẩm:', error.message);
  } finally {
    process.exit(0);
  }
}

// Chạy script
addProduct();
