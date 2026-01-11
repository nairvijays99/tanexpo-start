import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { StyleProp, useColorScheme } from "react-native";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  Theme as NavTheme,
} from "@react-navigation/native";

import { useAsyncStorageString } from "@libs/utils";

import { setImperativeTheming } from "./context.utils";
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
  navigationTheme: NavTheme;
  setThemeContextOverride: (newTheme: ThemeContextModeT) => void;
  theme: Theme;
  themeContext: ImmutableThemeContextModeT;
  themed: ThemedFnT;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export interface ThemeProviderProps {
  initialContext?: ThemeContextModeT;
}

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  initialContext,
}) => {
  const systemColorScheme = useColorScheme();

  // AsyncStorage-backed theme preference
  const [themeScheme, setThemeScheme] = useAsyncStorageString("ignite.themeScheme");

  const setThemeContextOverride = useCallback(
    (newTheme: ThemeContextModeT) => {
      setThemeScheme(newTheme);
    },
    [setThemeScheme],
  );

  const themeContext: ImmutableThemeContextModeT = useMemo(() => {
    const t = initialContext || themeScheme || (systemColorScheme ? systemColorScheme : "light");

    return t === "dark" ? "dark" : "light";
  }, [initialContext, themeScheme, systemColorScheme]);

  const navigationTheme: NavTheme = useMemo(() => {
    return themeContext === "dark" ? NavDarkTheme : NavDefaultTheme;
  }, [themeContext]);

  const theme: Theme = useMemo(() => {
    return themeContext === "dark" ? darkTheme : lightTheme;
  }, [themeContext]);

  useEffect(() => {
    setImperativeTheming(theme);
  }, [theme]);

  const themed = useCallback(
    <T,>(styleOrStyleFn: AllowedStylesT<T>) => {
      const flatStyles = [styleOrStyleFn].flat(3) as (ThemedStyle<T> | StyleProp<T>)[];

      const stylesArray = flatStyles.map((f) => (typeof f === "function" ? f(theme) : f));

      return Object.assign({}, ...stylesArray) as T;
    },
    [theme],
  );

  return (
    <ThemeContext.Provider
      value={{
        navigationTheme,
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
