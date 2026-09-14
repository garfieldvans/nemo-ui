import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";
import { Button } from "../Button/Button";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["success", "info", "warning", "error"],
    },
    variant: { control: "radio", options: ["surface", "filled"] },
    closable: { control: "boolean" },
  },
  args: {
    title: "Perhatian",
    children: "Ini adalah pesan informatif untuk pengguna.",
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: { tone: "success", title: "Berhasil disimpan", children: "Perubahan terakhir tersimpan." },
};

export const Info: Story = {
  args: { tone: "info", title: "Info", children: "Pembaruan baru tersedia." },
};

export const Warning: Story = {
  args: { tone: "warning", title: "Perhatian", children: "Kuota kamu hampir habis." },
};

export const Error: Story = {
  args: { tone: "error", title: "Terjadi kesalahan", children: "Coba lagi dalam beberapa saat." },
};

export const Filled: Story = {
  args: { tone: "error", variant: "filled", title: "Terjadi kesalahan", children: "Coba lagi." },
};

export const Closable: Story = {
  args: { tone: "info", closable: true, onClose: undefined },
};

export const WithAction: Story = {
  args: {
    tone: "warning",
    title: "Beta sedang berjalan",
    children: "Beberapa fitur mungkin tidak stabil.",
  },
  render: (args) => (
    <Alert {...args} action={<Button size="sm" color="warning">Oke, mengerti</Button>} />
  ),
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
      <Alert tone="success" title="Success">Data berhasil disimpan.</Alert>
      <Alert tone="info" title="Info">Pembaruan tersedia.</Alert>
      <Alert tone="warning" title="Warning">Cek kembali input kamu.</Alert>
      <Alert tone="error" title="Error">Gagal menyimpan data.</Alert>
    </div>
  ),
};