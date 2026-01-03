# EVE Star Ship Web - 一键部署脚本 (ASCII 安全版)
Write-Host "Start deploying to Cloudflare Pages..." -ForegroundColor Cyan

# 1. 构建项目
Write-Host "`nBuilding project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# 2. 部署到 Cloudflare Pages
Write-Host "`nDeploying to Cloudflare..." -ForegroundColor Yellow
wrangler pages deploy dist --project-name=eve-star-ship-web --branch=main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nDeploy succeeded!" -ForegroundColor Green
    Write-Host "Visit: https://eve-star-ship-web.pages.dev" -ForegroundColor Cyan
} else {
    Write-Host "Deploy failed!" -ForegroundColor Red
}
