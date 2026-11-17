import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: "Tanggal lahir",
    helperText: "Ketik dd/mm/yyyy atau pilih dari kalender.",
  },
};

export const WithValue: Story = {
  args: {
    label: "Tanggal acara",
    defaultValue: new Date(2026, 6, 16),
  },
};

export const MinMax: Story = {
  args: {
    label: "Periode",
    min: new Date(2026, 10, 1),
    max: new Date(2026, 11, 31),
    helperText: "Hanya November–Desember 2026.",
  },
};

export const WithError: Story = {
  args: {
    label: "Tanggal wajib",
    required: true,
    error: "Tanggal belum diisi.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Tanggal",
    disabled: true,
    defaultValue: new Date(2026, 0, 15),
  },
};

export const FilledSmall: Story = {
  args: {
    label: "Tanggal",
    variant: "filled",
    size: "sm",
    format: "yyyy-mm-dd",
    defaultValue: new Date(2026, 0, 15),
  },
};

const ControlledExample = () => {
  const [date, setDate] = useState<Date | null>(new Date(2026, 10, 17));

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <DatePicker label="Tanggal (controlled)" value={date} onChange={setDate} fullWidth />
      <span style={{ fontSize: 12, color: "var(--nemo-neutral-700, #5f6368)" }}>
        Nilai: {date ? date.toISOString().slice(0, 10) : "kosong"}
      </span>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
  parameters: { controls: { disable: true } },
};
