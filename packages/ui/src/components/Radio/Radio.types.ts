import type {
  ReactNode,
  CSSProperties,
  ForwardedRef,
  InputHTMLAttributes,
} from "react";

export type RadioSize = "sm" | "md";
export type RadioColor = "primary" | "success" | "warning" | "error" | "neutral";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  value: string;
  error?: string;
  helperText?: string;
  size?: RadioSize;
  color?: RadioColor;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLInputElement>;
}

export interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export interface RadioGroupProps {
  children: ReactNode;
  /** Dibagikan ke semua Radio di dalam grup — dipakai sebagai native radio group name. */
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  label?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  style?: CSSProperties;
}