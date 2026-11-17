import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";
import type { DatePickerRange } from "./DatePicker.types";

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

export const Range: Story = {
  args: {
    mode: "range",
    label: "Periode laporan",
    defaultValue: { start: new Date(2026, 6, 1), end: new Date(2026, 6, 16) },
    helperText: "Klik tanggal awal, lalu tanggal akhir.",
  },
};

const ControlledRangeExample = () => {
  const [range, setRange] = useState<DatePickerRange | null>(null);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <DatePicker
        mode="range"
        label="Periode (controlled)"
        value={range}
        onChange={setRange}
        fullWidth
      />
      <span style={{ fontSize: 12, color: "var(--nemo-neutral-700, #5f6368)" }}>
        Nilai: {range ? `${range.start.toISOString().slice(0, 10)} → ${range.end.toISOString().slice(0, 10)}` : "kosong"}
      </span>
    </div>
  );
};

export const ControlledRange: Story = {
  render: () => <ControlledRangeExample />,
  parameters: { controls: { disable: true } },
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
