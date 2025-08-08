'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { albums, type Album } from '@/data/albums';
import { usePhotoModal } from '@/hooks';
import { ANIMATION_VARIANTS } from '@/constants/animations';
import { AlbumCard, PhotoModal, AlbumDetailsModal } from '@/components/memory-fragments';

export function MemoryFragments() {
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const photoModal = usePhotoModal(albums);

    const handleAlbumSelect = (album: Album) => {
        setSelectedAlbum(album);
    };

    const handleCloseAlbumModal = () => {
        setSelectedAlbum(null);
    };

    const handlePhotoSelect = (photo: typeof albums[0]['photos'][0], album: Album) => {
        photoModal.openPhotoModal(photo, album);
    };

    return (
        <section
            id="memory-fragments"
            className="py-20 px-6 sm:px-8 lg:px-12 cyberpunk-bg"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    {...ANIMATION_VARIANTS.header}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-gradient-cyberpunk">
                            Memory Fragments
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Koleksi album foto kenangan yang menyimpan setiap momen
                        berharga bersama teman-teman. Klik album untuk melihat detail lengkap.
                    </p>
                </motion.div>

                {/* Albums Grid */}
                <motion.div
                    variants={ANIMATION_VARIANTS.container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {albums.map(album => (
                        <AlbumCard
                            key={album.id}
                            album={album}
                            onViewDetails={handleAlbumSelect}
                            variants={ANIMATION_VARIANTS.album}
                        />
                    ))}
                </motion.div>

                {/* Album Details Modal */}
                <AnimatePresence>
                    {selectedAlbum && (
                        <AlbumDetailsModal
                            album={selectedAlbum}
                            onClose={handleCloseAlbumModal}
                            onPhotoSelect={(photo) => handlePhotoSelect(photo, selectedAlbum)}
                        />
                    )}
                </AnimatePresence>

                {/* Photo Modal */}
                <AnimatePresence>
                    {photoModal.selectedPhoto && (
                        <PhotoModal
                            photo={photoModal.selectedPhoto}
                            onClose={photoModal.closePhotoModal}
                            onNavigate={photoModal.navigatePhoto}
                            showNavigation={photoModal.shouldShowNavigation}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
