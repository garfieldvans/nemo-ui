import type { CSSProperties, ForwardedRef, ReactNode } from "react";

export type ComboboxVariant = "filled" | "outlined" | "ghost";
export type ComboboxSize = "sm" | "md" | "lg";
export type ComboboxStatus = "default" | "error" | "warning" | "success";

export interface ComboboxOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  description?: ReactNode;
}

export interface ComboboxRef {
  focus: () => void;
  blur: () => void;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Pilihan ganda (default) — nilai tersimpan sebagai array. */
  label?: string;
  required?: boolean;
  error?: string;
  warning?: string;
  success?: string;
  helperText?: string;
  placeholder?: string;
  /** Pesan saat hasil pencarian kosong. Default "Opsi tidak ditemukan". */
  emptyText?: ReactNode;
  variant?: ComboboxVariant;
  size?: ComboboxSize;
  status?: ComboboxStatus;
  leftIcon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Nilai terpilih (controlled). */
  value?: string[];
  /** Nilai terpilih awal (uncontrolled). */
  defaultValue?: string[];
  name?: string;
  onChange?: (values: string[]) => void;
  onOpenChange?: (open: boolean) => void;
  onQueryChange?: (query: string) => void;
  id?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<ComboboxRef>;
}
