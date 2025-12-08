# Start Next.js Dev Server Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Next.js Dev Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Clean up any existing processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "Starting server... This may take 30-60 seconds on first run." -ForegroundColor Yellow
Write-Host ""

# Start the dev server
npm run dev

