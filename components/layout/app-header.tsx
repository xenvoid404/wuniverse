'use client';

import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AppNavLink } from '@/components/layout/app-nav-link';

interface AppHeaderProps {
    sidebarOpen: () => void;
}

export function AppHeader({ sidebarOpen }: AppHeaderProps) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-foreground/20 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" aria-label="Wuniverse - Go To Homepage">
                        <h1 className="text-2xl font-montserrat font-black text-primary">Wuniverse</h1>
                    </Link>

                    <AppNavLink className="hidden md:flex items-center space-x-8" />

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            className="md:hidden p-2 rounded-lg bg-primary-foreground hover:bg-accent transition-colors"
                            aria-label="Open Sidebar Menu"
                            onClick={sidebarOpen}
                        >
                            <MdMenu className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
