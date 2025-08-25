'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { AppSidebarMenu } from '@/components/layout/app-nav-link';

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
                    variants={sidebarBackdropAnimate}
                    initial="close"
                    animate="open"
                    exit="close"
                >
                    <motion.div
                        key="sidebar-content"
                        className="flex flex-col h-full"
                        onClick={e => e.stopPropagation()}
                        variants={sidebarContentAnimate}
                        initial="close"
                        animate="open"
                        exit="close"
                    >
                        <div className="flex justify-end p-6">
                            <button
                                onClick={onClose}
                                aria-label="Close Sidebar Menu"
                                className="p-2 rounded-full hover:bg-accent transition-transform hover:scale-110 active:scale-95"
                            >
                                <IoClose className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center px-6">
                            <AppSidebarMenu />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const sidebarBackdropAnimate = {
    open: { opacity: 1, transition: { duration: 0.6 } },
    close: { opacity: 0, transition: { duration: 0.4 } }
};

const sidebarContentAnimate = {
    open: { x: '0%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
    close: { x: '100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
};
