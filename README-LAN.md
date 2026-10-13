# Menjalankan Si Tika melalui Wi-Fi lokal

## Hasil audit

- Framework: React 19 dengan Vite 6 (SPA, tanpa backend).
- Build production: `npm run build`, menghasilkan folder `dist/`.
- Server LAN: Vite Preview pada port TCP `4173` dan host `0.0.0.0`.
- State permainan: tersimpan di `localStorage` pada masing-masing browser, sehingga perangkat tidak saling berbagi progres, timer, soal, atau jawaban.
- Asset game menggunakan path lokal dari `public/`; tidak perlu CDN atau layanan internet saat bermain.

## Cara menjalankan di komputer server Windows

1. Buka Command Prompt pada folder project.
2. Jalankan `npm run build` setelah ada perubahan pada source.
3. Jalankan `start-lan.bat`.
4. Biarkan jendela Command Prompt tetap terbuka selama acara.
5. Jalankan `ipconfig`, lalu catat **IPv4 Address** adapter Wi-Fi yang aktif.
6. Sambungkan HP ke Wi-Fi kantor yang sama.
7. Buka `http://IPV4_KOMPUTER:4173`, misalnya `http://192.168.1.10:4173`.
8. Hentikan server dengan `Ctrl+C`.

Alternatif tanpa file batch:

```bat
npm run preview:lan
```

## Jika HP tidak dapat terhubung

- Pastikan komputer dan HP berada pada SSID/VLAN yang sama dan bukan guest network yang mengisolasi client.
- Pastikan IP yang dipakai adalah IPv4 Wi-Fi komputer, bukan `127.0.0.1` atau IPv6.
- Pastikan port `4173` belum digunakan.
- Minta petugas IT membuat aturan Windows Defender Firewall inbound **TCP 4173** hanya pada profil jaringan dan subnet kantor yang diizinkan. Jangan mematikan seluruh firewall dan jangan melakukan port forwarding router.
- Jika client isolation/AP isolation/VLAN kantor memblokir komunikasi, hanya administrator jaringan BPS yang dapat menyediakan SSID/VLAN yang mengizinkannya. Jangan mencoba menerobos pembatasan tersebut.

## Pengujian

Sudah diverifikasi dari project: build production, server preview LAN, asset lokal, dan test game. Pengujian dari HP serta pengujian dua perangkat bersamaan harus dilakukan manual di jaringan Wi-Fi BPS karena lingkungan pengembangan tidak berada di jaringan kantor. Buka dua browser/perangkat, mulai level, lalu pastikan progress dan timer berjalan masing-masing.

Jika port `4173` bentrok, server akan gagal dengan pesan Vite yang menunjukkan port tersebut digunakan; hentikan proses pemakai port itu atau koordinasikan perubahan port secara konsisten pada script dan URL.
