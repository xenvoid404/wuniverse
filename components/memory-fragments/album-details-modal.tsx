'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaUsers, FaTag } from 'react-icons/fa';
import { type Album, type Photo } from '@/data/albums';
import { PhotoGrid } from './photo-grid';

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
    if (!album) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    transition={{ 
                        type: "spring", 
                        damping: 25, 
                        stiffness: 300,
                        duration: 0.5 
                    }}
                    className="relative max-w-6xl w-full max-h-[90vh] cyberpunk-card rounded-2xl overflow-hidden backdrop-blur-sm"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300 group"
                    >
                        <FaTimes className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                        {/* Header with Cover Image */}
                        <div className="relative h-64 md:h-80 overflow-hidden">
                            <Image
                                src={album.coverPhoto}
                                alt={album.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            
                            {/* Floating particles effect */}
                            <div className="absolute inset-0">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        animate={{
                                            y: [-10, -20, -10],
                                            opacity: [0.3, 1, 0.3],
                                        }}
                                        transition={{
                                            duration: 3 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2,
                                        }}
                                    />
                                ))}
                            </div>
                            
                            <div className="absolute bottom-6 left-6 right-6">
                                <motion.h2 
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl md:text-4xl font-bold text-gradient-cyberpunk mb-3"
                                >
                                    {album.title}
                                </motion.h2>
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-6 text-gray-300"
                                >
                                    <span className="flex items-center gap-2">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        {album.year}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaUsers className="w-4 h-4" />
                                        {album.photos.length} photos
                                    </span>
                                </motion.div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Description */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mb-8"
                            >
                                <h3 className="text-xl font-bold mb-3 text-gradient-cyberpunk">
                                    About this Album
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {album.description}
                                </p>
                            </motion.div>

                            {/* Friends Section */}
                            {album.friends && album.friends.length > 0 && (
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FaUsers className="w-5 h-5 text-cyan-400" />
                                        <span className="text-gradient-cyberpunk">Friends in this Album</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {album.friends.map((friend, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                className="flex items-center gap-3 px-4 py-2 cyberpunk-card rounded-full hover:shadow-neon transition-all duration-300"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 flex items-center justify-center text-sm font-bold">
                                                    {friend.charAt(0)}
                                                </div>
                                                <span className="font-medium">{friend}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Tags Section */}
                            {album.tags && album.tags.length > 0 && (
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mb-8"
                                >
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FaTag className="w-5 h-5 text-magenta-400" />
                                        <span className="text-gradient-cyberpunk">Tags</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {album.tags.map((tag, index) => (
                                            <motion.span
                                                key={index}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.7 + index * 0.05 }}
                                                className="px-3 py-2 text-sm rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/50 hover:shadow-neon transition-all duration-300 cursor-default"
                                            >
                                                #{tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Photo Grid */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <h3 className="text-xl font-bold mb-6 text-gradient-cyberpunk">
                                    Photos ({album.photos.length})
                                </h3>
                                <PhotoGrid photos={album.photos} onPhotoSelect={onPhotoSelect} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}