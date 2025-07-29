export interface Soundtrack {
    id: string;
    title: string;
    artist: string;
    fileName: string;
    duration: string;
    cover?: string;
    memories?: string[];
}

export const soundtracks: Soundtrack[] = [
    {
        id: '1',
        title: 'Love Story',
        artist: 'Taylor Swift',
        fileName: 'love-story.mp3',
        duration: '3:57',
        cover: 'https://upload.wikimedia.org/wikipedia/id/0/01/Taylor_Swift_-_Love_Story.png',
        memories: ['Malam pertama main bareng', 'Sesi gaming marathon']
    }
];
