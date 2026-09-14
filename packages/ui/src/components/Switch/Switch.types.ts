import type {
  ReactNode,
  CSSProperties,
  ForwardedRef,
  InputHTMLAttributes,
} from "react";

export type SwitchSize = "sm" | "md";
export type SwitchColor = "primary" | "success";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  size?: SwitchSize;
  color?: SwitchColor;
  error?: string;
  helperText?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLInputElement>;
}