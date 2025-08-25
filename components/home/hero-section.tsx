import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export function HeroSection() {
    return (
        <section
            id="home"
            className="min-h-svh flex items-center justify-center bg-gradient-to-br from-background dark:to-secondary/20 to-primary/20"
        >
            <div className="text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-montserrat font-black text-primary mb-6">Eclipse of Illusions</h1>
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 font-opensans">
                    Mari kita buka kembali lembaran lama yang nyaris terlupakan. Temukan potongan kecil dari hidupmu karena di sinilah, kenangan itu
                    masih menunggu untuk dikenang kembali.
                </p>
                <div>
                    <Link href="#music">
                        <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl shadow-lg dark:hover:shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
                            <span className="relative z-10">Explore Now</span>
                            <FaArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
