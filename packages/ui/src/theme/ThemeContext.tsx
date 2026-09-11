import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
  type ReactElement,
  type ElementType,
  type CSSProperties,
} from "react";
import {
  defaultTheme,
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
}

export function ThemeProvider({
  children,
  theme: themeOverride,
  mode = "light",
  as: Component = "div",
  className,
  style,
}: ThemeProviderProps): ReactElement {
  const mergedTheme = useMemo(() => {
    if (!themeOverride) return defaultTheme;
    return deepMerge(defaultTheme, themeOverride);
  }, [themeOverride]);

  const cssVars = useMemo(() => toCssVarMap(mergedTheme), [mergedTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: mergedTheme,
      mode,
      setMode: () => {},
    }),
    [mergedTheme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <Component
        data-theme={mode}
        className={className}
        style={{ ...style, ...cssVars }}
      >
        {children}
      </Component>
    </ThemeContext.Provider>
  );
}
