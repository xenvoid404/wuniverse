'use client';
import { type ReactNode, useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { AppSidebar } from '@/components/layout/app-sidebar';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-svh">
            <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}></AppSidebar>
            <div className="flex flex-1 flex-col">
                <AppHeader sidebarOpen={() => setIsSidebarOpen(true)} />
            </div>
        </div>
    );
}
