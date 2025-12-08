@echo off
echo ========================================
echo Starting Next.js Dev Server
echo ========================================
echo.
echo This will start the development server...
echo Please wait 30-60 seconds for compilation.
echo.
echo DO NOT CLOSE THIS WINDOW while using the site!
echo.
echo ========================================
echo.

cd /d "%~dp0"
npm run dev

pause

