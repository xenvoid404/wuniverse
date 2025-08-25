'use client';
import { useState, useRef, useEffect } from 'react';
import { FaMusic, FaPause, FaPlay, FaForward, FaBackward } from 'react-icons/fa';

const playlist = [
    {
        title: 'AF1',
        artist: 'Lilbubblegum',
        cover: '/images/songs/af1.jpeg',
        src: '/songs/af1.mp3'
    }
].sort((a, b) => a.title.localeCompare(b.title));

export function MusicPlayerSection() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    const currentSong = playlist[currentSongIndex];

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentSong.src;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentSongIndex]);

    const playNextSong = () => {
        setCurrentSongIndex(prevIndex => (prevIndex + 1) % playlist.length);
    };

    const playPrevSong = () => {
        setCurrentSongIndex(prevIndex => (prevIndex - 1 + playlist.length) % playlist.length);
    };

    const selectSong = (index: number) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const handleSongEnd = () => {
        playNextSong();
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <section id="music" className="py-16 px-4">
            <audio
                ref={audioRef}
                src={currentSong.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={handleSongEnd}
            />
            <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                    <FaMusic className="text-primary mr-3 inline-block" /> Legendary Soundtrack
                </h2>
                <div className="bg-card rounded-2xl p-8 vintage-shadow">
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={currentSong.cover}
                            alt="Album Cover"
                            className={`w-48 h-48 rounded-full shadow-lg mb-6 ${isPlaying ? 'spinning' : ''}`}
                        />
                        <h3 className="font-semibold text-2xl text-accent">{currentSong.title}</h3>
                        <p className="text-foreground/80 mb-6">{currentSong.artist}</p>

                        <div className="flex items-center space-x-6 mb-6">
                            <button onClick={playPrevSong} className="p-3 text-foreground/80 hover:text-primary transition-colors">
                                <FaBackward size={20} />
                            </button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-5 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all scale-105 hover:scale-110"
                            >
                                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                            </button>
                            <button onClick={playNextSong} className="p-3 text-foreground/80 hover:text-primary transition-colors">
                                <FaForward size={20} />
                            </button>
                        </div>

                        <div className="w-full space-y-2 mb-6">
                            <div className="w-full bg-foreground/20 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="flex justify-between text-sm text-foreground/80">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <select
                            onChange={e => selectSong(parseInt(e.target.value))}
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
