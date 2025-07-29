'use client';

import { useState, useCallback, useMemo } from 'react';
import { type Album, type Photo } from '@/data/albums';

// Helper function to find the album containing a specific photo
const findAlbumByPhotoId = (albums: Album[], photoId: string): Album | undefined => {
    return albums.find(album => 
        album.photos.some(photo => photo.id === photoId)
    );
};

export function usePhotoModal(albums: Album[]) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Memoized current album to avoid repeated searches
    const currentAlbum = useMemo(() => {
        return selectedPhoto ? findAlbumByPhotoId(albums, selectedPhoto.id) : null;
    }, [selectedPhoto, albums]);

    const openPhotoModal = useCallback((photo: Photo, album: Album) => {
        setSelectedPhoto(photo);
        setCurrentPhotoIndex(album.photos.findIndex(p => p.id === photo.id));
    }, []);

    const closePhotoModal = useCallback(() => {
        setSelectedPhoto(null);
    }, []);

    const navigatePhoto = useCallback((direction: 'prev' | 'next') => {
        if (!currentAlbum || !selectedPhoto) return;

        const newIndex =
            direction === 'next'
                ? (currentPhotoIndex + 1) % currentAlbum.photos.length
                : currentPhotoIndex === 0
                ? currentAlbum.photos.length - 1
                : currentPhotoIndex - 1;

        setCurrentPhotoIndex(newIndex);
        setSelectedPhoto(currentAlbum.photos[newIndex]);
    }, [currentAlbum, selectedPhoto, currentPhotoIndex]);

    const shouldShowNavigation = Boolean(currentAlbum && currentAlbum.photos.length > 1);

    return {
        selectedPhoto,
        currentAlbum,
        shouldShowNavigation,
        openPhotoModal,
        closePhotoModal,
        navigatePhoto
    };
}