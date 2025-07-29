'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaExpandAlt } from 'react-icons/fa';
import { type Photo } from '@/data/albums';

interface PhotoGridProps {
    photos: Photo[];
    onPhotoSelect: (photo: Photo) => void;
}

export function PhotoGrid({ photos, onPhotoSelect }: PhotoGridProps) {
    return (
        <div className="grid grid-cols-3 gap-2 mb-6">
            {photos.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        delay: index * 0.1
                    }}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => onPhotoSelect(photo)}
                >
                    <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 33vw, 16vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <FaExpandAlt className="w-6 h-6 text-white" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}