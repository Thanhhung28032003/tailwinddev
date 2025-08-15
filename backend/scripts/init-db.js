const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
  let connection;
  
  try {
    // Kết nối đến MySQL server (không cần chọn database)
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
    });

    // Tạo database nếu chưa có
    await connection.execute('CREATE DATABASE IF NOT EXISTS products CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('✅ Database "products" đã sẵn sàng');

    console.log('✅ Kết nối MySQL thành công');

    // Đóng connection đầu tiên
    await connection.end();

    // Tạo connection mới vào database products
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'products'
    });
    console.log('✅ Đã kết nối vào database "products"');

    // Đọc file schema SQL
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schemaSQL = await fs.readFile(schemaPath, 'utf8');

    // Lọc bỏ các câu lệnh CREATE DATABASE và USE
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)
      .filter(stmt => !stmt.startsWith('CREATE DATABASE') && !stmt.startsWith('USE'));

    console.log(`📝 Thực thi ${statements.length} câu lệnh SQL...`);

    // Thực thi từng câu lệnh SQL
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          console.log(`✅ Câu lệnh ${i + 1} thành công`);
        } catch (error) {
          console.log(`⚠️  Câu lệnh ${i + 1} bỏ qua: ${error.message}`);
        }
      }
    }

    console.log('🎉 Khởi tạo database hoàn tất!');
    console.log('📊 Database: products');
    console.log('🔗 Truy cập: http://localhost/phpmyadmin');

  } catch (error) {
    console.error('❌ Lỗi khởi tạo database:', error.message);
    console.log('\n💡 Hãy kiểm tra:');
    console.log('   1. XAMPP đã khởi động MySQL chưa?');
    console.log('   2. Port 3306 có bị chiếm không?');
    console.log('   3. Username/password có đúng không?');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
