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
        coverPhoto: '/images/albums/first-meet/cover.jpg',
        photos: [
            {
                id: '1',
                url: '/images/albums/first-meet/photo1.jpg',
                alt: 'Screenshot pertama kali main bersama',
                description: 'Moment pertama kali kita semua online bareng'
            },
            {
                id: '2', 
                url: '/images/albums/first-meet/photo2.jpg',
                alt: 'Base pertama yang kita bangun',
                description: 'Base sederhana tapi penuh kenangan'
            },
            {
                id: '3',
                url: '/images/albums/first-meet/photo3.jpg',
                alt: 'Group photo pertama',
                description: 'Foto bersama pertama kali dengan skin random'
            }
        ],
        friends: [
            { id: '1', name: 'Alex', avatar: '/images/friends/alex.jpg' },
            { id: '2', name: 'Maya', avatar: '/images/friends/maya.jpg' },
            { id: '3', name: 'Rio', avatar: '/images/friends/rio.jpg' }
        ],
        tags: ['first meeting', 'gaming', 'friendship', 'memories']
    },
    {
        id: '2',
        title: 'Adventure Besar',
        year: 2021,
        description: 'Petualangan epik kita menjelajahi dunia virtual. Dari build megah sampai boss fight yang intens.',
        coverPhoto: '/images/albums/big-adventure/cover.jpg',
        photos: [
            {
                id: '4',
                url: '/images/albums/big-adventure/photo1.jpg',
                alt: 'Castle yang kita bangun bersama',
                description: 'Hasil kerja keras selama berminggu-minggu'
            },
            {
                id: '5',
                url: '/images/albums/big-adventure/photo2.jpg', 
                alt: 'Boss fight epic',
                description: 'Teamwork makes the dream work!'
            },
            {
                id: '6',
                url: '/images/albums/big-adventure/photo3.jpg',
                alt: 'Victory celebration',
                description: 'Selebrasi setelah mengalahkan boss tersulit'
            },
            {
                id: '7',
                url: '/images/albums/big-adventure/photo4.jpg',
                alt: 'Exploring new lands',
                description: 'Menjelajahi area baru yang kita temukan'
            }
        ],
        friends: [
            { id: '1', name: 'Alex', avatar: '/images/friends/alex.jpg' },
            { id: '2', name: 'Maya', avatar: '/images/friends/maya.jpg' },
            { id: '3', name: 'Rio', avatar: '/images/friends/rio.jpg' },
            { id: '4', name: 'Sam', avatar: '/images/friends/sam.jpg' }
        ],
        tags: ['adventure', 'teamwork', 'building', 'exploration']
    },
    {
        id: '3',
        title: 'Momen Random & Lucu',
        year: 2022,
        description: 'Kumpulan momen random dan lucu yang terjadi selama kita main. Dari bug aneh sampai kejadian unexpected.',
        coverPhoto: '/images/albums/funny-moments/cover.jpg',
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