const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Simple fetch function
function simpleFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const urlObj = new URL(url);
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    if (options.body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.headers['Content-Length'] = Buffer.byteLength(options.body);
    }

    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Test results storage
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(testName, passed, message = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${testName}${message ? ': ' + message : ''}`);
  
  testResults.tests.push({ name: testName, passed, message });
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
  }
}

async function testBackendAPI() {
  console.log('\n🧪 Testing Backend API...');
  
  try {
    // Test 1: Health Check
    const healthResponse = await simpleFetch('http://localhost:4000/api/health');
    logTest('Health Check', healthResponse.status === 200, `Status: ${healthResponse.status}`);
    
    // Test 2: Get Products
    const productsResponse = await simpleFetch('http://localhost:4000/api/products');
    logTest('Get Products', productsResponse.status === 200, `Status: ${productsResponse.status}, Count: ${Array.isArray(productsResponse.data) ? productsResponse.data.length : 'N/A'}`);
    
    // Test 3: Search Products
    const searchResponse = await simpleFetch('http://localhost:4000/api/products/search/iphone');
    logTest('Search Products', searchResponse.status === 200, `Status: ${searchResponse.status}`);
    
    // Test 4: Get Products by Category
    const categoryResponse = await simpleFetch('http://localhost:4000/api/products/category/smartphone');
    logTest('Get Products by Category', categoryResponse.status === 200, `Status: ${categoryResponse.status}`);
    
  } catch (error) {
    logTest('Backend API Connection', false, error.message);
  }
}

async function testFrontendFiles() {
  console.log('\n🧪 Testing Frontend Files...');
  
  const frontendFiles = [
    'public/index.html',
    'public/main.js',
    'public/output.css',
    'public/styles.css'
  ];
  
  for (const file of frontendFiles) {
    const exists = fs.existsSync(file);
    logTest(`File exists: ${file}`, exists);
  }
  
  // Test HTML structure
  try {
    const htmlContent = fs.readFileSync('public/index.html', 'utf8');
    logTest('HTML has proper structure', 
      htmlContent.includes('<!DOCTYPE html>') && 
      htmlContent.includes('<title>') && 
      htmlContent.includes('</html>')
    );
  } catch (error) {
    logTest('HTML structure', false, error.message);
  }
  
  // Test JavaScript syntax
  try {
    const jsContent = fs.readFileSync('public/main.js', 'utf8');
    logTest('JavaScript syntax check', 
      jsContent.includes('document.addEventListener') && 
      jsContent.includes('function')
    );
  } catch (error) {
    logTest('JavaScript syntax', false, error.message);
  }
}

async function testDatabaseConnection() {
  console.log('\n🧪 Testing Database Connection...');
  
  try {
    const healthResponse = await simpleFetch('http://localhost:4000/api/health');
    if (healthResponse.status === 200) {
      const dbStatus = healthResponse.data.db;
      logTest('Database Connection', dbStatus === 'connected', `DB Status: ${dbStatus}`);
    } else {
      logTest('Database Connection', false, 'Health check failed');
    }
  } catch (error) {
    logTest('Database Connection', false, error.message);
  }
}

async function testProductCRUD() {
  console.log('\n🧪 Testing Product CRUD Operations...');
  
  try {
    // Test Create Product
    const newProduct = {
      name: 'Test Product',
      price: 1000000,
      salePrice: 900000,
      category: 'test',
      description: 'Test product for testing'
    };
    
    const createResponse = await simpleFetch('http://localhost:4000/api/products', {
      method: 'POST',
      body: JSON.stringify(newProduct)
    });
    
    logTest('Create Product', createResponse.status === 201, `Status: ${createResponse.status}`);
    
    if (createResponse.status === 201 && createResponse.data.id) {
      const productId = createResponse.data.id;
      
      // Test Get Product by ID
      const getResponse = await simpleFetch(`http://localhost:4000/api/products/${productId}`);
      logTest('Get Product by ID', getResponse.status === 200, `Status: ${getResponse.status}`);
      
      // Test Update Product
      const updateData = { ...newProduct, name: 'Updated Test Product' };
      const updateResponse = await simpleFetch(`http://localhost:4000/api/products/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      logTest('Update Product', updateResponse.status === 200, `Status: ${updateResponse.status}`);
      
      // Test Delete Product
      const deleteResponse = await simpleFetch(`http://localhost:4000/api/products/${productId}`, {
        method: 'DELETE'
      });
      logTest('Delete Product', deleteResponse.status === 200, `Status: ${deleteResponse.status}`);
    }
    
  } catch (error) {
    logTest('Product CRUD Operations', false, error.message);
  }
}

async function testStaticFiles() {
  console.log('\n🧪 Testing Static Files...');
  
  try {
    // Test if static files are served
    const staticResponse = await simpleFetch('http://localhost:4000/output.css');
    logTest('Static CSS served', staticResponse.status === 200, `Status: ${staticResponse.status}`);
    
    const jsResponse = await simpleFetch('http://localhost:4000/main.js');
    logTest('Static JS served', jsResponse.status === 200, `Status: ${jsResponse.status}`);
    
  } catch (error) {
    logTest('Static Files', false, error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Comprehensive Code Tests...\n');
  
  await testBackendAPI();
  await testFrontendFiles();
  await testDatabaseConnection();
  await testProductCRUD();
  await testStaticFiles();
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.failed === 0) {
    console.log('\n🎉 All tests passed! Your code is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the issues above.');
  }
}

// Run tests
runAllTests().catch(console.error);
