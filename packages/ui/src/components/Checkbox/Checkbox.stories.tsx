import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "success", "warning", "error", "neutral"],
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Saya setuju dengan syarat & ketentuan",
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    "aria-label": "Menyetujui kebijakan",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Pilih semua",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Tidak dapat dipilih",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Sudah tercek",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Persetujuan",
    error: "Persetujuan wajib dicentang",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Berlangganan newsletter",
    helperText: "Kirim update mingguan ke email Anda",
  },
};

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={4} wrap>
      {(["primary", "success", "warning", "error", "neutral"] as const).map((c) => (
        <Checkbox key={c} color={c} label={c} defaultChecked />
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} wrap>
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium" defaultChecked />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Error" error="Kolom ini wajib" defaultChecked />
    </Stack>
  ),
};