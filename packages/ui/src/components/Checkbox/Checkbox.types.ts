import type {
  ReactNode,
  CSSProperties,
  ForwardedRef,
  InputHTMLAttributes,
} from "react";

export type CheckboxSize = "sm" | "md";
export type CheckboxColor = "primary" | "success" | "warning" | "error" | "neutral";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  indeterminate?: boolean;
  error?: string;
  helperText?: string;
  size?: CheckboxSize;
  color?: CheckboxColor;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLInputElement>;
}