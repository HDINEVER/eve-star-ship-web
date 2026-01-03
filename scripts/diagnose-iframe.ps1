# 3D 模型 iframe 嵌入问题诊断脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EVE 3D 模型 iframe 嵌入诊断工具" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$testUrl = "https://eve-ss-empire-eve.pages.dev/?ship=imperial&faction=amarr"

Write-Host "[1/4] 检查本地配置..." -ForegroundColor Yellow
Write-Host "      测试 URL: $testUrl`n"

# 检查 _headers 文件
Write-Host "[2/4] 检查 _headers 文件配置..." -ForegroundColor Yellow
$headersPath = "d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve\_headers"
if (Test-Path $headersPath) {
    Write-Host "      [OK] _headers file exists" -ForegroundColor Green
    $content = Get-Content $headersPath -Raw
    if ($content -match "X-Frame-Options.*ALLOWALL") {
        Write-Host "      [OK] X-Frame-Options configured correctly" -ForegroundColor Green
    } else {
        Write-Host "      [X] X-Frame-Options configuration issue" -ForegroundColor Red
    }
    
    if ($content -match "frame-ancestors") {
        Write-Host "      [OK] Content-Security-Policy configured correctly`n" -ForegroundColor Green
    } else {
        Write-Host "      [X] Content-Security-Policy configuration issue`n" -ForegroundColor Red
    }
} else {
    Write-Host "      [X] _headers file not found`n" -ForegroundColor Red
}

# Check dist/_headers
Write-Host "[3/4] Checking build output..." -ForegroundColor Yellow
$distHeadersPath = "d:\桌面\编程\展示网页开发\EVE-SS-Empire-Eve\dist\_headers"
if (Test-Path $distHeadersPath) {
    Write-Host "      [OK] dist/_headers file exists (ready for deployment)`n" -ForegroundColor Green
} else {
    Write-Host "      [X] dist/_headers file not found (rebuild needed)`n" -ForegroundColor Red
    Write-Host "      Run: cd EVE-SS-Empire-Eve && npm run build`n" -ForegroundColor Yellow
}

# Test online URL accessibility
Write-Host "[4/4] Testing online URL accessibility..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $testUrl -Method Head -TimeoutSec 10 -ErrorAction Stop
    Write-Host "      [OK] URL accessible (Status: $($response.StatusCode))" -ForegroundColor Green
    
    # Check key response headers
    Write-Host "`n      Response headers check:" -ForegroundColor Cyan
    
    $xFrameOptions = $response.Headers["X-Frame-Options"]
    if ($xFrameOptions) {
        if ($xFrameOptions -match "ALLOWALL|ALLOW-FROM") {
            Write-Host "      [✓] X-Frame-Options: $xFrameOptions" -ForegroundColor Green
        } else {
            Write-Host "      [X] X-Frame-Options: $xFrameOptions (blocks iframe)" -ForegroundColor Red
        }
    } else {
        Write-Host "      [?] X-Frame-Options: 未设置 (可能允许 iframe)" -ForegroundColor Yellow
    }
    
    $csp = $response.Headers["Content-Security-Policy"]
    if ($csp) {
        if ($csp -match "frame-ancestors") {
            Write-Host "      [✓] Content-Security-Policy: 包含 frame-ancestors" -ForegroundColor Green
            Write-Host "          $csp" -ForegroundColor Gray
        } else {
            Write-Host "      [?] Content-Security-Policy: 未包含 frame-ancestors" -ForegroundColor Yellow
        }
    }
    
    $cors = $response.Headers["Access-Control-Allow-Origin"]
    if ($cors) {
        Write-Host "      [✓] Access-Control-Allow-Origin: $cors" -ForegroundColor Green
    }
    
} catch {
    Write-Host "      [✗] URL 无法访问" -ForegroundColor Red
    Write-Host "      错误: $($_.Exception.Message)`n" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "诊断建议" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "如果显示 [✗] X-Frame-Options 阻止 iframe:" -ForegroundColor Yellow
Write-Host "  1. 确认 Cloudflare Pages 已重新部署" 
Write-Host "  2. 清除浏览器缓存 (Ctrl + Shift + R)" 
Write-Host "  3. 等待 Cloudflare CDN 缓存更新 (最多 5 分钟)`n"

Write-Host "如果 URL 无法访问:" -ForegroundColor Yellow
Write-Host "  1. 检查网络连接" 
Write-Host "  2. 确认 Cloudflare Pages 项目已成功部署" 
Write-Host "  3. 在浏览器中直接访问测试`n"

Write-Host "测试步骤:" -ForegroundColor Yellow
Write-Host "  1. 直接访问: $testUrl"
Write-Host "  2. iframe 测试: file:///d:/桌面/编程/展示网页开发/eve-star-ship-web/test-iframe.html"
Write-Host "  3. 主网站测试: http://localhost:3001/amarr/ships`n"

Write-Host "按任意键继续..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
