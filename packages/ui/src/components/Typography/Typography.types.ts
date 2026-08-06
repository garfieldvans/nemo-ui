import type { typography } from "../../foundations/typography";

export type TypographyVariant = keyof typeof typography;

export type TypographyColor =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info";