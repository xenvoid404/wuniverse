import { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { MemoryFragments } from '@/components/sections/memory-fragments';

export const metadata: Metadata = {
    title: 'Wuniverse - Simpan Kenangan Indah Bersama Teman',
    description:
        'Simpan dan kenang foto-foto indah bersama teman di Wuniverse. Dengarkan musik favorit, jelajahi album kenangan dalam tema cyberpunk yang menawan.',
    keywords: [
        'kenangan teman',
        'album foto',
        'music player',
        'galeri foto',
        'memory fragments',
        'friendship memories',
        'cyberpunk memories',
        'foto lama',
        'musik kenangan',
        'wuniverse',
        'memory keeper',
        'nostalgia',
        'dark theme'
    ],
    openGraph: {
        title: 'Wuniverse - Simpan Kenangan Indah Bersama Teman',
        description:
            'Simpan dan kenang foto-foto indah bersama teman di Wuniverse. Dengarkan musik favorit dan jelajahi album kenangan.',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Wuniverse - Memory Keeper of Friendship'
            }
        ]
    }
};

export default function HomePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Wuniverse - Memory Keeper of Friendship',
        description:
            'Platform untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman dengan fitur music player dalam tema cyberpunk yang menawan.',
        url: 'https://wuniverse.web.id',
        mainEntity: {
            '@type': 'Organization',
            name: 'Wuniverse',
            url: 'https://wuniverse.web.id',
            description:
                'Platform untuk menyimpan kenangan dan foto-foto bersama teman',
            foundingDate: '2024',
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Support',
                url: 'https://github.com/xenvoid404'
            }
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Beranda',
                    item: 'https://wuniverse.web.id'
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Skip Navigation Link for Accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
            >
                Skip to main content
            </a>

            {/* Main content */}
            <main id="main-content" className="flex flex-col">
                {/* Hero Section */}
                <Hero />

                {/* Memory Fragments Section */}
                <MemoryFragments />
            </main>
        </>
    );
}
