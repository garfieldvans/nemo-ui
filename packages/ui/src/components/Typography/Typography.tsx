import type { TypographyProps, TypographyVariant } from "./Typography.types";
import { typography } from "../../foundations/typography";
import { colors } from "../../foundations/colors";

export function Typography({
  variant = "body",
  color = "neutral",
  children,
  as: Component = "span",
  htmlFor,
  align = "left",
  className,
  style,
}: TypographyProps) {
  const colorMap = {
    primary: colors.primary[600],
    neutral: colors.neutral[900],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  };

  const variantMap: Record<TypographyVariant, string> = {
    h1: "heading1",
    h2: "heading2",
    h3: "heading3",
    h4: "heading4",
    h5: "heading5",
    h6: "heading6",
    body: "body",
    bodySmall: "bodySmall",
    caption: "caption",
    overline: "caption",
    button: "button",
  };

  const foundationVariant = variantMap[variant];

  const styles = {
    ...typography[foundationVariant as keyof typeof typography],
    color: colorMap[color],
    textAlign: align,
    ...style,
  };

  return (
    <Component
      className={className}
      style={styles}
      htmlFor={htmlFor}
    >
      {children}
    </Component>
  );
}