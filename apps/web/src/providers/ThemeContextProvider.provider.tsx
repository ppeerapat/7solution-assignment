import { ComponentProps, createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeStore = {
  mode: Theme;
};

const initialValue: ThemeStore = { mode: "dark" };

type ThemeContextApi = ThemeStore & { setTheme: (mode: Theme) => void };

export const ThemeContext = createContext<ThemeContextApi>(undefined!);

export const ThemeContextProvider = ({ children }: ComponentProps<"div">) => {
  const [store, setStore] = useState<ThemeStore>(initialValue);

  function setTheme(mode: Theme) {
    window.localStorage.setItem("theme", mode);
    setStore({ mode });
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") || "dark";
    setStore({ mode: localTheme as Theme });
  }, []);

  return (
    <ThemeContext.Provider value={{ ...store, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
