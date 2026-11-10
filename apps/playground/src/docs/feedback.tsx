import {
  Alert,
  Button,
  Progress,
  Skeleton,
  Spinner,
  Stack,
  useToast,
} from "@nemo/ui";
import type { ComponentDoc } from "./types";

function ToastDemo() {
  const toast = useToast();

  return (
    <Stack direction="row" spacing={2} wrap align="center">
      <Button
        color="success"
        size="sm"
        onClick={() =>
          toast.success("Tersimpan!", { message: "Perubahan sudah disimpan." })
        }
      >
        Success
      </Button>
      <Button
        color="error"
        size="sm"
        onClick={() =>
          toast.error("Gagal menyimpan", {
            message: "Coba lagi beberapa saat.",
            duration: 6000,
          })
        }
      >
        Error
      </Button>
      <Button
        color="warning"
        size="sm"
        onClick={() =>
          toast.warning("Hampir penuh", {
            message: "Bersihkan penyimpanan kamu.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outlined"
        size="sm"
        onClick={() =>
          toast.info("Informasi", { message: "Tersedia pembaruan terbaru." })
        }
      >
        Info
      </Button>
      <Button variant="text" size="sm" onClick={() => toast.dismissAll()}>
        Tutup semua
      </Button>
    </Stack>
  );
}

export const feedbackDocs: ComponentDoc[] = [
  {
    slug: "alert",
    name: "Alert",
    group: "Feedback",
    summary:
      "Pesan kontekstual yang menonjol untuk status sukses, info, peringatan, atau error.",
    examples: [
      {
        id: "tones",
        title: "Tone",
        code: `<Alert tone="success" title="Berhasil disimpan">
  Perubahan terakhir sudah tersimpan.
</Alert>
<Alert tone="info" title="Info">Pembaruan baru tersedia.</Alert>
<Alert tone="warning" title="Perhatian" closable>
  Kuota kamu hampir habis.
</Alert>
<Alert tone="error" title="Gagal" closable>
  Terjadi kesalahan saat menyimpan.
</Alert>`,
        stack: true,
        preview: (
          <Stack direction="column" spacing={3}>
            <Alert tone="success" title="Berhasil disimpan">
              Perubahan terakhir sudah tersimpan.
            </Alert>
            <Alert tone="info" title="Info">
              Pembaruan baru tersedia.
            </Alert>
            <Alert tone="warning" title="Perhatian" closable>
              Kuota kamu hampir habis.
            </Alert>
            <Alert tone="error" title="Gagal" closable>
              Terjadi kesalahan saat menyimpan.
            </Alert>
          </Stack>
        ),
      },
      {
        id: "filled",
        title: "Filled & action",
        code: `<Alert tone="success" variant="filled" title="Berhasil disimpan">
  Perubahan tersimpan.
</Alert>
<Alert
  tone="error"
  variant="filled"
  title="Terjadi kesalahan"
  action={<Button size="sm" variant="text">Coba lagi</Button>}
>
  Gagal menyimpan data.
</Alert>`,
        stack: true,
        preview: (
          <>
            <Alert tone="success" variant="filled" title="Berhasil disimpan">
              Perubahan tersimpan.
            </Alert>
            <Alert
              tone="error"
              variant="filled"
              title="Terjadi kesalahan"
              action={
                <Button
                  size="sm"
                  variant="text"
                  style={{ color: "var(--nemo-neutral-0, #FFFFFF)" }}
                >
                  Coba lagi
                </Button>
              }
            >
              Gagal menyimpan data.
            </Alert>
          </>
        ),
      },
    ],
    props: [
      {
        name: "tone",
        type: '"success" | "info" | "warning" | "error"',
        description: "Nada pesan — menentukan ikon dan warna.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Isi pesan.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Judul singkat di atas isi pesan.",
      },
      {
        name: "variant",
        type: '"surface" | "filled"',
        default: '"surface"',
        description: "Latar lembut atau penuh warna.",
      },
      {
        name: "closable",
        type: "boolean",
        default: "false",
        description: "Menampilkan tombol tutup.",
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Dipanggil saat tombol tutup ditekan.",
      },
      {
        name: "action",
        type: "ReactNode",
        description: "Slot aksi di sisi kanan pesan.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Ikon kustom; default mengikuti tone.",
      },
      {
        name: "role",
        type: '"alert" | "status"',
        description: "Peran ARIA; default dipilih dari tone.",
      },
    ],
  },
  {
    slug: "toast",
    name: "Toast",
    group: "Feedback",
    summary:
      "Notifikasi sementara yang muncul di sudut layar, dipicu lewat hook useToast.",
    examples: [
      {
        id: "usage",
        title: "Pemakaian",
        description:
          "Bungkus aplikasi dengan ToastProvider sekali, lalu panggil useToast dari komponen mana pun di dalamnya.",
        code: `<ToastProvider placement="top-right" maxToasts={5}>
  <App />
</ToastProvider>

function Simpan() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast.success("Tersimpan!", { message: "Perubahan sudah disimpan." })
      }
    >
      Simpan
    </Button>
  );
}`,
        stack: true,
        preview: <ToastDemo />,
      },
    ],
    props: [
      {
        name: "placement",
        type: '"top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"',
        default: '"top-right"',
        description: "Posisi tumpukan toast di viewport (ToastProvider).",
      },
      {
        name: "maxToasts",
        type: "number",
        default: "5",
        description: "Jumlah toast yang ditampilkan sekaligus.",
      },
    ],
    sections: [
      {
        title: "useToast",
        rows: [
          {
            name: "toast.show(options)",
            type: "(options: ToastOptions) => string",
            description: "Menampilkan toast dengan opsi lengkap; mengembalikan id.",
          },
          {
            name: "toast.success / info / warning / error",
            type: "(title, options?) => string",
            description: "Shortcut menampilkan toast dengan tone tertentu.",
          },
          {
            name: "toast.dismiss(id)",
            type: "(id: string) => void",
            description: "Menutup satu toast berdasarkan id.",
          },
          {
            name: "toast.dismissAll()",
            type: "() => void",
            description: "Menutup semua toast yang sedang tampil.",
          },
        ],
      },
      {
        title: "ToastOptions",
        rows: [
          {
            name: "title",
            type: "ReactNode",
            description: "Judul toast.",
          },
          {
            name: "message",
            type: "ReactNode",
            description: "Isi pesan pendukung.",
          },
          {
            name: "tone",
            type: '"success" | "info" | "warning" | "error"',
            default: '"info"',
            description: "Nada toast untuk toast.show.",
          },
          {
            name: "action",
            type: "ReactNode",
            description: "Slot aksi opsional.",
          },
          {
            name: "closable",
            type: "boolean",
            default: "true",
            description: "Menampilkan tombol tutup.",
          },
          {
            name: "duration",
            type: "number",
            default: "4000",
            description: "Durasi auto-close dalam ms. 0 = tidak menutup sendiri.",
          },
        ],
      },
    ],
  },
  {
    slug: "progress",
    name: "Progress",
    group: "Feedback",
    summary:
      "Indikator kemajuan berbentuk garis atau cincin, dengan mode indeterminate.",
    examples: [
      {
        id: "line",
        title: "Line",
        code: `<Progress value={45} />
<Progress value={72} showValue color="success" />
<Progress indeterminate />`,
        stack: true,
        preview: (
          <Stack direction="column" spacing={4}>
            <Progress value={45} />
            <Progress value={72} showValue color="success" />
            <Progress indeterminate />
          </Stack>
        ),
      },
      {
        id: "circle",
        title: "Circle",
        code: `<Progress variant="circle" value={68} showValue />
<Progress variant="circle" value={35} color="warning" showValue />
<Progress variant="circle" indeterminate color="success" />`,
        preview: (
          <>
            <Progress variant="circle" value={68} showValue />
            <Progress variant="circle" value={35} color="warning" showValue />
            <Progress variant="circle" indeterminate color="success" />
          </>
        ),
      },
    ],
    props: [
      {
        name: "value",
        type: "number",
        default: "0",
        description: "Nilai kemajuan saat ini.",
      },
      {
        name: "max",
        type: "number",
        default: "100",
        description: "Nilai maksimum.",
      },
      {
        name: "variant",
        type: '"line" | "circle"',
        default: '"line"',
        description: "Bentuk indikator.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ketebalan/ukuran indikator.",
      },
      {
        name: "color",
        type: '"primary" | "success" | "warning" | "error" | "neutral"',
        default: '"primary"',
        description: "Warna indikator.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        default: "false",
        description: "Animasi tanpa nilai pasti (mis. sedang memuat).",
      },
      {
        name: "showValue",
        type: "boolean",
        default: "false",
        description: "Menampilkan persentase.",
      },
      {
        name: "label",
        type: "string",
        description: "Label aksesibel untuk indikator.",
      },
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    group: "Feedback",
    summary:
      "Placeholder abu-abu yang meniru bentuk konten selama data dimuat.",
    examples: [
      {
        id: "text",
        title: "Teks",
        code: `<Skeleton />
<Skeleton lines={3} animation="wave" />`,
        stack: true,
        preview: (
          <Stack direction="column" spacing={4}>
            <Skeleton />
            <Skeleton lines={3} animation="wave" />
          </Stack>
        ),
      },
      {
        id: "shapes",
        title: "Bentuk",
        code: `<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="rect" width={160} height={56} animation="wave" />`,
        preview: (
          <>
            <Skeleton variant="circle" width={48} height={48} />
            <Skeleton variant="rect" width={160} height={56} animation="wave" />
          </>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"text" | "circle" | "rect"',
        default: '"text"',
        description: "Bentuk placeholder.",
      },
      {
        name: "width",
        type: "number | string",
        description: "Lebar elemen (angka = px).",
      },
      {
        name: "height",
        type: "number | string",
        description: "Tinggi elemen (angka = px).",
      },
      {
        name: "lines",
        type: "number",
        default: "1",
        description: "Jumlah baris untuk varian text.",
      },
      {
        name: "animation",
        type: '"pulse" | "wave" | "none"',
        default: '"pulse"',
        description: "Animasi loading.",
      },
      {
        name: "label",
        type: "string",
        description: "Teks untuk screen reader (aria-label).",
      },
    ],
  },
  {
    slug: "spinner",
    name: "Spinner",
    group: "Feedback",
    summary: "Indikator loading berputar untuk proses singkat.",
    examples: [
      {
        id: "sizes",
        title: "Ukuran",
        code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
        preview: (
          <>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </>
        ),
      },
      {
        id: "colors",
        title: "Warna",
        code: `<Spinner color="primary" />
<Spinner color="success" />
<Spinner color="warning" />
<Spinner color="error" />
<Spinner color="neutral" />`,
        preview: (
          <>
            <Spinner color="primary" />
            <Spinner color="success" />
            <Spinner color="warning" />
            <Spinner color="error" />
            <Spinner color="neutral" />
          </>
        ),
      },
    ],
    props: [
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ukuran spinner.",
      },
      {
        name: "color",
        type: '"primary" | "success" | "warning" | "error" | "neutral"',
        default: '"primary"',
        description: "Warna spinner.",
      },
      {
        name: "label",
        type: "string",
        description: "Label aksesibel (role=status).",
      },
    ],
  },
];
