import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./Combobox.types";

const frameworks: ComboboxOption[] = [
  { label: "React", value: "react", description: "Library UI berbasis komponen" },
  { label: "Vue", value: "vue", description: "Framework progresif" },
  { label: "Svelte", value: "svelte", description: "Compiler-first framework" },
  { label: "Angular", value: "angular", description: "Framework lengkap dari Google" },
  { label: "Solid", value: "solid", description: "Reaktivitas halus tanpa virtual DOM", disabled: true },
];

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    options: frameworks,
    label: "Framework favorit",
    placeholder: "Cari framework...",
    defaultValue: ["react", "vue"],
    helperText: "Bisa pilih lebih dari satu.",
  },
};

export const EmptySelection: Story = {
  args: {
    options: frameworks,
    label: "Framework",
    placeholder: "Cari framework...",
  },
};

export const WithError: Story = {
  args: {
    options: frameworks,
    label: "Framework wajib",
    required: true,
    error: "Pilih minimal satu framework.",
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    label: "Framework",
    defaultValue: ["react"],
    disabled: true,
  },
};

export const FilledSmall: Story = {
  args: {
    options: frameworks,
    label: "Framework",
    variant: "filled",
    size: "sm",
    defaultValue: ["svelte"],
  },
};

const ControlledExample = () => {
  const [values, setValues] = useState<string[]>(["react"]);
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Combobox
        options={frameworks}
        label="Framework (controlled)"
        value={values}
        onChange={setValues}
        fullWidth
      />
      <code>values: {JSON.stringify(values)}</code>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  parameters: { controls: { disable: true } },
};
