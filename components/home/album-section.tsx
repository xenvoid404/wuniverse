"use client";
import { useState, useEffect } from 'react';
import { FaImages, FaArrowRight, FaTimes } from 'react-icons/fa';
import { albumData } from '@/lib/album-data';

// AlbumCard Component
function AlbumCard({ album, onClick }) {
    return (
        <div
            className="album-card bg-card rounded-xl overflow-hidden vintage-shadow hover:scale-105 transition-transform cursor-pointer group"
            onClick={onClick}
        >
            <img src={album.cover} alt={album.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary-foreground">{album.title}</h3>
                <p className="text-muted-foreground mb-4">{album.description}</p>
                <div className="flex items-center justify-between text-primary">
                    <span className="text-sm font-semibold">{album.photos.length} photos</span>
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
}

// AlbumModal Component
function AlbumModal({ album, onClose }) {
    if (!album) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-montserrat font-black text-primary">{album.title}</h3>
                        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                            <FaTimes className="text-xl text-primary" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {album.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`${album.title} photo ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// AlbumSection Component
export function AlbumSection() {
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const openModal = (album) => {
        setSelectedAlbum(album);
    };

    const closeModal = () => {
        setSelectedAlbum(null);
    };

    useEffect(() => {
        if (selectedAlbum) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedAlbum]);

    return (
        <section id="albums" className="py-16 px-4 bg-background/70">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                    <FaImages className="text-primary mr-3 inline-block" />
                    Memory Albums
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {albumData.map((album) => (
                        <AlbumCard key={album.id} album={album} onClick={() => openModal(album)} />
                    ))}
                </div>
            </div>
            <AlbumModal album={selectedAlbum} onClose={closeModal} />
        </section>
    );
}
