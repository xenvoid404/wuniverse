'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaExpandAlt, FaTimes, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { albums, type Album, type Photo } from '@/data/albums';

export function MemoryFragments() {
    const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handleAlbumToggle = (albumId: string) => {
        setExpandedAlbum(expandedAlbum === albumId ? null : albumId);
    };

    const openPhotoModal = (photo: Photo, album: Album) => {
        setSelectedPhoto(photo);
        setCurrentPhotoIndex(album.photos.findIndex(p => p.id === photo.id));
    };

    const closePhotoModal = () => {
        setSelectedPhoto(null);
    };

    const navigatePhoto = (direction: 'prev' | 'next', album: Album) => {
        const newIndex = direction === 'next' 
            ? (currentPhotoIndex + 1) % album.photos.length
            : currentPhotoIndex === 0 ? album.photos.length - 1 : currentPhotoIndex - 1;
        
        setCurrentPhotoIndex(newIndex);
        setSelectedPhoto(album.photos[newIndex]);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const albumVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="memory-fragments" className="py-20 px-6 sm:px-8 lg:px-12 cyberpunk-bg">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-gradient-cyberpunk">Memory Fragments</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Koleksi album foto kenangan yang menyimpan setiap momen berharga bersama teman-teman
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {albums.map((album) => (
                        <motion.div
                            key={album.id}
                            variants={albumVariants}
                            className="cyberpunk-card rounded-2xl overflow-hidden backdrop-blur-sm"
                        >
                            {/* Album Cover */}
                            <div 
                                className="relative h-64 cursor-pointer group"
                                onClick={() => handleAlbumToggle(album.id)}
                            >
                                <img 
                                    src={album.coverPhoto} 
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{album.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-300">
                                                <span className="flex items-center gap-1">
                                                    <FaCalendarAlt className="w-3 h-3" />
                                                    {album.year}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaUsers className="w-3 h-3" />
                                                    {album.photos.length} photos
                                                </span>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: expandedAlbum === album.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FaChevronDown className="w-5 h-5 text-white" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Album Content */}
                            <AnimatePresence>
                                {expandedAlbum === album.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-6"
                                    >
                                        {/* Description */}
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {album.description}
                                        </p>

                                        {/* Photo Grid */}
                                        <div className="grid grid-cols-3 gap-2 mb-6">
                                            {album.photos.map((photo, index) => (
                                                <motion.div
                                                    key={photo.id}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                                                    onClick={() => openPhotoModal(photo, album)}
                                                >
                                                    <img 
                                                        src={photo.url} 
                                                        alt={photo.alt}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <FaExpandAlt className="w-6 h-6 text-white" />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Friends */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium mb-3">Teman-teman di album ini:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {album.friends.map((friend) => (
                                                    <div key={friend.id} className="flex items-center gap-2 px-3 py-1 rounded-full cyberpunk-card neon-border">
                                                        <img 
                                                            src={friend.avatar} 
                                                            alt={friend.name}
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                        <span className="text-sm">{friend.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <h4 className="text-sm font-medium mb-3">Tags:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {album.tags.map((tag, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/30"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Photo Modal */}
                <AnimatePresence>
                    {selectedPhoto && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                            onClick={closePhotoModal}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="relative max-w-4xl max-h-[90vh] cyberpunk-card rounded-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closePhotoModal}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>

                                {/* Navigation Buttons */}
                                {albums.find(album => album.photos.some(p => p.id === selectedPhoto.id))?.photos.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => navigatePhoto('prev', albums.find(album => album.photos.some(p => p.id === selectedPhoto.id))!)}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                                        >
                                            <FaChevronDown className="w-4 h-4 transform rotate-90" />
                                        </button>
                                        <button
                                            onClick={() => navigatePhoto('next', albums.find(album => album.photos.some(p => p.id === selectedPhoto.id))!)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                                        >
                                            <FaChevronDown className="w-4 h-4 transform -rotate-90" />
                                        </button>
                                    </>
                                )}

                                {/* Photo */}
                                <img 
                                    src={selectedPhoto.url} 
                                    alt={selectedPhoto.alt}
                                    className="w-full h-auto max-h-[70vh] object-contain"
                                />

                                {/* Photo Info */}
                                {selectedPhoto.description && (
                                    <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white text-center">{selectedPhoto.description}</p>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}