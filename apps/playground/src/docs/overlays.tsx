import { useState } from "react";
import {
  Button,
  Drawer,
  Modal,
  Popover,
  Stack,
  Tooltip,
  type DrawerProps,
} from "@nemo/ui";
import type { ComponentDoc } from "./types";

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Buka modal
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Hapus project?"
        description="Aksi ini permanen dan tidak bisa dibatalkan."
        footer={
          <>
            <Button variant="text" color="error" onClick={() => setOpen(false)}>
              Tidak
            </Button>
            <Button color="error" onClick={() => setOpen(false)}>
              Hapus
            </Button>
          </>
        }
      >
        <p>
          Project &quot;Nemo UI&quot; beserta seluruh riwayatnya akan dihapus
          selamanya.
        </p>
      </Modal>
    </>
  );
}

// Sengaja tidak meneruskan ref/props — contoh mode asChild={false} di Tooltip.
function ReflessBadge({ children }: { children: string }) {
  return (
    <span
      style={{
        padding: "2px 8px",
        border: "1px dashed currentColor",
        borderRadius: 999,
        cursor: "help",
      }}
    >
      {children}
    </span>
  );
}

function DrawerDemo() {
  const [placement, setPlacement] =
    useState<DrawerProps["placement"]>("right");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={2} wrap align="center">
        {(["left", "right", "top", "bottom"] as const).map((side) => (
          <Button
            key={side}
            size="sm"
            variant={placement === side ? "filled" : "outlined"}
            onClick={() => {
              setPlacement(side);
              setOpen(true);
            }}
          >
            {side}
          </Button>
        ))}
      </Stack>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        title="Panel samping"
        footer={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setOpen(false)}>Terapkan</Button>
          </>
        }
      >
        <p>
          Drawer menyajikan konten sekunder dari tepi layar. Coba ganti sisi
          dengan tombol di atas, lalu klik backdrop atau tekan Escape untuk
          menutup.
        </p>
      </Drawer>
    </>
  );
}

export const overlaysDocs: ComponentDoc[] = [
  {
    slug: "modal",
    name: "Modal",
    group: "Overlays",
    summary:
      "Dialog di tengah layar untuk tugas yang butuh perhatian penuh, dengan focus trap dan penutupan via Escape.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        description:
          "Modal adalah controlled component: visibilitas diatur lewat open dan onOpenChange.",
        code: `const [open, setOpen] = useState(false);

<Button variant="outlined" onClick={() => setOpen(true)}>
  Buka modal
</Button>

<Modal
  open={open}
  onOpenChange={setOpen}
  title="Hapus project?"
  description="Aksi ini permanen dan tidak bisa dibatalkan."
  footer={
    <>
      <Button variant="text" color="error" onClick={() => setOpen(false)}>
        Tidak
      </Button>
      <Button color="error" onClick={() => setOpen(false)}>
        Hapus
      </Button>
    </>
  }
>
  <p>Project beserta seluruh riwayatnya akan dihapus selamanya.</p>
</Modal>`,
        stack: true,
        preview: <ModalDemo />,
      },
    ],
    props: [
      {
        name: "open",
        type: "boolean",
        description: "Status visibilitas modal.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Dipanggil saat modal dibuka/ditutup.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Isi modal.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Judul modal (dipakai sebagai aria-labelledby).",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Keterangan di bawah judul.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Lebar maksimum panel: 400 / 480 / 640 px.",
      },
      {
        name: "footer",
        type: "ReactNode",
        description: "Slot aksi di bawah panel, rata kanan.",
      },
      {
        name: "closeOnOverlay",
        type: "boolean",
        default: "true",
        description: "Menutup saat backdrop diklik.",
      },
      {
        name: "closeOnEsc",
        type: "boolean",
        default: "true",
        description: "Menutup saat tombol Escape ditekan.",
      },
    ],
  },
  {
    slug: "drawer",
    name: "Drawer",
    group: "Overlays",
    summary:
      "Panel yang muncul dari tepi layar untuk konten pendukung tanpa meninggalkan halaman.",
    examples: [
      {
        id: "placement",
        title: "Posisi",
        code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Buka drawer</Button>

<Drawer
  open={open}
  onOpenChange={setOpen}
  placement="right"
  title="Panel samping"
  footer={<Button onClick={() => setOpen(false)}>Terapkan</Button>}
>
  <p>Konten sekunder dari tepi layar.</p>
</Drawer>`,
        stack: true,
        preview: <DrawerDemo />,
      },
    ],
    props: [
      {
        name: "open",
        type: "boolean",
        description: "Status visibilitas drawer.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Dipanggil saat drawer dibuka/ditutup.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Isi drawer.",
      },
      {
        name: "placement",
        type: '"left" | "right" | "top" | "bottom"',
        default: '"right"',
        description: "Sisi tempat panel muncul.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description:
          "Lebar 320/400/480 px untuk kiri-kanan, tinggi 240/320/400 px untuk atas-bawah.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Judul panel.",
      },
      {
        name: "footer",
        type: "ReactNode",
        description: "Slot aksi di bawah panel.",
      },
      {
        name: "closeOnOverlay",
        type: "boolean",
        default: "true",
        description: "Menutup saat backdrop diklik.",
      },
      {
        name: "closeOnEsc",
        type: "boolean",
        default: "true",
        description: "Menutup saat tombol Escape ditekan.",
      },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    group: "Overlays",
    summary:
      "Label singkat yang muncul saat trigger di-hover atau difokus dengan keyboard.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Tooltip content="Menampilkan info saat hover atau fokus">
  <Button variant="outlined">Hover aku</Button>
</Tooltip>

<Tooltip content="Penyimpanan aman" placement="bottom">
  <span>Istilah penting</span>
</Tooltip>`,
        preview: (
          <>
            <Tooltip content="Menampilkan info saat hover atau fokus">
              <Button variant="outlined">Hover aku</Button>
            </Tooltip>
            <Tooltip content="Penyimpanan aman" placement="bottom">
              <span
                style={{
                  cursor: "help",
                  textDecoration: "underline dotted",
                }}
              >
                Istilah penting
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        id: "as-child",
        title: "asChild",
        code: `// Komponen ini hanya menerima children, tanpa ref/props
function ReflessBadge({ children }) {
  return <span className="badge">{children}</span>;
}

<Tooltip content="Tetap muncul tanpa meneruskan ref" asChild={false}>
  <ReflessBadge>Beta</ReflessBadge>
</Tooltip>`,
        preview: (
          <Tooltip content="Tetap muncul tanpa meneruskan ref" asChild={false}>
            <ReflessBadge>Beta</ReflessBadge>
          </Tooltip>
        ),
      },
    ],
    props: [
      {
        name: "content",
        type: "ReactNode",
        description: "Isi panel tooltip.",
      },
      {
        name: "children",
        type: "ReactElement",
        description:
          "Satu elemen trigger: button, link, span, dan sebagainya.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "true",
        description:
          "Render trigger langsung tanpa wrapper (default). Set false untuk membungkusnya dalam span, mis. bila komponen trigger tidak meneruskan ref/props.",
      },
      {
        name: "placement",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"top"',
        description: "Posisi panel relatif terhadap trigger.",
      },
      {
        name: "openDelay",
        type: "number",
        default: "100",
        description: "Jeda sebelum tooltip muncul (ms).",
      },
      {
        name: "closeDelay",
        type: "number",
        default: "50",
        description: "Jeda sebelum tooltip hilang (ms).",
      },
      {
        name: "offset",
        type: "number",
        default: "6",
        description: "Jarak panel dari trigger (px).",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Menonaktifkan tooltip; trigger tetap normal.",
      },
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    group: "Overlays",
    summary:
      "Panel mengambang dengan konten interaktif, dibuka dari elemen trigger.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Popover
  trigger={<Button variant="outlined">Atur filter</Button>}
  ariaLabel="Panel filter"
  placement="bottom"
>
  <Stack direction="column" spacing={2}>
    <p style={{ margin: 0, fontWeight: 600 }}>Filter daftar</p>
    <p style={{ margin: 0 }}>Pilih kriteria lalu terapkan.</p>
    <Button size="sm">Terapkan</Button>
  </Stack>
</Popover>`,
        preview: (
          <Popover
            trigger={<Button variant="outlined">Atur filter</Button>}
            ariaLabel="Panel filter"
            placement="bottom"
          >
            <Stack direction="column" spacing={2}>
              <p style={{ margin: 0, fontWeight: 600 }}>Filter daftar</p>
              <p style={{ margin: 0 }}>
                Pilih kriteria lalu terapkan untuk menyaring data.
              </p>
              <Button size="sm">Terapkan</Button>
            </Stack>
          </Popover>
        ),
      },
      {
        id: "as-child",
        title: "asChild",
        code: `<Popover
  asChild
  trigger={
    <a href="#filter" style={{ color: "inherit", textDecoration: "underline" }}>
      Atur filter
    </a>
  }
  ariaLabel="Panel filter"
>
  <p style={{ margin: 0 }}>Trigger berupa link — tidak ada tombol tambahan.</p>
</Popover>`,
        preview: (
          <Popover
            asChild
            trigger={
              <a
                href="#filter"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Atur filter
              </a>
            }
            ariaLabel="Panel filter (asChild)"
          >
            <p style={{ margin: 0 }}>
              Trigger berupa link — tidak ada tombol tambahan.
            </p>
          </Popover>
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
        description: "Isi panel popover.",
      },
      {
        name: "open",
        type: "boolean",
        description: "Status controlled; tanpa ini popover mengelola state sendiri.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Dipanggil saat panel dibuka/ditutup.",
      },
      {
        name: "defaultOpen",
        type: "boolean",
        default: "false",
        description: "Status awal untuk mode uncontrolled.",
      },
      {
        name: "placement",
        type: '"top" | "right" | "bottom" | "left"',
        default: '"bottom"',
        description: "Posisi panel relatif terhadap trigger.",
      },
      {
        name: "offset",
        type: "number",
        default: "8",
        description: "Jarak panel dari trigger (px).",
      },
      {
        name: "ariaLabel",
        type: "string",
        description: "Nama aksesibel panel (role=dialog).",
      },
    ],
  },
];
