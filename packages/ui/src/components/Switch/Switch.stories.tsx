import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "success"],
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Aktifkan fitur",
    defaultChecked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: "Aktifkan fitur",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Notifikasi push",
  },
};

export const Disabled: Story = {
  args: {
    label: "Tidak dapat diubah",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Sudah aktif",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Mode hemat daya",
    error: "Gagal mengubah pengaturan",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Mode gelap",
    helperText: "Otomatis mengikuti perangkat",
  },
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={4} wrap>
      <Switch color="primary" label="Primary" defaultChecked />
      <Switch color="success" label="Success" defaultChecked />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={6} wrap>
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium" defaultChecked />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
      <Switch label="With helper" helperText="Hanya berlaku untuk akun ini" />
    </Stack>
  ),
};