# Kontrak Overlay

Dokumen ini merangkum perilaku dan aturan yang harus konsisten di seluruh komponen overlay Nemo UI.

## 1. Komponen overlay yang ditangani

Saat ini, komponen yang masuk kategori overlay:

- Modal
- Drawer
- Popover
- Tooltip
- Menu

Catatan:

- Modal dan Drawer adalah controlled component untuk `open` / `onOpenChange`.
- Popover dan Menu mendukung controlled dan uncontrolled melalui `open` / `onOpenChange` / `defaultOpen`.
- Tooltip tidak memiliki `open`/`onOpenChange`; statusnya diatur melalui hover, focus, dan timer.

## 2. Wajib pakai Portal

Seluruh konten overlay harus merender keluar dari alur document biasa melalui Portal, kecuali punya alasan teknis yang eksplisit dan terdokumentasi.

Alasannya:

- menghindari gangguan transform/positioning induk
- memastikan layer visual dan event handler overlay tidak kena konteks layout komponen induk

Catatan:

- Ini berlaku untuk Modal, Drawer, Popover, Tooltip, dan Menu.
- Portal membawa CSS variable + color-scheme + data-theme agar tampilan overlay mengikuti tema aplikasi.

## 3. Modal vs non-modal

### Modal

Modal adalah penutup interaksi utama:

- Drawer
- Modal

Ciri Modal:

- trap fokus aktif saat terbuka
- scroll lock aktif saat terbuka
- Escape menutup (kecuali jika sengaja dinonaktifkan oleh prop yang eksplisit)
- `closeOnOverlay` dan `closeOnEsc` mengendalikan perilaku penutup tambahan dari sisi komponen setelah state diubah oleh parent

### Non-modal

Non-modal adalah overlay ringan yang tidak menangkap fokus sepenuhnya:

- Popover
- Tooltip
- Menu

Ciri Non-modal:

- tidak pakai focus trap
- tidak pakai scroll lock
- tetap punya perilaku close atas Escape jika relevan

Catatan:

- Popover dan Menu menutup saat Escape dan saat klik di luar trigger/panel.
- Menu memiliki keyboard interaction yang lebih kaya (Arrow/Home/End/Enter/Space/Tab) dan state active item.
- Tooltip tidak memiliki Escape-to-close; statusnya diatur melalui hover/focus dan timer.

## 4. Escape handling

Semua overlay yang memiliki perilaku "tutup saat Escape" harus:

- mendengarkan Escape pada level yang tepat
- menutup sesuai status controlled / uncontrolled
- tidak bikin side effect focus yang ambigu

Pola yang disepakati:

- Modal: Escape dapat di-disable secara eksplisit bila dibutuhkan, tapi secara default Escape menutup.
- Non-modal: Escape biasanya tetap menutup, tapi implementasinya boleh disesuaikan dengan konteks interaksi komponen.

## 5. Focus behavior

### Modal

Saat terbuka:

- fokus dipindah ke elemen yang sesuai dalam panel
- fokus terjebak di dalam panel (focus trap) selama overlay aktif

Saat tertutup:

- fokus dikembalikan ke elemen yang reasonable sebelum overlay terbuka
- tidak meninggalkan focus di elemen yang hilang tanpa pemulihan

### Non-modal

- fokus opsional / terbatas; tidak menjebak fokus sepenuhnya
- sebaiknya tetap berinteraksi baik dengan keyboard, terutama bila berisi item interaktif

## 6. Scroll lock

- Wajib untuk modal yang menutupi area utama dan memblokir interaksi utama.
- Tidak wajib untuk popover, tooltip, dan menu, kecuali ada alasan fungsional yang jelas.

## 7. Controlled vs uncontrolled

Semua komponen overlay yang memiliki state "terbuka / tertutup" harus punya API yang dapat digunakan dalam kedua mode:

- Controlled: props `open` + `onOpenChange`.
- Uncontrolled: props `defaultOpen` dan/atau mekanisme toggle internal.

Penting:

- Jika `open` diberikan, komponen harus bersikap controlled.
- Jika hanya `defaultOpen`, komponen boleh mengelola 상태nya sendiri.
- API kontrol harus konsisten lintas komponen.

## 8. Tutup dari overlay / klik luar

Bila overlay memberikan kemampuan menutup saat:

- klik pada area overlay (backdrop),
- klik di luar panel,
- atau interaksi serupa,

maka perilaku itu harus terdokumentasi dan konsisten:

- Modal / Drawer: tutup overlay saat klik backdrop (jika diizinkan oleh prop terkait).
- Popover / Menu: tutup saat klik di luar trigger dan panel.
- Tooltip: biasanya tidak menggunakan klik luar karena bersifat sementara.

Penting:

- Jangan mengandalkan pola klik-luar yang berbeda-beda di tiap komponen tanpa alasan.
- Prop yang mengendalikan perilaku close dari overlay harus namanya konsisten atau minimal terdokumentasi jelas.

## 9. API dasar yang disarankan

Secara umum, properti ini diharapkan ada atau setara di semua komponen overlay:

- `open?` — state terbuka (controlled)
- `onOpenChange` — sinyal perubahan state
- `defaultOpen` — nilai awal bila uncontrolled
- `placement` atau pengaturan posisi yang setara
- `ariaLabel` atau `aria-labelledby` sesuai konteks
- Kemampuan menonaktifkan perilaku close otomatis jika memang dibutuhkan

## 10. Testing dan verifikasi perilaku

Sebaiknya setiap komponen overlay tidak hanya diuji dari sisi render, tapi juga perilaku:

- open / close
- toggle dari trigger
- Escape (bila relevan)
- klik luar / backdrop (bila relevan)
- status controlled vs uncontrolled

## Catatan perubahan

Aturan ini boleh disesuaikan bila ada alasan desain yang kuat, tapi perubahan itu harus ditegaskan di dokumen ini dan/atau di komponen terkait, bukan hanya di implementasi saja.
