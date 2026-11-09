import { colors } from "../foundations/colors";
import { spacing } from "../foundations/spacing";
import { radius } from "../foundations/radius";
import { shadows } from "../foundations/shadows";
import { opacity } from "../foundations/opacity";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ColorScale = Record<string, string>;

export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: string;
  warning: string;
  error: string;
  info: string;
  surface: {
    success: string;
    warning: string;
    error: string;
  };
}

export interface ThemeSpacing {
  [key: string]: string;
}

export interface ThemeRadius {
  [key: string]: string;
}

export interface ThemeShadows {
  [key: string]: string;
}

export interface ThemeOpacity {
  [key: string]: number;
}

export interface ThemeTokens {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  opacity: ThemeOpacity;
}

export type ThemeMode = "light" | "dark";

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverride = DeepPartial<ThemeTokens>;

// ---------------------------------------------------------------------------
// Default (light) theme — derived from existing foundations
// ---------------------------------------------------------------------------

export const defaultTheme: ThemeTokens = {
  colors: {
    primary: { ...colors.primary },
    secondary: { ...colors.secondary },
    neutral: { ...colors.neutral },
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    surface: {
      success: "#f0fdf4",
      warning: "#fffef0",
      error: "#fef7f7",
    },
  },
  spacing: { ...spacing },
  radius: { ...radius },
  shadows: { ...shadows },
  opacity: { ...opacity },
};

// ---------------------------------------------------------------------------
// Dark theme — primary scale unchanged, neutral flipped, surfaces darkened
// ---------------------------------------------------------------------------

export const darkTheme: ThemeTokens = {
  ...defaultTheme,
  colors: {
    primary: {
      50: "#1B2F52",
      100: "#23406F",
      200: "#2D5694",
      300: "#3B6DB8",
      400: "#5B9DF6",
      500: "#4285F4",
      600: "#1A73E8",
      700: "#1967D2",
      800: "#185ABC",
      900: "#174EA6",
    },
    secondary: {
      50: "#251B47",
      100: "#2E2358",
      200: "#3B2E71",
      300: "#4C3C94",
      400: "#8B78FA",
      500: "#8B5CF6",
      600: "#7C3AED",
      700: "#6D28D9",
      800: "#5B21B6",
      900: "#4C1D95",
    },
    neutral: {
      0: "#0F1013",
      50: "#17181C",
      100: "#1F2128",
      200: "#2A2D36",
      300: "#3A3E48",
      400: "#5A5F6B",
      500: "#8B919E",
      600: "#A6ACB8",
      700: "#C2C7D2",
      800: "#D9DDE6",
      900: "#F0F2F5",
    },
    success: "#34A853",
    warning: "#FBBC04",
    error: "#EA4335",
    info: "#4285F4",
    surface: {
      success: "#1A2E1F",
      warning: "#2E2A14",
      error: "#2E1A1A",
    },
  },
  spacing: defaultTheme.spacing,
  radius: defaultTheme.radius,
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.35)",
    md: "0 4px 6px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.45)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.5)",
  },
  opacity: defaultTheme.opacity,
};

// ---------------------------------------------------------------------------
// Flatten nested token object into CSS variable map
// ---------------------------------------------------------------------------

type CssVarMap = Record<string, string>;

function flatten(
  obj: Record<string, unknown>,
  prefix: string,
  out: CssVarMap,
): void {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = `${prefix}-${key}`;
    if (typeof value === "string" || typeof value === "number") {
      out[fullKey] = String(value);
    } else if (typeof value === "object" && value !== null) {
      flatten(value as Record<string, unknown>, fullKey, out);
    }
  }
}

export function toCssVarMap(
  tokens: ThemeTokens,
  namespace = "nemo",
): CssVarMap {
  const map: CssVarMap = {};

  // colors
  flatten(tokens.colors.primary, `--${namespace}-primary`, map);
  flatten(tokens.colors.secondary, `--${namespace}-secondary`, map);
  flatten(tokens.colors.neutral, `--${namespace}-neutral`, map);
  map[`--${namespace}-success`] = tokens.colors.success;
  map[`--${namespace}-warning`] = tokens.colors.warning;
  map[`--${namespace}-error`] = tokens.colors.error;
  map[`--${namespace}-info`] = tokens.colors.info;
  flatten(tokens.colors.surface, `--${namespace}-surface`, map);

  // Tone mode-aware (CanvasText = hitam di mode terang, putih di mode gelap):
  // - `*-text` : warna teks/ikon/border di atas canvas — dicampur 60% ke
  //   CanvasText supaya kontras AA di KEDUA mode (warna brand murni sering
  //   gagal, mis. kuning 1.6:1 di atas putih).
  // - `*-fill` : bg elemen filled yang berteks neutral-0 (putih di light,
  //   gelap di dark) — dicampur 78% ke CanvasText supaya teks kontras.
  const textTone = (hex: string, pct = 60) =>
    `color-mix(in srgb, ${hex} ${pct}%, CanvasText)`;
  const fillTone = (hex: string) =>
    `color-mix(in srgb, ${hex} 65%, CanvasText)`;
  const tones: Array<[string, string, number?]> = [
    ["primary", tokens.colors.primary["500"]],
    ["secondary", tokens.colors.secondary["500"]],
    ["success", tokens.colors.success],
    // Kuning butuh porsi warna lebih sedikit (lebih ke arah hitam/putih)
    // supaya lolos 4.5:1 di atas canvas terang maupun gelap.
    ["warning", tokens.colors.warning, 45],
    ["error", tokens.colors.error],
    ["info", tokens.colors.info],
  ];
  for (const [name, hex, pct] of tones) {
    map[`--${namespace}-${name}-text`] = textTone(hex, pct);
    map[`--${namespace}-${name}-fill`] = fillTone(hex);
  }

  // spacing
  flatten(tokens.spacing, `--${namespace}-spacing`, map);

  // radius
  flatten(tokens.radius, `--${namespace}-radius`, map);

  // shadows
  flatten(tokens.shadows, `--${namespace}-shadow`, map);

  // opacity
  flatten(tokens.opacity, `--${namespace}-opacity`, map);

  return map;
}
