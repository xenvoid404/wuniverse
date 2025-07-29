'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
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
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && onNavigate) onNavigate('prev');
        if (e.key === 'ArrowRight' && onNavigate) onNavigate('next');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] cyberpunk-card rounded-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                    aria-label="Close modal"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

                {/* Navigation Buttons */}
                {showNavigation && onNavigate && (
                    <>
                        <button
                            onClick={() => onNavigate('prev')}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                            aria-label="Previous photo"
                        >
                            <FaChevronDown className="w-4 h-4 transform rotate-90" />
                        </button>
                        <button
                            onClick={() => onNavigate('next')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                            aria-label="Next photo"
                        >
                            <FaChevronDown className="w-4 h-4 transform -rotate-90" />
                        </button>
                    </>
                )}

                {/* Photo */}
                <Image
                    src={photo.url}
                    alt={photo.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    priority
                />

                {/* Photo Info */}
                {photo.description && (
                    <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-center">
                            {photo.description}
                        </p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}