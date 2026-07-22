# ASCO JAECOO Landing Page

## Menjalankan lokal

```bash
npm install
npm run dev
```

Tanpa Vercel Blob, konten admin disimpan ke `.data/site-content.json` untuk pengembangan lokal.

## Deploy ke Vercel

1. Import repository ini ke Vercel.
2. Di project Vercel, buka **Storage** lalu buat dan hubungkan **Public Blob Store**.
3. Pastikan environment variable `BLOB_READ_WRITE_TOKEN` tersedia pada Production, Preview, dan Development.
4. Tambahkan `ADMIN_USERNAME`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET` dengan nilai yang aman.
5. Deploy ulang project.
6. Login ke `/login`, ubah konten, lalu klik **Simpan**.

Konten sekarang disimpan di Vercel Blob, bukan hanya di `localStorage`, sehingga perubahan admin tampil untuk semua perangkat dan pengunjung.

Jika browser admin masih memiliki data dari versi lama, panel akan mendeteksinya. Klik **Simpan** satu kali untuk memigrasikan data tersebut ke server.
