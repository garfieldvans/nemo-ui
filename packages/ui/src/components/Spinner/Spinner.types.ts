import type { CSSProperties, ForwardedRef } from "react";

export type SpinnerSize = "sm" | "md" | "lg";
export type SpinnerColor = "primary" | "success" | "warning" | "error" | "neutral";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLSpanElement>;
}