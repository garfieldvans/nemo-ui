import {
  spacing,
  Button,
  Input,
  Textarea,
  Typography,
  ThemeProvider,
  useTheme,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  AvatarGroup,
  Divider,
  Stack,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  FormField,
  Skeleton,
  Spinner,
  Progress,
  Alert,
  ToastProvider,
  useToast,
} from "@nemo/ui";
import { useState, type ReactNode, type CSSProperties, type ChangeEvent } from "react";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginTop: spacing[10] }}>
      <Typography
        variant="overline"
        color="neutral"
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          fontSize: 13,
          fontWeight: 700,
          marginBottom: spacing[4],
        }}
      >
        {title}
      </Typography>
      {children}
    </section>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="bodySmall"
      color="neutral"
      style={{ display: "block", marginBottom: spacing[3] }}
    >
      {children}
    </Typography>
  );
}

const rowStyle: CSSProperties = {
  display: "flex",
  gap: spacing[3],
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: spacing[5],
};

const columnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: spacing[3],
  maxWidth: 420,
  marginBottom: spacing[5],
};

const planOptions = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro", description: "Paling populer" },
  { value: "enterprise", label: "Enterprise", description: "Untuk tim besar" },
  { value: "vip", label: "VIP", disabled: true },
];

function ToastSection() {
  const toast = useToast();
  return (
    <>
      <SubLabel>Pemicu notifikasi</SubLabel>
      <div style={rowStyle}>
        <Button color="success" onClick={() => toast.success("Tersimpan!", { message: "Perubahan sudah disimpan." })}>Success</Button>
        <Button color="error" onClick={() => toast.error("Gagal menyimpan", { message: "Coba lagi beberapa saat.", duration: 6000 })}>Error</Button>
        <Button color="warning" onClick={() => toast.warning("Hampir penuh", { message: "Bersihkan penyimpanan kamu." })}>Warning</Button>
        <Button variant="outlined" onClick={() => toast.info("Informasi", { message: "Tersedia pembaruan terbaru." })}>Info</Button>
        <Button variant="text" onClick={() => toast.dismissAll()}>Tutup semua</Button>
      </div>
    </>
  );
}

function PlaygroundContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("pro");
  const [billing, setBilling] = useState("monthly");
  const [notifications, setNotifications] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const { mode, setMode } = useTheme();

  return (
    <div
      style={{
        maxWidth: 880,
        margin: "0 auto",
        padding: "64px 24px 128px",
      }}
    >
      {/* Header */}
      <header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: spacing[4],
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: spacing[4] }}>
            <div
              aria-hidden
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: "var(--nemo-primary-500, #4285F4)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              N
            </div>
            <div>
              <Typography variant="h1" color="neutral">
                Nemo UI
              </Typography>
              <Typography variant="body" color="neutral">
                Komponen React yang konsisten, ringan, dan siap untuk dark mode.
              </Typography>
            </div>
          </div>
          <Button
            variant="outlined"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </Button>
        </div>
        <Divider style={{ marginTop: spacing[6] }} />
      </header>

      {/* Button */}
      <Section title="Button">
        <SubLabel>Filled (default)</SubLabel>
        <div style={rowStyle}>
          <Button>Primary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="error">Error</Button>
        </div>

        <SubLabel>Outlined</SubLabel>
        <div style={rowStyle}>
          <Button variant="outlined">Primary</Button>
          <Button variant="outlined" color="success">Success</Button>
          <Button variant="outlined" color="warning">Warning</Button>
          <Button variant="outlined" color="error">Error</Button>
        </div>

        <SubLabel>Text</SubLabel>
        <div style={rowStyle}>
          <Button variant="text">Primary</Button>
          <Button variant="text" color="success">Success</Button>
          <Button variant="text" color="warning">Warning</Button>
          <Button variant="text" color="error">Error</Button>
        </div>

        <SubLabel>Ukuran & disabled</SubLabel>
        <div style={rowStyle}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outlined" disabled>Outlined Disabled</Button>
          <Button variant="text" disabled>Text Disabled</Button>
        </div>
      </Section>

      {/* Input */}
      <Section title="Input">
        <SubLabel>Variant</SubLabel>
        <div style={columnStyle}>
          <Input label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} helperText="Minimal 8 karakter" />
          <Input label="Search" placeholder="Search..." leftIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          } value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <SubLabel>Filled & ghost</SubLabel>
        <div style={columnStyle}>
          <Input label="Filled Email" placeholder="you@example.com" type="email" variant="filled" />
          <Input label="Ghost Password" placeholder="Enter password" type="password" variant="ghost" helperText="Minimal 8 karakter" />
        </div>

        <SubLabel>Status</SubLabel>
        <div style={columnStyle}>
          <Input label="Error state" placeholder="Error" error="Format tidak valid" />
          <Input label="Warning state" placeholder="Warning" warning="Perhatian: data tidak lengkap" />
          <Input label="Success state" placeholder="Success" success="Data valid" value="valid@email.com" />
        </div>

        <SubLabel>Ukuran</SubLabel>
        <div style={columnStyle}>
          <Input label="Small" placeholder="Small size" size="sm" />
          <Input label="Medium" placeholder="Medium size" size="md" />
          <Input label="Large" placeholder="Large size" size="lg" />
        </div>

        <SubLabel>Actionable, prefix & float</SubLabel>
        <div style={columnStyle}>
          <Input
            label="Password Toggle"
            type="password"
            placeholder="Enter password"
            rightIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
          />
          <Input label="With Prefix" placeholder="000" prefix="$" />
          <Input label="With Suffix" placeholder="Search..." suffix={<span>@domain.com</span>} />
          <Input
            label="Clearable"
            placeholder="Type and clear"
            clearable
            defaultValue="Try clearing me"
          />
          <Input label="Floating Label" placeholder=" " floatingLabel />
          <Input label="Full Width Input" placeholder="Full width" fullWidth />
        </div>

        <SubLabel>Disabled, required</SubLabel>
        <div style={columnStyle}>
          <Input label="Disabled Input" value="Cannot edit" disabled />
          <Input label="Required Field" placeholder="Required" required />
        </div>
      </Section>

      {/* Textarea */}
      <Section title="Textarea">
        <SubLabel>Variant</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 560 }}>
          <Textarea label="Outlined (default)" placeholder="Enter your message..." rows={3} />
          <Textarea label="Filled" placeholder="Enter your message..." variant="filled" rows={3} />
          <Textarea label="Ghost" placeholder="Enter your message..." variant="ghost" rows={3} />
        </div>

        <SubLabel>Status, count & sizes</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 560 }}>
          <Textarea label="Max length" placeholder="Max 100 characters" maxLength={100} showCount rows={3} />
          <Textarea label="Error" placeholder="Error state" error="Pesan terlalu pendek" rows={3} />
          <Textarea label="Success" placeholder="Success state" success="Pesan valid" rows={3} />
          <Textarea label="Small" placeholder="Small size" size="sm" rows={3} />
        </div>

        <SubLabel>Custom</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 560 }}>
          <Textarea label="Clearable" placeholder="Type and clear" clearable defaultValue="Try clearing me" rows={3} />
          <Textarea label="Floating Label" placeholder=" " floatingLabel rows={3} />
          <Textarea label="With Icon" placeholder="Add a note..." rows={3} />
          <Textarea label="Disabled" value="Cannot edit" disabled rows={3} />
        </div>
      </Section>

      {/* Select */}
      <Section title="Select">
        <SubLabel>Variant & status</SubLabel>
        <div style={columnStyle}>
          <Select label="Paket (controlled)" options={planOptions} value={plan} onChange={setPlan} />
          <Select label="Paket Filled" options={planOptions} variant="filled" defaultValue="starter" />
          <Select label="Paket Ghost" options={planOptions} variant="ghost" placeholder="Pilih paket..." />
          <Select label="Search & clear" options={planOptions} defaultValue="pro" searchable clearable helperText="Ketik untuk mencari" />
          <Select label="Error state" options={planOptions} status="error" error="Paket wajib dipilih" />
          <Select label="Success state" options={planOptions} status="success" success="Paket valid" defaultValue="pro" />
        </div>

        <SubLabel>Ukuran & disabled</SubLabel>
        <div style={columnStyle}>
          <Select label="Small" options={planOptions} size="sm" defaultValue="starter" />
          <Select label="Medium" options={planOptions} size="md" defaultValue="pro" />
          <Select label="Large" options={planOptions} size="lg" defaultValue="pro" />
          <Select label="Disabled" options={planOptions} defaultValue="pro" disabled />
        </div>
      </Section>

      {/* Checkbox */}
      <Section title="Checkbox">
        <div style={columnStyle}>
          <Checkbox label="Terima syarat & ketentuan" checked={agreed} onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)} />
          <Checkbox label="Berlangganan newsletter" defaultChecked />
          <Checkbox label="Pilih semua" indeterminate />
          <Checkbox label="Ceklis & disabled" defaultChecked disabled />
          <Checkbox label="Error" error="Wajib dicentang" />
        </div>
        <SubLabel>Warna</SubLabel>
        <div style={rowStyle}>
          <Checkbox label="Primary" color="primary" defaultChecked />
          <Checkbox label="Success" color="success" defaultChecked />
          <Checkbox label="Warning" color="warning" defaultChecked />
          <Checkbox label="Error" color="error" defaultChecked />
          <Checkbox label="Neutral" color="neutral" defaultChecked />
        </div>
      </Section>

      {/* Radio */}
      <Section title="Radio">
        <SubLabel>RadioGroup vertikal (controlled)</SubLabel>
        <div style={{ marginBottom: spacing[5] }}>
          <RadioGroup name="play-rg" label="Mode billing" value={billing} onChange={setBilling}>
            <Radio value="monthly" label="Bulanan" />
            <Radio value="yearly" label="Tahunan" />
            <Radio value="custom" label="Kustom" />
          </RadioGroup>
        </div>

        <SubLabel>Horizontal, disabled & error</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[5], marginBottom: spacing[5] }}>
          <RadioGroup name="rg-orient" label="Orientasi" orientation="horizontal" defaultValue="landscape">
            <Radio value="landscape" label="Lanskap" />
            <Radio value="portrait" label="Potret" />
          </RadioGroup>
          <RadioGroup name="rg-disabled" label="Terkunci" disabled defaultValue="auto">
            <Radio value="auto" label="Otomatis" />
            <Radio value="manual" label="Manual" />
          </RadioGroup>
          <RadioGroup name="rg-error" label="Persetujuan" required error="Harus memilih salah satu">
            <Radio value="ya" label="Ya" />
            <Radio value="tidak" label="Tidak" />
          </RadioGroup>
        </div>
      </Section>

      {/* Switch */}
      <Section title="Switch">
        <SubLabel>Pengaturan</SubLabel>
        <div style={columnStyle}>
          <Switch label="Aktifkan notifikasi" checked={notifications} onChange={(e: ChangeEvent<HTMLInputElement>) => setNotifications(e.target.checked)} />
          <Switch label="Mode gelap otomatis" defaultChecked helperText="Mengikuti pengaturan perangkat" />
          <Switch label="Hemat baterai" color="success" />
          <Switch label="Terkunci (disabled)" disabled />
        </div>
        <SubLabel>Ukuran & warna</SubLabel>
        <div style={rowStyle}>
          <Switch size="sm" label="Small" defaultChecked />
          <Switch size="md" label="Medium" defaultChecked />
          <Switch color="success" label="Success" defaultChecked />
        </div>
      </Section>

      {/* FormField */}
      <Section title="FormField">
        <SubLabel>Vertikal</SubLabel>
        <div style={columnStyle}>
          <FormField label="Nama lengkap" htmlFor="play-nama" required width="full">
            <Input id="play-nama" placeholder="Nama lengkap" fullWidth />
          </FormField>
          <FormField label="Email" htmlFor="play-email" width="full" helperText="Dipakai untuk login.">
            <Input id="play-email" type="email" placeholder="you@example.com" fullWidth />
          </FormField>
          <FormField label="Paket" htmlFor="play-plan-f" width="full" error="Wajib memilih paket">
            <Select id="play-plan-f" options={planOptions} status="error" fullWidth />
          </FormField>
        </div>

        <SubLabel>Horizontal</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 560 }}>
          <FormField label="Nama lengkap" htmlFor="playh-nama" layout="horizontal" width="full">
            <Input id="playh-nama" placeholder="Nama lengkap" fullWidth />
          </FormField>
          <FormField label="Paket" htmlFor="playh-plan" layout="horizontal" width="full">
            <Select id="playh-plan" options={planOptions} defaultValue="pro" fullWidth />
          </FormField>
        </div>
      </Section>

      {/* Alert */}
      <Section title="Alert">
        <SubLabel>Surface (default)</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 560 }}>
          <Alert tone="success" title="Berhasil disimpan">Perubahan terakhir sudah tersimpan.</Alert>
          <Alert tone="info" title="Info">Pembaruan baru tersedia.</Alert>
          <Alert tone="warning" title="Perhatian" closable>Kuota kamu hampir habis.</Alert>
          <Alert tone="error" title="Gagal" closable>Terjadi kesalahan saat menyimpan.</Alert>
        </div>
        <SubLabel>Filled</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 560 }}>
          <Alert tone="success" variant="filled" title="Berhasil disimpan">Perubahan tersimpan.</Alert>
          <Alert tone="error" variant="filled" title="Terjadi kesalahan" action={<Button size="sm" variant="text" style={{ color: "#FFFFFF" }}>Coba lagi</Button>}>Gagal menyimpan data.</Alert>
        </div>
      </Section>

      {/* Skeleton */}
      <Section title="Skeleton">
        <SubLabel>Text & multiple lines</SubLabel>
        <div style={columnStyle}>
          <Skeleton />
          <Skeleton lines={3} animation="wave" />
        </div>
        <SubLabel>Circle & rect</SubLabel>
        <div style={rowStyle}>
          <Skeleton variant="circle" width={48} height={48} />
          <Skeleton variant="rect" width={160} height={56} animation="wave" />
          <Skeleton variant="rect" width={200} height={80} animation="wave" />
        </div>
      </Section>

      {/* Spinner */}
      <Section title="Spinner">
        <SubLabel>Ukuran</SubLabel>
        <div style={rowStyle}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <SubLabel>Warna</SubLabel>
        <div style={rowStyle}>
          <Spinner color="primary" />
          <Spinner color="success" />
          <Spinner color="warning" />
          <Spinner color="error" />
          <Spinner color="neutral" />
        </div>
      </Section>

      {/* Progress */}
      <Section title="Progress">
        <SubLabel>Line</SubLabel>
        <div style={{ ...columnStyle, maxWidth: 480 }}>
          <Progress value={45} />
          <Progress value={72} showValue color="success" />
          <Progress value={100} showValue color="error" />
          <Progress indeterminate />
        </div>
        <SubLabel>Circle</SubLabel>
        <div style={rowStyle}>
          <Progress variant="circle" value={68} showValue />
          <Progress variant="circle" value={35} color="warning" showValue />
          <Progress variant="circle" indeterminate color="success" />
        </div>
      </Section>

      {/* Toast */}
      <Section title="Toast">
        <ToastSection />
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <SubLabel>Heading</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[5] }}>
          <Typography variant="h1" color="neutral">Heading 1</Typography>
          <Typography variant="h2" color="neutral">Heading 2</Typography>
          <Typography variant="h3" color="neutral">Heading 3</Typography>
          <Typography variant="h4" color="neutral">Heading 4</Typography>
        </div>

        <SubLabel>Body & warna</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[5] }}>
          <Typography variant="body" color="neutral">Body text — Default</Typography>
          <Typography variant="body" color="primary">Body text — Primary</Typography>
          <Typography variant="body" color="success">Body text — Success</Typography>
          <Typography variant="body" color="warning">Body text — Warning</Typography>
          <Typography variant="body" color="error">Body text — Error</Typography>
          <Typography variant="body" color="info">Body text — Info</Typography>
        </div>

        <SubLabel>Lainnya</SubLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], marginBottom: spacing[5] }}>
          <Typography variant="caption" color="neutral">Caption text</Typography>
          <Typography variant="overline" color="neutral">Overline text</Typography>
          <Typography variant="button" color="neutral">Button text</Typography>
          <Typography variant="body" color="neutral" align="center">Center aligned</Typography>
          <Typography as="span" variant="body" color="primary">Semantic span element</Typography>
        </div>
      </Section>

      {/* Card */}
      <Section title="Card">
        <div style={{ display: "flex", gap: spacing[4], flexWrap: "wrap" }}>
          <Card style={{ maxWidth: 320 }}>
            <CardHeader
              title="Pengaturan Akun"
              subtitle="Kelola profil dan keamanan akun"
              action={<Badge color="success">Aktif</Badge>}
            />
            <CardBody>
              Info akun sudah diperbarui. Pastikan email yang terdaftar benar
              supaya notifikasi penting tetap sampai.
            </CardBody>
            <CardFooter>
              <Button size="sm">Simpan</Button>
              <Button size="sm" variant="text">Batal</Button>
            </CardFooter>
          </Card>

          <Card variant="outlined" style={{ maxWidth: 320 }}>
            <CardHeader title="Proyek" subtitle="Daftar proyek aktif" />
            <CardBody>
              <Stack direction="column" spacing={3}>
                <span>Nemo UI — in progress</span>
                <span>Playground — done</span>
                <span>Storybook — done</span>
              </Stack>
            </CardBody>
          </Card>

          <Card variant="filled" style={{ maxWidth: 320 }}>
            <CardHeader title="Statistik" subtitle="Ringkasan mingguan" />
            <CardBody>
              <Stack direction="column" spacing={2}>
                <span>Komponen: 9</span>
                <span>Tests: 40+</span>
                <span>Stories: 9</span>
              </Stack>
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* Badge */}
      <Section title="Badge">
        <div style={rowStyle}>
          <Badge>Primary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="neutral">Neutral</Badge>
          <Badge variant="outlined">Outlined</Badge>
          <Badge variant="outlined" color="success">Outlined Success</Badge>
          <Badge variant="dot" color="error" />
          <Badge size="sm" color="success">Small</Badge>
        </div>
      </Section>

      {/* Avatar */}
      <Section title="Avatar">
        <div style={rowStyle}>
          <Avatar name="Andi Pratama" color="primary" />
          <Avatar name="Budi Santoso" color="success" />
          <Avatar name="Citra Dewi" color="warning" />
          <Avatar name="Dwi Lestari" size="lg" color="error" />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
            alt="Foto profil"
          />
          <Avatar shape="square" name="Nemo UI" size="lg" />
        </div>

        <SubLabel>AvatarGroup (max 3)</SubLabel>
        <AvatarGroup max={3}>
          <Avatar name="Andi Pratama" color="primary" />
          <Avatar name="Budi Santoso" color="success" />
          <Avatar name="Citra Dewi" color="warning" />
          <Avatar name="Dwi Lestari" color="error" />
          <Avatar name="Eko Prasetyo" color="neutral" />
        </AvatarGroup>
      </Section>

      {/* Divider & Stack */}
      <Section title="Divider & Stack">
        <SubLabel>Stack vertikal dengan divider</SubLabel>
        <Stack direction="column" spacing={3} divider={<Divider />} style={{ maxWidth: 420, marginBottom: spacing[5] }}>
          <span>Baris pertama</span>
          <span>Baris kedua</span>
          <span>Baris ketiga</span>
        </Stack>

        <SubLabel>Stack horizontal</SubLabel>
        <Stack direction="row" spacing={3} wrap style={{ marginBottom: spacing[5] }}>
          <Badge color="primary">Primary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
        </Stack>

        <SubLabel>Divider vertikal</SubLabel>
        <div style={{ display: "flex", alignItems: "center", height: 48, gap: spacing[3] }}>
          <span>Kiri</span>
          <Divider orientation="vertical" />
          <span>Kanan</span>
        </div>
      </Section>

      {/* Form Example */}
      <Section title="Form Pendaftaran">
        <Card style={{ maxWidth: 480 }}>
          <CardHeader
            title="Buat Akun"
            subtitle="Mulai gratis, tanpa kartu kredit"
            action={<Badge color="primary">v0.1</Badge>}
          />
          <CardBody>
            <Stack direction="column" spacing={spacing[4]}>
              <FormField label="Nama lengkap" htmlFor="reg-nama" required width="full">
                <Input id="reg-nama" placeholder="Nama lengkap" fullWidth />
              </FormField>
              <FormField label="Email" htmlFor="reg-email" required width="full">
                <Input id="reg-email" type="email" placeholder="you@example.com" fullWidth />
              </FormField>
              <FormField label="Password" htmlFor="reg-pass" required width="full" helperText="Minimal 8 karakter">
                <Input id="reg-pass" type="password" placeholder="Enter password" fullWidth />
              </FormField>
              <FormField label="Paket" htmlFor="reg-plan" required width="full">
                <Select id="reg-plan" options={planOptions} placeholder="Pilih paket..." value={plan} onChange={setPlan} fullWidth />
              </FormField>
              <FormField label="Mode billing" width="full">
                <RadioGroup name="reg-billing" value={billing} onChange={setBilling}>
                  <Radio value="monthly" label="Bulanan" />
                  <Radio value="yearly" label="Tahunan" />
                </RadioGroup>
              </FormField>
              <Checkbox
                label="Saya menyetujui syarat & ketentuan"
                checked={agreed}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)}
                error={agreed ? undefined : "Wajib menyetujui syarat sebelum mendaftar"}
              />
              <Button style={{ width: "100%" }}>Daftar</Button>
              <Divider />
              <Typography variant="caption" color="neutral" align="center">
                Sudah punya akun?{" "}
                <a href="#" style={{ color: "var(--nemo-primary-600, #1A73E8)" }}>
                  Masuk di sini
                </a>
              </Typography>
            </Stack>
          </CardBody>
          <CardFooter>
            <Badge variant="outlined" color="success">Semua sistem normal</Badge>
          </CardFooter>
        </Card>
      </Section>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider className="nemo-page">
      <ToastProvider>
        <PlaygroundContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;