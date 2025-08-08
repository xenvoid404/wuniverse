'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaEye } from 'react-icons/fa';
import { type Album } from '@/data/albums';

interface AlbumCardProps {
    album: Album;
    onViewDetails: (album: Album) => void;
    variants: Variants;
}

export function AlbumCard({ 
    album, 
    onViewDetails, 
    variants 
}: AlbumCardProps) {
    return (
        <motion.div
            variants={variants}
            className="cyberpunk-card rounded-2xl overflow-hidden backdrop-blur-sm group cursor-pointer"
            onClick={() => onViewDetails(album)}
        >
            {/* Album Cover */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={album.coverPhoto}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* View details button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-lg neon-border text-white font-medium flex items-center gap-2 hover:shadow-neon transition-all duration-300"
                    >
                        <FaEye className="w-4 h-4" />
                        View Details
                    </motion.button>
                </div>
                
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
                    </div>
                </div>
            </div>

            {/* Album Preview Info */}
            <div className="p-6">
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {album.description}
                </p>
                
                {/* Friends preview */}
                {album.friends && album.friends.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-muted-foreground">With:</span>
                        <div className="flex -space-x-2">
                            {album.friends.slice(0, 3).map((friend) => (
                                <div
                                    key={friend.id}
                                    className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border-2 border-background flex items-center justify-center text-xs font-bold"
                                    title={friend.name}
                                >
                                    {friend.name.charAt(0).toUpperCase()}
                                </div>
                            ))}
                            {album.friends.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                                    +{album.friends.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Tags preview */}
                {album.tags && album.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {album.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/20 text-cyan-400"
                            >
                                #{tag}
                            </span>
                        ))}
                        {album.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                                +{album.tags.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}