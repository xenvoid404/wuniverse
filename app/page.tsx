import { AlbumSection } from '@/components/home/album-section';
import { HeroSection } from '@/components/home/hero-section';
import { MusicPlayerSection } from '@/components/home/music-player-section';

export default function Home() {
    return (
        <>
            <HeroSection />
            <AlbumSection />
            <MusicPlayerSection />
        </>
    );
}
