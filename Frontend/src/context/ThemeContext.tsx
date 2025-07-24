import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import type { Theme } from '@mui/material/styles';

interface ThemeContextType {
  toggleTheme: () => void;
  darkMode: boolean;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => useContext(ThemeContext)!;

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
