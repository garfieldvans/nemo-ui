import type { CSSProperties } from "react";
import type { DividerProps } from "./Divider.types";

export function Divider({
  orientation = "horizontal",
  color = "default",
  className,
  style,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  const borderColor =
    color === "subtle"
      ? "var(--nemo-neutral-100, #F1F3F4)"
      : "var(--nemo-neutral-200, #E8EAED)";

  const baseStyle: CSSProperties = {
    border: "none",
    background: borderColor,
    flexShrink: 0,
    ...style,
  };

  const orientationStyle: CSSProperties = isHorizontal
    ? { height: 1, width: "100%" }
    : { width: 1, height: "100%" };

  const Component = (isHorizontal ? "hr" : "div") as React.ElementType;

  return (
    <Component
      role="separator"
      aria-orientation={isHorizontal ? undefined : orientation}
      className={className}
      style={{ ...baseStyle, ...orientationStyle }}
    />
  );
}
