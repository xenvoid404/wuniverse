export interface SocialLink {
    platform: string;
    username: string;
    url: string;
    icon: string;
}

export interface FriendProfile {
    id: string;
    nickname: string;
    fullName: string;
    avatar: string;
    bio: string;
    joinDate: string;
    status: 'online' | 'offline' | 'away';
    favoriteGames: string[];
    socialLinks: SocialLink[];
    memories: string[];
    achievements: string[];
    personalityTraits: string[];
}

export const friends: FriendProfile[] = [
    {
        id: '1',
        nickname: 'Alex',
        fullName: 'Alexander Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Strategist sejati yang selalu punya plan untuk setiap situasi. Master builder dan problem solver dalam grup.',
        joinDate: '2020-03-15',
        status: 'online',
        favoriteGames: ['Minecraft', 'League of Legends', 'Valorant'],
        socialLinks: [
            {
                platform: 'Instagram',
                username: '@alex.chen',
                url: 'https://instagram.com/alex.chen',
                icon: '📷'
            },
            {
                platform: 'WhatsApp',
                username: '+62812345678',
                url: 'https://wa.me/62812345678',
                icon: '💬'
            },
            {
                platform: 'Discord',
                username: 'AlexChen#1234',
                url: 'https://discord.com/users/alex',
                icon: '🎮'
            }
        ],
        memories: [
            'Arsitek utama base mega kita',
            'Yang selalu nyiapin strategi boss fight',
            'Master redstone engineering'
        ],
        achievements: [
            'Best Builder 2021',
            'Strategic Mind',
            'Team Leader'
        ],
        personalityTraits: ['Strategic', 'Patient', 'Creative', 'Reliable']
    },
    {
        id: '2',
        nickname: 'Maya',
        fullName: 'Maya Sari',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        bio: 'Comic relief of the group! Selalu bisa bikin suasana ceria dan punya energy yang unlimited.',
        joinDate: '2020-04-02',
        status: 'away',
        favoriteGames: ['Among Us', 'Fall Guys', 'Animal Crossing'],
        socialLinks: [
            {
                platform: 'Instagram',
                username: '@maya.sari',
                url: 'https://instagram.com/maya.sari',
                icon: '📷'
            },
            {
                platform: 'TikTok',
                username: '@mayasari',
                url: 'https://tiktok.com/@mayasari',
                icon: '🎵'
            },
            {
                platform: 'WhatsApp',
                username: '+62823456789',
                url: 'https://wa.me/62823456789',
                icon: '💬'
            }
        ],
        memories: [
            'Prank master yang bikin kita ngakak',
            'Yang pertama nyapa di voice chat',
            'Photographer grup (banyak screenshot lucu)'
        ],
        achievements: [
            'Comedy Queen',
            'Social Butterfly',
            'Mood Maker'
        ],
        personalityTraits: ['Funny', 'Energetic', 'Social', 'Spontaneous']
    },
    {
        id: '3',
        nickname: 'Rio',
        fullName: 'Rio Pratama',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        bio: 'Competitive gamer yang skill-nya di atas rata-rata. Carry team di PvP tapi humble banget.',
        joinDate: '2020-03-20',
        status: 'offline',
        favoriteGames: ['CSGO', 'Apex Legends', 'Rocket League'],
        socialLinks: [
            {
                platform: 'Instagram',
                username: '@rio.pratama',
                url: 'https://instagram.com/rio.pratama',
                icon: '📷'
            },
            {
                platform: 'Twitch',
                username: 'RioPratama',
                url: 'https://twitch.tv/riopratama',
                icon: '🎮'
            },
            {
                platform: 'Facebook',
                username: 'Rio Pratama',
                url: 'https://facebook.com/rio.pratama',
                icon: '👥'
            }
        ],
        memories: [
            'Clutch master di competitive match',
            'Yang ngajarin kita jadi better player',
            'Training partner yang sabar'
        ],
        achievements: [
            'MVP Player',
            'Skill Master',
            'Team Carry'
        ],
        personalityTraits: ['Competitive', 'Skilled', 'Humble', 'Dedicated']
    },
    {
        id: '4',
        nickname: 'Sam',
        fullName: 'Samuel Wright',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Collector dan explorer sejati. Tau semua easter egg dan secret di game manapun.',
        joinDate: '2020-05-10',
        status: 'online',
        favoriteGames: ['Skyrim', 'Witcher 3', 'Hollow Knight'],
        socialLinks: [
            {
                platform: 'Steam',
                username: 'SamuelW',
                url: 'https://steamcommunity.com/id/samuelw',
                icon: '🎮'
            },
            {
                platform: 'Reddit',
                username: 'u/SamWright',
                url: 'https://reddit.com/u/samwright',
                icon: '📱'
            },
            {
                platform: 'Discord',
                username: 'SamWright#5678',
                url: 'https://discord.com/users/sam',
                icon: '🎮'
            }
        ],
        memories: [
            'Guide master untuk setiap game baru',
            'Yang nemuin semua secret location',
            'Database walking untuk tips and tricks'
        ],
        achievements: [
            'Explorer',
            'Game Guide',
            'Secret Finder'
        ],
        personalityTraits: ['Curious', 'Knowledgeable', 'Patient', 'Analytical']
    },
    {
        id: '5',
        nickname: 'Luna',
        fullName: 'Luna Wijaya',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        bio: 'Creative soul yang bikin konten keren. Artist grup yang selalu bikin fan art dari moment kita.',
        joinDate: '2020-06-15',
        status: 'away',
        favoriteGames: ['Genshin Impact', 'Stardew Valley', 'Journey'],
        socialLinks: [
            {
                platform: 'Instagram',
                username: '@luna.wijaya.art',
                url: 'https://instagram.com/luna.wijaya.art',
                icon: '📷'
            },
            {
                platform: 'DeviantArt',
                username: 'LunaWijaya',
                url: 'https://deviantart.com/lunawijaya',
                icon: '🎨'
            },
            {
                platform: 'Pinterest',
                username: 'Luna Wijaya',
                url: 'https://pinterest.com/lunawijaya',
                icon: '📌'
            }
        ],
        memories: [
            'Bikin fan art dari screenshot kita',
            'Creative director untuk project grup',
            'Yang bikin skin custom untuk semua'
        ],
        achievements: [
            'Creative Artist',
            'Design Master',
            'Fan Art Creator'
        ],
        personalityTraits: ['Creative', 'Artistic', 'Imaginative', 'Gentle']
    }
];