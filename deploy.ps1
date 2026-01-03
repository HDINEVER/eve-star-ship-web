# EVE Star Ship Web - 一键部署脚本
Write-Host "🚀 开始部署到 Cloudflare Pages..." -ForegroundColor Cyan

# 1. 构建项目
Write-Host "`n📦 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败！" -ForegroundColor Red
    exit 1
}

# 2. 部署到 Cloudflare Pages
Write-Host "`n☁️ 部署到 Cloudflare..." -ForegroundColor Yellow
wrangler pages deploy dist --project-name=eve-star-ship-web --branch=main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ 部署成功！" -ForegroundColor Green
    Write-Host "🌐 访问: https://eve-star-ship-web.pages.dev" -ForegroundColor Cyan
} else {
    Write-Host "❌ 部署失败！" -ForegroundColor Red
}
