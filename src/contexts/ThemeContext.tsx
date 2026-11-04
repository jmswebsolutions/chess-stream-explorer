import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type ColorTheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (color: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'chess-stream-explorer-theme';
const COLOR_THEME_KEY = 'chess-stream-explorer-color-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
      if (savedTheme) return savedTheme;

      // Detect system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'dark';
    }
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    try {
      const savedColorTheme = localStorage.getItem(COLOR_THEME_KEY) as ColorTheme;
      return savedColorTheme || 'blue';
    } catch (error) {
      console.error('Error loading color theme:', error);
      return 'blue';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'theme-pink');
    root.classList.add(`theme-${colorTheme}`);
    try {
      localStorage.setItem(COLOR_THEME_KEY, colorTheme);
    } catch (error) {
      console.error('Error saving color theme:', error);
    }
  }, [colorTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-change if user hasn't manually set a preference
      try {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (!savedTheme) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Error checking saved theme:', error);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Keyboard shortcut for theme toggle
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
