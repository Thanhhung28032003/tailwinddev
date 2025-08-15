const { dbPool } = require('../src/config/database');

async function updateProduct() {
  try {
    const productId = 1; // ID sản phẩm cần cập nhật
    
    const updateData = {
      name: 'iPhone 15 Pro Max (Cập nhật)',
      price: 32000000,
      salePrice: 38000000,
      description: 'iPhone 15 Pro Max với chip A17 Pro mới nhất - Đã cập nhật',
      stock: 150
    };

    // Cập nhật sản phẩm
    const [result] = await dbPool.query(
      'UPDATE products SET name = ?, price = ?, salePrice = ?, description = ?, stock = ? WHERE id = ?',
      [updateData.name, updateData.price, updateData.salePrice, updateData.description, updateData.stock, productId]
    );

    if (result.affectedRows === 0) {
      console.log('⚠️  Không tìm thấy sản phẩm với ID:', productId);
      return;
    }

    console.log('✅ Sản phẩm đã được cập nhật thành công!');
    console.log('ID:', productId);
    console.log('Dữ liệu mới:', updateData);
    console.log('Số dòng bị ảnh hưởng:', result.affectedRows);

    // Lấy thông tin sản phẩm sau khi cập nhật
    const [rows] = await dbPool.query('SELECT * FROM products WHERE id = ?', [productId]);
    console.log('📦 Thông tin sản phẩm sau cập nhật:', rows[0]);

  } catch (error) {
    console.error('❌ Lỗi khi cập nhật sản phẩm:', error.message);
  } finally {
    process.exit(0);
  }
}

// Chạy script
updateProduct();
