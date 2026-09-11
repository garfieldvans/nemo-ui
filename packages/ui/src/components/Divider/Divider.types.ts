import type { CSSProperties } from "react";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerColor = "default" | "subtle";

export interface DividerProps {
  orientation?: DividerOrientation;
  color?: DividerColor;
  className?: string;
  style?: CSSProperties;
}
