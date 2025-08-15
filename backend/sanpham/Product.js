const { dbPool } = require('../config/database');

class Product {
  // Lấy tất cả sản phẩm
  static async getAll() {
    try {
      const [rows] = await dbPool.query('SELECT * FROM products ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

  // Lấy sản phẩm theo ID
  static async getById(id) {
    try {
      const [rows] = await dbPool.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error getting product: ${error.message}`);
    }
  }

  // Lấy sản phẩm theo danh mục
  static async getByCategory(category) {
    try {
      const [rows] = await dbPool.query('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC', [category]);
      return rows;
    } catch (error) {
      throw new Error(`Error getting products by category: ${error.message}`);
    }
  }

  // Tạo sản phẩm mới
  static async create(productData) {
    try {
      const { name, price, salePrice, image, category, description, stock } = productData;
      
      if (!name || !price) {
        throw new Error('Name and price are required');
      }

      const [result] = await dbPool.query(
        'INSERT INTO products (name, price, salePrice, image, category, description, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, price, salePrice || null, image || null, category || null, description || null, stock || 0]
      );

      return { id: result.insertId, ...productData };
    } catch (error) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  // Cập nhật sản phẩm
  static async update(id, productData) {
    try {
      const { name, price, salePrice, image, category, description, stock } = productData;
      
      const [result] = await dbPool.query(
        'UPDATE products SET name = ?, price = ?, salePrice = ?, image = ?, category = ?, description = ?, stock = ? WHERE id = ?',
        [name, price, salePrice || null, image || null, category || null, description || null, stock || 0, id]
      );

      if (result.affectedRows === 0) {
        throw new Error('Product not found');
      }

      return { id, ...productData };
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // Xóa sản phẩm
  static async delete(id) {
    try {
      const [result] = await dbPool.query('DELETE FROM products WHERE id = ?', [id]);
      
      if (result.affectedRows === 0) {
        throw new Error('Product not found');
      }

      return true;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  // Tìm kiếm sản phẩm
  static async search(query) {
    try {
      const searchQuery = `%${query}%`;
      const [rows] = await dbPool.query(
        'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ? ORDER BY created_at DESC',
        [searchQuery, searchQuery, searchQuery]
      );
      return rows;
    } catch (error) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }
}

module.exports = Product;
