'use client';
import { type ReactNode, createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
    theme: 'dark';
    resolvedTheme: 'dark';
    setTheme: () => void;
    toggleTheme: () => void;
    isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeScript = `
(function() {
  try {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } catch (e) {}
})();
`;

export function ThemeProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof document !== 'undefined') {
            const root = document.documentElement;
            root.classList.remove('light');
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
            
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
        theme: 'dark',
        resolvedTheme: 'dark',
        setTheme: () => {}, // No-op since we only support dark theme
        toggleTheme: () => {}, // No-op since we only support dark theme
        isLoading: false
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export { themeScript };
