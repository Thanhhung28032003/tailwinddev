-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS products CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE products;

-- Bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  salePrice INT NULL,
  image VARCHAR(500) NULL,
  category VARCHAR(100) NULL,
  description TEXT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng danh mục
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng đơn hàng
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  total_amount INT NOT NULL,
  status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  shipping_address TEXT NULL,
  phone VARCHAR(20) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm dữ liệu mẫu cho categories
INSERT INTO categories (name, slug, description) VALUES
('Smartphone', 'smartphone', 'Điện thoại thông minh'),
('Laptop', 'laptop', 'Máy tính xách tay'),
('Tablet', 'tablet', 'Máy tính bảng'),
('Smart Home', 'smarthome', 'Thiết bị nhà thông minh'),
('Xe', 'xe', 'Phương tiện di chuyển');

-- Thêm dữ liệu mẫu cho products
INSERT INTO products (name, price, salePrice, image, category, description, stock) VALUES
('Samsung Galaxy S25 Ultra', 39990000, 44990000, '/img/s24-ultra-den.jpg', 'smartphone', 'Điện thoại Samsung Galaxy S25 Ultra mới nhất', 50),
('iPhone 16 Pro Max', 29990000, 34990000, '/img/iphone-16-pro-max-titan-den.jpg', 'smartphone', 'iPhone 16 Pro Max với chip A18 Pro', 30),
('Samsung Galaxy A55', 8990000, 9990000, '/img/a55xanh.jpg', 'smartphone', 'Galaxy A55 với camera chất lượng cao', 100),
('MacBook Pro M3', 45000000, 50000000, '/img/img-2009.png', 'laptop', 'MacBook Pro với chip M3 mạnh mẽ', 25),
('Dell XPS 13', 25000000, 28000000, '/img/img-2009.png', 'laptop', 'Laptop Dell XPS 13 cao cấp', 40);
