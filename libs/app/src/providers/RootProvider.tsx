import { ThemeProvider } from "@libs/theme";
import type { FC, PropsWithChildren } from "react";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
