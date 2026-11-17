import { useState } from "react";
import { Button, Menu, Pagination, ScrollToTop, Tabs } from "@nemo/ui";
import type { ComponentDoc } from "./types";

const tabItems = [
  {
    value: "ringkasan",
    label: "Ringkasan",
    content: <p style={{ margin: 0 }}>Ringkasan aktivitas project minggu ini.</p>,
  },
  {
    value: "anggota",
    label: "Anggota",
    content: <p style={{ margin: 0 }}>Andi (Admin), Budi (Editor), Citra (Viewer).</p>,
  },
  {
    value: "setelan",
    label: "Setelan",
    disabled: true,
    content: <p style={{ margin: 0 }}>Pengaturan project.</p>,
  },
];

function PaginationDemo() {
  const [page, setPage] = useState(2);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <Pagination page={page} pageCount={12} onChange={setPage} />
      <span style={{ fontSize: 13, opacity: 0.75 }}>
        Halaman {page} dari 12
      </span>
    </div>
  );
}

function ScrollDemoContent() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {Array.from({ length: 12 }, (_, index) => (
        <p key={index} className="site-p" style={{ margin: 0 }}>
          Baris {index + 1} — gulir halaman ini ke bawah untuk melihat tombol muncul.
        </p>
      ))}
    </div>
  );
}

function MenuDemo() {
  const [view, setView] = useState("web");
  const views = [
    { value: "web", label: "Tampilan web" },
    { value: "list", label: "Tampilan daftar" },
    { value: "board", label: "Tampilan board" },
  ];

  return (
    <Menu
      trigger={
        <Button variant="outlined">
          {views.find((item) => item.value === view)?.label}
        </Button>
      }
      ariaLabel="Pilih tampilan"
    >
      {views.map((item) => (
        <Menu.Item
          key={item.value}
          label={item.label}
          onSelect={() => setView(item.value)}
        />
      ))}
      <Menu.Divider />
      <Menu.Item label="Reset ke default" disabled />
    </Menu>
  );
}

export const navigationDocs: ComponentDoc[] = [
  {
    slug: "tabs",
    name: "Tabs",
    group: "Navigation",
    summary:
      "Membagi konten terkait menjadi beberapa panel yang bisa dipilih, dengan navigasi keyboard panah.",
    examples: [
      {
        id: "line",
        title: "Line",
        code: `const items = [
  { value: "ringkasan", label: "Ringkasan", content: <p>Ringkasan project.</p> },
  { value: "anggota", label: "Anggota", content: <p>Daftar anggota.</p> },
  { value: "setelan", label: "Setelan", disabled: true },
];

<Tabs items={items} defaultValue="ringkasan" ariaLabel="Info project" />`,
        stack: true,
        preview: (
          <Tabs items={tabItems} defaultValue="ringkasan" ariaLabel="Info project" />
        ),
      },
      {
        id: "pill",
        title: "Pill",
        code: `<Tabs
  items={items}
  defaultValue="ringkasan"
  variant="pill"
  ariaLabel="Info project (pill)"
/>`,
        stack: true,
        preview: (
          <Tabs
            items={tabItems}
            defaultValue="ringkasan"
            variant="pill"
            ariaLabel="Info project (pill)"
          />
        ),
      },
      {
        id: "controlled",
        title: "Controlled",
        code: `const [value, setValue] = useState("ringkasan");

<Tabs
  items={items}
  value={value}
  onChange={setValue}
  size="sm"
  ariaLabel="Info project"
/>`,
        stack: true,
        preview: (
          <Tabs
            items={tabItems}
            defaultValue="anggota"
            size="sm"
            ariaLabel="Info project (small)"
          />
        ),
      },
    ],
    props: [
      {
        name: "items",
        type: "TabsItem[]",
        description:
          "Daftar tab: value, label, content opsional, dan disabled opsional.",
      },
      {
        name: "value",
        type: "string",
        description: "Tab aktif untuk mode controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description:
          "Tab aktif awal; default item pertama yang tidak disabled.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Dipanggil saat tab berubah.",
      },
      {
        name: "variant",
        type: '"line" | "pill"',
        default: '"line"',
        description: "Gaya tablist.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Ukuran tab.",
      },
      {
        name: "ariaLabel",
        type: "string",
        description: "Nama aksesibel tablist.",
      },
    ],
  },
  {
    slug: "pagination",
    name: "Pagination",
    group: "Navigation",
    summary:
      "Navigasi halaman dengan jendela nomor di sekitar halaman aktif dan tombol lompat ke awal/akhir.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `const [page, setPage] = useState(2);

<Pagination page={page} pageCount={12} onChange={setPage} />`,
        preview: <PaginationDemo />,
      },
      {
        id: "uncontrolled",
        title: "Uncontrolled",
        code: `<Pagination defaultPage={1} pageCount={5} size="sm" />
<Pagination defaultPage={8} pageCount={12} siblingCount={2} />`,
        stack: true,
        preview: (
          <>
            <Pagination defaultPage={1} pageCount={5} size="sm" />
            <Pagination defaultPage={8} pageCount={12} siblingCount={2} />
          </>
        ),
      },
    ],
    props: [
      {
        name: "page",
        type: "number",
        description: "Halaman aktif (1-based) untuk mode controlled.",
      },
      {
        name: "defaultPage",
        type: "number",
        default: "1",
        description: "Halaman aktif awal untuk mode uncontrolled.",
      },
      {
        name: "pageCount",
        type: "number",
        description: "Jumlah total halaman.",
      },
      {
        name: "onChange",
        type: "(page: number) => void",
        description: "Dipanggil saat halaman berubah.",
      },
      {
        name: "siblingCount",
        type: "number",
        default: "1",
        description: "Jumlah nomor di kiri dan kanan halaman aktif.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Ukuran tombol halaman.",
      },
      {
        name: "ariaLabel",
        type: "string",
        default: '"Navigasi halaman"',
        description: "Nama aksesibel navigasi.",
      },
    ],
  },
  {
    slug: "menu",
    name: "Menu",
    group: "Navigation",
    summary:
      "Menu aksi yang muncul dari tombol trigger, dengan navigasi keyboard dan item divider.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `const [view, setView] = useState("web");

<Menu
  trigger={<Button variant="outlined">Tampilan web</Button>}
  ariaLabel="Pilih tampilan"
>
  <Menu.Item label="Tampilan web" onSelect={() => setView("web")} />
  <Menu.Item label="Tampilan daftar" onSelect={() => setView("list")} />
  <Menu.Item label="Tampilan board" onSelect={() => setView("board")} />
  <Menu.Divider />
  <Menu.Item label="Reset ke default" disabled />
</Menu>`,
        preview: <MenuDemo />,
      },
      {
        id: "as-child",
        title: "asChild",
        code: `<Menu
  asChild
  trigger={
    <a href="#tampilan" style={{ color: "inherit", textDecoration: "underline" }}>
      Tampilan web
    </a>
  }
  ariaLabel="Pilih tampilan"
>
  <Menu.Item label="Tampilan daftar" />
  <Menu.Item label="Tampilan board" />
</Menu>`,
        preview: (
          <Menu
            asChild
            trigger={
              <a
                href="#tampilan"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Tampilan web
              </a>
            }
            ariaLabel="Pilih tampilan (asChild)"
          >
            <Menu.Item label="Tampilan daftar" />
            <Menu.Item label="Tampilan board" />
          </Menu>
        ),
      },
    ],
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        description:
          "Konten trigger; string dirender sebagai tombol internal, elemen dirender apa adanya di dalam host tipis.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "Jadikan trigger sendiri sebagai elemen trigger tanpa wrapper; ref dan handler klik milik trigger tetap dipertahankan.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Isi list: Menu.Item, Menu.Divider, atau elemen lain.",
      },
      {
        name: "open",
        type: "boolean",
        description: "Status controlled; tanpa ini menu mengelola state sendiri.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Dipanggil saat menu dibuka/ditutup.",
      },
      {
        name: "placement",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"bottom"',
        description: "Posisi list relatif terhadap trigger.",
      },
      {
        name: "offset",
        type: "number",
        default: "8",
        description: "Jarak list dari trigger (px).",
      },
      {
        name: "ariaLabel",
        type: "string",
        description: "Nama aksesibel list (role=menu).",
      },
    ],
    sections: [
      {
        title: "Menu.Item",
        rows: [
          {
            name: "label",
            type: "ReactNode",
            description: "Teks item.",
          },
          {
            name: "icon",
            type: "ReactNode",
            description: "Ikon di sisi kiri item.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Menonaktifkan item.",
          },
          {
            name: "onSelect",
            type: "() => void",
            description: "Dipanggil saat item dipilih (klik, Enter, atau Space).",
          },
        ],
      },
      {
        title: "Menu.Divider",
        rows: [
          {
            name: "—",
            type: "—",
            description: "Garis pemisah antar kelompok item.",
          },
        ],
      },
    ],
  },
  {
    slug: "scroll-to-top",
    name: "ScrollToTop",
    group: "Navigation",
    summary:
      "Tombol mengambang yang muncul setelah halaman digulir dan mengembalikan tampilan ke atas.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        description:
          "Tombol hanya dirender saat posisi gulir melewati `threshold`, lalu menggulir jendela kembali ke atas dengan animasi halus.",
        code: `<ScrollToTop threshold={400} position="bottom-left" />`,
        preview: (
          <>
            <ScrollDemoContent />
            <ScrollToTop threshold={200} position="bottom-left" />
          </>
        ),
      },
      {
        id: "label",
        title: "Label & posisi",
        description:
          "`showLabel` menampilkan teks di samping ikon (teks itu juga menjadi nama aksesibel), dan `position` memindahkan tombol ke sudut lain atau tengah bawah.",
        code: `<ScrollToTop showLabel position="bottom-center" size="lg" />`,
        preview: (
          <>
            <ScrollDemoContent />
            <ScrollToTop threshold={200} showLabel position="bottom-center" size="lg" />
          </>
        ),
      },
    ],
    props: [
      {
        name: "threshold",
        type: "number",
        default: "400",
        description: "Jarak gulir minimum (px) sebelum tombol tampil.",
      },
      {
        name: "position",
        type: '"bottom-right" | "bottom-left" | "bottom-center"',
        default: '"bottom-right"',
        description: "Sudut tempat tombol menempel.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ukuran tombol.",
      },
      {
        name: "label",
        type: "string",
        default: '"Kembali ke atas"',
        description: "Nama aksesibel tombol; jadi teks terlihat bila `showLabel` aktif.",
      },
      {
        name: "showLabel",
        type: "boolean",
        default: "false",
        description: "Menampilkan teks label di samping ikon.",
      },
      {
        name: "smooth",
        type: "boolean",
        default: "true",
        description:
          "Gulir halus; otomatis dimatikan bila pengguna memilih reduced motion.",
      },
      {
        name: "icon",
        type: "ReactNode",
        description: "Ikon kustom menggantikan panah bawaan.",
      },
      {
        name: "onClick",
        type: "() => void",
        description: "Dipanggil setiap tombol diklik, setelah gulir dimulai.",
      },
      {
        name: "className / style",
        type: "string · CSSProperties",
        description: "Penyesuaian tampilan tambahan untuk tombol.",
      },
    ],
    notes: [
      "Tombol ini dipakai di seluruh playground ini (sudut kanan bawah, `threshold={600}`) sejak diimpor langsung dari `@nemo/ui`.",
      "Komponen ini memantau guliran jendela (bukan container tertentu) dan hanya dirender ketika melewati `threshold`, sehingga tidak meninggalkan tab stop tersembunyi.",
      "Animasi masuk dan gulir halus otomatis dimatikan bila pengguna mengaktifkan prefers-reduced-motion.",
    ],
  },
];
