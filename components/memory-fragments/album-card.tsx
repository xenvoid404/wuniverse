'use client';

import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { FaChevronDown, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { type Album, type Photo } from '@/data/albums';
import { PhotoGrid } from './photo-grid';
import { FriendsList } from './friends-list';
import { TagsList } from './tags-list';

interface AlbumCardProps {
    album: Album;
    isExpanded: boolean;
    onToggle: () => void;
    onPhotoSelect: (photo: Photo) => void;
    variants: Variants;
}

export function AlbumCard({ 
    album, 
    isExpanded, 
    onToggle, 
    onPhotoSelect, 
    variants 
}: AlbumCardProps) {
    return (
        <motion.div
            variants={variants}
            className="cyberpunk-card rounded-2xl overflow-hidden backdrop-blur-sm"
        >
            {/* Album Cover */}
            <div
                className="relative h-64 cursor-pointer group"
                onClick={onToggle}
            >
                <Image
                    src={album.coverPhoto}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {album.title}
                            </h3>
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
                            animate={{
                                rotate: isExpanded ? 180 : 0
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaChevronDown className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Album Content */}
            <AnimatePresence>
                {isExpanded && (
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
                        <PhotoGrid photos={album.photos} onPhotoSelect={onPhotoSelect} />

                        {/* Friends */}
                        <FriendsList friends={album.friends} />

                        {/* Tags */}
                        <TagsList tags={album.tags} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}