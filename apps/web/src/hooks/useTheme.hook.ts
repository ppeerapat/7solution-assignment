import { ThemeContext } from "@/providers/ThemeContextProvider.provider";
import { useContext } from "react";

export function useTheme() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error(`useTheme must be used within ThemeContextProvider`);
  }
  return themeContext;
}
