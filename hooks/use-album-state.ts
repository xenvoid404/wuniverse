'use client';

import { useState, useCallback } from 'react';

export function useAlbumState() {
    const [expandedAlbum, setExpandedAlbum] = useState<string | null>(null);

    const handleAlbumToggle = useCallback((albumId: string) => {
        setExpandedAlbum(prev => prev === albumId ? null : albumId);
    }, []);

    const isAlbumExpanded = useCallback((albumId: string) => {
        return expandedAlbum === albumId;
    }, [expandedAlbum]);

    return {
        expandedAlbum,
        handleAlbumToggle,
        isAlbumExpanded
    };
}