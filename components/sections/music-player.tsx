'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';
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
    
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
        if (!audioRef.current || !currentTrack) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTrackSelect = (track: Soundtrack) => {
        setCurrentTrack(track);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.src = `/soundtrack/${track.fileName}`;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    };

    const handleNext = () => {
        const currentIndex = soundtracks.findIndex(track => track.id === currentTrack?.id);
        const nextIndex = (currentIndex + 1) % soundtracks.length;
        handleTrackSelect(soundtracks[nextIndex]);
    };

    const handlePrevious = () => {
        const currentIndex = soundtracks.findIndex(track => track.id === currentTrack?.id);
        const previousIndex = currentIndex === 0 ? soundtracks.length - 1 : currentIndex - 1;
        handleTrackSelect(soundtracks[previousIndex]);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (soundtracks.length > 0 && !currentTrack) {
            setCurrentTrack(soundtracks[0]);
        }
    }, [currentTrack]);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="music-player" className="py-20 px-6 sm:px-8 lg:px-12 cyberpunk-bg">
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
                        <span className="text-gradient-cyberpunk">Memory Soundtrack</span>
                    </motion.h2>
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Dengarkan musik yang mengiringi setiap momen kenangan bersama teman-teman
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="cyberpunk-card p-8 rounded-2xl backdrop-blur-sm max-w-4xl mx-auto"
                >
                    {/* Main Player */}
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Album Art */}
                        <motion.div 
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="w-48 h-48 rounded-xl overflow-hidden neon-border">
                                {currentTrack?.cover ? (
                                    <img 
                                        src={currentTrack.cover} 
                                        alt={currentTrack.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 flex items-center justify-center">
                                        <FaPlay className="text-4xl neon-text" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Spinning animation when playing */}
                            <AnimatePresence>
                                {isPlaying && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, rotate: 360 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ 
                                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                            opacity: { duration: 0.3 }
                                        }}
                                        className="absolute inset-0 border-4 border-cyan-500/30 rounded-xl"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Player Controls */}
                        <div className="flex-1 space-y-6">
                            {/* Track Info */}
                            <motion.div variants={itemVariants} className="text-center lg:text-left">
                                <h3 className="text-2xl font-bold text-gradient-cyberpunk mb-2">
                                    {currentTrack?.title || 'Select a track'}
                                </h3>
                                <p className="text-muted-foreground">
                                    {currentTrack?.artist || 'Unknown Artist'}
                                </p>
                                {currentTrack?.memories && (
                                    <div className="mt-2 flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {currentTrack.memories.map((memory, index) => (
                                            <span 
                                                key={index}
                                                className="px-2 py-1 text-xs rounded-full cyberpunk-card neon-border"
                                            >
                                                {memory}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Progress Bar */}
                            <motion.div variants={itemVariants} className="space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                                />
                            </motion.div>

                            {/* Controls */}
                            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setIsShuffling(!isShuffling)}
                                    className={`p-3 rounded-lg transition-all duration-300 ${
                                        isShuffling ? 'neon-border shadow-neon' : 'cyberpunk-card'
                                    }`}
                                >
                                    <FaRandom className="w-4 h-4" />
                                </button>
                                
                                <button
                                    onClick={handlePrevious}
                                    className="p-3 rounded-lg cyberpunk-card hover:shadow-neon transition-all duration-300"
                                >
                                    <FaStepBackward className="w-5 h-5" />
                                </button>
                                
                                <button
                                    onClick={handlePlayPause}
                                    className="p-4 rounded-full neon-border hover:shadow-neon transition-all duration-300"
                                >
                                    {isPlaying ? (
                                        <FaPause className="w-6 h-6 neon-text" />
                                    ) : (
                                        <FaPlay className="w-6 h-6 neon-text" />
                                    )}
                                </button>
                                
                                <button
                                    onClick={handleNext}
                                    className="p-3 rounded-lg cyberpunk-card hover:shadow-neon transition-all duration-300"
                                >
                                    <FaStepForward className="w-5 h-5" />
                                </button>
                                
                                <button
                                    onClick={() => setIsRepeating(!isRepeating)}
                                    className={`p-3 rounded-lg transition-all duration-300 ${
                                        isRepeating ? 'neon-border shadow-neon' : 'cyberpunk-card'
                                    }`}
                                >
                                    <FaRedo className="w-4 h-4" />
                                </button>
                            </motion.div>

                            {/* Volume Control */}
                            <motion.div variants={itemVariants} className="flex items-center gap-3">
                                <FaVolumeUp className="w-4 h-4 text-muted-foreground" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Playlist Toggle */}
                    <motion.div variants={itemVariants} className="mt-8 text-center">
                        <button
                            onClick={() => setShowPlaylist(!showPlaylist)}
                            className="px-6 py-2 cyberpunk-card neon-border rounded-lg hover:shadow-neon transition-all duration-300"
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
                                className="mt-6 overflow-hidden"
                            >
                                <div className="space-y-2">
                                    {soundtracks.map((track, index) => (
                                        <motion.button
                                            key={track.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleTrackSelect(track)}
                                            className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                                                currentTrack?.id === track.id 
                                                    ? 'neon-border shadow-neon' 
                                                    : 'cyberpunk-card hover:shadow-neon'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium">{track.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{track.artist}</p>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{track.duration}</span>
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
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleNext}
                    loop={isRepeating}
                />
            </div>
        </section>
    );
}