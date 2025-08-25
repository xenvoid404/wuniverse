"use client";
import { useState } from 'react';
import { FaMusic, FaPause, FaPlay, FaForward, FaBackward } from 'react-icons/fa';

const playlist = [
    {
        title: "Kenangan Indah",
        artist: "Various Artists",
        cover: "/vintage-music-album-cover.png",
        duration: "4:12"
    },
    {
        title: "Senja di Jakarta",
        artist: "Senja Band",
        cover: "/vintage-music-album-cover-2.png",
        duration: "3:45"
    },
    {
        title: "Melodi Hujan",
        artist: "Rintik Sendu",
        cover: "/vintage-music-album-cover-3.png",
        duration: "5:20"
    }
].sort((a, b) => a.title.localeCompare(b.title));

export function MusicPlayerSection() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentSong = playlist[currentSongIndex];

    const playNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const playPrevSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const selectSong = (index: number) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
    };

    return (
        <section id="music" className="py-16 px-4">
            <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                    <FaMusic className="text-primary mr-3 inline-block" /> Legendary Soundtrack
                </h2>
                <div className="bg-card rounded-2xl p-8 vintage-shadow">
                    <div className="flex flex-col items-center text-center">
                        <img src={currentSong.cover} alt="Album Cover" className="w-48 h-48 rounded-lg shadow-lg mb-6" />
                        <h3 className="font-semibold text-2xl text-primary-foreground">{currentSong.title}</h3>
                        <p className="text-foreground/80 mb-6">{currentSong.artist}</p>

                        <div className="flex items-center space-x-6 mb-6">
                            <button onClick={playPrevSong} className="p-3 text-foreground/80 hover:text-primary transition-colors">
                                <FaBackward size={20} />
                            </button>
                            <button onClick={() => setIsPlaying(!isPlaying)} className="p-5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all scale-105 hover:scale-110">
                                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                            </button>
                            <button onClick={playNextSong} className="p-3 text-foreground/80 hover:text-primary transition-colors">
                                <FaForward size={20} />
                            </button>
                        </div>

                        <div className="w-full space-y-2 mb-6">
                            <div className="w-full bg-foreground/20 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full w-3/5"></div>
                            </div>
                            <div className="flex justify-between text-sm text-foreground/80">
                                <span>2:34</span>
                                <span>{currentSong.duration}</span>
                            </div>
                        </div>

                        <select
                            onChange={(e) => selectSong(parseInt(e.target.value))}
                            className="w-full p-3 rounded-lg bg-background border border-primary/20 text-foreground focus:ring-primary focus:border-primary transition-colors"
                            value={currentSongIndex}
                        >
                            {playlist.map((song, index) => (
                                <option key={index} value={index} className="bg-background text-foreground">
                                    {song.title} - {song.artist}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}
