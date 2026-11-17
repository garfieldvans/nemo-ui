import type { DatePickerFormat } from "./DatePicker.types";

export const WEEKDAY_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" });
const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const pad = (value: number) => String(value).padStart(2, "0");

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function formatDate(date: Date, format: DatePickerFormat): string {
  if (format === "yyyy-mm-dd") {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function toISODate(date: Date): string {
  return formatDate(date, "yyyy-mm-dd");
}

export function parseDateText(text: string, format: DatePickerFormat): Date | null {
  const value = text.trim();
  if (!value) return null;

  let year: number;
  let month: number;
  let day: number;

  if (format === "yyyy-mm-dd") {
    const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value);
    if (!match) return null;
    year = Number(match[1]);
    month = Number(match[2]);
    day = Number(match[3]);
  } else {
    const match = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(value);
    if (!match) return null;
    day = Number(match[1]);
    month = Number(match[2]);
    year = Number(match[3]);
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/** 42 sel (6 baris) agar tinggi kalender tidak berubah antar bulan. */
export function buildMonthMatrix(viewMonth: Date, weekStartsOn: 0 | 1): Date[] {
  const first = startOfMonth(viewMonth);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
}

export function weekdayLabels(weekStartsOn: 0 | 1): string[] {
  return Array.from({ length: 7 }, (_, index) => WEEKDAY_SHORT[(index + weekStartsOn) % 7]);
}

export function formatMonthLabel(date: Date): string {
  // id-ID menghasilkan huruf kecil ("januari 2026") — kapitalkan bulan pertama.
  const label = monthFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatLongDate(date: Date): string {
  return dateFormatter.format(date);
}
