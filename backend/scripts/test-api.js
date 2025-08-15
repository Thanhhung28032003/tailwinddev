const https = require('https');
const http = require('http');

// Hàm fetch đơn giản sử dụng http/https
function simpleFetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          resolve(data);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function testAPI() {
  console.log('🧪 Test API MySQL - Node.js Script');
  
  try {
    // Test health check
    console.log('\n📊 Kiểm tra kết nối...');
    const healthData = await simpleFetch('http://localhost:4000/api/health');
    console.log('✅ Health Check thành công:', JSON.stringify(healthData, null, 2));
    
    // Test lấy sản phẩm
    console.log('\n📦 Lấy danh sách sản phẩm...');
    const products = await simpleFetch('http://localhost:4000/api/products');
    console.log(`✅ Lấy sản phẩm thành công. Số lượng: ${products.length}`);
    
    if (products.length > 0) {
      console.log('Sản phẩm đầu tiên:', JSON.stringify(products[0], null, 2));
    }
    
    // Test tìm kiếm
    console.log('\n🔍 Tìm kiếm sản phẩm "iphone"...');
    const searchResults = await simpleFetch('http://localhost:4000/api/products/search/iphone');
    console.log(`✅ Tìm kiếm thành công. Kết quả: ${searchResults.length}`);
    
    if (searchResults.length > 0) {
      console.log('Kết quả tìm kiếm:', JSON.stringify(searchResults, null, 2));
    }
    
    console.log('\n🎉 Test hoàn tất!');
    console.log('💡 Để xem chi tiết hơn, mở file test-api.html trong browser');
    
  } catch (error) {
    console.error('❌ Lỗi test API:', error.message);
    console.log('\n💡 Hãy kiểm tra:');
    console.log('   1. Server đã khởi động chưa? (npm start)');
    console.log('   2. Port 4000 có đang chạy không?');
  }
}

// Chạy test
testAPI();
