'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { navLinks } from '@/components/layout/app-nav-link';

interface AppSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="sidebar-backdrop"
                    className="fixed inset-0 z-60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 md:hidden"
                    variants={sidebarAnimationVariant}
                    initial="close"
                    animate="open"
                    exit="close"
                >
                    <motion.div
                        key="sidebar-content"
                        className="flex flex-col h-full"
                        onClick={e => e.stopPropagation()}
                        variants={contentAnimationVariants}
                        initial="close"
                        animate="open"
                        exit="close"
                    >
                        <motion.div key="button-close" className="flex justify-end p-6" variants={buttonCloseAnimationVariants}>
                            <button
                                onClick={onClose}
                                aria-label="Close Sidebar Menu"
                                className="p-2 rounded-full hover:bg-accent transition-transform hover:scale-110 active:scale-95"
                            >
                                <IoClose className="h-6 w-6" />
                            </button>
                        </motion.div>

                        <div className="flex flex-1 flex-col items-center justify-center px-6">
                            <nav className="flex flex-col items-center gap-8 w-full">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={index}
                                        className="w-full text-center"
                                        variants={buttonCloseAnimationVariants}
                                        style={{ animationDelay: `${300 + index * 100}ms` }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-2xl font-bold font-opensans text-foreground py-3 hover:scale-110 hover:text-accent"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const sidebarAnimationVariant = {
    open: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    close: {
        opacity: 0,
        y: '1rem',
        scale: 0.98,
        transition: {
            duration: 0.4,
            out: [0.4, 0, 0.2, 1]
        }
    }
};

const contentAnimationVariants = {
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    close: {
        opacity: 0,
        x: '100%',
        transition: {
            duration: 0.4,
            out: [0.4, 0, 0.2, 1]
        }
    }
};

const buttonCloseAnimationVariants = {
    initial: {
        opacity: 0,
        y: '1.5rem',
        scale: 0.95
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.5
        }
    }
};
