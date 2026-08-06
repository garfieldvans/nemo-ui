import type { ReactNode } from "react";

import { colors } from "../../foundations/colors";
import { typography } from "../../foundations/typography";

import type {
  TypographyColor,
  TypographyVariant,
} from "./Typography.types";


interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  children: ReactNode;
}


export function Typography({
  variant = "body",
  color = "neutral",
  children,
}: TypographyProps) {

  const colorMap = {
    primary: colors.primary[600],
    neutral: colors.neutral[900],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  };

  const styles = {
    ... typography[variant],
    color: colorMap[color],
  };


  return (
    <span style={styles}>
      {children}
    </span>
  );
}