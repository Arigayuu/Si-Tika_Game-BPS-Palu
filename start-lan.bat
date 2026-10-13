@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo Si Tika - Server LAN BPS Kota Palu
echo ========================================
echo.

if not exist "dist\index.html" (
  echo [ERROR] Folder dist belum tersedia.
  echo Jalankan "npm run build" terlebih dahulu, lalu ulangi file ini.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js dan npm tidak ditemukan di PATH Windows.
  echo Instal Node.js LTS atau minta bantuan petugas IT BPS.
  echo.
  pause
  exit /b 1
)

echo [INFO] Server production akan berjalan pada port TCP 4173.
echo [INFO] Komputer lain harus memakai Wi-Fi kantor yang sama.
echo.
echo Alamat IPv4 komputer ini:
ipconfig | findstr /i /c:"IPv4 Address" /c:"Alamat IPv4"
echo.
echo Dari HP, buka: http://ALAMAT_IPV4_KOMPUTER:4173
echo Contoh: http://192.168.1.10:4173
echo.
echo Jangan tutup jendela ini selama game digunakan.
echo Tekan Ctrl+C untuk menghentikan server.
echo.

call npm run preview:lan
if errorlevel 1 (
  echo.
  echo [ERROR] Server gagal dimulai. Port 4173 mungkin sedang digunakan.
  echo Tutup aplikasi lain yang memakai port tersebut atau minta bantuan IT.
)

pause
endlocal
