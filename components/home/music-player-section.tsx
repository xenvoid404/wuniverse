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
];

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
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                    <FaMusic className="text-primary mr-3" /> Legendary Soundtrack
                </h2>
                <div className="bg-card rounded-2xl p-8 vintage-shadow">
                    <div className="music-player-gradient rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <img src={currentSong.cover} alt="Album Cover" className="w-15 h-15 rounded-lg" />
                                <div>
                                    <h3 className="font-semibold text-lg">{currentSong.title}</h3>
                                    <p className="text-white/80">{currentSong.artist}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={playPrevSong} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <FaBackward />
                                </button>
                                <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <button onClick={playNextSong} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <FaForward />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-white/80">
                                <span>0:00</span>
                                <span>{currentSong.duration}</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                                <div className="bg-white h-2 rounded-full w-0"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold mb-4 text-lg">Playlist</h4>
                        <ul>
                            {playlist.map((song, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectSong(index)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${currentSongIndex === index ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-md" />
                                        <div>
                                            <p className="font-semibold">{song.title}</p>
                                            <p className="text-sm text-gray-400">{song.artist}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
