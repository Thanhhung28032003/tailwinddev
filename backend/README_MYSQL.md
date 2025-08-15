# Hướng dẫn sử dụng MySQL với dự án

## 1. Cài đặt và cấu hình MySQL

### Bước 1: Khởi động XAMPP
- Mở XAMPP Control Panel
- Khởi động Apache và MySQL
- Đảm bảo MySQL đang chạy trên port 3306

### Bước 2: Tạo database
- Mở phpMyAdmin: http://localhost/phpmyadmin
- Tạo database mới tên `products`
- Hoặc chạy file SQL: `database/schema.sql`

## 2. Cấu hình kết nối

### Tạo file .env (nếu chưa có)
```bash
# MySQL Configuration
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=products

# Server Configuration
PORT=4000
```

### Hoặc sửa trực tiếp trong `src/config/database.js`

## 3. Chạy dự án

```bash
cd backend
npm install
npm start
```

## 4. Kiểm tra kết nối

Truy cập: http://localhost:4000/api/health

Nếu thành công, bạn sẽ thấy:
```json
{
  "status": "ok",
  "db": "connected",
  "timestamp": 1234567890
}
```

## 5. API Endpoints

### Sản phẩm
- `GET /api/products` - Lấy tất cả sản phẩm
- `GET /api/products/:id` - Lấy sản phẩm theo ID
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm
- `GET /api/products/search/:query` - Tìm kiếm sản phẩm
- `GET /api/products/category/:category` - Lấy sản phẩm theo danh mục

### Ví dụ tạo sản phẩm mới
```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro",
    "price": 25000000,
    "salePrice": 28000000,
    "category": "smartphone",
    "description": "iPhone 15 Pro mới nhất",
    "stock": 100
  }'
```

## 6. Cấu trúc Database

### Bảng products
- `id` - ID tự động tăng
- `name` - Tên sản phẩm
- `price` - Giá gốc
- `salePrice` - Giá khuyến mãi
- `image` - Đường dẫn hình ảnh
- `category` - Danh mục sản phẩm
- `description` - Mô tả sản phẩm
- `stock` - Số lượng tồn kho
- `created_at` - Thời gian tạo
- `updated_at` - Thời gian cập nhật

### Bảng categories
- `id` - ID tự động tăng
- `name` - Tên danh mục
- `slug` - URL slug
- `description` - Mô tả danh mục

## 7. Xử lý lỗi thường gặp

### Lỗi kết nối MySQL
- Kiểm tra XAMPP đã khởi động MySQL chưa
- Kiểm tra port 3306 có bị chiếm không
- Kiểm tra username/password

### Lỗi database không tồn tại
- Tạo database `products` trong phpMyAdmin
- Hoặc chạy file `database/schema.sql`

### Lỗi bảng không tồn tại
- Chạy file `database/schema.sql` để tạo bảng
- Hoặc tạo bảng thủ công trong phpMyAdmin

## 8. Thêm dữ liệu mẫu

Sau khi tạo database, bạn có thể thêm dữ liệu mẫu:

```bash
curl -X POST http://localhost:4000/api/products/seed
```

## 9. Kiểm tra dữ liệu

Truy cập phpMyAdmin: http://localhost/phpmyadmin
- Chọn database `products`
- Xem bảng `products` để kiểm tra dữ liệu

## 10. Tích hợp với frontend

Để hiển thị dữ liệu từ MySQL trên frontend, sử dụng JavaScript fetch:

```javascript
// Lấy tất cả sản phẩm
fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    console.log(products);
    // Hiển thị sản phẩm lên giao diện
  });

// Tìm kiếm sản phẩm
fetch('/api/products/search/iphone')
  .then(response => response.json())
  .then(products => {
    console.log(products);
  });
```
