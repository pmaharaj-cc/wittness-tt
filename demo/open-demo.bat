@echo off
REM Opens WiTTness demo — ONE browser window, no server needed
cd /d "%~dp0"
set "DEMO=%~dp0index.html"

echo WiTTness demo — Protect our kids (local file, no server)
echo %DEMO%
echo.

REM Use default browser only — one instance
start "" "%DEMO%"

echo Opened. If nothing appeared, double-click index.html in this folder.