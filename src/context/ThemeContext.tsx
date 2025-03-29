"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use state to store theme with a default value
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Effect for initialization that only runs on client
  useEffect(() => {
    try {
      // Get theme from localStorage on client-side
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      // Set theme based on localStorage or system preference
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      // If localStorage is not available, default to dark theme
      console.error('Error accessing localStorage:', error);
    }
    
    setMounted(true);
  }, []);

  // Effect that applies theme to document when theme changes
  useEffect(() => {
    if (mounted) {
      const bodyElement = document.body;
      if (theme === 'dark') {
        bodyElement.classList.add('dark');
      } else {
        bodyElement.classList.remove('dark');
      }
      
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Error saving theme to localStorage:', error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  };

  // Provide a stable context value
  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}; 