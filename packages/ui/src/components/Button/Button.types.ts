import type {
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";

export type ButtonVariant = "filled" | "outlined" | "text";

export type ButtonColor =
  | "primary"
  | "success"
  | "warning"
  | "error";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;

  children: ReactNode;

  className?: string;
  style?: CSSProperties;
}