import { Children, cloneElement, type CSSProperties, type ReactElement } from "react";
import { spacing } from "../../foundations/spacing";
import type { StackProps } from "./Stack.types";

const alignMap: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<string, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

export function Stack({
  children,
  direction = "column",
  spacing: spacingProp = 4,
  align = "stretch",
  justify = "start",
  wrap = false,
  divider,
  className,
  style,
  as: Component = "div",
}: StackProps) {
  const gap =
    typeof spacingProp === "number"
      ? `var(--nemo-spacing-${spacingProp}, ${spacing[spacingProp as keyof typeof spacing] ?? "0"})`
      : spacingProp;

  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction === "row" ? "row" : "column",
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    gap,
    flexWrap: wrap ? "wrap" : undefined,
    ...style,
  };

  const items = Children.toArray(children) as ReactElement[];

  const content = divider
    ? items.flatMap((child, index) => {
        if (index === 0) return [child];
        const keyedDivider = cloneElement(divider as ReactElement, {
          key: `divider-${index}`,
        });
        return [keyedDivider, child];
      })
    : children;

  return (
    <Component className={className} style={stackStyle}>
      {content}
    </Component>
  );
}