'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeUp,
    FaVolumeDown,
    FaVolumeMute,
    FaRandom,
    FaRedo
} from 'react-icons/fa';
import { soundtracks, type Soundtrack } from '@/data/soundtracks';

export function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState<Soundtrack | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = useCallback(async () => {
        if (!audioRef.current || !currentTrack) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                setIsLoading(true);
                setError(null);
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (err) {
            console.error('Playback failed:', err);
            setError('Failed to play audio. Please try another track.');
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    }, [isPlaying, currentTrack]);

    const handleTrackSelect = useCallback((track: Soundtrack) => {
        if (currentTrack?.id === track.id) return;
        
        setCurrentTrack(track);
        setCurrentTime(0);
        setError(null);
        setIsLoading(true);
        
        if (audioRef.current) {
            audioRef.current.src = `/soundtracks/${track.fileName}`;
            audioRef.current.load();
        }
    }, [currentTrack]);

    const handleNext = useCallback(() => {
        if (soundtracks.length === 0) return;
        
        const currentIndex = soundtracks.findIndex(
            track => track.id === currentTrack?.id
        );
        
        let nextIndex;
        if (isShuffling) {
            nextIndex = Math.floor(Math.random() * soundtracks.length);
        } else {
            nextIndex = (currentIndex + 1) % soundtracks.length;
        }
        
        handleTrackSelect(soundtracks[nextIndex]);
    }, [currentTrack, isShuffling, handleTrackSelect]);

    const handlePrevious = useCallback(() => {
        if (soundtracks.length === 0) return;
        
        const currentIndex = soundtracks.findIndex(
            track => track.id === currentTrack?.id
        );
        
        let previousIndex;
        if (isShuffling) {
            previousIndex = Math.floor(Math.random() * soundtracks.length);
        } else {
            previousIndex = currentIndex === 0 ? soundtracks.length - 1 : currentIndex - 1;
        }
        
        handleTrackSelect(soundtracks[previousIndex]);
    }, [currentTrack, isShuffling, handleTrackSelect]);

    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }, []);

    const handleLoadedMetadata = useCallback(() => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setIsLoading(false);
        }
    }, []);

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    }, []);

    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
    }, []);

    const handleMute = useCallback(() => {
        if (volume === 0) {
            setVolume(0.7);
            if (audioRef.current) {
                audioRef.current.volume = 0.7;
            }
        } else {
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        }
    }, [volume]);

    const handleEnded = useCallback(() => {
        if (isRepeating) {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } else {
            handleNext();
        }
    }, [isRepeating, handleNext]);

    const handleError = useCallback(() => {
        setError('Failed to load audio file');
        setIsLoading(false);
        setIsPlaying(false);
    }, []);

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };



    // Memoize volume icon to prevent unnecessary re-renders
    const VolumeIcon = useMemo(() => {
        if (volume === 0) return FaVolumeMute;
        if (volume < 0.5) return FaVolumeDown;
        return FaVolumeUp;
    }, [volume]);

    // Initialize first track
    useEffect(() => {
        if (soundtracks.length > 0 && !currentTrack) {
            setCurrentTrack(soundtracks[0]);
        }
    }, [currentTrack]);

    // Set up audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('loadstart', () => setIsLoading(true));
        audio.addEventListener('canplaythrough', () => setIsLoading(false));

        // Set initial volume
        audio.volume = volume;

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('loadstart', () => setIsLoading(true));
            audio.removeEventListener('canplaythrough', () => setIsLoading(false));
        };
    }, [handleTimeUpdate, handleLoadedMetadata, handleEnded, handleError, volume]);

    // Memoize animation variants
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    }), []);

    return (
        <section
            id="music-player"
            className="py-20 px-6 sm:px-8 lg:px-12 cyberpunk-bg"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="text-center mb-12"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                    >
                        <span className="text-gradient-cyberpunk">
                            Memory Soundtrack
                        </span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Dengarkan musik yang mengiringi setiap momen kenangan
                        bersama teman-teman
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="cyberpunk-card p-4 sm:p-6 lg:p-8 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto"
                >
                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center text-sm sm:text-base"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Main Player */}
                    <div className="flex flex-col items-center gap-6 sm:gap-8">
                        {/* Album Art */}
                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-xl overflow-hidden neon-border">
                                {currentTrack?.cover ? (
                                    <Image
                                        src={currentTrack.cover}
                                        alt={currentTrack.title}
                                        width={224}
                                        height={224}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 flex items-center justify-center">
                                        <FaPlay className="text-3xl sm:text-4xl neon-text" />
                                    </div>
                                )}
                            </div>

                            {/* Loading indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center"
                                >
                                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-cyan-500"></div>
                                </motion.div>
                            )}

                            {/* Spinning animation when playing */}
                            <AnimatePresence>
                                {isPlaying && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, rotate: 360 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            rotate: {
                                                duration: 10,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            },
                                            opacity: { duration: 0.3 }
                                        }}
                                        className="absolute inset-0 border-4 border-cyan-500/30 rounded-xl"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Player Controls */}
                        <div className="w-full space-y-4 sm:space-y-6">
                            {/* Track Info */}
                            <motion.div
                                variants={itemVariants}
                                className="text-center"
                            >
                                <h3 className="text-xl sm:text-2xl font-bold text-gradient-cyberpunk mb-2">
                                    {currentTrack?.title || 'Select a track'}
                                </h3>
                                <p className="text-muted-foreground text-sm sm:text-base">
                                    {currentTrack?.artist || 'Unknown Artist'}
                                </p>
                                {currentTrack?.memories && (
                                    <div className="mt-2 flex flex-wrap gap-2 justify-center">
                                        {currentTrack.memories.map(
                                            (memory, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs rounded-full cyberpunk-card neon-border"
                                                >
                                                    {memory}
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}
                            </motion.div>

                            {/* Progress Bar */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-2"
                            >
                                <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    disabled={!currentTrack || isLoading}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                                />
                            </motion.div>

                            {/* Controls */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center justify-center gap-3 sm:gap-4"
                            >
                                <button
                                    onClick={() => setIsShuffling(!isShuffling)}
                                    disabled={soundtracks.length <= 1}
                                    className={`p-2 sm:p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
                                        isShuffling
                                            ? 'neon-border shadow-neon'
                                            : 'cyberpunk-card hover:shadow-neon'
                                    }`}
                                >
                                    <FaRandom className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>

                                <button
                                    onClick={handlePrevious}
                                    disabled={soundtracks.length <= 1 || isLoading}
                                    className="p-2 sm:p-3 rounded-lg cyberpunk-card hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                                >
                                    <FaStepBackward className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>

                                <button
                                    onClick={handlePlayPause}
                                    disabled={!currentTrack || isLoading}
                                    className="p-3 sm:p-4 rounded-full neon-border hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                                >
                                    {isLoading ? (
                                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-cyan-500"></div>
                                    ) : isPlaying ? (
                                        <FaPause className="w-5 h-5 sm:w-6 sm:h-6 neon-text" />
                                    ) : (
                                        <FaPlay className="w-5 h-5 sm:w-6 sm:h-6 neon-text" />
                                    )}
                                </button>

                                <button
                                    onClick={handleNext}
                                    disabled={soundtracks.length <= 1 || isLoading}
                                    className="p-2 sm:p-3 rounded-lg cyberpunk-card hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                                >
                                    <FaStepForward className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>

                                <button
                                    onClick={() => setIsRepeating(!isRepeating)}
                                    disabled={!currentTrack}
                                    className={`p-2 sm:p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
                                        isRepeating
                                            ? 'neon-border shadow-neon'
                                            : 'cyberpunk-card hover:shadow-neon'
                                    }`}
                                >
                                    <FaRedo className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </motion.div>

                            {/* Volume Control */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-3 sm:gap-4"
                            >
                                <button
                                    onClick={() => setVolume(0)}
                                    className="p-2 sm:p-3 rounded-lg cyberpunk-card hover:shadow-neon transition-all duration-300 touch-manipulation"
                                >
                                    {volume === 0 ? (
                                        <FaVolumeMute className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : volume < 0.5 ? (
                                        <FaVolumeDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <FaVolumeUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                                />
                                <span className="text-xs sm:text-sm text-muted-foreground w-10 text-center">
                                    {Math.round(volume * 100)}%
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Show Playlist Button */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mt-6 sm:mt-8"
                    >
                        <button
                            onClick={() => setShowPlaylist(!showPlaylist)}
                            className="px-4 sm:px-6 py-2 sm:py-3 cyberpunk-card neon-border rounded-lg hover:shadow-neon transition-all duration-300 text-sm sm:text-base touch-manipulation"
                        >
                            {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
                        </button>
                    </motion.div>

                    {/* Playlist */}
                    <AnimatePresence>
                        {showPlaylist && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 sm:mt-6 overflow-hidden"
                            >
                                <div className="space-y-2">
                                    {soundtracks.map((track, index) => (
                                        <motion.button
                                            key={track.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleTrackSelect(track)}
                                            disabled={isLoading}
                                            className={`w-full p-3 sm:p-4 rounded-lg text-left transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
                                                currentTrack?.id === track.id
                                                    ? 'neon-border shadow-neon'
                                                    : 'cyberpunk-card hover:shadow-neon'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-medium text-sm sm:text-base truncate">
                                                        {track.title}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                                        {track.artist}
                                                    </p>
                                                </div>
                                                <div className="text-right ml-2">
                                                    <span className="text-xs sm:text-sm text-muted-foreground">
                                                        {track.duration}
                                                    </span>
                                                    {currentTrack?.id === track.id && (
                                                        <div className="text-xs text-cyan-400 mt-1">
                                                            {isPlaying ? '▶ Playing' : '⏸ Paused'}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    preload="metadata"
                />
            </div>
        </section>
    );
}
