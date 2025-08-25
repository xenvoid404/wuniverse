import { HeroSection } from '@/components/home/hero-section';
import { MusicPlayerSection } from '@/components/home/music-player-section';
import { AlbumSection } from '@/components/home/album-section';

export default function Home() {
    return (
        <>
            <HeroSection />
            <MusicPlayerSection />
            <AlbumSection />
        </>
    );
}
