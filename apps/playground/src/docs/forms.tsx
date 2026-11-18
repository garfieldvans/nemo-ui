import { useEffect, useState } from "react";
import {
  Checkbox,
  Combobox,
  DatePicker,
  FileUpload,
  FormField,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Textarea,
} from "@nemo-ui/ui";
import type { ComboboxOption, DatePickerRange, FileUploadRejection } from "@nemo-ui/ui";
import type { ComponentDoc } from "./types";

const plans = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro", description: "Paling populer" },
  { value: "enterprise", label: "Enterprise", description: "Untuk tim besar" },
  { value: "vip", label: "VIP", disabled: true },
];

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ControlledSelect() {
  const [plan, setPlan] = useState("pro");
  return (
    <Select
      label="Paket langganan"
      options={plans}
      value={plan}
      onChange={setPlan}
      helperText={`Paket aktif: ${plan}`}
    />
  );
}

function BillingRadioGroup() {
  const [value, setValue] = useState("monthly");
  return (
    <RadioGroup
      name="demo-billing"
      label="Mode billing"
      value={value}
      onChange={setValue}
      helperText={value === "yearly" ? "Hemat 20%" : undefined}
    >
      <Radio value="monthly" label="Bulanan" />
      <Radio value="yearly" label="Tahunan" />
      <Radio value="custom" label="Kustom" />
    </RadioGroup>
  );
}

const frameworks: ComboboxOption[] = [
  { label: "React", value: "react", description: "Library UI berbasis komponen" },
  { label: "Vue", value: "vue", description: "Framework progresif" },
  { label: "Svelte", value: "svelte", description: "Compiler-first framework" },
  { label: "Angular", value: "angular", description: "Framework lengkap dari Google" },
  {
    label: "Solid",
    value: "solid",
    description: "Reaktivitas halus tanpa virtual DOM",
    disabled: true,
  },
];

function ControlledCombobox() {
  const [values, setValues] = useState<string[]>(["react"]);
  return (
    <Combobox
      label="Framework"
      options={frameworks}
      value={values}
      onChange={setValues}
      helperText={`${values.length} framework dipilih.`}
      fullWidth
    />
  );
}

function AsyncCombobox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const term = query.trim().toLowerCase();
      setOptions(frameworks.filter((option) => String(option.label).toLowerCase().includes(term)));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Combobox
      label="Framework (pencarian async)"
      options={options}
      filter={false}
      loading={loading}
      placeholder="Ketik untuk mencari..."
      value={values}
      onChange={setValues}
      onQueryChange={(next) => {
        setQuery(next);
        setLoading(true);
      }}
      helperText="Opsi diambil dari sumber async (disimulasikan 600 ms)."
      fullWidth
    />
  );
}

function ControlledDatePicker() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 10, 17));
  return (
    <DatePicker
      label="Tanggal kirim"
      value={date}
      onChange={setDate}
      helperText={
        date
          ? `Terpilih: ${date.toLocaleDateString("id-ID", { dateStyle: "long" })}`
          : "Belum ada tanggal dipilih."
      }
      fullWidth
    />
  );
}

function RangeDatePicker() {
  const [range, setRange] = useState<DatePickerRange | null>({
    start: new Date(2026, 10, 1),
    end: new Date(2026, 10, 14),
  });

  return (
    <DatePicker
      mode="range"
      label="Periode laporan"
      value={range}
      onChange={setRange}
      helperText={
        range
          ? `${range.start.toLocaleDateString("id-ID", { dateStyle: "medium" })} – ${range.end.toLocaleDateString("id-ID", { dateStyle: "medium" })}`
          : "Pilih tanggal awal dan akhir."
      }
      fullWidth
    />
  );
}

function UploadWithLimits() {
  const [files, setFiles] = useState<File[]>([]);
  const [rejected, setRejected] = useState<FileUploadRejection[]>([]);

  return (
    <Stack direction="column" spacing={2}>
      <FileUpload
        label="Lampiran"
        accept="image/*,.pdf"
        maxSize={1024 * 1024}
        maxFiles={3}
        value={files}
        onChange={setFiles}
        onReject={setRejected}
        helperText={`${files.length} dari 3 file terpilih — maksimal 1 MB per file.`}
        fullWidth
      />
      {rejected.length > 0 && (
        <p className="site-p" style={{ margin: 0 }}>
          Ditolak: {rejected.map((item) => item.file.name).join(", ")}
        </p>
      )}
    </Stack>
  );
}

function SimulatedUpload() {
  const [files, setFiles] = useState<File[]>(() => [
    new File(["laporan"], "laporan.pdf", { type: "application/pdf" }),
    new File(["foto"], "foto.png", { type: "image/png" }),
  ]);
  const [progress, setProgress] = useState<Record<string, number>>({
    "laporan.pdf": 0,
    "foto.png": 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = { ...previous };
        for (const name of Object.keys(next)) {
          next[name] = Math.min(100, next[name] + 20);
        }
        return next;
      });
    }, 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <FileUpload
      label="Lampiran (status per file)"
      helperText="Unggahan disimulasikan; foto.png sengaja gagal."
      value={files}
      onChange={setFiles}
      getFileStatus={(file) => {
        const value = progress[file.name];
        if (value === undefined) return undefined;
        if (value < 100) return { status: "uploading", progress: value };
        if (file.name === "foto.png") {
          return { status: "error", message: "Gagal: koneksi terputus" };
        }
        return { status: "success" };
      }}
    />
  );
}

function NotificationSwitch() {
  const [checked, setChecked] = useState(true);
  return (
    <Switch
      label="Aktifkan notifikasi"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      helperText="Dikirim lewat email dan push notification."
    />
  );
}

const sharedInputProps = [
  {
    name: "variant",
    type: '"filled" | "outlined" | "ghost"',
    default: '"outlined"',
    description: "Gaya permukaan field.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Ukuran field.",
  },
  {
    name: "label",
    type: "string",
    description: "Label di atas field.",
  },
  {
    name: "helperText",
    type: "string",
    description: "Teks bantuan di bawah field.",
  },
  {
    name: "status",
    type: '"default" | "error" | "warning" | "success"',
    default: '"default"',
    description: "Status validasi yang mengatur warna border dan pesan.",
  },
  {
    name: "error",
    type: "string",
    description: "Pesan error sekaligus mengaktifkan status error.",
  },
  {
    name: "warning",
    type: "string",
    description: "Pesan peringatan sekaligus mengaktifkan status warning.",
  },
  {
    name: "success",
    type: "string",
    description: "Pesan sukses sekaligus mengaktifkan status success.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Membuat field memenuhi lebar kontainer.",
  },
];

export const formsDocs: ComponentDoc[] = [
  {
    slug: "input",
    name: "Input",
    group: "Forms",
    summary: "Field teks satu baris dengan label, status validasi, ikon, affix, dan tombol clear.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="Kami tidak akan mengirim spam."
/>`,
        stack: true,
        preview: (
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            helperText="Kami tidak akan mengirim spam."
            fullWidth
          />
        ),
      },
      {
        id: "variants",
        title: "Varian",
        code: `<Input label="Outlined" placeholder="Outlined" />
<Input label="Filled" placeholder="Filled" variant="filled" />
<Input label="Ghost" placeholder="Ghost" variant="ghost" />`,
        stack: true,
        preview: (
          <>
            <Input label="Outlined" placeholder="Outlined" fullWidth />
            <Input label="Filled" placeholder="Filled" variant="filled" fullWidth />
            <Input label="Ghost" placeholder="Ghost" variant="ghost" fullWidth />
          </>
        ),
      },
      {
        id: "status",
        title: "Status validasi",
        code: `<Input label="Error" error="Format email tidak valid" />
<Input label="Warning" warning="Data belum lengkap" />
<Input label="Success" success="Email tersedia" defaultValue="me@nemo.dev" />`,
        stack: true,
        preview: (
          <>
            <Input label="Error" error="Format email tidak valid" fullWidth />
            <Input label="Warning" warning="Data belum lengkap" fullWidth />
            <Input label="Success" success="Email tersedia" defaultValue="me@nemo.dev" fullWidth />
          </>
        ),
      },
      {
        id: "adornments",
        title: "Ikon, affix & clearable",
        code: `<Input label="Cari" placeholder="Cari komponen..." leftIcon={<SearchIcon />} />
<Input label="Harga" prefix="Rp" placeholder="0" />
<Input label="Domain" suffix="@nemo.dev" placeholder="nama" />
<Input label="Clearable" clearable defaultValue="Hapus saya" />`,
        stack: true,
        preview: (
          <>
            <Input
              label="Cari"
              placeholder="Cari komponen..."
              leftIcon={<SearchIcon />}
              fullWidth
            />
            <Input label="Harga" prefix="Rp" placeholder="0" fullWidth />
            <Input label="Domain" suffix="@nemo.dev" placeholder="nama" fullWidth />
            <Input label="Clearable" clearable defaultValue="Hapus saya" fullWidth />
          </>
        ),
      },
      {
        id: "sizes",
        title: "Ukuran",
        code: `<Input label="Small" size="sm" placeholder="Small" />
<Input label="Medium" size="md" placeholder="Medium" />
<Input label="Large" size="lg" placeholder="Large" />`,
        stack: true,
        preview: (
          <>
            <Input label="Small" size="sm" placeholder="Small" fullWidth />
            <Input label="Medium" size="md" placeholder="Medium" fullWidth />
            <Input label="Large" size="lg" placeholder="Large" fullWidth />
          </>
        ),
      },
    ],
    props: [
      ...sharedInputProps,
      {
        name: "leftIcon",
        type: "ReactNode",
        description: "Ikon di sisi kiri field.",
      },
      {
        name: "rightIcon",
        type: "ReactNode",
        description: "Ikon di sisi kanan field.",
      },
      {
        name: "rightIconAction",
        type: "MouseEventHandler<HTMLButtonElement>",
        description: "Membuat rightIcon bisa diklik sebagai tombol (mis. toggle password).",
      },
      {
        name: "prefix",
        type: "ReactNode",
        description: "Affix statis sebelum teks input.",
      },
      {
        name: "suffix",
        type: "ReactNode",
        description: "Affix statis setelah teks input.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "false",
        description: "Menampilkan tombol untuk mengosongkan nilai.",
      },
      {
        name: "floatingLabel",
        type: "boolean",
        description: "Label melayang di dalam field saat kosong.",
      },
    ],
    notes: [
      "Seluruh atribut native <input> diteruskan, termasuk value, onChange, type, name, required, dan disabled.",
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    group: "Forms",
    summary: "Field teks multi-baris dengan penghitung karakter dan gaya yang sama dengan Input.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Textarea
  label="Pesan"
  placeholder="Tulis pesan..."
  rows={4}
  helperText="Maksimal 100 karakter."
  maxLength={100}
  showCount
/>`,
        stack: true,
        preview: (
          <Textarea
            label="Pesan"
            placeholder="Tulis pesan..."
            rows={4}
            helperText="Maksimal 100 karakter."
            maxLength={100}
            showCount
            fullWidth
          />
        ),
      },
      {
        id: "status",
        title: "Varian & status",
        code: `<Textarea label="Filled" variant="filled" rows={3} />
<Textarea label="Ghost" variant="ghost" rows={3} />
<Textarea label="Error" error="Pesan terlalu pendek" rows={3} />`,
        stack: true,
        preview: (
          <>
            <Textarea label="Filled" variant="filled" rows={3} fullWidth />
            <Textarea label="Ghost" variant="ghost" rows={3} fullWidth />
            <Textarea label="Error" error="Pesan terlalu pendek" rows={3} fullWidth />
          </>
        ),
      },
    ],
    props: [
      ...sharedInputProps,
      {
        name: "rows",
        type: "number",
        default: "3",
        description: "Jumlah baris awal textarea.",
      },
      {
        name: "maxLength",
        type: "number",
        description: "Batas jumlah karakter.",
      },
      {
        name: "showCount",
        type: "boolean",
        default: "false",
        description: "Menampilkan penghitung karakter di sudut kanan bawah.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "false",
        description: "Menampilkan tombol untuk mengosongkan nilai.",
      },
    ],
  },
  {
    slug: "select",
    name: "Select",
    group: "Forms",
    summary:
      "Pemilih opsi tunggal dengan dukungan pencarian, penghapusan nilai, dan status validasi.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Select
  label="Paket langganan"
  options={[
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro", description: "Paling populer" },
    { value: "enterprise", label: "Enterprise" },
  ]}
  placeholder="Pilih paket..."
/>`,
        stack: true,
        preview: (
          <Select label="Paket langganan" options={plans} placeholder="Pilih paket..." fullWidth />
        ),
      },
      {
        id: "controlled",
        title: "Controlled",
        description:
          "onChange menerima value (string), bukan event — sehingga Select mudah dipakai dengan state biasa.",
        code: `const [plan, setPlan] = useState("pro");

<Select
  label="Paket langganan"
  options={plans}
  value={plan}
  onChange={setPlan}
  helperText={\`Paket aktif: \${plan}\`}
/>`,
        stack: true,
        preview: <ControlledSelect />,
      },
      {
        id: "searchable",
        title: "Searchable & clearable",
        code: `<Select
  label="Paket"
  options={plans}
  searchable
  clearable
  defaultValue="pro"
  helperText="Ketik untuk mencari"
/>`,
        stack: true,
        preview: (
          <Select
            label="Paket"
            options={plans}
            searchable
            clearable
            defaultValue="pro"
            helperText="Ketik untuk mencari"
            fullWidth
          />
        ),
      },
      {
        id: "status",
        title: "Status",
        code: `<Select label="Paket" options={plans} status="error" error="Wajib dipilih" />
<Select label="Paket" options={plans} status="success" success="Paket valid" />`,
        stack: true,
        preview: (
          <>
            <Select label="Paket" options={plans} status="error" error="Wajib dipilih" fullWidth />
            <Select
              label="Paket"
              options={plans}
              status="success"
              success="Paket valid"
              fullWidth
            />
          </>
        ),
      },
    ],
    props: [
      {
        name: "options",
        type: "SelectOption[]",
        description: "Daftar opsi: value, label, plus description/disabled opsional.",
      },
      {
        name: "value",
        type: "string",
        description: "Nilai terpilih untuk mode controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "Nilai awal untuk mode uncontrolled.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "Dipanggil dengan value opsi yang dipilih.",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Pilih opsi"',
        description: "Teks saat belum ada nilai.",
      },
      {
        name: "searchable",
        type: "boolean",
        default: "false",
        description: "Menampilkan field pencarian di dalam panel opsi.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "false",
        description: "Menampilkan tombol untuk menghapus pilihan.",
      },
      {
        name: "variant",
        type: '"filled" | "outlined" | "ghost"',
        default: '"outlined"',
        description: "Gaya permukaan field.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ukuran field.",
      },
      {
        name: "status",
        type: '"default" | "error" | "warning" | "success"',
        default: '"default"',
        description: "Status validasi.",
      },
      {
        name: "label",
        type: "string",
        description: "Label di atas field.",
      },
      {
        name: "error / warning / success",
        type: "string",
        description: "Pesan validasi sekaligus status terkait.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Menonaktifkan select.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "Membuat select memenuhi lebar kontainer.",
      },
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    group: "Forms",
    summary: "Kotak centang dengan label, status indeterminate, dan warna semantik.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Checkbox label="Terima syarat & ketentuan" />
<Checkbox label="Berlangganan newsletter" defaultChecked />
<Checkbox label="Pilih semua" indeterminate />
<Checkbox label="Tidak tersedia" disabled />`,
        stack: true,
        preview: (
          <>
            <Checkbox label="Terima syarat & ketentuan" />
            <Checkbox label="Berlangganan newsletter" defaultChecked />
            <Checkbox label="Pilih semua" indeterminate />
            <Checkbox label="Tidak tersedia" disabled />
          </>
        ),
      },
      {
        id: "colors",
        title: "Warna & error",
        code: `<Checkbox label="Primary" color="primary" defaultChecked />
<Checkbox label="Success" color="success" defaultChecked />
<Checkbox label="Warning" color="warning" defaultChecked />
<Checkbox label="Error" color="error" error="Wajib dicentang" />`,
        stack: true,
        preview: (
          <>
            <Checkbox label="Primary" color="primary" defaultChecked />
            <Checkbox label="Success" color="success" defaultChecked />
            <Checkbox label="Warning" color="warning" defaultChecked />
            <Checkbox label="Error" color="error" error="Wajib dicentang" />
          </>
        ),
      },
    ],
    props: [
      {
        name: "label",
        type: "ReactNode",
        description: "Label yang diklik untuk mengubah nilai.",
      },
      {
        name: "checked",
        type: "boolean",
        description: "Nilai controlled.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "Nilai awal uncontrolled.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        default: "false",
        description: "Menampilkan status setengah terpilih.",
      },
      {
        name: "color",
        type: '"primary" | "success" | "warning" | "error" | "neutral"',
        default: '"primary"',
        description: "Warna kotak saat terpilih.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Ukuran kotak centang.",
      },
      {
        name: "error",
        type: "string",
        description: "Pesan error di bawah label.",
      },
      {
        name: "helperText",
        type: "string",
        description: "Teks bantuan di bawah label.",
      },
    ],
    notes: [
      'Checkbox meneruskan atribut native <input type="checkbox">, termasuk onChange dan name.',
    ],
  },
  {
    slug: "radio",
    name: "Radio",
    group: "Forms",
    summary: "Pilihan tunggal dalam grup — tersedia RadioGroup vertikal maupun horizontal.",
    examples: [
      {
        id: "group",
        title: "RadioGroup",
        description: "RadioGroup mengelola nilai dan atribut name untuk semua Radio di dalamnya.",
        code: `const [value, setValue] = useState("monthly");

<RadioGroup
  name="billing"
  label="Mode billing"
  value={value}
  onChange={setValue}
>
  <Radio value="monthly" label="Bulanan" />
  <Radio value="yearly" label="Tahunan" />
  <Radio value="custom" label="Kustom" />
</RadioGroup>`,
        stack: true,
        preview: <BillingRadioGroup />,
      },
      {
        id: "orientation",
        title: "Horizontal & disabled",
        code: `<RadioGroup
  name="orientasi"
  label="Orientasi"
  orientation="horizontal"
  defaultValue="landscape"
>
  <Radio value="landscape" label="Lanskap" />
  <Radio value="portrait" label="Potret" />
</RadioGroup>

<RadioGroup name="terkunci" label="Terkunci" disabled defaultValue="auto">
  <Radio value="auto" label="Otomatis" />
  <Radio value="manual" label="Manual" />
</RadioGroup>`,
        stack: true,
        preview: (
          <>
            <RadioGroup
              name="demo-orientation"
              label="Orientasi"
              orientation="horizontal"
              defaultValue="landscape"
            >
              <Radio value="landscape" label="Lanskap" />
              <Radio value="portrait" label="Potret" />
            </RadioGroup>
            <RadioGroup name="demo-locked" label="Terkunci" disabled defaultValue="auto">
              <Radio value="auto" label="Otomatis" />
              <Radio value="manual" label="Manual" />
            </RadioGroup>
          </>
        ),
      },
    ],
    props: [
      {
        name: "value",
        type: "string",
        description: "Nilai radio (wajib, dipakai sebagai identifier).",
      },
      {
        name: "label",
        type: "ReactNode",
        description: "Label radio.",
      },
      {
        name: "color",
        type: '"primary" | "success" | "warning" | "error" | "neutral"',
        default: '"primary"',
        description: "Warna titik saat terpilih.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Ukuran radio.",
      },
      {
        name: "error",
        type: "string",
        description: "Pesan error di bawah label.",
      },
    ],
    sections: [
      {
        title: "RadioGroup",
        rows: [
          {
            name: "name",
            type: "string",
            description: "Nama grup native yang dibagikan ke semua Radio.",
          },
          {
            name: "value",
            type: "string",
            description: "Nilai terpilih (controlled).",
          },
          {
            name: "defaultValue",
            type: "string",
            description: "Nilai awal (uncontrolled).",
          },
          {
            name: "onChange",
            type: "(value: string) => void",
            description: "Dipanggil saat pilihan berubah.",
          },
          {
            name: "orientation",
            type: '"vertical" | "horizontal"',
            default: '"vertical"',
            description: "Arah susunan radio.",
          },
          {
            name: "label",
            type: "ReactNode",
            description: "Label grup.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Menonaktifkan seluruh radio dalam grup.",
          },
          {
            name: "error",
            type: "string",
            description: "Pesan error untuk grup.",
          },
        ],
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    group: "Forms",
    summary: "Tombol on/off untuk pengaturan yang langsung berlaku, dengan label dan bantuan.",
    examples: [
      {
        id: "basic",
        title: "Dasar",
        code: `<Switch label="Mode gelap otomatis" defaultChecked />
<Switch label="Hemat baterai" color="success" />
<Switch label="Terkunci" disabled />`,
        stack: true,
        preview: (
          <>
            <Switch label="Mode gelap otomatis" defaultChecked />
            <Switch label="Hemat baterai" color="success" />
            <Switch label="Terkunci" disabled />
          </>
        ),
      },
      {
        id: "controlled",
        title: "Controlled",
        code: `const [checked, setChecked] = useState(true);

<Switch
  label="Aktifkan notifikasi"
  checked={checked}
  onChange={(event) => setChecked(event.target.checked)}
  helperText="Dikirim lewat email dan push notification."
/>`,
        stack: true,
        preview: <NotificationSwitch />,
      },
    ],
    props: [
      {
        name: "label",
        type: "ReactNode",
        description: "Label yang diklik untuk mengubah nilai.",
      },
      {
        name: "checked",
        type: "boolean",
        description: "Nilai controlled.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        description: "Nilai awal uncontrolled.",
      },
      {
        name: "color",
        type: '"primary" | "success"',
        default: '"primary"',
        description: "Warna track saat aktif.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        default: '"md"',
        description: "Ukuran switch.",
      },
      {
        name: "error",
        type: "string",
        description: "Pesan error di bawah label.",
      },
      {
        name: "helperText",
        type: "string",
        description: "Teks bantuan di bawah label.",
      },
    ],
    notes: [
      'Switch memakai <input type="checkbox" role="switch"> sehingga tetap bisa dioperasikan keyboard.',
    ],
  },
  {
    slug: "form-field",
    name: "FormField",
    group: "Forms",
    summary:
      "Pembungkus label, kontrol, dan pesan bantuan/validasi dengan layout vertikal atau horizontal.",
    examples: [
      {
        id: "vertical",
        title: "Vertikal",
        code: `<FormField
  label="Nama lengkap"
  htmlFor="nama"
  required
  helperText="Sesuai KTP."
>
  <Input id="nama" placeholder="Nama lengkap" fullWidth />
</FormField>`,
        stack: true,
        preview: (
          <FormField label="Nama lengkap" htmlFor="demo-nama" required helperText="Sesuai KTP.">
            <Input id="demo-nama" placeholder="Nama lengkap" fullWidth />
          </FormField>
        ),
      },
      {
        id: "horizontal",
        title: "Horizontal",
        code: `<Stack direction="column" spacing={4}>
  <FormField label="Email" htmlFor="email" layout="horizontal">
    <Input id="email" type="email" fullWidth />
  </FormField>
  <FormField label="Paket" htmlFor="paket" layout="horizontal">
    <Select id="paket" options={plans} fullWidth />
  </FormField>
</Stack>`,
        stack: true,
        preview: (
          <Stack direction="column" spacing={4}>
            <FormField label="Email" htmlFor="demo-email" layout="horizontal">
              <Input id="demo-email" type="email" fullWidth />
            </FormField>
            <FormField label="Paket" htmlFor="demo-paket" layout="horizontal">
              <Select id="demo-paket" options={plans} fullWidth />
            </FormField>
          </Stack>
        ),
      },
      {
        id: "error",
        title: "Error",
        code: `<FormField label="Paket" htmlFor="paket" error="Wajib memilih paket">
  <Select id="paket" options={plans} status="error" fullWidth />
</FormField>`,
        stack: true,
        preview: (
          <FormField label="Paket" htmlFor="demo-paket-error" error="Wajib memilih paket">
            <Select id="demo-paket-error" options={plans} status="error" fullWidth />
          </FormField>
        ),
      },
    ],
    props: [
      {
        name: "label",
        type: "ReactNode",
        description: "Label untuk kontrol di dalamnya.",
      },
      {
        name: "htmlFor",
        type: "string",
        description: "id kontrol sehingga klik label memfokuskan field.",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "Kontrol form (Input, Select, dan sebagainya).",
      },
      {
        name: "required",
        type: "boolean",
        default: "false",
        description: "Menampilkan penanda wajib pada label.",
      },
      {
        name: "error",
        type: "string",
        description: "Pesan error di bawah kontrol.",
      },
      {
        name: "helperText",
        type: "ReactNode",
        description: "Teks bantuan di bawah kontrol.",
      },
      {
        name: "layout",
        type: '"vertical" | "horizontal"',
        default: '"vertical"',
        description: "Posisi label terhadap kontrol.",
      },
      {
        name: "width",
        type: '"sm" | "md" | "lg" | "full"',
        default: '"full"',
        description: "Lebar FormField.",
      },
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    group: "Forms",
    summary: "Pemilih multi-nilai dengan pencarian, chip yang bisa dihapus, dan navigasi keyboard.",
    examples: [
      {
        id: "basic",
        title: "Multi-select dengan pencarian",
        description:
          "Nilai tersimpan sebagai array string. Klik opsi untuk menambah/menghapus, ketik untuk memfilter.",
        code: `<Combobox
  label="Framework favorit"
  options={frameworks}
  defaultValue={["react", "vue"]}
  placeholder="Cari framework..."
  helperText="Bisa pilih lebih dari satu."
/>`,
        stack: true,
        preview: (
          <Combobox
            label="Framework favorit"
            options={frameworks}
            defaultValue={["react", "vue"]}
            placeholder="Cari framework..."
            helperText="Bisa pilih lebih dari satu."
            fullWidth
          />
        ),
      },
      {
        id: "controlled",
        title: "Controlled",
        description:
          "onChange menerima array nilai terpilih, sehingga mudah disinkronkan dengan state atau jumlah chip.",
        code: `const [values, setValues] = useState<string[]>(["react"]);

<Combobox
  label="Framework"
  options={frameworks}
  value={values}
  onChange={setValues}
  helperText={\`\${values.length} framework dipilih.\`}
/>`,
        stack: true,
        preview: <ControlledCombobox />,
      },
      {
        id: "async",
        title: "Pencarian async",
        description:
          "Set `filter={false}` agar daftar tidak difilter ulang di klien, kirim permintaan dari `onQueryChange`, lalu tampilkan `loading` selama data diambil. Opsi terpilih tetap muncul sebagai chip walau hasil pencarian berikutnya tidak memuatnya.",
        code: `const [query, setQuery] = useState("");
const [loading, setLoading] = useState(true);
const [options, setOptions] = useState<ComboboxOption[]>([]);

useEffect(() => {
  const timer = setTimeout(async () => {
    setOptions(await searchFrameworks(query));
    setLoading(false);
  }, 600);
  return () => clearTimeout(timer);
}, [query]);

<Combobox
  label="Framework"
  options={options}
  filter={false}
  loading={loading}
  onQueryChange={(next) => {
    setQuery(next);
    setLoading(true);
  }}
/>`,
        stack: true,
        preview: <AsyncCombobox />,
      },
      {
        id: "status",
        title: "Opsi disabled & status",
        code: `<Combobox
  label="Framework wajib"
  options={frameworks}
  required
  error="Pilih minimal satu framework."
/>

<Combobox label="Terkunci" options={frameworks} defaultValue={["react"]} disabled />`,
        stack: true,
        preview: (
          <>
            <Combobox
              label="Framework wajib"
              options={frameworks}
              required
              error="Pilih minimal satu framework."
              fullWidth
            />
            <Combobox
              label="Terkunci"
              options={frameworks}
              defaultValue={["react"]}
              disabled
              fullWidth
            />
          </>
        ),
      },
    ],
    props: [
      {
        name: "options",
        type: "ComboboxOption[]",
        description: "Daftar opsi: value, label, plus description/disabled opsional.",
      },
      {
        name: "value / defaultValue",
        type: "string[]",
        description: "Nilai terpilih (controlled) atau pilihan awal (uncontrolled).",
      },
      {
        name: "onChange",
        type: "(values: string[]) => void",
        description: "Dipanggil dengan seluruh nilai terpilih setiap pilihan berubah.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Dipanggil saat panel opsi dibuka atau ditutup.",
      },
      {
        name: "onQueryChange",
        type: "(query: string) => void",
        description: "Dipanggil setiap teks pencarian berubah.",
      },
      {
        name: "emptyText",
        type: "ReactNode",
        default: '"Opsi tidak ditemukan"',
        description: "Pesan saat pencarian tidak menemukan opsi.",
      },
      {
        name: "filter",
        type: "boolean",
        default: "true",
        description:
          "Filter opsi terhadap teks pencarian di klien. Matikan bila opsi sudah difilter di server.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description:
          "Menampilkan baris status memuat menggantikan daftar opsi, dan mencegah pemilihan saat Enter.",
      },
      {
        name: "loadingText",
        type: "ReactNode",
        default: '"Memuat opsi..."',
        description: "Teks pada baris status memuat.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Teks saat belum ada nilai dan pencarian kosong.",
      },
      {
        name: "variant",
        type: '"filled" | "outlined" | "ghost"',
        default: '"outlined"',
        description: "Gaya permukaan field.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ukuran field.",
      },
      {
        name: "status",
        type: '"default" | "error" | "warning" | "success"',
        default: '"default"',
        description: "Status validasi.",
      },
      {
        name: "label",
        type: "string",
        description: "Label di atas field.",
      },
      {
        name: "error / warning / success / helperText",
        type: "string",
        description: "Pesan validasi (sekaligus status) dan teks bantuan di bawah field.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Menonaktifkan field sekaligus mencegah panel terbuka.",
      },
      {
        name: "name",
        type: "string",
        description: "Menghasilkan satu hidden input per nilai agar ikut terkirim bersama form.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "Membuat field memenuhi lebar kontainer.",
      },
    ],
    notes: [
      "Backspace saat input kosong menghapus chip terakhir, dan panel tetap terbuka setelah memilih — khas multi-select.",
      "Untuk pilihan tunggal, gunakan Select.",
      "Pencarian async cukup memakai onQueryChange + filter={false} + loading; label chip disimpan dari opsi yang pernah tampil sehingga tidak hilang saat hasil server berganti.",
    ],
  },
  {
    slug: "file-upload",
    name: "FileUpload",
    group: "Forms",
    summary:
      "Area unggah dengan drag & drop atau pemilih file, daftar file yang bisa dihapus, serta validasi jenis, ukuran, dan jumlah.",
    examples: [
      {
        id: "basic",
        title: "Drag & drop atau pilih file",
        description:
          "Klik area unggah untuk membuka pemilih file, atau tarik file ke atasnya. Setiap file tampil dengan ukuran dan tombol hapus.",
        code: `<FileUpload
  label="Lampiran"
  helperText="Bisa lebih dari satu file."
/>`,
        stack: true,
        preview: <FileUpload label="Lampiran" helperText="Bisa lebih dari satu file." />,
      },
      {
        id: "limits",
        title: "Validasi accept, maxSize & maxFiles",
        description:
          "File yang tidak lolos validasi tidak masuk ke daftar dan dilaporkan lewat onReject, sehingga kamu bisa menampilkan alasannya sendiri.",
        code: `const [files, setFiles] = useState<File[]>([]);
const [rejected, setRejected] = useState<FileUploadRejection[]>([]);

<FileUpload
  label="Lampiran"
  accept="image/*,.pdf"
  maxSize={1024 * 1024}
  maxFiles={3}
  value={files}
  onChange={setFiles}
  onReject={setRejected}
  helperText={\`\${files.length} dari 3 file terpilih — maksimal 1 MB per file.\`}
/>`,
        stack: true,
        preview: <UploadWithLimits />,
      },
      {
        id: "upload-progress",
        title: "Status unggah per file",
        description:
          "Kembalikan `{ status, progress, message }` dari `getFileStatus` untuk menampilkan progress bar, tanda selesai, atau pesan gagal di baris file terkait. Selama `uploading`, tombol hapus dinonaktifkan agar unggahan tidak diputus di tengah jalan.",
        code: `const [progress, setProgress] = useState({ "laporan.pdf": 40 });

<FileUpload
  label="Lampiran"
  value={files}
  onChange={setFiles}
  getFileStatus={(file) => {
    const value = progress[file.name];
    if (value === undefined) return undefined;
    if (value < 100) return { status: "uploading", progress: value };
    if (file.name === "foto.png") {
      return { status: "error", message: "Gagal: koneksi terputus" };
    }
    return { status: "success" };
  }}
/>`,
        stack: true,
        preview: <SimulatedUpload />,
      },
      {
        id: "status",
        title: "Status & disabled",
        code: `<FileUpload label="Dokumen" required accept=".pdf" error="Unggah minimal satu dokumen." />
<FileUpload label="Terkunci" disabled hint="Unggahan ditutup." />`,
        stack: true,
        preview: (
          <>
            <FileUpload
              label="Dokumen"
              required
              accept=".pdf"
              error="Unggah minimal satu dokumen."
            />
            <FileUpload label="Terkunci" disabled hint="Unggahan ditutup." />
          </>
        ),
      },
    ],
    props: [
      {
        name: "accept",
        type: "string",
        description:
          'Atribut native accept (mis. ".pdf,image/*"). Juga dipakai memfilter file hasil drag & drop.',
      },
      {
        name: "multiple",
        type: "boolean",
        default: "true",
        description: "Izinkan lebih dari satu file; jika false file baru menggantikan yang lama.",
      },
      {
        name: "maxSize",
        type: "number",
        description: "Batas ukuran per file dalam byte.",
      },
      {
        name: "maxFiles",
        type: "number",
        description: "Batas jumlah file yang disimpan.",
      },
      {
        name: "value / defaultValue",
        type: "File[]",
        description: "Daftar file (controlled) atau file awal (uncontrolled).",
      },
      {
        name: "onChange",
        type: "(files: File[]) => void",
        description: "Dipanggil dengan daftar file terbaru setelah menambah atau menghapus.",
      },
      {
        name: "onReject",
        type: "(rejected: FileUploadRejection[]) => void",
        description: "Menerima file yang ditolak beserta alasannya: type, size, atau count.",
      },
      {
        name: "getFileStatus",
        type: "(file: File) => { status, progress?, message? } | undefined",
        description:
          "Status unggah per file. status: uploading | success | error; progress 0–100 untuk progress bar; message menjadi keterangan atau alasan gagal. Tanpa nilai, baris file tampil seperti biasa.",
      },
      {
        name: "dropText / hint",
        type: "ReactNode",
        description: "Teks utama dan keterangan kecil di dalam area unggah.",
      },
      {
        name: "name",
        type: "string",
        description: "Nama untuk input file native agar ikut terkirim bersama form.",
      },
      {
        name: "label / required / helperText",
        type: "string",
        description: "Label, penanda wajib, dan teks bantuan field.",
      },
      {
        name: "error / warning / success",
        type: "string",
        description: "Pesan validasi sekaligus mengaktifkan warna status terkait.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Menonaktifkan area unggah dan tombol hapus.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "true",
        description: "Membuat field memenuhi lebar kontainer.",
      },
    ],
    notes: [
      "File hasil drag & drop disalin ke input file native, jadi mengirim form biasa tetap membawa semua file terpilih.",
      "getFileStatus dipanggil per file pada setiap render, jadi simpan progres unggahan di state pemanggil dan biarkan komponen menampilkannya.",
    ],
  },
  {
    slug: "date-picker",
    name: "DatePicker",
    group: "Forms",
    summary:
      "Pemilih tanggal dengan input manual dan kalender berbahasa Indonesia, lengkap dengan batas min/max serta mode rentang.",
    examples: [
      {
        id: "basic",
        title: "Input manual + kalender",
        description:
          "Tanggal bisa diketik (dd/mm/yyyy) lalu Enter, atau dipilih dari kalender. Panah keyboard memindahkan fokus hari, Enter memilih.",
        code: `<DatePicker
  label="Tanggal lahir"
  helperText="Ketik dd/mm/yyyy atau pilih dari kalender."
/>`,
        stack: true,
        preview: (
          <DatePicker
            label="Tanggal lahir"
            helperText="Ketik dd/mm/yyyy atau pilih dari kalender."
            fullWidth
          />
        ),
      },
      {
        id: "controlled",
        title: "Controlled",
        description:
          "onChange menerima objek Date (atau null saat dikosongkan), sehingga nilai mudah diformat ulang di luar komponen.",
        code: `const [date, setDate] = useState<Date | null>(new Date(2026, 10, 17));

<DatePicker
  label="Tanggal kirim"
  value={date}
  onChange={setDate}
  helperText={date ? \`Terpilih: \${date.toLocaleDateString("id-ID")}\` : "Belum ada tanggal dipilih."}
/>`,
        stack: true,
        preview: <ControlledDatePicker />,
      },
      {
        id: "date-range",
        title: "Mode rentang tanggal",
        description:
          'Set `mode="range"` untuk memilih periode. Klik tanggal awal lalu tanggal akhir; rentang selalu dirapikan otomatis walau dipilih terbalik. Input manual menerima "awal – akhir" dan rentang tersimpan dikirim lewat dua hidden input `name` yang sama.',
        code: `const [range, setRange] = useState<DatePickerRange | null>({
  start: new Date(2026, 10, 1),
  end: new Date(2026, 10, 14),
});

<DatePicker
  mode="range"
  label="Periode laporan"
  value={range}
  onChange={setRange}
/>`,
        stack: true,
        preview: <RangeDatePicker />,
      },
      {
        id: "range",
        title: "Batasan min & max",
        description: "Hari di luar rentang tidak bisa dipilih dari kalender maupun diketik.",
        code: `<DatePicker
  label="Periode kampanye"
  defaultValue={new Date(2026, 11, 10)}
  min={new Date(2026, 10, 1)}
  max={new Date(2026, 11, 31)}
  helperText="Hanya November–Desember 2026."
/>`,
        stack: true,
        preview: (
          <DatePicker
            label="Periode kampanye"
            defaultValue={new Date(2026, 11, 10)}
            min={new Date(2026, 10, 1)}
            max={new Date(2026, 11, 31)}
            helperText="Hanya November–Desember 2026."
            fullWidth
          />
        ),
      },
      {
        id: "status",
        title: "Format, status & disabled",
        code: `<DatePicker label="Tanpa jam" format="yyyy-mm-dd" helperText="Format ISO." />
<DatePicker label="Wajib" required error="Tanggal belum diisi." />
<DatePicker label="Terkunci" disabled defaultValue={new Date(2026, 0, 15)} />`,
        stack: true,
        preview: (
          <>
            <DatePicker label="Format ISO" format="yyyy-mm-dd" helperText="yyyy-mm-dd" fullWidth />
            <DatePicker label="Wajib" required error="Tanggal belum diisi." fullWidth />
            <DatePicker label="Terkunci" disabled defaultValue={new Date(2026, 0, 15)} fullWidth />
          </>
        ),
      },
    ],
    props: [
      {
        name: "mode",
        type: '"single" | "range"',
        default: '"single"',
        description: "Mode pemilihan satu tanggal atau rentang tanggal.",
      },
      {
        name: "value / defaultValue",
        type: "Date | null · DatePickerRange | null",
        description:
          "Tanggal terpilih (controlled) atau nilai awal (uncontrolled). Pada mode range, nilainya `{ start, end }`.",
      },
      {
        name: "onChange",
        type: "(date: Date | null) => void · (range: DatePickerRange | null) => void",
        description:
          "Dipanggil saat tanggal/rentang dipilih, diketik valid, atau dikosongkan. Tipe callback mengikuti mode.",
      },
      {
        name: "format",
        type: '"dd/mm/yyyy" | "yyyy-mm-dd"',
        default: '"dd/mm/yyyy"',
        description: "Format tampilan dan penguraian input manual.",
      },
      {
        name: "min / max",
        type: "Date",
        description: "Batas tanggal yang boleh dipilih.",
      },
      {
        name: "weekStartsOn",
        type: "0 | 1",
        default: "1",
        description: "Hari pertama minggu: 0 Minggu, 1 Senin.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder input; default mengikuti format.",
      },
      {
        name: "variant",
        type: '"filled" | "outlined" | "ghost"',
        default: '"outlined"',
        description: "Gaya permukaan field.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        description: "Ukuran field.",
      },
      {
        name: "status / error / warning / success / helperText",
        type: "string",
        description: "Status validasi dan pesan di bawah field.",
      },
      {
        name: "clearable",
        type: "boolean",
        default: "true",
        description: "Menampilkan tombol untuk mengosongkan tanggal.",
      },
      {
        name: "disabled / readOnly",
        type: "boolean",
        default: "false",
        description: "Menonaktifkan interaksi atau hanya mencegah perubahan nilai.",
      },
      {
        name: "name",
        type: "string",
        description: "Hidden input berisi tanggal yyyy-mm-dd agar ikut terkirim bersama form.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "Membuat field memenuhi lebar kontainer.",
      },
    ],
    notes: [
      "Tanggal dihitung pada tengah malam waktu lokal; komponen ini hanya memilih tanggal, bukan waktu.",
      "Mode range selalu mengirim start ≤ end; klik pertama hanya menandai tanggal awal dan kalender tetap terbuka untuk tanggal akhir.",
      'Input manual pada mode range memakai pemisah " – " (juga menerima "-" atau "s/d" yang diapit spasi), mis. 01/11/2026 – 14/11/2026.',
    ],
  },
];
