'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaMusic, FaImages } from 'react-icons/fa';
import { RiMemoriesLine } from 'react-icons/ri';
import { BsFillPeopleFill } from 'react-icons/bs';

export function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden cyberpunk-bg"
            aria-labelledby="hero-heading"
        >
            {/* Cyberpunk Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-magenta-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                
                {/* Scanning lines */}
                <div className="absolute inset-0">
                    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-scan-line"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
                <div className="text-center space-y-12">
                    {/* Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full cyberpunk-card backdrop-blur-sm neon-border"
                    >
                        <RiMemoriesLine className="w-4 h-4 neon-text" />
                        <span className="text-sm font-medium">Memory Keeper of Friendship</span>
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
                                <span className="text-gradient-cyberpunk glitch" data-text="Wuniverse">
                                    Wuniverse
                                </span>
                            </span>
                            <span className="block text-foreground">
                                Kenangan Tak Terlupakan
                            </span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                            Tempat untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman.
                            <span className="neon-text font-medium block mt-2 sm:inline sm:mt-0">
                                {' '}
                                Simpan momen, dengarkan musik, jelajahi timeline pertemanan.
                            </span>
                        </p>
                    </motion.div>

                    {/* Feature highlights */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
                    >
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-lg cyberpunk-card neon-border group-hover:shadow-neon transition-all duration-300">
                                <FaMusic className="w-4 h-4 text-cyan-400" />
                            </div>
                            <span className="font-medium">
                                Music Player
                            </span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-lg cyberpunk-card neon-border group-hover:shadow-neon transition-all duration-300">
                                <FaImages className="w-4 h-4 text-magenta-400" />
                            </div>
                            <span className="font-medium">Photo Albums</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-lg cyberpunk-card neon-border group-hover:shadow-neon transition-all duration-300">
                                <BsFillPeopleFill className="w-4 h-4 text-yellow-400" />
                            </div>
                            <span className="font-medium">Friends Network</span>
                        </div>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link href="#music-player">
                            <button className="group relative inline-flex items-center gap-3 px-8 py-4 cyberpunk-card neon-border font-semibold rounded-xl hover:shadow-neon hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                                <span className="relative z-10 text-gradient-cyberpunk">
                                    Jelajahi Kenangan
                                </span>
                                <FaArrowRight className="w-5 h-5 neon-text transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
