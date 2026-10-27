
import type { ThemeOverride } from "./tokens";

export const palette = {
  sapphireOceanSerenity: {
    palette: {
      duskBlue: "#4c6085",
      blueBell: "#39a0ed",
      aquamarine: "#36f1cd",
      mintLeaf: "#13c4a3",
      charcoalBrown: "#32322c",
    },
    semantic: {
      primary: "blueBell",
      secondary: "duskBlue",
      accent: "aquamarine",
      success: "mintLeaf",
      text: "charcoalBrown",
    },
  },

  deepSea: {
    palette: {
      deepSpaceBlue: "#13293d",
      balticBlue: "#006494",
      cerulean: "#247ba0",
      blueBell: "#1b98e0",
      aliceBlue: "#e8f1f2",
    },
    semantic: {
      primary: "balticBlue",
      secondary: "cerulean",
      accent: "blueBell",
      background: "aliceBlue",
      text: "deepSpaceBlue",
    },
  },

  monochromeRed: {
    palette: {
      spaceIndigo: "#2b2d42",
      lavenderGrey: "#8d99ae",
      platinum: "#edf2f4",
      punchRed: "#ef233c",
      classicCrimson: "#d80032",
    },
    semantic: {
      primary: "punchRed",
      secondary: "spaceIndigo",
      accent: "classicCrimson",
      background: "platinum",
      text: "spaceIndigo",
    },
  },

  cinnamon: {
    palette: {
      cinnamon: "#D47E30",
      tobacco: "#CC9460",
      darkBrown: "#5E3916",
      deepBrown: "#3B220B",
    },
    semantic: {
      primary: "cinnamon",
      secondary: "tobacco",
      accent: "darkBrown",
      background: "deepBrown",
      text: "deepBrown",
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Penerapan theme → token ThemeProvider
// ---------------------------------------------------------------------------

export type ThemeName = keyof typeof palette;

export const themeNames = Object.keys(palette) as ThemeName[];

type LooseTheme = {
  palette: Record<string, string>;
  semantic: Record<string, string | undefined>;
};

function loose(name: ThemeName): LooseTheme {
  return palette[name] as LooseTheme;
}

/** Warna primary aktual (dari `semantic.primary`) — berguna untuk swatch UI. */
export function primaryColor(name: ThemeName): string {
  const theme = loose(name);
  return theme.palette[theme.semantic.primary as string];
}

/**
 * Warna canvas (dikanal dari `semantic.background`), dibedakan per mode dan
 * menyesuaikan kecerahan warna theme:
 * - background gelap (mis. deepBrown): di mode terang dipakai tipis saja
 *   (~14%) → surface tetap terang & teks hitam kontras; di mode gelap
 *   dominan (~58%) → surface tetap gelap.
 * - background terang (mis. aliceBlue): di mode terang dominan (~60%),
 *   di mode gelap ditipiskan (~15%) agar tidak menyala di atas tema gelap.
 * `undefined`/kosong = biarkan pakai surface default dari token.
 */
function hexLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const lin = [0, 2, 4]
    .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

export function themeSurfaces(name: ThemeName): {
  light?: string;
  dark?: string;
} {
  const theme = loose(name);
  const ref = theme.semantic.background;
  const bg = ref ? theme.palette[ref] : undefined;
  if (!bg) return {};
  const l = hexLuminance(bg);
  const lightPct = Math.round(12 + 55 * l); // gelap → ~12%, terang → ~67%
  const darkPct = Math.round(60 - 50 * l); // gelap → ~60%, terang → ~10%
  return {
    light: `color-mix(in srgb, ${bg} ${lightPct}%, var(--nemo-neutral-50))`,
    dark: `color-mix(in srgb, ${bg} ${darkPct}%, var(--nemo-neutral-50))`,
  };
}

/**
 * Ubah satu entry ThemeMaps menjadi `ThemeOverride` untuk ThemeProvider.
 *
 * Kenapa color-mix berbasis var():
 * - Skala primary 50–400 dicampur ke `var(--nemo-neutral-50)` yang ikut
 *   flip antar mode terang/gelap → satu override berlaku untuk dua mode,
 *   hover/focus ring (50–400) tidak menyala terang di tema gelap.
 * - 600–900 dicampur ke hitam (hover/active lebih gelap) di kedua mode.
 * - `semantic.text` diselaraskan ke token teks (neutral-900/800/700):
 *   900 dicampur ke `CanvasText` (hitam di mode terang, putih di mode gelap)
 *   → teks tetap terbaca di kedua mode; 800/700 diturunkan dari 900 + neutral-500
 *   agar hierarki teks utama → sekunder tetap ada.
 */
export function toThemeOverride(name: ThemeName): ThemeOverride {
  const theme = loose(name);
  // Semantic berisi NAMA warna (mis. "mintLeaf") → resolve dulu ke hex-nya.
  const resolve = (role: string): string | undefined => {
    const ref = theme.semantic[role];
    return ref ? theme.palette[ref] : undefined;
  };
  const base = resolve("primary");
  if (!base) return {};
  const mix = (pct: number, withColor: string) =>
    `color-mix(in srgb, ${base} ${pct}%, ${withColor})`;
  const soft = "var(--nemo-neutral-50)";

  const success = resolve("success");
  const text = resolve("text");

  return {
    colors: {
      primary: {
        "50": mix(12, soft),
        "100": mix(25, soft),
        "200": mix(42, soft),
        "300": mix(62, soft),
        "400": mix(82, soft),
        "500": base,
        "600": mix(86, "#000"),
        "700": mix(74, "#000"),
        "800": mix(64, "#000"),
        "900": mix(54, "#000"),
      },
      ...(success ? { success } : {}),
      ...(text
        ? {
            neutral: {
              // Teks utama: mengikuti warna teks theme, tetap terbaca di
              // mode gelap lewat sistem warna CanvasText (40% warna theme +
              // 60% hitam/putih sesuai color-scheme → kontras ≥ 4.5:1).
              "900": `color-mix(in srgb, ${text} 40%, CanvasText)`,
              // Teks sekunder: diturunkan dari 900 (bukan cycle — properti
              // berbeda) yang dicampur neutral-500 agar tetap abu-abu.
              "800":
                "color-mix(in srgb, var(--nemo-neutral-900) 80%, var(--nemo-neutral-500))",
              "700":
                "color-mix(in srgb, var(--nemo-neutral-900) 55%, var(--nemo-neutral-500))",
            },
          }
        : {}),
    },
  };
}
