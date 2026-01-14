import { ThemeProvider } from "@libs/theme";
import type { FC, PropsWithChildren } from "react";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialTheme =
    typeof window !== "undefined" ? (window as any).__INITIAL_THEME__ : undefined;
  return <ThemeProvider initialContext={initialTheme}>{children}</ThemeProvider>;
};
