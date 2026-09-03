import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  CSSProperties,
  ReactNode,
  ForwardedRef,
} from "react";

export type InputVariant = "filled" | "outlined" | "ghost";
export type InputSize = "sm" | "md" | "lg";
export type InputColor = "primary" | "neutral" | "success" | "warning" | "error";
export type InputStatus = "default" | "error" | "warning" | "success";

export interface InputBaseProps {
  variant?: InputVariant;
  size?: InputSize;
  color?: InputColor;
  status?: InputStatus;
  label?: string;
  required?: boolean;
  error?: string;
  warning?: string;
  success?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  rightIconAction?: React.MouseEventHandler<HTMLButtonElement>;
  rightIconDisabled?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  floatingLabel?: boolean;

  className?: string;
  style?: CSSProperties;
}

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color"> &
  InputBaseProps & {
    ref?: ForwardedRef<HTMLInputElement>;
    as?: "input";
  };

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "color"> &
  InputBaseProps & {
    ref?: ForwardedRef<HTMLTextAreaElement>;
    as?: "textarea";
    rows?: number;
    maxLength?: number;
    showCount?: boolean;
  };

export type InputComponentProps = InputProps | TextareaProps;