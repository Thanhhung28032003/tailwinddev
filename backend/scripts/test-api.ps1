# PowerShell Script để test API MySQL
Write-Host "🧪 Test API MySQL - PowerShell Script" -ForegroundColor Green

# Kiểm tra kết nối
Write-Host "`n📊 Kiểm tra kết nối..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:4000/api/health" -UseBasicParsing
    Write-Host "✅ Health Check thành công:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Lỗi kết nối: $($_.Exception.Message)" -ForegroundColor Red
}

# Lấy tất cả sản phẩm
Write-Host "`n📦 Lấy danh sách sản phẩm..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "http://localhost:4000/api/products" -UseBasicParsing
    Write-Host "✅ Lấy sản phẩm thành công. Số lượng: $($products.Count)" -ForegroundColor Green
    if ($products.Count -gt 0) {
        Write-Host "Sản phẩm đầu tiên:" -ForegroundColor Cyan
        $products[0] | ConvertTo-Json -Depth 3
    }
} catch {
    Write-Host "❌ Lỗi lấy sản phẩm: $($_.Exception.Message)" -ForegroundColor Red
}

# Tìm kiếm sản phẩm
Write-Host "`n🔍 Tìm kiếm sản phẩm 'iphone'..." -ForegroundColor Yellow
try {
    $searchResults = Invoke-RestMethod -Uri "http://localhost:4000/api/products/search/iphone" -UseBasicParsing
    Write-Host "✅ Tìm kiếm thành công. Kết quả: $($searchResults.Count)" -ForegroundColor Green
    if ($searchResults.Count -gt 0) {
        Write-Host "Kết quả tìm kiếm:" -ForegroundColor Cyan
        $searchResults | ConvertTo-Json -Depth 3
    }
} catch {
    Write-Host "❌ Lỗi tìm kiếm: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Test hoàn tất!" -ForegroundColor Green
Write-Host "💡 Để xem chi tiết hơn, mở file test-api.html trong browser" -ForegroundColor Cyan
