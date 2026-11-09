import type { TypographyProps, TypographyVariant } from "./Typography.types";
import { typography } from "../../foundations/typography";
import { useTheme } from "../../theme/ThemeContext";

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
  const { theme } = useTheme();

  // Tone mode-aware: warna brand dicampur CanvasText (hitam di mode terang,
  // putih di mode gelap) supaya teks lolos kontras AA di kedua mode —
  // warna brand murni sering gagal (kuning 1.6:1 di atas putih, dst).
  const textTone = (hex: string, pct = 60) =>
    `color-mix(in srgb, ${hex} ${pct}%, CanvasText)`;

  const colorMap = {
    primary: textTone(theme.colors.primary["500"]),
    neutral: theme.colors.neutral[900],
    success: textTone(theme.colors.success),
    // Kuning perlu porsi lebih ke arah hitam/putih biar lolos 4.5:1.
    warning: textTone(theme.colors.warning, 45),
    error: textTone(theme.colors.error),
    info: textTone(theme.colors.info),
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
