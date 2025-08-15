# 🗄️ TẤT CẢ CÁC LỆNH MYSQL - TỔNG HỢP ĐẦY ĐỦ

## 🚀 **1. KHỞI TẠO VÀ CẤU HÌNH**

### **Khởi động XAMPP:**
- Mở XAMPP Control Panel
- Khởi động Apache và MySQL
- Đảm bảo MySQL chạy trên port 3306

### **Khởi tạo Database:**
```bash
cd backend
npm run init-db
```

### **Khởi động Server:**
```bash
npm start
```

## 📊 **2. LỆNH THÊM DỮ LIỆU (INSERT)**

### **Sử dụng API:**
```bash
# Thêm sản phẩm mới
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "price": 25000000,
    "salePrice": 28000000,
    "image": "/img/iphone-15.jpg",
    "category": "smartphone",
    "description": "iPhone 15 Pro mới nhất",
    "stock": 100
  }'
```

### **Sử dụng SQL:**
```sql
-- Thêm một sản phẩm
INSERT INTO products (name, price, salePrice, image, category, description, stock) 
VALUES ('Samsung Galaxy S25', 35000000, 40000000, '/img/s25.jpg', 'smartphone', 'Galaxy S25 mới nhất', 75);

-- Thêm nhiều sản phẩm cùng lúc
INSERT INTO products (name, price, category, description, stock) VALUES 
('MacBook Air M3', 28000000, 'laptop', 'MacBook Air với chip M3', 30),
('iPad Pro 12.9', 22000000, 'tablet', 'iPad Pro 12.9 inch', 45),
('Tesla Model 3', 1500000000, 'xe', 'Xe điện Tesla Model 3', 10);
```

### **Sử dụng Script:**
```bash
npm run add-product
```

## 🔄 **3. LỆNH CẬP NHẬT DỮ LIỆU (UPDATE)**

### **Sử dụng API:**
```bash
# Cập nhật toàn bộ sản phẩm
curl -X PUT http://localhost:4000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro Max",
    "price": 32000000,
    "salePrice": 38000000,
    "category": "smartphone",
    "description": "iPhone 15 Pro Max với chip A17 Pro mới nhất",
    "stock": 150
  }'

# Cập nhật một số trường
curl -X PUT http://localhost:4000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 35000000, "stock": 200}'
```

### **Sử dụng SQL:**
```sql
-- Cập nhật một sản phẩm
UPDATE products 
SET name = 'iPhone 15 Pro Max', 
    price = 32000000, 
    salePrice = 38000000, 
    description = 'iPhone 15 Pro Max với chip A17 Pro mới nhất',
    stock = 150
WHERE id = 1;

-- Cập nhật nhiều sản phẩm cùng lúc
UPDATE products 
SET price = price * 1.1 
WHERE category = 'smartphone';

-- Cập nhật với điều kiện phức tạp
UPDATE products 
SET 
    salePrice = CASE 
        WHEN price > 20000000 THEN price * 0.9
        WHEN price > 10000000 THEN price * 0.95
        ELSE price
    END,
    updated_at = CURRENT_TIMESTAMP
WHERE category = 'smartphone';
```

### **Sử dụng Script:**
```bash
npm run update-product
```

## 🗑️ **4. LỆNH XÓA DỮ LIỆU (DELETE)**

### **Sử dụng API:**
```bash
# Xóa sản phẩm theo ID
curl -X DELETE http://localhost:4000/api/products/1
```

### **Sử dụng SQL:**
```sql
-- Xóa một sản phẩm
DELETE FROM products WHERE id = 1;

-- Xóa nhiều sản phẩm
DELETE FROM products WHERE category = 'tablet';

-- Xóa với điều kiện
DELETE FROM products WHERE stock = 0 AND created_at < '2024-01-01';
```

## 📖 **5. LỆNH ĐỌC DỮ LIỆU (SELECT)**

### **Sử dụng API:**
```bash
# Lấy tất cả sản phẩm
curl http://localhost:4000/api/products

# Lấy sản phẩm theo ID
curl http://localhost:4000/api/products/1

# Tìm kiếm sản phẩm
curl http://localhost:4000/api/products/search/iphone

# Lấy sản phẩm theo danh mục
curl http://localhost:4000/api/products/category/smartphone
```

### **Sử dụng SQL:**
```sql
-- Lấy tất cả sản phẩm
SELECT * FROM products;

-- Lấy sản phẩm theo ID
SELECT * FROM products WHERE id = 1;

-- Lấy sản phẩm theo danh mục
SELECT * FROM products WHERE category = 'smartphone';

-- Tìm kiếm sản phẩm
SELECT * FROM products 
WHERE name LIKE '%iPhone%' 
   OR description LIKE '%iPhone%';

-- Sắp xếp và giới hạn
SELECT * FROM products 
ORDER BY price DESC 
LIMIT 10;

-- Lấy sản phẩm có giá cao nhất
SELECT * FROM products 
WHERE price = (SELECT MAX(price) FROM products);

-- Thống kê theo danh mục
SELECT category, COUNT(*) as total, AVG(price) as avg_price
FROM products 
GROUP BY category;
```

## 🔍 **6. LỆNH TÌM KIẾM VÀ LỌC**

### **Tìm kiếm nâng cao:**
```sql
-- Tìm sản phẩm trong khoảng giá
SELECT * FROM products 
WHERE price BETWEEN 10000000 AND 50000000;

-- Tìm sản phẩm có giá khuyến mãi
SELECT * FROM products 
WHERE salePrice IS NOT NULL AND salePrice < price;

-- Tìm sản phẩm hết hàng
SELECT * FROM products WHERE stock = 0;

-- Tìm sản phẩm mới nhất
SELECT * FROM products 
ORDER BY created_at DESC 
LIMIT 5;
```

### **Lọc và sắp xếp:**
```sql
-- Sắp xếp theo giá từ thấp đến cao
SELECT * FROM products ORDER BY price ASC;

-- Sắp xếp theo tên
SELECT * FROM products ORDER BY name ASC;

-- Lấy top 5 sản phẩm đắt nhất
SELECT * FROM products ORDER BY price DESC LIMIT 5;
```

## 📊 **7. LỆNH THỐNG KÊ VÀ BÁO CÁO**

### **Thống kê cơ bản:**
```sql
-- Tổng số sản phẩm
SELECT COUNT(*) as total_products FROM products;

-- Tổng giá trị hàng tồn kho
SELECT SUM(price * stock) as total_inventory_value FROM products;

-- Giá trung bình theo danh mục
SELECT category, AVG(price) as avg_price FROM products GROUP BY category;

-- Số lượng sản phẩm theo danh mục
SELECT category, COUNT(*) as count FROM products GROUP BY category;
```

### **Báo cáo nâng cao:**
```sql
-- Top 10 sản phẩm có giá cao nhất
SELECT name, price, category 
FROM products 
ORDER BY price DESC 
LIMIT 10;

-- Sản phẩm có giá khuyến mãi tốt nhất
SELECT name, price, salePrice, 
       ROUND(((price - salePrice) / price) * 100, 2) as discount_percent
FROM products 
WHERE salePrice IS NOT NULL 
ORDER BY discount_percent DESC;
```

## 🗂️ **8. LỆNH QUẢN LÝ BẢNG**

### **Tạo bảng mới:**
```sql
CREATE TABLE new_products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Thêm cột mới:**
```sql
ALTER TABLE products ADD COLUMN brand VARCHAR(100) AFTER name;
```

### **Xóa cột:**
```sql
ALTER TABLE products DROP COLUMN brand;
```

### **Sửa kiểu dữ liệu:**
```sql
ALTER TABLE products MODIFY COLUMN price DECIMAL(10,2);
```

## 🔐 **9. LỆNH QUẢN LÝ NGƯỜI DÙNG**

### **Thêm người dùng:**
```sql
INSERT INTO users (username, email, password, full_name, role) 
VALUES ('admin', 'admin@example.com', 'hashed_password', 'Administrator', 'admin');
```

### **Cập nhật người dùng:**
```sql
UPDATE users SET role = 'admin' WHERE username = 'john';
```

### **Xóa người dùng:**
```sql
DELETE FROM users WHERE username = 'john';
```

## 📦 **10. LỆNH QUẢN LÝ ĐƠN HÀNG**

### **Tạo đơn hàng:**
```sql
INSERT INTO orders (user_id, total_amount, status, shipping_address, phone) 
VALUES (1, 50000000, 'pending', '123 Đường ABC, Quận 1, TP.HCM', '0123456789');
```

### **Thêm sản phẩm vào đơn hàng:**
```sql
INSERT INTO order_items (order_id, product_id, quantity, price) 
VALUES (1, 1, 2, 25000000);
```

### **Cập nhật trạng thái đơn hàng:**
```sql
UPDATE orders SET status = 'confirmed' WHERE id = 1;
```

## 🧪 **11. LỆNH TEST VÀ KIỂM TRA**

### **Kiểm tra kết nối:**
```bash
curl http://localhost:4000/api/health
```

### **Test tất cả API:**
- Mở file `test-api.html` trong browser
- Hoặc mở file `test-simple.html`

### **Kiểm tra database:**
- Truy cập: http://localhost/phpmyadmin
- Chọn database `products`
- Xem cấu trúc và dữ liệu các bảng

## ⚠️ **12. LỆNH AN TOÀN VÀ BACKUP**

### **Backup database:**
```bash
# Export database
mysqldump -u root -p products > backup_products.sql

# Import database
mysql -u root -p products < backup_products.sql
```

### **Xóa dữ liệu an toàn:**
```sql
-- Sử dụng WHERE để tránh xóa nhầm
DELETE FROM products WHERE id = 1;

-- Kiểm tra trước khi xóa
SELECT * FROM products WHERE id = 1;
DELETE FROM products WHERE id = 1;
```

## 🎯 **13. LỆNH THƯỜNG DÙNG NHẤT**

### **Hàng ngày:**
```bash
# Khởi động server
npm start

# Kiểm tra kết nối
curl http://localhost:4000/api/health

# Lấy danh sách sản phẩm
curl http://localhost:4000/api/products
```

### **Hàng tuần:**
```bash
# Thêm sản phẩm mới
npm run add-product

# Cập nhật sản phẩm
npm run update-product

# Backup database
npm run init-db
```

## 📱 **14. TÍCH HỢP VỚI FRONTEND**

### **JavaScript để lấy dữ liệu:**
```javascript
// Lấy tất cả sản phẩm
fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    console.log(products);
    // Hiển thị lên giao diện
  });

// Tìm kiếm sản phẩm
fetch('/api/products/search/iphone')
  .then(response => response.json())
  .then(products => {
    console.log(products);
  });
```

### **HTML để hiển thị:**
```html
<div id="products-container">
  <!-- Sản phẩm sẽ được hiển thị ở đây -->
</div>

<script>
  // Load sản phẩm khi trang load
  window.onload = function() {
    loadProducts();
  };
  
  function loadProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        displayProducts(products);
      });
  }
</script>
```

## 🎉 **KẾT LUẬN**

Bây giờ bạn đã có **TẤT CẢ** các lệnh cần thiết để:
- ✅ Thêm dữ liệu mới
- ✅ Cập nhật dữ liệu
- ✅ Xóa dữ liệu
- ✅ Đọc và tìm kiếm dữ liệu
- ✅ Quản lý database
- ✅ Tích hợp với frontend

Hãy bắt đầu với những lệnh cơ bản trước, sau đó dần dần sử dụng các lệnh nâng cao!
