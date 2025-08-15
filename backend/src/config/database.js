const mysql = require('mysql2/promise');

// MySQL connection pool configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'products',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const dbPool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
  try {
    const [rows] = await dbPool.query('SELECT 1 AS ok');
    console.log('✅ MySQL connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

module.exports = { dbPool, testConnection };
