import type { ThemeContextModeT } from "@libs/theme/types";

export function getInitialThemeFromDom(): ThemeContextModeT {
  if (typeof document === "undefined") return undefined;

  const theme = document.documentElement.dataset.theme;
  return theme === "dark" || theme === "light" ? theme : undefined;
}
