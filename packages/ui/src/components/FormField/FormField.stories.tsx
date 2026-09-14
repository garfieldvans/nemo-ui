import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "./FormField";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Radio } from "../Radio/Radio";
import { RadioGroup } from "../Radio/RadioGroup";
import { Stack } from "../Stack/Stack";
import { Card, CardBody } from "../Card/Card";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "radio",
      options: ["vertical", "horizontal"],
    },
    width: {
      control: "radio",
      options: ["sm", "md", "lg", "full"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Vertical: Story = {
  render: () => (
    <FormField label="Nama lengkap" htmlFor="ff-nama" width="md">
      <Input id="ff-nama" placeholder="Contoh: Andi Pratama" />
    </FormField>
  ),
};

export const VerticalWithHelper: Story = {
  render: () => (
    <FormField
      label="Email"
      htmlFor="ff-email"
      required
      width="md"
      helperText="Kami tidak akan membagikan email Anda."
    >
      <Input id="ff-email" type="email" placeholder="you@example.com" />
    </FormField>
  ),
};

export const VerticalWithError: Story = {
  render: () => (
    <FormField label="Email" htmlFor="ff-err" required width="md" error="Email tidak valid.">
      <Input id="ff-err" type="email" status="error" placeholder="you@example.com" />
    </FormField>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <FormField label="Nama lengkap" htmlFor="ff-h-nama" layout="horizontal" width="lg">
      <Input id="ff-h-nama" placeholder="Contoh: Andi Pratama" />
    </FormField>
  ),
};

export const HorizontalWithSelect: Story = {
  render: () => (
    <FormField
      label="Pilih paket"
      htmlFor="ff-h-plan"
      layout="horizontal"
      width="lg"
      helperText="Bisa diubah kapan saja."
    >
      <Select
        id="ff-h-plan"
        defaultValue="pro"
        options={[
          { value: "starter", label: "Starter" },
          { value: "pro", label: "Pro" },
          { value: "enterprise", label: "Enterprise" },
        ]}
      />
    </FormField>
  ),
};

export const HorizontalWithRadioGroup: Story = {
  render: () => (
    <FormField
      label="Mode billing"
      layout="horizontal"
      width="lg"
      helperText="Pilih metode penagihan."
    >
      <RadioGroup name="ff-billing" defaultValue="monthly">
        <Radio value="monthly" label="Bulanan" />
        <Radio value="yearly" label="Tahunan" />
      </RadioGroup>
    </FormField>
  ),
};

export const Widths: Story = {
  render: () => (
    <Stack direction="column" spacing={4}>
      <FormField label="Small" htmlFor="w-sm">
        <Input id="w-sm" placeholder="Small" fullWidth />
      </FormField>
      <FormField label="Medium" width="md" htmlFor="w-md">
        <Input id="w-md" placeholder="Medium" fullWidth />
      </FormField>
      <FormField label="Large" width="lg" htmlFor="w-lg">
        <Input id="w-lg" placeholder="Large" fullWidth />
      </FormField>
      <FormField label="Full" width="full" htmlFor="w-full">
        <Input id="w-full" placeholder="Full width" fullWidth />
      </FormField>
    </Stack>
  ),
};

export const RegistrationForm: Story = {
  render: () => (
    <Card style={{ maxWidth: 480 }}>
      <CardBody>
        <Stack direction="column" spacing={4}>
          <FormField label="Nama lengkap" htmlFor="reg-nama" required width="full">
            <Input id="reg-nama" placeholder="Nama lengkap" />
          </FormField>
          <FormField label="Email" htmlFor="reg-email" required width="full" helperText="Dipakai untuk login.">
            <Input id="reg-email" type="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="Paket" htmlFor="reg-plan" required width="full">
            <Select
              id="reg-plan"
              placeholder="Pilih paket..."
              options={[
                { value: "starter", label: "Starter" },
                { value: "pro", label: "Pro" },
                { value: "enterprise", label: "Enterprise" },
              ]}
            />
          </FormField>
          <FormField label="Mode billing" width="full">
            <RadioGroup name="reg-billing" defaultValue="monthly">
              <Radio value="monthly" label="Bulanan" />
              <Radio value="yearly" label="Tahunan" />
            </RadioGroup>
          </FormField>
        </Stack>
      </CardBody>
    </Card>
  ),
};