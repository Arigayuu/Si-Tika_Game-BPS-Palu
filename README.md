# Si Tika — Game Edukasi BPS Kota Palu

Si Tika adalah game kuis edukatif untuk kegiatan internal BPS Kota Palu. Game ini berjalan sebagai aplikasi web SPA berbasis React dan Vite, sehingga dapat dimainkan langsung melalui browser tanpa backend, akun, database, atau koneksi internet saat permainan berlangsung.

## Konsep permainan

- Pemain menjawab soal kuis melalui browser.
- Pemain dapat memilih dan menjalankan level permainan yang tersedia.
- Soal, jawaban, timer, dan progress berjalan pada sesi browser masing-masing.
- Progress permainan disimpan di `localStorage` browser perangkat pemain.
- Setiap perangkat atau browser memiliki sesi permainan sendiri, sehingga beberapa pengunjung dapat bermain bersamaan tanpa saling memengaruhi.
- Asset game seperti gambar, stylesheet, JavaScript, dan dataset dimuat dari project lokal.

## Menjalankan melalui Wi-Fi lokal BPS

Game dirancang untuk dijalankan dari satu komputer server di jaringan lokal kantor dan diakses oleh banyak smartphone pada Wi-Fi yang sama. Game tidak ditujukan untuk diunggah ke hosting publik, domain publik, tunnel seperti ngrok, atau akses melalui internet.

### Komputer server Windows

1. Buka Command Prompt pada folder project.
2. Jalankan build production setelah source berubah:

   ```bat
   npm run build
   ```

3. Jalankan server LAN dengan `start-lan.bat`, atau gunakan:

   ```bat
   npm run preview:lan
   ```

4. Biarkan jendela Command Prompt tetap terbuka selama game digunakan.
5. Jalankan `ipconfig` dan catat **IPv4 Address** adapter Wi-Fi komputer server.
6. Server menggunakan port TCP `4173` dan mendengarkan pada interface LAN (`0.0.0.0`).

### Smartphone pemain

1. Sambungkan smartphone ke Wi-Fi kantor yang sama dengan komputer server.
2. Buka browser pada smartphone.
3. Masukkan alamat berikut dengan mengganti `IPV4_KOMPUTER`:

   ```text
   http://IPV4_KOMPUTER:4173
   ```

   Contoh: `http://192.168.1.10:4173`

Jangan menggunakan `localhost` dari smartphone karena alamat tersebut menunjuk ke smartphone itu sendiri.

## Jika akses gagal

- Pastikan komputer dan smartphone berada pada SSID/VLAN yang sama.
- Pastikan IPv4 yang digunakan adalah alamat Wi-Fi komputer, bukan `127.0.0.1` atau alamat IPv6.
- Pastikan port `4173` tidak sedang digunakan aplikasi lain.
- Jika diperlukan, minta petugas IT membuat aturan Windows Defender Firewall inbound **TCP 4173** dengan cakupan profil dan subnet kantor yang sesuai. Jangan mematikan seluruh firewall atau membuat port forwarding router.
- Wi-Fi dengan client isolation, AP isolation, guest isolation, atau VLAN tertentu dapat memblokir komunikasi ant perangkat. Pembatasan tersebut harus ditangani administrator jaringan BPS.

## Pengujian multi-pengguna

Buka game dari sedikitnya dua perangkat, mulai level pada keduanya, lalu pastikan timer, soal, jawaban, dan progress setiap pemain berjalan secara independen. Pengujian langsung dari smartphone harus dilakukan pada jaringan Wi-Fi BPS karena tidak dapat dipastikan sepenuhnya dari lingkungan pengembangan.

## Menghentikan server

Tekan `Ctrl+C` pada jendela Command Prompt yang menjalankan server. Script dan konfigurasi LAN terkait tersedia pada `start-lan.bat` dan `README-LAN.md`.
