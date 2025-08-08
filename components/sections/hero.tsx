'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaMusic, FaImages } from 'react-icons/fa';
import { RiMemoriesLine } from 'react-icons/ri';

export function Hero() {
    return (
        <section
            className="relative min-h-screen-mobile flex items-center justify-center overflow-hidden cyberpunk-bg prevent-overscroll"
            aria-labelledby="hero-heading"
        >
            {/* Cyberpunk Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-magenta-500/10 to-transparent rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                />
                <div
                    className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '2s' }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [-20, -40, -20],
                                opacity: [0.2, 1, 0.2],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
                <div className="text-center space-y-12">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full cyberpunk-card backdrop-blur-sm neon-border hover:shadow-neon transition-all duration-300"
                    >
                        <RiMemoriesLine className="w-4 h-4 neon-text animate-pulse" />
                        <span className="text-sm font-medium">
                            Memory Keeper of Friendship
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h1
                            id="hero-heading"
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
                        >
                            <span className="block mb-4">
                                <span className="text-gradient-cyberpunk">
                                    Echoes of
                                </span>
                            </span>
                            <span className="block text-foreground">
                                Forgotten Days
                            </span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                            Mari kita buka kembali lembaran lama yang nyaris
                            terlupakan. Temukan potongan kecil dari hidupmu
                            karena di sinilah, kenangan itu masih menunggu untuk
                            dikenang kembali.
                        </p>
                    </motion.div>

                    {/* Feature highlights */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center items-center gap-12 text-sm text-muted-foreground"
                    >
                        <motion.div 
                            className="flex items-center gap-3 group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="p-3 rounded-lg cyberpunk-card neon-border group-hover:shadow-neon transition-all duration-300">
                                <FaMusic className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="font-medium">Memory Soundtrack</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center gap-3 group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="p-3 rounded-lg cyberpunk-card neon-border group-hover:shadow-neon transition-all duration-300">
                                <FaImages className="w-5 h-5 text-magenta-400" />
                            </div>
                            <span className="font-medium">Photo Albums</span>
                        </motion.div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="#memory-fragments">
                            <motion.button 
                                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 cyberpunk-card neon-border font-semibold rounded-xl hover:shadow-neon hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden touch-manipulation min-h-[48px] w-full sm:w-auto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 text-gradient-cyberpunk">
                                    Jelajahi Album
                                </span>
                                <FaImages className="w-4 h-4 sm:w-5 sm:h-5 neon-text transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                        </Link>
                        <Link href="#music-player">
                            <motion.button 
                                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 cyberpunk-card border border-muted-foreground/30 font-semibold rounded-xl hover:border-cyan-500/50 hover:shadow-neon hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden touch-manipulation min-h-[48px] w-full sm:w-auto"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">
                                    Dengarkan Musik
                                </span>
                                <FaMusic className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
