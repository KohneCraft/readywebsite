@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ========================================
echo       PORT KONTROL ARACI
echo ========================================
echo.

:ask_port
set "PORT_NUM="
set /p "PORT_NUM=Kontrol edilecek port numarasini girin (1-65535): "

REM Port numarasının geçerli olup olmadığını kontrol et
if "!PORT_NUM!"=="" (
    echo Hata: Port numarasi bos olamaz!
    echo.
    goto ask_port
)

REM Boşlukları temizle
set "PORT_NUM=!PORT_NUM: =!"

REM Sayısal kontrol
echo !PORT_NUM!| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo Hata: Gecerli bir sayi giriniz!
    echo.
    goto ask_port
)

REM Aralık kontrolü (1-65535)
if !PORT_NUM! LSS 1 (
    echo Hata: Port numarasi 1'den kucuk olamaz!
    echo.
    goto ask_port
)

if !PORT_NUM! GTR 65535 (
    echo Hata: Port numarasi 65535'ten buyuk olamaz!
    echo.
    goto ask_port
)

echo.
echo Port !PORT_NUM! kontrol ediliyor...
echo.

REM PowerShell script'ini çalıştır
powershell -ExecutionPolicy Bypass -File "%~dp0check-port.ps1" !PORT_NUM!

echo.
echo.
set "AGAIN="
set /p "AGAIN=Baska bir port kontrol etmek ister misiniz? (E/H): "
if /i "!AGAIN!"=="E" (
    echo.
    goto ask_port
)

echo.
echo Cikis yapiliyor...
timeout /t 2 >nul
exit

