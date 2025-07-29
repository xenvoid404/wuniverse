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
        title: 'Nostalgic Nights',
        artist: 'Memory Lane',
        fileName: 'nostalgic-nights.mp3',
        duration: '3:45',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        memories: ['Malam pertama main bareng', 'Sesi gaming marathon']
    },
    {
        id: '2', 
        title: 'Digital Dreams',
        artist: 'Cyber Friends',
        fileName: 'digital-dreams.mp3',
        duration: '4:12',
        cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&crop=center',
        memories: ['Build base pertama kali', 'Adventure di dunia baru']
    },
    {
        id: '3',
        title: 'Friendship Forever',
        artist: 'Unity Sounds',
        fileName: 'friendship-forever.mp3',
        duration: '3:28',
        cover: '/images/music-covers/friendship-forever.jpg',
        memories: ['Momen perpisahan', 'Janji untuk selalu berteman']
    },
    {
        id: '4',
        title: 'Virtual Memories',
        artist: 'Pixel Hearts',
        fileName: 'virtual-memories.mp3',
        duration: '4:01',
        cover: '/images/music-covers/virtual-memories.jpg',
        memories: ['Screenshot bersama', 'Moment random yang lucu']
    },
    {
        id: '5',
        title: 'Gaming Nights',
        artist: 'Controller Beats',
        fileName: 'gaming-nights.mp3',
        duration: '3:33',
        cover: '/images/music-covers/gaming-nights.jpg',
        memories: ['Turnamen mini', 'Voice chat sampai pagi']
    }
];