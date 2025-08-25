import Image from 'next/image';

export default function Home() {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-foreground">
            <div className="text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-montserrat font-black text-primary mb-6">Eclipse of Illusions</h1>
            </div>
        </section>
    );
}
