import type {
  ReactNode,
  CSSProperties,
  ForwardedRef,
} from "react";

export type SelectVariant = "filled" | "outlined" | "ghost";
export type SelectSize = "sm" | "md" | "lg";
export type SelectStatus = "default" | "error" | "warning" | "success";

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  description?: ReactNode;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
}

export interface SelectProps {
  options: SelectOption[];
  label?: string;
  required?: boolean;
  error?: string;
  warning?: string;
  success?: string;
  helperText?: string;
  placeholder?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  status?: SelectStatus;
  leftIcon?: ReactNode;
  clearable?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  value?: string;
  defaultValue?: string;
  name?: string;
  /** Digunakan untuk controlled select — menerima value, bukan event. */
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  onQueryChange?: (query: string) => void;
  id?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<SelectRef>;
}