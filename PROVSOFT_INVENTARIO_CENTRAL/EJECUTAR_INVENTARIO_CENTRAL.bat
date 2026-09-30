@echo off
setlocal
cd /d "%~dp0"
title PROVSOFT - INVENTARIO CENTRAL 17-09-2026

where py >nul 2>&1
if %errorlevel%==0 (
    py -3 server.py
    goto :fin
)

where python >nul 2>&1
if %errorlevel%==0 (
    python server.py
    goto :fin
)

echo.
echo ==========================================================
echo  ERROR: No se encontro Python instalado en este equipo.
echo ==========================================================
echo Instala Python 3 y marca "Add Python to PATH".
echo.
pause

:fin
endlocal
