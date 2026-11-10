import { useState } from "react";
import {
  Checkbox,
  FormField,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Textarea,
} from "@nemo/ui";
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
    summary:
      "Field teks satu baris dengan label, status validasi, ikon, affix, dan tombol clear.",
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
            <Input
              label="Filled"
              placeholder="Filled"
              variant="filled"
              fullWidth
            />
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
            <Input
              label="Success"
              success="Email tersedia"
              defaultValue="me@nemo.dev"
              fullWidth
            />
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
            <Input
              label="Domain"
              suffix="@nemo.dev"
              placeholder="nama"
              fullWidth
            />
            <Input
              label="Clearable"
              clearable
              defaultValue="Hapus saya"
              fullWidth
            />
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
        description:
          "Membuat rightIcon bisa diklik sebagai tombol (mis. toggle password).",
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
    summary:
      "Field teks multi-baris dengan penghitung karakter dan gaya yang sama dengan Input.",
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
            <Textarea
              label="Error"
              error="Pesan terlalu pendek"
              rows={3}
              fullWidth
            />
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
          <Select
            label="Paket langganan"
            options={plans}
            placeholder="Pilih paket..."
            fullWidth
          />
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
            <Select
              label="Paket"
              options={plans}
              status="error"
              error="Wajib dipilih"
              fullWidth
            />
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
        description:
          "Daftar opsi: value, label, plus description/disabled opsional.",
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
    summary:
      "Kotak centang dengan label, status indeterminate, dan warna semantik.",
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
      "Checkbox meneruskan atribut native <input type=\"checkbox\">, termasuk onChange dan name.",
    ],
  },
  {
    slug: "radio",
    name: "Radio",
    group: "Forms",
    summary:
      "Pilihan tunggal dalam grup — tersedia RadioGroup vertikal maupun horizontal.",
    examples: [
      {
        id: "group",
        title: "RadioGroup",
        description:
          "RadioGroup mengelola nilai dan atribut name untuk semua Radio di dalamnya.",
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
            <RadioGroup
              name="demo-locked"
              label="Terkunci"
              disabled
              defaultValue="auto"
            >
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
    summary:
      "Tombol on/off untuk pengaturan yang langsung berlaku, dengan label dan bantuan.",
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
      "Switch memakai <input type=\"checkbox\" role=\"switch\"> sehingga tetap bisa dioperasikan keyboard.",
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
          <FormField
            label="Nama lengkap"
            htmlFor="demo-nama"
            required
            helperText="Sesuai KTP."
          >
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
          <FormField
            label="Paket"
            htmlFor="demo-paket-error"
            error="Wajib memilih paket"
          >
            <Select
              id="demo-paket-error"
              options={plans}
              status="error"
              fullWidth
            />
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
];
