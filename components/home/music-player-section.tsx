import { FaMusic, FaPause, FaPlay, FaForward, FaBackward } from 'react-icons/fa';

export function MusicPlayerSection() {
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
                                <img src="/vintage-music-album-cover.png" alt="Album Cover" className="w-15 h-15 rounded-lg" />
                                <div>
                                    <h3 className="font-semibold text-lg">Kenangan Indah</h3>
                                    <p className="text-white/80">Various Artists</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <FaBackward />
                                </button>
                                <button className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                                    <FaPause />
                                </button>
                                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <FaForward />
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
    );
}
