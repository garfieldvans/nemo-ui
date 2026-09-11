import type { CSSProperties, ReactNode, ElementType } from "react";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps {
  children: ReactNode;
  direction?: StackDirection;
  spacing?: number | string;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  divider?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}