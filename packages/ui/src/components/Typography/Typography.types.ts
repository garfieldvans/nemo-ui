import type { ReactNode, CSSProperties } from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "bodySmall"
  | "caption"
  | "overline"
  | "button";

export type TypographyColor =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  children: ReactNode;
  as?: React.ElementType;
  htmlFor?: string;
  align?: "left" | "center" | "right";
  className?: string;
  style?: CSSProperties;
}