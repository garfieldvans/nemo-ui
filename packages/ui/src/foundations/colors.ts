export const colors = {
  primary: {
    50: "#E8F0FE",
    100: "#D2E3FC",
    200: "#AECBFA",
    300: "#8AB4F8",
    400: "#669DF6",
    500: "#4285F4",
    600: "#1A73E8",
    700: "#1967D2",
    800: "#185ABC",
    900: "#174EA6",
  },

  // Secondary (violet) — pendamping primary, dipakai varian color="secondary"
  // dan di-override per theme dari `semantic.secondary` di ThemeMaps.ts.
  secondary: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED",
    700: "#6D28D9",
    800: "#5B21B6",
    900: "#4C1D95",
  },

  neutral: {
    50: "#F8F9FA",
    100: "#F1F3F4",
    200: "#E8EAED",
    300: "#DADCE0",
    400: "#BDC1C6",
    500: "#9AA0A6",
    600: "#80868B",
    700: "#5F6368",
    800: "#3C4043",
    900: "#202124",
  },

  success: "#34A853",
  warning: "#FBBC04",
  error: "#EA4335",
  info: "#4285F4",
} as const;