import { createContext, useContext } from "react";
//import { asyncStorage } from "@libs/utils";

export const ThemeContext = createContext(null);

/**
 * Web-only ThemeProvider (TanStack Start)
 */
export const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
