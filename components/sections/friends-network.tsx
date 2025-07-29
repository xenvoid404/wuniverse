'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaDiscord, FaTwitch, FaReddit, FaSteam, FaPinterest, FaTiktok } from 'react-icons/fa';
import { SiDeviantart } from 'react-icons/si';
import { friends, type FriendProfile } from '@/data/friends';

export function FriendsNetwork() {
    const [selectedFriend, setSelectedFriend] = useState<FriendProfile | null>(null);

    const openFriendModal = (friend: FriendProfile) => {
        setSelectedFriend(friend);
    };

    const closeFriendModal = () => {
        setSelectedFriend(null);
    };

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <FaInstagram />;
            case 'whatsapp': return <FaWhatsapp />;
            case 'facebook': return <FaFacebook />;
            case 'twitter': return <FaTwitter />;
            case 'discord': return <FaDiscord />;
            case 'twitch': return <FaTwitch />;
            case 'reddit': return <FaReddit />;
            case 'steam': return <FaSteam />;
            case 'pinterest': return <FaPinterest />;
            case 'tiktok': return <FaTiktok />;
            case 'deviantart': return <SiDeviantart />;
            default: return <FaInstagram />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'offline': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="friends-network" className="py-20 px-6 sm:px-8 lg:px-12 cyberpunk-bg">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-gradient-cyberpunk">Friends Network</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Teman-teman yang telah berbagi momen indah bersama dalam perjalanan gaming kita
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {friends.map((friend) => (
                        <motion.div
                            key={friend.id}
                            variants={cardVariants}
                            className="cyberpunk-card rounded-2xl overflow-hidden cursor-pointer group backdrop-blur-sm hover:shadow-neon transition-all duration-300"
                            onClick={() => openFriendModal(friend)}
                        >
                            <div className="relative p-6">
                                {/* Avatar */}
                                <div className="relative mx-auto w-24 h-24 mb-4">
                                    <img 
                                        src={friend.avatar} 
                                        alt={friend.nickname}
                                        className="w-full h-full rounded-full object-cover neon-border"
                                    />
                                    {/* Status Indicator */}
                                    <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(friend.status)}`} />
                                </div>

                                {/* Name */}
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-bold text-gradient-cyberpunk mb-1">
                                        {friend.nickname}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {friend.fullName}
                                    </p>
                                </div>

                                {/* Bio */}
                                <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3">
                                    {friend.bio}
                                </p>

                                {/* Favorite Games */}
                                <div className="flex flex-wrap gap-1 justify-center mb-4">
                                    {friend.favoriteGames.slice(0, 3).map((game, index) => (
                                        <span 
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/30"
                                        >
                                            {game}
                                        </span>
                                    ))}
                                </div>

                                {/* Social Links Preview */}
                                <div className="flex justify-center gap-2">
                                    {friend.socialLinks.slice(0, 3).map((social, index) => (
                                        <div 
                                            key={index}
                                            className="p-2 rounded-lg cyberpunk-card text-cyan-400 hover:shadow-neon transition-all duration-300"
                                        >
                                            {getSocialIcon(social.platform)}
                                        </div>
                                    ))}
                                    {friend.socialLinks.length > 3 && (
                                        <div className="p-2 rounded-lg cyberpunk-card text-muted-foreground">
                                            +{friend.socialLinks.length - 3}
                                        </div>
                                    )}
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-magenta-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Friend Profile Modal */}
                <AnimatePresence>
                    {selectedFriend && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                            onClick={closeFriendModal}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="relative max-w-2xl w-full max-h-[90vh] cyberpunk-card rounded-2xl overflow-hidden backdrop-blur-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closeFriendModal}
                                    className="absolute top-4 right-4 z-10 p-2 rounded-full cyberpunk-card neon-border hover:shadow-neon transition-all duration-300"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>

                                <div className="overflow-y-auto max-h-[90vh]">
                                    {/* Header */}
                                    <div className="relative p-8 text-center bg-gradient-to-br from-cyan-500/10 to-magenta-500/10">
                                        <div className="relative mx-auto w-32 h-32 mb-6">
                                            <img 
                                                src={selectedFriend.avatar} 
                                                alt={selectedFriend.nickname}
                                                className="w-full h-full rounded-full object-cover neon-border"
                                            />
                                            <div className={`absolute bottom-4 right-4 w-6 h-6 rounded-full border-4 border-background ${getStatusColor(selectedFriend.status)}`} />
                                        </div>

                                        <h2 className="text-3xl font-bold text-gradient-cyberpunk mb-2">
                                            {selectedFriend.nickname}
                                        </h2>
                                        <p className="text-lg text-muted-foreground mb-4">
                                            {selectedFriend.fullName}
                                        </p>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedFriend.bio}
                                        </p>
                                    </div>

                                    <div className="p-8">
                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="text-center cyberpunk-card p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-gradient-cyberpunk">
                                                    {new Date(selectedFriend.joinDate).getFullYear()}
                                                </div>
                                                <div className="text-sm text-muted-foreground">Joined</div>
                                            </div>
                                            <div className="text-center cyberpunk-card p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-gradient-cyberpunk">
                                                    {selectedFriend.achievements.length}
                                                </div>
                                                <div className="text-sm text-muted-foreground">Achievements</div>
                                            </div>
                                        </div>

                                        {/* Favorite Games */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold mb-4">Favorite Games</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedFriend.favoriteGames.map((game, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-2 rounded-lg cyberpunk-card neon-border"
                                                    >
                                                        {game}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Memories */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold mb-4">Memorable Moments</h3>
                                            <div className="space-y-2">
                                                {selectedFriend.memories.map((memory, index) => (
                                                    <div key={index} className="p-3 cyberpunk-card rounded-lg">
                                                        <p className="text-sm">{memory}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Achievements */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold mb-4">Achievements</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedFriend.achievements.map((achievement, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                                                    >
                                                        🏆 {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Personality Traits */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold mb-4">Personality</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedFriend.personalityTraits.map((trait, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                                                    >
                                                        {trait}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div>
                                            <h3 className="text-lg font-bold mb-4">Connect</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {selectedFriend.socialLinks.map((social, index) => (
                                                    <a
                                                        key={index}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 p-3 cyberpunk-card rounded-lg hover:shadow-neon transition-all duration-300"
                                                    >
                                                        <div className="text-xl">
                                                            {getSocialIcon(social.platform)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{social.platform}</div>
                                                            <div className="text-sm text-muted-foreground">{social.username}</div>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}