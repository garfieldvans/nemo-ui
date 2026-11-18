import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { ReactElement } from "react";

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
  ToastProvider,
  Tooltip,
  Typography,
  useToast,
} from "./index";

// jsdom tidak punya canvas, jadi aturan warna tidak bisa dihitung.
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

type Case = { name: string; element: ReactElement };

const cases: Case[] = [
  { name: "Alert", element: <Alert tone="success">Data tersimpan</Alert> },
  { name: "Avatar", element: <Avatar name="Budi Santoso" /> },
  { name: "Badge", element: <Badge>Baru</Badge> },
  { name: "Button", element: <Button>Simpan</Button> },
  {
    name: "Card",
    element: (
      <Card>
        <CardHeader title="Ringkasan" />
        <CardBody>
          <p>Isi kartu</p>
        </CardBody>
      </Card>
    ),
  },
  { name: "Checkbox", element: <Checkbox label="Setuju" /> },
  {
    name: "Combobox",
    element: (
      <Combobox
        label="Kota"
        options={[
          { value: "jkt", label: "Jakarta" },
          { value: "bdg", label: "Bandung" },
        ]}
      />
    ),
  },
  { name: "DatePicker", element: <DatePicker label="Tanggal" mode="single" /> },
  { name: "Divider", element: <Divider /> },
  {
    name: "Drawer",
    element: (
      <Drawer open onOpenChange={() => {}} title="Filter">
        <p>Isi drawer</p>
      </Drawer>
    ),
  },
  { name: "FileUpload", element: <FileUpload label="Berkas" /> },
  {
    name: "FormField",
    element: (
      <FormField label="Email" htmlFor="a11y-email" helperText="Kami tidak membagikan email.">
        <Input id="a11y-email" type="email" />
      </FormField>
    ),
  },
  { name: "Input", element: <Input label="Nama" /> },
  {
    name: "Menu",
    element: (
      <Menu trigger={<Button variant="outlined">Menu</Button>} ariaLabel="Menu">
        <Menu.Item label="Salin" />
      </Menu>
    ),
  },
  {
    name: "Modal",
    element: (
      <Modal open onOpenChange={() => {}} title="Konfirmasi">
        <p>Hapus data ini?</p>
      </Modal>
    ),
  },
  { name: "Pagination", element: <Pagination pageCount={5} ariaLabel="Navigasi halaman" /> },
  {
    name: "Popover",
    element: (
      <Popover trigger={<Button variant="outlined">Detail</Button>}>
        <p>Isi popover</p>
      </Popover>
    ),
  },
  { name: "Progress", element: <Progress value={40} label="Unggah" /> },
  { name: "Radio", element: <Radio name="tier" value="basic" label="Basic" /> },
  {
    name: "RadioGroup",
    element: (
      <RadioGroup name="tier" defaultValue="basic">
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    ),
  },
  {
    name: "Select",
    element: (
      <Select
        label="Paket"
        options={[
          { value: "basic", label: "Basic" },
          { value: "pro", label: "Pro" },
        ]}
      />
    ),
  },
  { name: "Skeleton", element: <Skeleton width={120} height={16} /> },
  { name: "Spinner", element: <Spinner label="Memuat" /> },
  {
    name: "Stack",
    element: (
      <Stack spacing={8}>
        <p>Satu</p>
        <p>Dua</p>
      </Stack>
    ),
  },
  { name: "Switch", element: <Switch label="Notifikasi" /> },
  {
    name: "Table",
    element: (
      <Table
        columns={[
          { key: "name", header: "Nama" },
          { key: "role", header: "Peran" },
        ]}
        data={[{ name: "Budi", role: "Admin" }]}
        rowKey={(row) => row.name}
        caption="Anggota tim"
      />
    ),
  },
  {
    name: "Tabs",
    element: (
      <Tabs
        ariaLabel="Info"
        items={[
          { value: "ringkasan", label: "Ringkasan", content: "Isi ringkasan" },
          { value: "detail", label: "Detail", content: "Isi detail" },
        ]}
      />
    ),
  },
  { name: "Textarea", element: <Textarea label="Catatan" /> },
  {
    name: "Tooltip",
    element: (
      <Tooltip content="Simpan perubahan">
        <Button variant="outlined">Simpan</Button>
      </Tooltip>
    ),
  },
  {
    name: "Typography",
    element: (
      <Typography as="h2" variant="h2">
        Judul bagian
      </Typography>
    ),
  },
];

function ToastTrigger() {
  const { show } = useToast();
  return (
    <Button onClick={() => show({ tone: "success", title: "Tersimpan" })}>Tampilkan toast</Button>
  );
}

describe("accessibility smoke tests", () => {
  it.each(cases)("$name has no detectable violations", async ({ element }) => {
    const { container } = render(element);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("Toast has no detectable violations once visible", async () => {
    const { getByRole } = render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    fireEvent.click(getByRole("button", { name: "Tampilkan toast" }));
    await screen.findByText("Tersimpan");
    // Toast dirender di portal, jadi diperiksa dari document.body.
    expect(await axe(document.body, axeOptions)).toHaveNoViolations();
  });
});
