import type { Metadata, Viewport } from 'next';
import { type ReactNode } from 'react';
import { Rajdhani } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '@/contexts/theme-provider';
import AppLayout from '@/layouts/app-layout';
import './globals.css';

const rajdhani = Rajdhani({
    variable: '--font-rajdhani',
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#8b5cf6' },
        { media: '(prefers-color-scheme: dark)', color: '#a855f7' }
    ]
};

export const metadata: Metadata = {
    metadataBase: new URL('https://wuniverse.web.id'),
    title: {
        default: 'Wuniverse - Memory Keeper of Friendship',
        template: '%s | Wuniverse'
    },
    description:
        'Wuniverse adalah tempat untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman. Simpan momen berharga, dengarkan musik favorit, dan jelajahi timeline pertemanan yang tak terlupakan.',
    keywords: [
        'memory keeper',
        'photo album',
        'friendship memories',
        'kenangan teman',
        'album foto',
        'musik kenangan',
        'timeline pertemanan',
        'foto lama',
        'memory fragments',
        'friendship timeline',
        'photo gallery',
        'music player',
        'friends network',
        'wuniverse',
        'cyberpunk memories'
    ],
    authors: [{ name: 'Xenvoid', url: 'https://github.com/xenvoid404' }],
    creator: 'Xenvoid',
    publisher: 'Wuniverse',
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: 'https://wuniverse.web.id'
    },
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://wuniverse.web.id',
        siteName: 'Wuniverse',
        title: 'Wuniverse - Memory Keeper of Friendship',
        description:
            'Tempat untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman. Simpan momen berharga dan jelajahi timeline pertemanan yang tak terlupakan.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Wuniverse - Memory Keeper of Friendship'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wuniverse - Memory Keeper of Friendship',
        description:
            'Tempat untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman. Simpan momen berharga dan jelajahi timeline pertemanan yang tak terlupakan.',
        images: ['/og-image.png'],
        creator: '@xenvoid404'
    },
    category: 'Technology',
    classification: 'Developer Tools',
    other: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Wuniverse',
        'google-site-verification': 'your-google-verification-code-here'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    // JSON-LD structured data for the website
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Wuniverse',
        description:
            'Platform untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman dengan fitur music player dan timeline pertemanan.',
        url: 'https://wuniverse.web.id',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate:
                    'https://wuniverse.web.id/memories?search={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Wuniverse',
            url: 'https://wuniverse.web.id',
            logo: {
                '@type': 'ImageObject',
                url: 'https://wuniverse.web.id/logo.png'
            },
            sameAs: ['https://github.com/xenvoid404']
        },
        mainEntity: {
            '@type': 'ItemList',
            name: 'Memory Collection',
            description:
                'Koleksi kenangan dan foto-foto bersama teman',
            numberOfItems: 0,
            itemListElement: [
                {
                    '@type': 'CreativeWork',
                    name: 'Memory Fragments',
                    description:
                        'Album foto kenangan bersama teman-teman',
                    url: 'https://wuniverse.web.id/memories',
                    genre: 'Photography'
                }
            ]
        }
    };

    return (
        <html lang="id" className="scroll-smooth" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svgxml" />
                <link rel="apple-touch-icon" href="/favicon-180.png" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta
                    name="google-site-verification"
                    content="your-google-verification-code-here"
                />

                {/* JSON-LD structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${rajdhani.variable} font-rajdhani antialiased bg-background text-foreground`}
            >
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XXXXXXXXXX');
                    `}
                </Script>

                <ThemeProvider>
                    <AppLayout>{children}</AppLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
