'use client';

import { motion } from 'framer-motion';
import { timelineEvents } from '@/data/timeline';

export function MemoryTimeline() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8 }
        }
    };

    return (
        <section id="memory-timeline" className="py-20 px-6 sm:px-8 lg:px-12 cyberpunk-bg">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-gradient-cyberpunk">Memory Timeline</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Perjalanan waktu yang menandai setiap fase penting dalam pertemanan kita
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-magenta-500/50 to-yellow-500/50" />
                    
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            variants={itemVariants}
                            className="relative mb-12 last:mb-0"
                        >
                            {/* Timeline Node */}
                            <div 
                                className="absolute left-4 w-8 h-8 rounded-full flex items-center justify-center text-xl border-4 border-background shadow-neon"
                                style={{ 
                                    backgroundColor: event.color,
                                    boxShadow: `0 0 20px ${event.color}`
                                }}
                            >
                                <span className="text-lg">{event.icon}</span>
                            </div>

                            {/* Content Card */}
                            <div className="ml-20 cyberpunk-card p-6 rounded-2xl backdrop-blur-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-gradient-cyberpunk mb-2 sm:mb-0">
                                        {event.title}
                                    </h3>
                                    <div 
                                        className="px-4 py-2 rounded-full text-sm font-bold neon-border"
                                        style={{ 
                                            color: event.color,
                                            borderColor: event.color
                                        }}
                                    >
                                        {event.year}
                                    </div>
                                </div>
                                
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {event.description}
                                </p>

                                {/* Images */}
                                {event.images && event.images.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {event.images.map((image, imgIndex) => (
                                            <motion.div
                                                key={imgIndex}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: imgIndex * 0.2 }}
                                                className="relative aspect-video rounded-lg overflow-hidden neon-border group"
                                            >
                                                <img 
                                                    src={image} 
                                                    alt={`${event.title} - Image ${imgIndex + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* Decorative Elements */}
                                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 animate-pulse" />
                                <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-gradient-to-r from-magenta-500 to-yellow-500 animate-pulse" style={{ animationDelay: '1s' }} />
                            </div>

                            {/* Connection Line to Next Event */}
                            {index < timelineEvents.length - 1 && (
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute left-7 top-16 w-px h-20 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent origin-top"
                                />
                            )}
                        </motion.div>
                    ))}

                    {/* Timeline End Marker */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="relative"
                    >
                        <div className="absolute left-4 w-8 h-8 rounded-full border-4 border-background cyberpunk-bg flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 animate-pulse" />
                        </div>
                        <div className="ml-20 text-center">
                            <p className="text-muted-foreground italic">
                                Perjalanan masih berlanjut... 🚀
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}