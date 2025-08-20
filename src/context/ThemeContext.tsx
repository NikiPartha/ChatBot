// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState} from "react";

export type Theme = "black" | "orange" | "green";

interface ThemeConfig {
  color: string;
  backgroundImage: string;
}

const themeStyles: Record<Theme, ThemeConfig> = {
  black: {
    color: "#000000",
    backgroundImage: "url('NightCity.png')"
  },
  green: {
    color: "#26af26ff",
    backgroundImage: "url('Forest.png')"
  },
  orange: {
    color: "#f59505ff",
    backgroundImage: "url('MountainSunset.png')"
  },
};

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeStyles: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("black"); // default theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeStyles: themeStyles[theme]  }}>
      <div className={`theme-${theme} min-h-screen`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
