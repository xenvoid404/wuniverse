'use client';
import { type ReactNode, createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme') || 'system';
    var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.add(isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
    const [isLoading, setIsLoading] = useState(true);

    const updateTheme = useCallback((newTheme: Theme) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        let newResolvedTheme: 'light' | 'dark';

        if (newTheme === 'system') {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            newResolvedTheme = systemPreference;
        } else {
            newResolvedTheme = newTheme;
        }

        root.classList.add(newResolvedTheme);
        root.style.colorScheme = newResolvedTheme;
        setResolvedTheme(newResolvedTheme);

        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.warn('Failed to save theme preference:', e);
        }
    }, []);

    useEffect(() => {
        try {
            const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
            setThemeState(savedTheme);
            updateTheme(savedTheme);
        } catch (e) {
            setThemeState('system');
            updateTheme('system');
        }
        setIsLoading(false);
    }, [updateTheme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                updateTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, updateTheme]);

    const setTheme = useCallback(
        (newTheme: Theme) => {
            setThemeState(newTheme);
            updateTheme(newTheme);
        },
        [updateTheme]
    );

    const toggleTheme = useCallback(() => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }, [resolvedTheme, setTheme]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const existingScript = document.getElementById('theme-script');
            if (!existingScript) {
                const script = document.createElement('script');
                script.id = 'theme-script';
                script.innerHTML = themeScript;
                document.head.appendChild(script);
            }
        }
    }, []);

    const contextValue: ThemeContextType = {
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        isLoading
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
