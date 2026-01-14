import { getInitialThemeFromDom, ThemeProvider } from "@libs/theme";
import type { FC, PropsWithChildren } from "react";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialTheme = getInitialThemeFromDom();
  console.log("initialTheme >>", initialTheme);
  return <ThemeProvider initialContext={initialTheme}>{children}</ThemeProvider>;
};
