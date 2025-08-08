'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { type Album, type Photo } from '@/data/albums';

interface AlbumDetailsModalProps {
    album: Album | null;
    onClose: () => void;
    onPhotoSelect: (photo: Photo) => void;
}

export function AlbumDetailsModal({ 
    album, 
    onClose, 
    onPhotoSelect 
}: AlbumDetailsModalProps) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    useEffect(() => {
        // Prevent background scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!album) return null;

    const currentPhoto = album.photos[currentPhotoIndex];
    const canGoToPrevious = currentPhotoIndex > 0;
    const canGoToNext = currentPhotoIndex < album.photos.length - 1;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handlePreviousPhoto = () => {
        if (canGoToPrevious) {
            setCurrentPhotoIndex(currentPhotoIndex - 1);
        }
    };

    const handleNextPhoto = () => {
        if (canGoToNext) {
            setCurrentPhotoIndex(currentPhotoIndex + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') handlePreviousPhoto();
        if (e.key === 'ArrowRight') handleNextPhoto();
        if (e.key === 'f' || e.key === 'F') setIsFullscreen(!isFullscreen);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handlePhotoClick = () => {
        onPhotoSelect(currentPhoto);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
                onClick={handleBackdropClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`relative w-full h-full flex flex-col ${
                        isFullscreen 
                            ? 'bg-black' 
                            : 'p-2 sm:p-4 md:p-6'
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header with controls */}
                    <div className={`relative z-10 flex items-center justify-between ${
                        isFullscreen ? 'absolute top-4 left-4 right-4' : 'mb-2 sm:mb-4'
                    }`}>
                        {/* Left controls */}
                        <div className="flex items-center gap-2">
                            {/* Navigation arrows */}
                            <button
                                onClick={handlePreviousPhoto}
                                disabled={!canGoToPrevious}
                                className={`p-2 sm:p-3 rounded-full cyberpunk-card transition-all duration-300 ${
                                    canGoToPrevious 
                                        ? 'neon-border hover:shadow-neon' 
                                        : 'opacity-50 cursor-not-allowed'
                                }`}
                                aria-label="Previous photo"
                            >
                                <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={handleNextPhoto}
                                disabled={!canGoToNext}
                                className={`p-2 sm:p-3 rounded-full cyberpunk-card transition-all duration-300 ${
                                    canGoToNext 
                                        ? 'neon-border hover:shadow-neon' 
                                        : 'opacity-50 cursor-not-allowed'
                                }`}
                                aria-label="Next photo"
                            >
                                <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {/* Center info - only show when not fullscreen */}
                        {!isFullscreen && (
                            <div className="flex-1 text-center mx-4">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-cyberpunk truncate">
                                    {album.title}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {album.year} • {currentPhotoIndex + 1} of {album.photos.length}
                                </p>
                            </div>
                        )}

                        {/* Right controls */}
                        <div className="flex items-center gap-2">
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
                        <motion.div
                            key={currentPhotoIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`relative ${
                                isFullscreen 
                                    ? 'w-full h-full' 
                                    : 'w-full h-full max-w-4xl max-h-[70vh] sm:max-h-[75vh]'
                            } cursor-pointer`}
                            onClick={handlePhotoClick}
                        >
                            <Image
                                src={currentPhoto.url}
                                alt={currentPhoto.alt}
                                fill
                                className={`${
                                    isFullscreen 
                                        ? 'object-contain' 
                                        : 'object-contain rounded-lg sm:rounded-xl'
                                }`}
                                priority
                                quality={90}
                            />
                        </motion.div>
                    </div>

                    {/* Bottom info - only show when not fullscreen */}
                    {!isFullscreen && currentPhoto.description && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 sm:mt-4 text-center"
                        >
                            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                                {currentPhoto.description}
                            </p>
                        </motion.div>
                    )}

                    {/* Swipe indicators for mobile */}
                    <div className="sm:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {album.photos.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === currentPhotoIndex 
                                        ? 'bg-cyan-400 scale-110' 
                                        : 'bg-white/30'
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Touch gesture support for mobile */}
                <div 
                    className="sm:hidden absolute left-0 top-0 w-1/3 h-full"
                    onClick={handlePreviousPhoto}
                />
                <div 
                    className="sm:hidden absolute right-0 top-0 w-1/3 h-full"
                    onClick={handleNextPhoto}
                />
            </motion.div>
        </AnimatePresence>
    );
}