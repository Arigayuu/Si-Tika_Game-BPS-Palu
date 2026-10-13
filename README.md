# Statistics Quiz — Si Tika

Game React + Vite dengan aset desain Figma pengguna, 40 soal bergambar, peta hutan tersambung, dan progres lokal di browser.

## Menjalankan

1. Pasang Node.js.
2. Jalankan `npm ci`.
3. Jalankan `npm run dev`, lalu buka alamat yang ditampilkan.

`npm run build` menghasilkan folder `dist` untuk hosting statis. `npm test` menjalankan pengujian bank soal dan progres.

## Isi dan penyesuaian

- PDF memiliki 40 soal: nomor 1–6 dan 8–41. Nomor 7 tidak tercantum. Urutan ini dipetakan ke level 1–40; nomor sumber dan halaman tersimpan pada setiap soal.
- Buku menampilkan level 1–40 dalam 10 halaman, empat level per halaman. Slot internal 41–50 tidak ditampilkan karena belum ada soal sumber.
- Soal sumber 26 (level 25): rata-rata 5, 10, 15, 20 adalah 12,5. Opsi dan kunci dikoreksi dari 12 menjadi 12,5.
- Gambar asli soal dipertahankan dan bisa diketuk untuk diperbesar. Beberapa kalimat diperjelas agar satuan, label, serta pertanyaan tidak ambigu.
- Halaman level memakai tujuh aset buku dari pengguna. Panah kiri/kanan membalik halaman; nomor level berlanjut 1–40. Posisi awal buku mengikuti level yang terakhir dimainkan.
- Jawaban benar membuka level berikutnya; jawaban salah tidak membuka level. Level selesai bisa diulang. Progres tersimpan di localStorage perangkat/browser yang sama.
- Animasi mengikuti preferensi reduced motion perangkat.

## Berkas utama

- `src/data/questions.js`: soal, gambar, opsi, kunci, dan metadata sumber.
- `src/data/bookPages.js`: pembagian soal ke halaman buku.
- `src/hooks/progress.js`: validasi dan pembaruan progres.
- `src/styles/book-map.css`: tata letak buku dan animasi balik halaman.
- `public/assets/questions`: 40 gambar soal.

## Validasi

Build produksi dan enam pengujian otomatis berhasil: kelengkapan 40 soal, jawaban benar/salah seluruh level, teks/desimal, pemulihan progres, batas level, peta, dan pengacakan pilihan. Pemeriksaan browser sebelumnya mencakup alur mulai–soal–kalah–ulang–menang; pemeriksaan visual terakhir setelah revisi diblokir kebijakan browser sehingga belum terverifikasi sepenuhnya.

Aset Figma, gambar peta, dan materi soal berasal dari berkas yang diberikan pengguna.

Revisi 13 Oktober 2026: jarak antarlevel diperlebar dengan mempertahankan proporsi hutan dan ukuran batu. Label Level ditempatkan pada bidang kecil di atas panel; pertanyaan rata tengah di bawahnya.


Revisi buku: hanya halaman pemilihan level diubah. Empat level per halaman, garis putus-putus disesuaikan, bintang menandakan penyelesaian (bukan skor tambahan), progres dan kunci level tetap mengikuti permainan. Build dan enam tes lulus; tampilan browser terakhir belum diverifikasi karena pembatasan browser sebelumnya.


## Audio
Empat MP3 pengguna tersedia di public/audio: wrong untuk jawaban salah, correct untuk jawaban benar, background untuk musik berulang, dan tap untuk tombol fitur. Musik mulai setelah interaksi pertama sesuai aturan browser. Tombol nada mengaktifkan/mematikan semua audio dan menyimpan preferensi. Audio dijeda saat tab tersembunyi. Build dan tes logika berhasil; pemutaran audio langsung di browser belum diverifikasi.

