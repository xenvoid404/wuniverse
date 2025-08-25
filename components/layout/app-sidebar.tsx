'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#music', label: 'Music' },
    { href: '#albums', label: 'Albums' },
    { href: '#timeline', label: 'Timeline' }
];

export function AppSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 400);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`fixed inset-0 z-60 bg-foreground/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden ${
                isClosing ? 'animate-fade-out' : 'animate-fade-in'
            }`}
            aria-modal="true"
        >
            <div className={`flex flex-col h-full ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
                <div className="flex justify-end p-6 animate-fade-in-up animation-delay-150">
                    <button
                        onClick={handleClose}
                        aria-label="Close Sidebar Menu"
                        className="text-foreground p-2 rounded-full hover:bg-background/30 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <IoClose className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center px-6">
                    <nav className="flex flex-col items-center gap-6 w-full">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-foreground hover:text-primary font-opensans transition-colors animate-fade-in-up"
                                style={{ animationDelay: `${300 + index * 100}ms` }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
