import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  MIDNIGHT: 'midnight',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('cinemind_theme');
    if (saved && Object.values(THEMES).includes(saved)) {
      return saved;
    }
    // Default to midnight for rich cinematic feel
    return THEMES.MIDNIGHT;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'midnight');

    if (theme === THEMES.DARK) {
      root.classList.add('dark');
    } else if (theme === THEMES.MIDNIGHT) {
      root.classList.add('midnight', 'dark'); // also dark for tailwind dark: variants
    }

    localStorage.setItem('cinemind_theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === THEMES.LIGHT) return THEMES.DARK;
      if (prev === THEMES.DARK) return THEMES.MIDNIGHT;
      return THEMES.LIGHT;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
