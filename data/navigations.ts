import { type IconType } from 'react-icons';
import { FiGithub, FiMail, FiTwitter, FiLinkedin } from 'react-icons/fi';

interface Navigation {
    title: string;
    href: string;
    isExternal: boolean;
    icon?: IconType;
}

export const navigations: Navigation[] = [
    { title: 'Home', href: '/', isExternal: false },
    { title: 'About', href: '/about', isExternal: false },
    {
        title: 'GitHub',
        href: 'https://github.com/xenvoid404',
        isExternal: true,
        icon: FiGithub
    }
];

export const socials: Navigation[] = [
    {
        title: 'Github',
        href: 'https://github.com/xenvoid404',
        isExternal: true,
        icon: FiGithub
    },
    {
        title: 'Email',
        href: 'mailto:xenvoid404@gmail.com',
        isExternal: true,
        icon: FiMail
    },
    {
        title: 'Twitter',
        href: 'https://twitter.com/xenvoid404',
        isExternal: true,
        icon: FiTwitter
    },
    {
        title: 'LinkedIn',
        href: 'https://linkedin.com/in/xenvoid404',
        isExternal: true,
        icon: FiLinkedin
    }
];
