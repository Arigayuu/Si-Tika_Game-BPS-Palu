# Menjalankan Si Tika melalui Wi-Fi lokal

## Hasil audit

- Framework: React 19 dengan Vite 6 (SPA, tanpa backend).
- Build production: `npm run build`, menghasilkan folder `dist/`.
- Server LAN: Vite Preview pada port TCP `4173` dan host `0.0.0.0`.
- State permainan: tersimpan di `localStorage` pada masing-masing browser, sehingga perangkat tidak saling berbagi progres, timer, soal, atau jawaban.
- Asset game menggunakan path lokal dari `public/`; tidak perlu CDN atau layanan internet saat bermain.

## Cara menjalankan di komputer server Windows

1. Buka Command Prompt pada folder project.
2. Jalankan satu perintah berikut:

   ```bat
   npm run dev
   ```

3. Vite akan langsung menampilkan alamat **Network** yang dapat dibuka dari HP dan laptop, misalnya `http://192.168.1.10:5173`.
4. Sambungkan perangkat lain ke Wi-Fi kantor yang sama, lalu buka alamat Network tersebut.
5. Biarkan Command Prompt tetap terbuka selama game digunakan.
6. Hentikan server dengan `Ctrl+C`.

Perintah `npm run dev` sudah dikonfigurasi menggunakan host `0.0.0.0`, sehingga tidak perlu lagi menjalankan `start-lan.bat`, melakukan build terlebih dahulu, atau mengetik alamat IP secara manual. Port default-nya adalah `5173`.

## Jika HP tidak dapat terhubung

- Pastikan komputer dan HP berada pada SSID/VLAN yang sama dan bukan guest network yang mengisolasi client.
- Pastikan IP yang dipakai adalah IPv4 Wi-Fi komputer, bukan `127.0.0.1` atau IPv6.
- Pastikan port `4173` belum digunakan.
- Minta petugas IT membuat aturan Windows Defender Firewall inbound **TCP 4173** hanya pada profil jaringan dan subnet kantor yang diizinkan. Jangan mematikan seluruh firewall dan jangan melakukan port forwarding router.
- Jika client isolation/AP isolation/VLAN kantor memblokir komunikasi, hanya administrator jaringan BPS yang dapat menyediakan SSID/VLAN yang mengizinkannya. Jangan mencoba menerobos pembatasan tersebut.

## Pengujian

Sudah diverifikasi dari project: build production, server preview LAN, asset lokal, dan test game. Pengujian dari HP serta pengujian dua perangkat bersamaan harus dilakukan manual di jaringan Wi-Fi BPS karena lingkungan pengembangan tidak berada di jaringan kantor. Buka dua browser/perangkat, mulai level, lalu pastikan progress dan timer berjalan masing-masing.

Jika port `4173` bentrok, server akan gagal dengan pesan Vite yang menunjukkan port tersebut digunakan; hentikan proses pemakai port itu atau koordinasikan perubahan port secara konsisten pada script dan URL.
