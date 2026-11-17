import type { CSSProperties, ForwardedRef, ReactNode } from "react";

export type DatePickerVariant = "filled" | "outlined" | "ghost";
export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerStatus = "default" | "error" | "warning" | "success";
export type DatePickerFormat = "dd/mm/yyyy" | "yyyy-mm-dd";

export interface DatePickerRef {
  focus: () => void;
  blur: () => void;
  open: () => void;
  close: () => void;
}

export interface DatePickerProps {
  label?: string;
  required?: boolean;
  error?: string;
  warning?: string;
  success?: string;
  helperText?: ReactNode;
  /** Placeholder input; default mengikuti `format`. */
  placeholder?: string;
  /** Format tampilan dan penguraian input manual. Default `"dd/mm/yyyy"`. */
  format?: DatePickerFormat;
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  status?: DatePickerStatus;
  leftIcon?: ReactNode;
  clearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  /** Tanggal terpilih (controlled). `null` berarti kosong. */
  value?: Date | null;
  /** Tanggal awal (uncontrolled). */
  defaultValue?: Date | null;
  /** Tanggal paling awal yang boleh dipilih. */
  min?: Date;
  /** Tanggal paling akhir yang boleh dipilih. */
  max?: Date;
  /** Hari pertama minggu: `0` Minggu, `1` Senin. Default `1`. */
  weekStartsOn?: 0 | 1;
  /** Nama untuk hidden input (nilai `yyyy-mm-dd`) agar ikut terkirim bersama form. */
  name?: string;
  onChange?: (date: Date | null) => void;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<DatePickerRef>;
}
