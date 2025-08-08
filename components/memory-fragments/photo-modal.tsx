'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { type Photo } from '@/data/albums';

interface PhotoModalProps {
    photo: Photo;
    onClose: () => void;
    onNavigate?: (direction: 'prev' | 'next') => void;
    showNavigation?: boolean;
}

export function PhotoModal({ 
    photo, 
    onClose, 
    onNavigate, 
    showNavigation = false 
}: PhotoModalProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Prevent background scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && onNavigate) onNavigate('prev');
        if (e.key === 'ArrowRight' && onNavigate) onNavigate('next');
        if (e.key === 'f' || e.key === 'F') setIsFullscreen(!isFullscreen);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`relative w-full h-full flex flex-col ${
                    isFullscreen 
                        ? 'bg-black' 
                        : 'p-2 sm:p-4 md:p-6'
                }`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header controls */}
                <div className={`relative z-10 flex items-center justify-between ${
                    isFullscreen ? 'absolute top-4 left-4 right-4' : 'mb-2 sm:mb-4'
                }`}>
                    {/* Left navigation */}
                    <div className="flex items-center gap-2">
                        {showNavigation && onNavigate && (
                            <>
                                <button
                                    onClick={() => onNavigate('prev')}
                                    className="p-2 sm:p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                                    aria-label="Previous photo"
                                >
                                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button
                                    onClick={() => onNavigate('next')}
                                    className="p-2 sm:p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                                    aria-label="Next photo"
                                >
                                    <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 sm:p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                        >
                            {isFullscreen ? (
                                <FaCompress className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <FaExpand className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 sm:p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300 group"
                            aria-label="Close modal"
                        >
                            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Photo container */}
                <div className={`flex-1 flex items-center justify-center relative ${
                    isFullscreen ? 'absolute inset-0' : ''
                }`}>
                    <div className={`relative ${
                        isFullscreen 
                            ? 'w-full h-full' 
                            : 'w-full h-full max-w-6xl max-h-[80vh] sm:max-h-[85vh]'
                    }`}>
                        <Image
                            src={photo.url}
                            alt={photo.alt}
                            fill
                            className={`${
                                isFullscreen 
                                    ? 'object-contain' 
                                    : 'object-contain rounded-lg sm:rounded-xl'
                            }`}
                            priority
                            quality={95}
                        />
                    </div>
                </div>

                {/* Photo description - only show when not fullscreen */}
                {!isFullscreen && photo.description && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 sm:mt-4 text-center"
                    >
                        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto px-4">
                            {photo.description}
                        </p>
                    </motion.div>
                )}

                {/* Touch gesture support for mobile */}
                {showNavigation && onNavigate && (
                    <>
                        <div 
                            className="sm:hidden absolute left-0 top-0 w-1/3 h-full"
                            onClick={() => onNavigate('prev')}
                        />
                        <div 
                            className="sm:hidden absolute right-0 top-0 w-1/3 h-full"
                            onClick={() => onNavigate('next')}
                        />
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}