'use client';

import { useState, useEffect } from 'react';

export default function Page() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState('');

    useEffect(() => {
        // Smooth scrolling for navigation links
        const handleAnchorClick = (e: Event) => {
            const target = e.target as HTMLAnchorElement;
            if (target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(target.getAttribute('href')!);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    const openModal = (modalId: string) => {
        setCurrentModal(modalId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentModal('');
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // Sample photo data
    const albumData: Record<string, { title: string; photos: string[] }> = {
        modal1: {
            title: 'Keluarga Bahagia',
            photos: [
                '/happy-family-photo-1.png',
                '/happy-family-photo-2.png',
                '/happy-family-photo-3.png',
                '/happy-family-photo-4.png',
                '/happy-family-photo-5.png',
                '/happy-family-photo-6.png'
            ]
        },
        modal2: {
            title: 'Adventure Time',
            photos: [
                '/travel-adventure-photo-1.png',
                '/travel-adventure-photo-2.png',
                '/travel-adventure-photo-3.png',
                '/travel-adventure-photo-4.png'
            ]
        },
        modal3: {
            title: 'Graduation Day',
            photos: ['/graduation-ceremony-photo-1.png', '/graduation-ceremony-photo-2.png', '/graduation-ceremony-photo-3.png']
        }
    };

    return (
        <div className="bg-background text-foreground font-opensans transition-colors duration-300">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Open+Sans:wght@400;600&display=swap');
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

                .font-montserrat {
                    font-family: 'Montserrat', sans-serif;
                }
                .font-opensans {
                    font-family: 'Open Sans', sans-serif;
                }
                .glass-effect {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.1);
                }
                .vintage-shadow {
                    box-shadow: 0 8px 32px rgba(161, 98, 7, 0.1);
                }
                .music-player-gradient {
                    background: linear-gradient(135deg, #a16207 0%, #d97706 100%);
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-montserrat font-black text-primary">Wuniverse</h1>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-foreground hover:text-primary transition-colors">
                                Home
                            </a>
                            <a href="#albums" className="text-foreground hover:text-primary transition-colors">
                                Albums
                            </a>
                            <a href="#music" className="text-foreground hover:text-primary transition-colors">
                                Music
                            </a>
                            <a href="#friends" className="text-foreground hover:text-primary transition-colors">
                                Friends
                            </a>
                        </div>

                        {/* Theme Toggle & Mobile Menu */}
                        <div className="flex items-center space-x-4">
                            <button onClick={toggleTheme} className="p-2 rounded-lg bg-card hover:bg-accent transition-colors">
                                <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-primary`}></i>
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                            >
                                <i className="fas fa-bars text-primary"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-card border-t border-border`}>
                    <div className="px-4 py-2 space-y-2">
                        <a href="#home" className="block py-2 text-foreground hover:text-primary transition-colors">
                            Home
                        </a>
                        <a href="#albums" className="block py-2 text-foreground hover:text-primary transition-colors">
                            Albums
                        </a>
                        <a href="#music" className="block py-2 text-foreground hover:text-primary transition-colors">
                            Music
                        </a>
                        <a href="#friends" className="block py-2 text-foreground hover:text-primary transition-colors">
                            Friends
                        </a>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className="fixed left-0 top-16 h-full w-64 bg-sidebar border-r border-sidebar-border transform -translate-x-full md:translate-x-0 transition-transform duration-300 z-40">
                <div className="p-6">
                    <h3 className="text-lg font-montserrat font-black text-sidebar-foreground mb-4">Quick Access</h3>
                    <nav className="space-y-2">
                        <a href="#recent" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors">
                            <i className="fas fa-clock text-sidebar-primary"></i>
                            <span className="text-sidebar-foreground">Recent Memories</span>
                        </a>
                        <a href="#favorites" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors">
                            <i className="fas fa-heart text-sidebar-primary"></i>
                            <span className="text-sidebar-foreground">Favorit Saya</span>
                        </a>
                        <a href="#shared" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors">
                            <i className="fas fa-share text-sidebar-primary"></i>
                            <span className="text-sidebar-foreground">Shared Albums</span>
                        </a>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 pt-16">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
                    <div className="text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-montserrat font-black text-primary mb-6">Welcome to Wuniverse</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-opensans">
                            Tempat di mana kenangan masa lalu bertemu dengan teknologi modern.
                            <br />
                            <span className="text-primary">Your memories, your universe.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors vintage-shadow">
                                Explore Memories
                            </button>
                            <button className="px-8 py-4 bg-card text-card-foreground border border-border rounded-lg font-semibold hover:bg-accent transition-colors">
                                Create Album
                            </button>
                        </div>
                    </div>
                </section>

                {/* Music Player */}
                <section id="music" className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                            <i className="fas fa-music text-primary mr-3"></i>
                            Soundtrack Kenangan
                        </h2>

                        <div className="bg-card rounded-2xl p-8 vintage-shadow">
                            <div className="music-player-gradient rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <img src="/vintage-music-album-cover.png" alt="Album Cover" className="w-15 h-15 rounded-lg" />
                                        <div>
                                            <h3 className="font-semibold text-lg">Kenangan Indah</h3>
                                            <p className="text-white/80">Various Artists</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                            <i className="fas fa-backward"></i>
                                        </button>
                                        <button
                                            onClick={togglePlayPause}
                                            className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                                        >
                                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                                        </button>
                                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                            <i className="fas fa-forward"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-white/80">
                                        <span>2:34</span>
                                        <span>4:12</span>
                                    </div>
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div className="bg-white h-2 rounded-full w-3/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Photo Albums */}
                <section id="albums" className="py-16 px-4 bg-muted">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                            <i className="fas fa-images text-primary mr-3"></i>
                            Memory Albums
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Album 1 */}
                            <div
                                className="album-card bg-card rounded-xl overflow-hidden vintage-shadow hover:scale-105 transition-transform cursor-pointer"
                                onClick={() => openModal('modal1')}
                            >
                                <img src="/vintage-family-photo-album-cover.png" alt="Family Memories" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Keluarga Bahagia</h3>
                                    <p className="text-muted-foreground mb-4">Beautiful family moments from 2020-2023</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-primary">24 photos</span>
                                        <i className="fas fa-arrow-right text-primary"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Album 2 */}
                            <div
                                className="album-card bg-card rounded-xl overflow-hidden vintage-shadow hover:scale-105 transition-transform cursor-pointer"
                                onClick={() => openModal('modal2')}
                            >
                                <img src="/vintage-travel-memories-scrapbook.png" alt="Travel Memories" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Adventure Time</h3>
                                    <p className="text-muted-foreground mb-4">Petualangan seru ke berbagai tempat</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-primary">18 photos</span>
                                        <i className="fas fa-arrow-right text-primary"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Album 3 */}
                            <div
                                className="album-card bg-card rounded-xl overflow-hidden vintage-shadow hover:scale-105 transition-transform cursor-pointer"
                                onClick={() => openModal('modal3')}
                            >
                                <img src="/vintage-graduation-celebration-photos.png" alt="Graduation" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Graduation Day</h3>
                                    <p className="text-muted-foreground mb-4">Momen kelulusan yang tak terlupakan</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-primary">12 photos</span>
                                        <i className="fas fa-arrow-right text-primary"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Friend Network */}
                <section id="friends" className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-montserrat font-black text-center mb-12">
                            <i className="fas fa-users text-primary mr-3"></i>
                            Jaringan Pertemanan
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {/* Friend 1 */}
                            <div className="text-center">
                                <img
                                    src="/friendly-person-avatar.png"
                                    alt="Sarah"
                                    className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-primary"
                                />
                                <h4 className="font-semibold">Sarah</h4>
                                <p className="text-sm text-muted-foreground">Best Friend</p>
                                <div className="flex justify-center mt-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                </div>
                            </div>

                            {/* Friend 2 */}
                            <div className="text-center">
                                <img
                                    src="/happy-person-avatar.png"
                                    alt="Ahmad"
                                    className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-accent"
                                />
                                <h4 className="font-semibold">Ahmad</h4>
                                <p className="text-sm text-muted-foreground">College Buddy</p>
                                <div className="flex justify-center mt-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                </div>
                            </div>

                            {/* Friend 3 */}
                            <div className="text-center">
                                <img
                                    src="/smiling-person-avatar.png"
                                    alt="Maya"
                                    className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-primary"
                                />
                                <h4 className="font-semibold">Maya</h4>
                                <p className="text-sm text-muted-foreground">Work Partner</p>
                                <div className="flex justify-center mt-2">
                                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                </div>
                            </div>

                            {/* Friend 4 */}
                            <div className="text-center">
                                <img
                                    src="/cheerful-person-avatar.png"
                                    alt="Budi"
                                    className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-accent"
                                />
                                <h4 className="font-semibold">Budi</h4>
                                <p className="text-sm text-muted-foreground">Childhood Friend</p>
                                <div className="flex justify-center mt-2">
                                    <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors">
                                Connect More Friends
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-card border-t border-border py-12 px-4 md:ml-64">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-montserrat font-black text-primary mb-4">Wuniverse</h3>
                            <p className="text-muted-foreground">Menyimpan kenangan indah dalam satu tempat yang aman dan mudah diakses.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>
                                    <a href="#home" className="hover:text-primary transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#albums" className="hover:text-primary transition-colors">
                                        Albums
                                    </a>
                                </li>
                                <li>
                                    <a href="#music" className="hover:text-primary transition-colors">
                                        Music
                                    </a>
                                </li>
                                <li>
                                    <a href="#friends" className="hover:text-primary transition-colors">
                                        Friends
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Connect With Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    <i className="fab fa-facebook text-xl"></i>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    <i className="fab fa-twitter text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
                        <p>&copy; 2024 Wuniverse. Made with ❤️ for preserving beautiful memories.</p>
                    </div>
                </div>
            </footer>

            {/* Photo Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-montserrat font-black">{albumData[currentModal]?.title || ''}</h3>
                                <button onClick={closeModal} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {albumData[currentModal]?.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo || '/placeholder.svg'}
                                        alt="Memory"
                                        className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
