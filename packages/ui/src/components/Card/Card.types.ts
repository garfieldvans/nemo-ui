import type { ReactNode, CSSProperties, ElementType } from "react";

export type CardVariant = "elevated" | "outlined" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";
export type CardRounded = "none" | "sm" | "md" | "lg";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  rounded?: CardRounded;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}