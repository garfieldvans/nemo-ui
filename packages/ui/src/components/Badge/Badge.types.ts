import type { ReactNode, CSSProperties } from "react";

export type BadgeVariant = "filled" | "outlined" | "dot";
export type BadgeColor = "primary" | "success" | "warning" | "error" | "neutral";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  children?: ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  style?: CSSProperties;
}