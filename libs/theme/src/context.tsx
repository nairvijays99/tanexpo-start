import { storage } from "@libs/utils";
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { darkTheme, lightTheme } from "./theme";
import type {
  AllowedStylesT,
  ImmutableThemeContextModeT,
  Theme,
  ThemeContextModeT,
  ThemedFnT,
  ThemedStyle,
} from "./types";

export type ThemeContextType = {
  theme: Theme;
  themeContext: ImmutableThemeContextModeT;
  setThemeContextOverride: (newTheme: ThemeContextModeT) => void;
  themed: ThemedFnT;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export interface ThemeProviderProps {
  initialContext?: ThemeContextModeT;
}

/**
 * Web ThemeProvider (TanStack Start)
 *
 * - No react-native
 * - No react-navigation
 * - SSR safe
 */
export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  initialContext,
}) => {
  const [themeScheme, setThemeScheme] = useState<ThemeContextModeT>(undefined);

  // Load persisted theme (client-side only)
  useEffect(() => {
    let mounted = true;

    storage.loadString("app.themeScheme").then((value) => {
      if (mounted) {
        setThemeScheme(value as ThemeContextModeT);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // System theme (client-only)
  const systemColorScheme =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  /**
   * Set theme override and persist it
   */
  const setThemeContextOverride = useCallback((newTheme: ThemeContextModeT) => {
    setThemeScheme(newTheme);

    if (newTheme == null) {
      storage.remove("app.themeScheme");
    } else {
      storage.saveString("app.themeScheme", newTheme);
    }
  }, []);

  /**
   * Resolve final theme context
   */
  const themeContext: ImmutableThemeContextModeT = useMemo(() => {
    const t = initialContext || themeScheme || systemColorScheme || "light";

    return t === "dark" ? "dark" : "light";
  }, [initialContext, themeScheme, systemColorScheme]);

  /**
   * Resolve theme tokens
   */
  const theme: Theme = useMemo(() => {
    return themeContext === "dark" ? darkTheme : lightTheme;
  }, [themeContext]);

  /**
   * Apply document-level side effects
   */
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.dataset.theme = themeContext;
    document.documentElement.style.colorScheme = themeContext;
  }, [themeContext]);

  /**
   * Themed style helper (same API as native)
   */
  const themed = useCallback(
    <T,>(styleOrStyleFn: AllowedStylesT<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3) as (ThemedStyle<T> | T)[];

      const stylesArray = flatStyles.map((f) => (typeof f === "function" ? f(theme) : f));

      return Object.assign({}, ...stylesArray) as T;
    },
    [theme],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeContext,
        setThemeContextOverride,
        themed,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 */
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
