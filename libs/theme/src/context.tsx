import { loadString, remove, saveString } from "@libs/utils";
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
  setThemeContextOverride: (newTheme: ThemeContextModeT) => void;
  theme: Theme;
  themeContext: ImmutableThemeContextModeT;
  themed: ThemedFnT;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export interface ThemeProviderProps {
  initialContext?: ThemeContextModeT;
}

/**
 * Web-only ThemeProvider (TanStack Start)
 */
export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  initialContext,
}) => {
  const [themeScheme, setThemeScheme] = useState<string | null>(null);

  // Load persisted theme
  useEffect(() => {
    loadString("ignite.themeScheme").then(setThemeScheme);
  }, []);

  // Browser system theme
  const systemColorScheme =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const setThemeContextOverride = useCallback((newTheme: ThemeContextModeT) => {
    setThemeScheme(newTheme);

    if (newTheme == null) {
      remove("ignite.themeScheme");
    } else {
      saveString("ignite.themeScheme", newTheme);
    }
  }, []);

  const themeContext: ImmutableThemeContextModeT = useMemo(() => {
    const t = initialContext || themeScheme || systemColorScheme || "light";

    return t === "dark" ? "dark" : "light";
  }, [initialContext, themeScheme, systemColorScheme]);

  const theme: Theme = useMemo(() => {
    return themeContext === "dark" ? darkTheme : lightTheme;
  }, [themeContext]);

  // Apply HTML theme side-effects
  useEffect(() => {
    document.documentElement.dataset.theme = themeContext;
    document.documentElement.style.colorScheme = themeContext;
  }, [themeContext]);

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

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
