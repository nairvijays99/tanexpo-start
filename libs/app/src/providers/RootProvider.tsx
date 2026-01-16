import { ThemeProvider } from "@libs/theme";
import "@libs/i18n";
import type { FC, PropsWithChildren } from "react";

/**
 * Root provider for the application.
 *
 * Note: We pass `undefined` as initialContext to ensure deterministic SSR/hydration.
 * The ThemeProvider will read the actual theme from window.__INITIAL_THEME__ in useEffect.
 * This prevents hydration mismatches while still avoiding FOUC (the theme script runs before React).
 */
export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider initialContext={undefined}>{children}</ThemeProvider>;
};
