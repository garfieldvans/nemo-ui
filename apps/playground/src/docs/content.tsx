import { useState } from "react";

import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Stack,
  Table,
  Typography,
  type TableColumn,
  type TableSortState,
} from "@nemo-ui/ui";
import type { ComponentDoc } from "./types";

type Member = { nama: string; peran: string; status: string };

const members: Member[] = [
  { nama: "Andi Pratama", peran: "Admin", status: "Aktif" },
  { nama: "Budi Santoso", peran: "Editor", status: "Aktif" },
  { nama: "Citra Dewi", peran: "Viewer", status: "Nonaktif" },
];

const memberColumns: TableColumn<Member>[] = [
  { key: "nama", header: "Nama" },
  { key: "peran", header: "Peran" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => (
      <Badge color={row.status === "Aktif" ? "success" : "neutral"}>{row.status}</Badge>
    ),
  },
];

type Ticket = { id: string; judul: string; prioritas: number; status: string };

const tickets: Ticket[] = [
  {
    id: "NEM-104",
    judul: "Perbaiki tooltip di Safari",
    prioritas: 2,
    status: "Berjalan",
  },
  {
    id: "NEM-105",
    judul: "Tambah mode gelap pada tabel",
    prioritas: 1,
    status: "Menunggu",
  },
  {
    id: "NEM-106",
    judul: "Percepat build Storybook",
    prioritas: 3,
    status: "Selesai",
  },
  {
    id: "NEM-107",
    judul: "Dokumentasikan token warna",
    prioritas: 1,
    status: "Berjalan",
  },
];

const ticketColumns: TableColumn<Ticket>[] = [
  { key: "id", header: "Tiket" },
  { key: "judul", header: "Judul", sortable: true },
  {
    key: "prioritas",
    header: "Prioritas",
    align: "right",
    sortable: true,
    sortValue: (row) => row.prioritas,
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => (
      <Badge
        color={
          row.status === "Selesai" ? "success" : row.status === "Berjalan" ? "warning" : "neutral"
        }
      >
        {row.status}
      </Badge>
    ),
  },
];

type Person = { nama: string; peran: string; prioritas: number };

const people: Person[] = Array.from({ length: 23 }, (_, index) => ({
  nama: `Anggota ${String(index + 1).padStart(2, "0")}`,
  peran: ["Admin", "Editor", "Viewer"][index % 3] ?? "Viewer",
  prioritas: ((index * 7) % 9) + 1,
}));

const personColumns: TableColumn<Person>[] = [
  { key: "nama", header: "Nama", sortable: true },
  { key: "peran", header: "Peran", sortable: true },
  { key: "prioritas", header: "Prioritas", align: "right", sortable: true },
];

const PAGE_SIZE = 5;

const queueRows: Ticket[] = Array.from({ length: 14 }, (_, index) => ({
  id: `NEM-${120 + index}`,
  judul: `Antrean tugas #${index + 1}`,
  prioritas: ((index * 3) % 5) + 1,
  status: index % 3 === 0 ? "Selesai" : "Menunggu",
}));

function PagedTable() {
  const [sort, setSort] = useState<TableSortState | null>(null);
  const [page, setPage] = useState(1);

  return (
    <Table
      columns={personColumns}
      data={people}
      rowKey={(row) => row.nama}
      sort={sort}
      onSortChange={(next) => {
        setSort(next);
        setPage(1);
      }}
      pagination={{ page, pageSize: PAGE_SIZE, onChange: setPage }}
      caption="Anggota tim"
    />
  );
}

function ServerPagedTable() {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(people.length / PAGE_SIZE));
  const rows = people.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Table
      columns={personColumns}
      data={rows}
      rowKey={(row) => row.nama}
      pagination={{ page, pageCount, total: people.length, onChange: setPage }}
      caption="Satu halaman dari server"
    />
  );
}

export const contentDocs: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    group: "Actions",
    summary: "Tombol dengan tiga varian visual dan lima warna semantik untuk memicu aksi.",
    examples: [
      {
        id: "variants",
        title: "Varian",
        description:
          "Gunakan filled untuk aksi utama, outlined untuk aksi sekunder, dan text untuk aksi tersier.",
        code: `<Button>Simpan</Button>
<Button variant="outlined">Simpan draf</Button>
<Button variant="text">Batal</Button>`,
        preview: (
          <>
            <Button>Simpan</Button>
            <Button variant="outlined">Simpan draf</Button>
            <Button variant="text">Batal</Button>
          </>
        ),
      },
      {
        id: "colors",
        title: "Warna",
        description:
          "Warna semantik mengikuti token tema, jadi tetap terbaca di mode terang maupun gelap.",
        code: `<Button>Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>`,
        preview: (
          <>
            <Button>Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
          </>
        ),
      },
      {
        id: "sizes",
        title: "Ukuran & disabled",
        code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>`,
        preview: (
          <>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"filled" | "outlined" | "text"',
        default: '"filled"',
        description: "Bobot visual tombol.",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "success" | "warning" | "error"',
        default: '"primary"',
        description: "Warna semantik tombol.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Tinggi dan padding tombol.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Label tombol.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Menonaktifkan tombol (atribut native).",
      },
    ],
    notes: [
      "Button meneruskan seluruh atribut native <button>, termasuk onClick, type, aria-*, dan style.",
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "Data display",
    summary: "Label kecil untuk status, kategori, atau hitungan pada konten lain.",
    examples: [
      {
        id: "colors",
        title: "Warna",
        code: `<Badge>Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>
<Badge color="neutral">Neutral</Badge>`,
        preview: (
          <>
            <Badge>Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="neutral">Neutral</Badge>
          </>
        ),
      },
      {
        id: "variants",
        title: "Varian & ukuran",
        code: `<Badge variant="outlined" color="success">Outlined</Badge>
<Badge variant="dot" color="error" />
<Badge size="sm" color="success">Small</Badge>`,
        preview: (
          <>
            <Badge variant="outlined" color="success">
              Outlined
            </Badge>
            <Badge variant="dot" color="error" />
            <Badge size="sm" color="success">
              Small
            </Badge>
          </>
        ),
      },
    ],
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "Isi badge. Kosongkan bila memakai varian dot (badge titik).",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "success" | "warning" | "error" | "neutral"',
        default: '"primary"',
        description: "Warna semantik badge.",
      },
      {
        name: "variant",
        type: '"filled" | "outlined" | "dot"',
        default: '"filled"',
        description: "Gaya visual badge.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Ukuran badge.",
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    group: "Data display",
    summary:
      "Representasi pengguna berupa gambar atau inisial nama, dengan dukungan tumpukan grup.",
    examples: [
      {
        id: "basic",
        title: "Ukuran, bentuk & warna",
        code: `<Avatar name="Andi Pratama" color="primary" />
<Avatar name="Budi Santoso" color="success" size="lg" />
<Avatar
  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
  alt="Foto profil"
/>
<Avatar shape="square" name="Nemo UI" size="lg" />`,
        preview: (
          <>
            <Avatar name="Andi Pratama" color="primary" />
            <Avatar name="Budi Santoso" color="success" size="lg" />
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
              alt="Foto profil"
            />
            <Avatar shape="square" name="Nemo UI" size="lg" />
          </>
        ),
      },
      {
        id: "group",
        title: "AvatarGroup",
        description:
          "Avatar berlebih diringkas menjadi penghitung. Atur jumlah maksimum lewat prop max.",
        code: `<AvatarGroup max={3}>
  <Avatar name="Andi Pratama" color="primary" />
  <Avatar name="Budi Santoso" color="success" />
  <Avatar name="Citra Dewi" color="warning" />
  <Avatar name="Dwi Lestari" color="error" />
  <Avatar name="Eko Prasetyo" color="neutral" />
</AvatarGroup>`,
        preview: (
          <AvatarGroup max={3}>
            <Avatar name="Andi Pratama" color="primary" />
            <Avatar name="Budi Santoso" color="success" />
            <Avatar name="Citra Dewi" color="warning" />
            <Avatar name="Dwi Lestari" color="error" />
            <Avatar name="Eko Prasetyo" color="neutral" />
          </AvatarGroup>
        ),
      },
    ],
    props: [
      {
        name: "src",
        type: "string",
        description: "URL gambar. Bila gagal dimuat, inisial nama dipakai.",
      },
      {
        name: "alt",
        type: "string",
        description: "Teks alternatif gambar.",
      },
      {
        name: "name",
        type: "string",
        description: "Nama pengguna — dipakai untuk inisial dan aria-label.",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        default: '"md"',
        description: "Ukuran avatar.",
      },
      {
        name: "shape",
        type: '"circle" | "square"',
        default: '"circle"',
        description: "Bentuk avatar.",
      },
      {
        name: "color",
        type: '"primary" | "success" | "warning" | "error" | "neutral"',
        default: '"neutral"',
        description: "Warna latar inisial.",
      },
    ],
    sections: [
      {
        title: "AvatarGroup",
        rows: [
          {
            name: "children",
            type: "ReactNode",
            description: "Daftar Avatar di dalam grup.",
          },
          {
            name: "max",
            type: "number",
            description: "Jumlah avatar yang ditampilkan sebelum sisanya jadi penghitung.",
          },
          {
            name: "size",
            type: '"xs" | "sm" | "md" | "lg" | "xl"',
            description: "Ukuran semua avatar di dalam grup.",
          },
        ],
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    group: "Layout",
    summary:
      "Wadah konten dengan header, body, dan footer opsional untuk mengelompokkan informasi.",
    examples: [
      {
        id: "basic",
        title: "Kartu lengkap",
        code: `<Card style={{ maxWidth: 360 }}>
  <CardHeader
    title="Pengaturan akun"
    subtitle="Kelola profil dan keamanan"
    action={<Badge color="success">Aktif</Badge>}
  />
  <CardBody>
    Info akun sudah diperbarui.
  </CardBody>
  <CardFooter>
    <Button size="sm">Simpan</Button>
    <Button size="sm" variant="text">Batal</Button>
  </CardFooter>
</Card>`,
        preview: (
          <Card style={{ maxWidth: 360 }}>
            <CardHeader
              title="Pengaturan akun"
              subtitle="Kelola profil dan keamanan"
              action={<Badge color="success">Aktif</Badge>}
            />
            <CardBody>Info akun sudah diperbarui.</CardBody>
            <CardFooter>
              <Button size="sm">Simpan</Button>
              <Button size="sm" variant="text">
                Batal
              </Button>
            </CardFooter>
          </Card>
        ),
      },
      {
        id: "variants",
        title: "Varian",
        code: `<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="filled">Filled</Card>`,
        preview: (
          <>
            <Card variant="elevated" style={{ padding: 20 }}>
              Elevated
            </Card>
            <Card variant="outlined" style={{ padding: 20 }}>
              Outlined
            </Card>
            <Card variant="filled" style={{ padding: 20 }}>
              Filled
            </Card>
          </>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"elevated" | "outlined" | "filled"',
        default: '"elevated"',
        description: "Gaya permukaan kartu.",
      },
      {
        name: "padding",
        type: '"none" | "sm" | "md" | "lg"',
        default: '"md"',
        description: "Padding dalam kartu.",
      },
      {
        name: "rounded",
        type: '"none" | "sm" | "md" | "lg"',
        default: '"md"',
        description: "Radius sudut kartu.",
      },
      {
        name: "as",
        type: "ElementType",
        default: '"div"',
        description: "Elemen HTML pengganti.",
      },
    ],
    sections: [
      {
        title: "CardHeader",
        rows: [
          {
            name: "title",
            type: "ReactNode",
            description: "Judul kartu.",
          },
          {
            name: "subtitle",
            type: "ReactNode",
            description: "Keterangan pendukung di bawah judul.",
          },
          {
            name: "action",
            type: "ReactNode",
            description: "Slot di kanan header, misalnya badge atau menu.",
          },
        ],
      },
      {
        title: "CardBody & CardFooter",
        rows: [
          {
            name: "children",
            type: "ReactNode",
            description: "Konten utama (body) atau baris aksi (footer).",
          },
        ],
      },
    ],
  },
  {
    slug: "divider",
    name: "Divider",
    group: "Layout",
    summary: "Garis pemisah horizontal atau vertikal antar kelompok konten.",
    examples: [
      {
        id: "basic",
        title: "Horizontal & vertikal",
        code: `<Stack direction="column" spacing={3}>
  <span>Bagian pertama</span>
  <Divider />
  <span>Bagian kedua</span>
</Stack>

<div style={{ display: "flex", alignItems: "center", gap: 12, height: 32 }}>
  <span>Kiri</span>
  <Divider orientation="vertical" />
  <span>Kanan</span>
</div>`,
        stack: true,
        preview: (
          <>
            <Stack direction="column" spacing={3}>
              <span>Bagian pertama</span>
              <Divider />
              <span>Bagian kedua</span>
            </Stack>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                height: 32,
              }}
            >
              <span>Kiri</span>
              <Divider orientation="vertical" />
              <span>Kanan</span>
            </div>
          </>
        ),
      },
    ],
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Arah garis pemisah.",
      },
      {
        name: "color",
        type: '"default" | "subtle"',
        default: '"default"',
        description: "Kekuatan warna garis.",
      },
    ],
  },
  {
    slug: "stack",
    name: "Stack",
    group: "Layout",
    summary: "Layout satu sumbu dengan jarak konsisten, opsional dengan pemisah antar item.",
    examples: [
      {
        id: "column",
        title: "Vertikal dengan divider",
        code: `<Stack direction="column" spacing={3} divider={<Divider />}>
  <span>Baris pertama</span>
  <span>Baris kedua</span>
  <span>Baris ketiga</span>
</Stack>`,
        stack: true,
        preview: (
          <Stack direction="column" spacing={3} divider={<Divider />}>
            <span>Baris pertama</span>
            <span>Baris kedua</span>
            <span>Baris ketiga</span>
          </Stack>
        ),
      },
      {
        id: "row",
        title: "Horizontal & wrap",
        code: `<Stack direction="row" spacing={2} wrap align="center">
  <Badge color="primary">Primary</Badge>
  <Badge color="success">Success</Badge>
  <Badge color="warning">Warning</Badge>
</Stack>`,
        preview: (
          <Stack direction="row" spacing={2} wrap align="center">
            <Badge color="primary">Primary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
          </Stack>
        ),
      },
    ],
    props: [
      {
        name: "direction",
        type: '"row" | "column"',
        default: '"column"',
        description: "Arah sumbu utama.",
      },
      {
        name: "spacing",
        type: "number | string",
        default: "4",
        description:
          "Jarak antar item. Angka memakai skala spacing token (0–24), string dipakai apa adanya.",
      },
      {
        name: "align",
        type: '"start" | "center" | "end" | "stretch" | "baseline"',
        default: '"stretch"',
        description: "Perataan pada sumbu silang.",
      },
      {
        name: "justify",
        type: '"start" | "center" | "end" | "between" | "around" | "evenly"',
        default: '"start"',
        description: "Perataan pada sumbu utama.",
      },
      {
        name: "wrap",
        type: "boolean",
        default: "false",
        description: "Izinkan item turun baris bila ruang habis.",
      },
      {
        name: "divider",
        type: "ReactNode",
        description: "Elemen pemisah yang disisipkan di antara item.",
      },
      {
        name: "as",
        type: "ElementType",
        default: '"div"',
        description: "Elemen HTML pengganti.",
      },
    ],
  },
  {
    slug: "typography",
    name: "Typography",
    group: "Data display",
    summary:
      "Primitif teks dengan skala tipografi dan warna semantik yang sudah disesuaikan kontrasnya.",
    examples: [
      {
        id: "scale",
        title: "Skala",
        code: `<Typography variant="h2">Judul bagian</Typography>
<Typography variant="h3">Sub judul</Typography>
<Typography variant="body">Paragraf isi...</Typography>
<Typography variant="bodySmall">Teks pendukung</Typography>
<Typography variant="caption" color="neutral">Caption</Typography>
<Typography variant="overline" color="neutral">Overline</Typography>`,
        stack: true,
        preview: (
          <>
            <Typography variant="h2">Judul bagian</Typography>
            <Typography variant="h3">Sub judul</Typography>
            <Typography variant="body">
              Paragraf isi yang menjelaskan konteks dari konten di sekitarnya.
            </Typography>
            <Typography variant="bodySmall">Teks pendukung yang lebih kecil.</Typography>
            <Typography variant="caption" color="neutral">
              Caption
            </Typography>
            <Typography variant="overline" color="neutral">
              Overline
            </Typography>
          </>
        ),
      },
      {
        id: "colors",
        title: "Warna semantik",
        code: `<Typography variant="body" color="primary">Primary</Typography>
<Typography variant="body" color="success">Success</Typography>
<Typography variant="body" color="warning">Warning</Typography>
<Typography variant="body" color="error">Error</Typography>
<Typography variant="body" color="info">Info</Typography>`,
        stack: true,
        preview: (
          <>
            <Typography variant="body" color="primary">
              Primary
            </Typography>
            <Typography variant="body" color="success">
              Success
            </Typography>
            <Typography variant="body" color="warning">
              Warning
            </Typography>
            <Typography variant="body" color="error">
              Error
            </Typography>
            <Typography variant="body" color="info">
              Info
            </Typography>
          </>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "bodySmall" | "caption" | "overline" | "button"',
        default: '"body"',
        description: "Skala tipografi.",
      },
      {
        name: "color",
        type: '"primary" | "neutral" | "success" | "warning" | "error" | "info"',
        default: '"neutral"',
        description:
          "Warna semantik. Nilainya dicampur dengan warna teks kanvas agar lolos kontras AA di kedua mode.",
      },
      {
        name: "as",
        type: "ElementType",
        default: '"span"',
        description: "Elemen HTML pengganti (mis. h1, p, label).",
      },
      {
        name: "align",
        type: '"left" | "center" | "right"',
        default: '"left"',
        description: "Perataan teks.",
      },
      {
        name: "htmlFor",
        type: "string",
        description: "Diteruskan ke atribut htmlFor bila dirender sebagai label.",
      },
    ],
  },
  {
    slug: "table",
    name: "Table",
    group: "Data display",
    summary:
      "Tabel data generik dengan kolom kustom, pengurutan, seleksi baris, header lengket, dan empty state.",
    examples: [
      {
        id: "basic",
        title: "Kolom kustom",
        code: `type Member = { nama: string; peran: string; status: string };

const columns: TableColumn<Member>[] = [
  { key: "nama", header: "Nama" },
  { key: "peran", header: "Peran" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => (
      <Badge color={row.status === "Aktif" ? "success" : "neutral"}>
        {row.status}
      </Badge>
    ),
  },
];

<Table
  columns={columns}
  data={members}
  rowKey={(row) => row.nama}
  caption="Daftar anggota tim"
  striped
/>`,
        stack: true,
        preview: (
          <Table
            columns={memberColumns}
            data={members}
            rowKey={(row) => row.nama}
            caption="Daftar anggota tim"
            striped
          />
        ),
      },
      {
        id: "sorting",
        title: "Sorting",
        description:
          "Beri `sortable` pada kolom. Klik header memutar urutan asc → desc → urutan data asli; `sortValue` menentukan nilai pembanding (mis. angka, bukan teks).",
        code: `const columns = [
  { key: "judul", header: "Judul", sortable: true },
  {
    key: "prioritas",
    header: "Prioritas",
    align: "right",
    sortable: true,
    sortValue: (row) => row.prioritas,
  },
  // ...
];

<Table
  columns={columns}
  data={tickets}
  rowKey={(row) => row.id}
  defaultSort={{ key: "prioritas", direction: "asc" }}
  caption="Tiket dukungan"
/>`,
        stack: true,
        preview: (
          <Table
            columns={ticketColumns}
            data={tickets}
            rowKey={(row) => row.id}
            defaultSort={{ key: "prioritas", direction: "asc" }}
            caption="Tiket dukungan"
          />
        ),
      },
      {
        id: "selection",
        title: "Seleksi baris",
        description:
          '`selectable` menambahkan checkbox per baris beserta checkbox "pilih semua" di header. Gunakan `defaultSelectedKeys` untuk pilihan awal atau `selectedKeys` + `onSelectionChange` untuk mode controlled.',
        code: `<Table
  columns={columns}
  data={tickets}
  rowKey={(row) => row.id}
  selectable
  defaultSelectedKeys={["NEM-104", "NEM-107"]}
  onSelectionChange={(keys) => console.log(keys)}
/>`,
        stack: true,
        preview: (
          <Table
            columns={ticketColumns}
            data={tickets}
            rowKey={(row) => row.id}
            selectable
            defaultSelectedKeys={["NEM-104", "NEM-107"]}
            caption="Pilih tiket untuk diproses"
          />
        ),
      },
      {
        id: "sticky",
        title: "Sticky header",
        description:
          "Kombinasi `stickyHeader` dan `maxHeight` membuat header tetap terlihat saat isi tabel digulir.",
        code: `<Table
  columns={columns}
  data={queueRows}
  rowKey={(row) => row.id}
  stickyHeader
  maxHeight={240}
/>`,
        stack: true,
        preview: (
          <Table
            columns={ticketColumns}
            data={queueRows}
            rowKey={(row) => row.id}
            stickyHeader
            maxHeight={240}
            caption="Antrean tugas"
          />
        ),
      },
      {
        id: "pagination",
        title: "Sorting + pagination bawaan",
        description:
          "Prop `pagination` menambahkan navigasi halaman beserta ringkasan baris di bawah tabel. Tanpa `pageCount`, Table mengurutkan, memotong, lalu menampilkan halaman aktif sendiri — pemanggil tidak perlu merangkai Pagination manual. Setiap perubahan urutan di contoh ini mengembalikan halaman ke 1.",
        code: `const [sort, setSort] = useState<TableSortState | null>(null);
const [page, setPage] = useState(1);

<Table
  columns={columns}
  data={people}
  rowKey={(row) => row.nama}
  sort={sort}
  onSortChange={(next) => {
    setSort(next);
    setPage(1);
  }}
  pagination={{ page, pageSize: 5, onChange: setPage }}
/>`,
        stack: true,
        preview: <PagedTable />,
      },
      {
        id: "server-pagination",
        title: "Pagination di server",
        description:
          "Isi `pageCount` (dan opsional `total`) agar Table tidak memotong data lagi: kirim hanya satu halaman dari server, lalu perbarui halaman lewat `onChange`.",
        code: `const [page, setPage] = useState(1);
const pageCount = Math.ceil(allRows.length / 5);
const rows = allRows.slice((page - 1) * 5, page * 5);

<Table
  columns={columns}
  data={rows}
  rowKey={(row) => row.nama}
  pagination={{
    page,
    pageCount,
    total: allRows.length,
    onChange: setPage,
  }}
/>`,
        stack: true,
        preview: <ServerPagedTable />,
      },
      {
        id: "empty",
        title: "Empty state",
        code: `<Table
  columns={columns}
  data={[]}
  rowKey={(row) => row.nama}
  emptyText="Belum ada anggota"
/>`,
        stack: true,
        preview: (
          <Table
            columns={memberColumns}
            data={[]}
            rowKey={(row) => row.nama}
            emptyText="Belum ada anggota"
          />
        ),
      },
    ],
    props: [
      {
        name: "columns",
        type: "TableColumn<T>[]",
        description: "Definisi kolom: key, header, render opsional, align, dan width.",
      },
      {
        name: "data",
        type: "T[]",
        description: "Baris data yang ditampilkan.",
      },
      {
        name: "pagination",
        type: "TablePagination",
        description:
          "Aktifkan pagination bawaan: page/defaultPage, pageSize (default 10), pageCount + total untuk mode server, onChange, size, ariaLabel. Tanpa pageCount, data dipotong di klien setelah diurutkan.",
      },
      {
        name: "rowKey",
        type: "(row: T, index: number) => string",
        description: "Kunci React unik untuk setiap baris.",
      },
      {
        name: "caption",
        type: "ReactNode",
        description: "Keterangan tabel yang juga dibaca screen reader.",
      },
      {
        name: "striped",
        type: "boolean",
        default: "false",
        description: "Selang-seling warna untuk baris genap.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Kerapatan baris.",
      },
      {
        name: "emptyText",
        type: "ReactNode",
        default: '"Tidak ada data"',
        description: "Pesan saat data kosong.",
      },
      {
        name: "sortable",
        type: "boolean (per kolom)",
        default: "false",
        description: "Membuat header kolom bisa diklik untuk mengurutkan.",
      },
      {
        name: "sortValue",
        type: "(row: T) => string | number | null | undefined (per kolom)",
        description: "Nilai pembanding kustom; default mengambil field sesuai key kolom.",
      },
      {
        name: "sort",
        type: '{ key: string; direction: "asc" | "desc" } | null',
        description:
          "Urutan terkontrol. Jika diisi (termasuk null), Table tidak menyimpan urutan sendiri sehingga cocok untuk sorting di server.",
      },
      {
        name: "defaultSort",
        type: '{ key: string; direction: "asc" | "desc" }',
        description: "Urutan awal saat uncontrolled.",
      },
      {
        name: "onSortChange",
        type: "(sort: TableSortState | null) => void",
        description: "Dipanggil setiap urutan berubah; null saat kembali ke urutan data asli.",
      },
      {
        name: "selectable",
        type: "boolean",
        default: "false",
        description: "Menampilkan kolom checkbox beserta checkbox pilih semua di header.",
      },
      {
        name: "selectedKeys / defaultSelectedKeys",
        type: "string[]",
        description: "Kunci baris terpilih (controlled) atau pilihan awal.",
      },
      {
        name: "onSelectionChange",
        type: "(keys: string[]) => void",
        description: "Dipanggil dengan daftar kunci baris setiap pilihan berubah.",
      },
      {
        name: "stickyHeader",
        type: "boolean",
        default: "false",
        description: "Header tetap menempel di atas saat tabel digulir.",
      },
      {
        name: "maxHeight",
        type: "number | string",
        description: "Batas tinggi area tabel sehingga gulir vertikal aktif.",
      },
    ],
    notes: [
      "Tanpa `pageCount`, `pagination` memotong data di klien setelah pengurutan; isi `pageCount` (dan `total`) bila data sudah dipotong di server.",
      '"Pilih semua baris" hanya berlaku untuk baris di halaman aktif, dan nomor urut `index` pada render/rowKey mengikuti posisi global di dataset.',
    ],
  },
];
