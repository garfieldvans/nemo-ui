import type { CSSProperties, ForwardedRef } from "react";

export type ProgressSize = "sm" | "md" | "lg";
export type ProgressColor = "primary" | "success" | "warning" | "error" | "neutral";
export type ProgressVariant = "line" | "circle";

export interface ProgressProps {
  value?: number;
  max?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  variant?: ProgressVariant;
  indeterminate?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLDivElement>;
}