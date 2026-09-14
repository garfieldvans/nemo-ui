import type { CSSProperties, ForwardedRef } from "react";

export type SkeletonVariant = "text" | "circle" | "rect";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  lines?: number;
  animation?: SkeletonAnimation;
  label?: string;
  className?: string;
  style?: CSSProperties;
  ref?: ForwardedRef<HTMLDivElement>;
}