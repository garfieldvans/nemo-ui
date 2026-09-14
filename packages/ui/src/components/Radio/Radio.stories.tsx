import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";
import { Stack } from "../Stack/Stack";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
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

type Story = StoryObj<typeof Radio>;

export const Standalone: Story = {
  args: {
    name: "example",
    value: "option",
    label: "Radio",
  },
};

export const Default: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="pro" label="Pilih paket">
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      name="gender"
      orientation="horizontal"
      defaultValue="male"
      label="Jenis kelamin"
    >
      <Radio value="male" label="Laki-laki" />
      <Radio value="female" label="Perempuan" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      name="mode"
      defaultValue="auto"
      label="Mode pencahayaan"
      disabled
    >
      <Radio value="auto" label="Otomatis" />
      <Radio value="manual" label="Manual" />
    </RadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="pro" label="Pilih paket">
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
      <Radio value="vip" label="VIP" disabled />
    </RadioGroup>
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup
      name="plan"
      label="Pilih paket"
      required
      error="Wajib memilih salah satu paket"
    >
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
    </RadioGroup>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <RadioGroup
      name="billing"
      defaultValue="monthly"
      label="Metode billing"
      helperText="Bisa diubah kapan saja dari bagian profil"
    >
      <Radio value="monthly" label="Bulanan" />
      <Radio value="yearly" label="Tahunan" />
    </RadioGroup>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      {(["primary", "success", "warning", "error", "neutral"] as const).map(
        (c) => (
          <Radio
            key={c}
            name="colors"
            value={c}
            color={c}
            label={c}
            defaultChecked
          />
        )
      )}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup name="size" defaultValue="md" label="Ukuran" orientation="horizontal">
      <Radio value="sm" size="sm" label="Small" />
      <Radio value="md" size="md" label="Medium" />
    </RadioGroup>
  ),
};