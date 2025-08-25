'use client';

import { useTheme } from 'next-themes';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    const isDarkMode = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(isDarkMode ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
            className="p-2 rounded-lg bg-primary-foreground hover:bg-accent transition-colors"
        >
            {isDarkMode ? (
                <IoSunnyOutline className="h-5 w-5 text-yellow-500 transition-all duration-300 group-hover:rotate-90" />
            ) : (
                <IoMoonOutline className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:-rotate-12" />
            )}
        </button>
    );
}
