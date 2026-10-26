import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type ReactElement,
  type ElementType,
  type CSSProperties,
} from "react";
import {
  defaultTheme,
  darkTheme,
  toCssVarMap,
  type ThemeTokens,
  type ThemeMode,
  type ThemeOverride,
} from "./tokens";

// ---------------------------------------------------------------------------
// Deep merge utility (inline to avoid circular deps with mergeProps)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(item: unknown): item is Record<string, any> {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

function deepMerge(target: ThemeTokens, source: ThemeOverride): ThemeTokens {
  const result = { ...target };
  for (const key of Object.keys(source) as Array<keyof ThemeOverride>) {
    const sourceVal = source[key];
    const targetVal = result[key];
    if (isObject(sourceVal) && isObject(targetVal)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result as any)[key] = deepMerge(targetVal as any, sourceVal as any);
    } else if (sourceVal !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result as any)[key] = sourceVal;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface ThemeContextValue {
  theme: ThemeTokens;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  mode: "light",
  setMode: () => {},
});

// ---------------------------------------------------------------------------
// useTheme
// ---------------------------------------------------------------------------

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

// ---------------------------------------------------------------------------
// ThemeProvider
// ---------------------------------------------------------------------------

export interface ThemeProviderProps {
  children?: ReactNode;
  theme?: ThemeOverride;
  mode?: ThemeMode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /**
   * Warna surface wrapper. Bertujuan menutup bocor canvas: area transparan
   * di dalam wrapper duduk di atas token (flip per mode), bukan warna
   * canvas browser. `false` = tanpa background.
   */
  surface?: string | false;
}

const DEFAULT_SURFACE = "var(--nemo-neutral-50, #f8f9fa)";

export function ThemeProvider({
  children,
  theme: themeOverride,
  mode: defaultMode = "light",
  as: Component = "div",
  className,
  style,
  surface,
}: ThemeProviderProps): ReactElement {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const mergedTheme = useMemo(() => {
    const base = mode === "dark" ? darkTheme : defaultTheme;
    return themeOverride ? deepMerge(base, themeOverride) : base;
  }, [mode, themeOverride]);

  const cssVars = useMemo(() => toCssVarMap(mergedTheme), [mergedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: mergedTheme, mode, setMode }),
    [mergedTheme, mode],
  );

  // surface sebelum ...style supaya user bisa override background secara eksplisit.
  const surfaceStyle = surface !== false ? { background: surface ?? DEFAULT_SURFACE } : {};

  return (
    <ThemeContext.Provider value={value}>
      <Component
        data-theme={mode}
        className={className}
        style={{ ...surfaceStyle, ...style, colorScheme: mode, ...cssVars }}
      >
        {children}
      </Component>
    </ThemeContext.Provider>
  );
}
