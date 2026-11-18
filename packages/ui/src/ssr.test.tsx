// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Combobox,
  DatePicker,
  Divider,
  Drawer,
  FileUpload,
  FormField,
  Input,
  Menu,
  Modal,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Table,
  Tabs,
  Textarea,
  ThemeProvider,
  Tooltip,
  Typography,
} from "./index";

// Paket ini akan dipakai di Next.js/RSC, jadi render di server tidak boleh
// menyentuh `window`/`document` maupun memunculkan peringatan React.
function Page() {
  return (
    <ThemeProvider mode="dark">
      <Stack spacing={16}>
        <Typography as="h1" variant="h1">
          Judul
        </Typography>
        <Alert tone="success">Tersimpan</Alert>
        <Badge>Baru</Badge>
        <Avatar name="Budi" />
        <Card>
          <CardHeader title="Ringkasan" />
          <CardBody>Selesai.</CardBody>
        </Card>
        <Button>Simpan</Button>
        <Input label="Nama" />
        <Textarea label="Catatan" />
        <Checkbox label="Setuju" />
        <Switch label="Notifikasi" />
        <RadioGroup name="tier" defaultValue="basic">
          <Radio value="basic" label="Basic" />
        </RadioGroup>
        <FormField label="Email" htmlFor="email">
          <Input id="email" type="email" />
        </FormField>
        <Select
          label="Paket"
          options={[
            { value: "basic", label: "Basic" },
            { value: "pro", label: "Pro" },
          ]}
        />
        <Combobox
          label="Kota"
          options={[
            { value: "jkt", label: "Jakarta" },
            { value: "bdg", label: "Bandung" },
          ]}
        />
        <DatePicker label="Tanggal" mode="single" />
        <FileUpload label="Berkas" />
        <Tooltip content="Info">
          <Button variant="outlined">Tooltip</Button>
        </Tooltip>
        <Menu trigger={<Button variant="outlined">Menu</Button>} ariaLabel="Menu">
          <Menu.Item label="Salin" />
        </Menu>
        <Popover trigger={<Button variant="outlined">Popover</Button>}>
          <p>Isi</p>
        </Popover>
        <Tabs
          ariaLabel="Info"
          items={[
            { value: "satu", label: "Satu", content: "Isi satu" },
            { value: "dua", label: "Dua", content: "Isi dua" },
          ]}
        />
        <Table
          columns={[{ key: "name", header: "Nama" }]}
          data={[{ name: "Budi" }]}
          rowKey={(row) => row.name}
        />
        <Pagination pageCount={3} ariaLabel="Halaman" />
        <Progress value={40} label="Unggah" />
        <Spinner label="Memuat" />
        <Skeleton width={80} height={12} />
        <Divider />
      </Stack>
    </ThemeProvider>
  );
}

describe("server rendering", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders open overlays without a document", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnings = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Portal tidak bisa menempel ke DOM di server; hasilnya harus kosong, bukan crash.
    expect(() =>
      renderToString(
        <>
          <Modal open onOpenChange={() => {}} title="Konfirmasi">
            <p>Hapus?</p>
          </Modal>
          <Drawer open onOpenChange={() => {}} title="Filter">
            <p>Isi</p>
          </Drawer>
          <Popover trigger="Buka" ariaLabel="Popover">
            <p>Isi</p>
          </Popover>
        </>,
      ),
    ).not.toThrow();

    expect(errors).not.toHaveBeenCalled();
    expect(warnings).not.toHaveBeenCalled();
  });

  it("renders the component set without touching browser globals or warning", () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const warnings = vi.spyOn(console, "warn").mockImplementation(() => {});

    const html = renderToString(<Page />);

    expect(html).toContain("Judul");
    expect(errors).not.toHaveBeenCalled();
    expect(warnings).not.toHaveBeenCalled();
  });
});
