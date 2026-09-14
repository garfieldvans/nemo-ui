import type { CSSProperties, ForwardedRef, ReactNode } from "react";

export type AlertTone = "success" | "info" | "warning" | "error";
export type AlertVariant = "surface" | "filled";

export interface AlertProps {
  tone: AlertTone;
  title?: ReactNode;
  children: ReactNode;
  icon?: ReactNode;
  variant?: AlertVariant;
  closable?: boolean;
  onClose?: () => void;
  action?: ReactNode;
  role?: "alert" | "status";
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLDivElement>;
}