import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";
import { Stack } from "../Stack/Stack";
import type { SelectOption } from "./Select.types";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    status: {
      control: "radio",
      options: ["default", "error", "warning", "success"],
    },
    searchable: { control: "boolean" },
    clearable: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const plans: SelectOption[] = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro", description: "Paling populer" },
  { value: "enterprise", label: "Enterprise", description: "Untuk tim besar" },
  { value: "vip", label: "VIP", disabled: true },
];

export const Default: Story = {
  args: {
    options: plans,
    label: "Pilih paket",
    placeholder: "Pilih paket...",
  },
};

export const Controlled: Story = {
  args: {
    options: plans,
    label: "Paket aktif",
    value: "pro",
  },
};

export const Searchable: Story = {
  args: {
    options: plans,
    label: "Cari paket",
    placeholder: "Ketik untuk mencari...",
    searchable: true,
  },
};

export const NotSearchable: Story = {
  args: {
    options: plans,
    label: "Pilih tanpa pencarian",
    defaultValue: "starter",
    searchable: false,
  },
};

export const Variants: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <Select options={plans} variant="filled" label="Filled" defaultValue="pro" />
      <Select options={plans} variant="outlined" label="Outlined" defaultValue="pro" />
      <Select options={plans} variant="ghost" label="Ghost" defaultValue="pro" />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} wrap>
      <Select options={plans} label="Small" size="sm" defaultValue="starter" />
      <Select options={plans} label="Medium" size="md" defaultValue="pro" />
      <Select options={plans} label="Large" size="lg" defaultValue="pro" />
    </Stack>
  ),
};

export const Statuses: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <Select options={plans} status="error" error="Paket wajib dipilih" />
      <Select options={plans} status="warning" warning="Paket akan kedaluwarsa" />
      <Select options={plans} status="success" success="Paket valid" defaultValue="pro" />
    </Stack>
  ),
};

export const WithHelperText: Story = {
  args: {
    options: plans,
    label: "Paket",
    helperText: "Berlaku selama 30 hari",
  },
};

export const WithLeftIcon: Story = {
  render: () => (
    <Select
      options={plans}
      label="Paket"
      placeholder="Pilih paket..."
      leftIcon={
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      }
    />
  ),
};

export const Clearable: Story = {
  args: {
    options: plans,
    label: "Dapat dikosongkan",
    defaultValue: "pro",
    clearable: true,
  },
};

export const Disabled: Story = {
  args: {
    options: plans,
    label: "Tidak aktif",
    defaultValue: "pro",
    disabled: true,
  },
};

export const RequiredField: Story = {
  args: {
    options: plans,
    label: "Paket",
    required: true,
    placeholder: "Pilih paket...",
  },
};

export const FullWidth: Story = {
  args: {
    options: plans,
    label: "Paket full width",
    fullWidth: true,
  },
};

export const WithDescriptions: Story = {
  render: () => (
    <Select
      options={plans}
      label="Paket dengan deskripsi"
      placeholder="Pilih paket..."
    />
  ),
};