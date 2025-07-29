export interface Friend {
    id: string;
    name: string;
    avatar: string;
}

export interface Photo {
    id: string;
    url: string;
    alt: string;
    description?: string;
}

export interface Album {
    id: string;
    title: string;
    year: number;
    description: string;
    coverPhoto: string;
    photos: Photo[];
    friends: Friend[];
    tags: string[];
}

export const albums: Album[] = [
    {
        id: '1',
        title: 'Pertama Kali Bertemu',
        year: 2020,
        description: 'Kenangan pertama kali kita semua berkumpul dan mulai bermain bersama. Dari stranger menjadi best friends.',
        coverPhoto: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=400&h=300&fit=crop&crop=center',
        photos: [
            {
                id: '1',
                url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop&crop=center',
                alt: 'Screenshot pertama kali main bersama',
                description: 'Moment pertama kali kita semua online bareng'
            },
            {
                id: '2', 
                url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=300&fit=crop&crop=center',
                alt: 'Base pertama yang kita bangun',
                description: 'Base sederhana tapi penuh kenangan'
            },
            {
                id: '3',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center',
                alt: 'Group photo pertama',
                description: 'Foto bersama pertama kali dengan skin random'
            }
        ],
        friends: [
            { id: '1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
            { id: '2', name: 'Maya', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
            { id: '3', name: 'Rio', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' }
        ],
        tags: ['first meeting', 'gaming', 'friendship', 'memories']
    },
    {
        id: '2',
        title: 'Adventure Besar',
        year: 2021,
        description: 'Petualangan epik kita menjelajahi dunia virtual. Dari build megah sampai boss fight yang intens.',
        coverPhoto: 'https://images.unsplash.com/photo-1570303345338-e1f0eddf2e4d?w=400&h=300&fit=crop&crop=center',
        photos: [
            {
                id: '4',
                url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&crop=center',
                alt: 'Castle yang kita bangun bersama',
                description: 'Hasil kerja keras selama berminggu-minggu'
            },
            {
                id: '5',
                url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center', 
                alt: 'Boss fight epic',
                description: 'Teamwork makes the dream work!'
            },
            {
                id: '6',
                url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop&crop=center',
                alt: 'Victory celebration',
                description: 'Selebrasi setelah mengalahkan boss tersulit'
            },
            {
                id: '7',
                url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=300&fit=crop&crop=center',
                alt: 'Exploring new lands',
                description: 'Menjelajahi area baru yang kita temukan'
            }
        ],
        friends: [
            { id: '1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
            { id: '2', name: 'Maya', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
            { id: '3', name: 'Rio', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
            { id: '4', name: 'Sam', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }
        ],
        tags: ['adventure', 'teamwork', 'building', 'exploration']
    },
    {
        id: '3',
        title: 'Momen Random & Lucu',
        year: 2022,
        description: 'Kumpulan momen random dan lucu yang terjadi selama kita main. Dari bug aneh sampai kejadian unexpected.',
        coverPhoto: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop&crop=center',
        photos: [
            {
                id: '8',
                url: '/images/albums/funny-moments/photo1.jpg',
                alt: 'Bug lucu yang kita temukan',
                description: 'Ketika karakter kita stuck di tembok'
            },
            {
                id: '9',
                url: '/images/albums/funny-moments/photo2.jpg',
                alt: 'Fail compilation',
                description: 'Percobaan jump yang gagal total'
            },
            {
                id: '10',
                url: '/images/albums/funny-moments/photo3.jpg',
                alt: 'Costume party virtual',
                description: 'Pesta kostum dadakan dengan skin random'
            },
            {
                id: '11',
                url: '/images/albums/funny-moments/photo4.jpg',
                alt: 'Prank war',
                description: 'Perang prank yang berujung chaos'
            },
            {
                id: '12',
                url: '/images/albums/funny-moments/photo5.jpg',
                alt: 'Dance party',
                description: 'Dance party spontan di middle of nowhere'
            }
        ],
        friends: [
            { id: '1', name: 'Alex', avatar: '/images/friends/alex.jpg' },
            { id: '2', name: 'Maya', avatar: '/images/friends/maya.jpg' },
            { id: '3', name: 'Rio', avatar: '/images/friends/rio.jpg' },
            { id: '4', name: 'Sam', avatar: '/images/friends/sam.jpg' },
            { id: '5', name: 'Luna', avatar: '/images/friends/luna.jpg' }
        ],
        tags: ['funny', 'random', 'comedy', 'spontaneous']
    },
    {
        id: '4',
        title: 'Last Session Together',
        year: 2023,
        description: 'Sesi terakhir sebelum kita semua mulai sibuk dengan kehidupan masing-masing. Kenangan yang tak terlupakan.',
        coverPhoto: '/images/albums/last-session/cover.jpg',
        photos: [
            {
                id: '13',
                url: '/images/albums/last-session/photo1.jpg',
                alt: 'Group photo terakhir',
                description: 'Foto bersama di tempat favorit kita'
            },
            {
                id: '14',
                url: '/images/albums/last-session/photo2.jpg',
                alt: 'Monument kenangan',
                description: 'Monument yang kita bangun sebagai kenangan'
            },
            {
                id: '15',
                url: '/images/albums/last-session/photo3.jpg',
                alt: 'Sunset together',
                description: 'Menikmati sunset virtual untuk terakhir kali'
            }
        ],
        friends: [
            { id: '1', name: 'Alex', avatar: '/images/friends/alex.jpg' },
            { id: '2', name: 'Maya', avatar: '/images/friends/maya.jpg' },
            { id: '3', name: 'Rio', avatar: '/images/friends/rio.jpg' },
            { id: '4', name: 'Sam', avatar: '/images/friends/sam.jpg' },
            { id: '5', name: 'Luna', avatar: '/images/friends/luna.jpg' }
        ],
        tags: ['farewell', 'memories', 'friendship', 'nostalgia']
    }
];