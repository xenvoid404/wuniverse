export interface TimelineEvent {
    id: string;
    year: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    images?: string[];
}

export const timelineEvents: TimelineEvent[] = [
    {
        id: '1',
        year: 2020,
        title: 'Pertama Kali Bermain',
        description: 'Awal mula pertemanan virtual kami. Dimulai dari server random, meeting stranger yang akhirnya menjadi sahabat. Dari yang awalnya awkward, perlahan mulai akrab dan sering main bareng. Game menjadi alasan kita untuk selalu online dan menghabiskan waktu bersama.',
        icon: '🎮',
        color: 'var(--neon-cyan)',
        images: [
            'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=400&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop&crop=center'
        ]
    },
    {
        id: '2', 
        year: 2021,
        title: 'Membangun Memory',
        description: 'Masa-masa golden era pertemanan kita. Membuat base mega bersama, adventure ke berbagai tempat, night gaming session yang tak terlupakan. Dari sini chemistry kita mulai terbentuk, jokes inside, tradisi gaming, dan moment-moment spontan yang bikin kita makin deket.',
        icon: '🏗️',
        color: 'var(--neon-magenta)',
        images: [
            '/images/timeline/building-memories-1.jpg',
            '/images/timeline/building-memories-2.jpg',
            '/images/timeline/building-memories-3.jpg'
        ]
    },
    {
        id: '3',
        year: 2023,
        title: 'Perpisahan',
        description: 'Momen yang paling berat. Satu per satu mulai sibuk dengan real life, kuliah, kerja, dan tanggung jawab masing-masing. Gaming session yang dulu rutin jadi jarang, chat group yang dulu rame jadi sepi. Tapi pertemanan tetap terjalin, walau dalam bentuk yang berbeda. Kenangan indah tetap tersimpan.',
        icon: '👋',
        color: 'var(--neon-yellow)',
        images: [
            '/images/timeline/farewell-1.jpg',
            '/images/timeline/farewell-2.jpg'
        ]
    }
];