import type { ReactNode, CSSProperties } from "react";

export type FormFieldLayout = "vertical" | "horizontal";
export type FormFieldWidth = "sm" | "md" | "lg" | "full";

export interface FormFieldProps {
  label: ReactNode;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helperText?: ReactNode;
  children: ReactNode;
  layout?: FormFieldLayout;
  width?: FormFieldWidth;
  className?: string;
  style?: CSSProperties;
}