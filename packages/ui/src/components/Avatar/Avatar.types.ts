import type { ReactNode, CSSProperties } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";
export type AvatarColor = "primary" | "success" | "warning" | "error" | "neutral";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: AvatarColor;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}