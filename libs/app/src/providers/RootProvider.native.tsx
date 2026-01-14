import { ThemeProvider, useAppTheme } from "@libs/theme";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import type { FC, PropsWithChildren } from "react";

const NavigationThemeBridge: FC<PropsWithChildren> = ({ children }) => {
  const { navigationTheme } = useAppTheme();

  return <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>;
};

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <NavigationThemeBridge>{children}</NavigationThemeBridge>
    </ThemeProvider>
  );
};
