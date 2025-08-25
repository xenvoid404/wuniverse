import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#music', label: 'Music' },
    { href: '#albums', label: 'Albums' },
    { href: '#timeline', label: 'Timeline' }
];

interface AppNavLinkProps extends ComponentProps<'nav'> {
    linkClassName?: string;
    onLinkClick?: () => void;
}

export function AppSidebarMenu() {
    const menuContainerAnimate = {
        open: { transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
        close: { transition: { delayChildren: 0.07, staggerChildren: -1 } }
    };

    const menuItemAnimate = {
        open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
        close: { x: 25, opacity: 0 }
    };

    return (
        <motion.nav
            key="menu-container"
            className="flex flex-col items-center gap-8 w-full"
            variants={menuContainerAnimate}
            initial="close"
            animate="open"
            exit="close"
        >
            {navLinks.map((link, index) => (
                <motion.div key={index} className="w-full text-center" variants={menuItemAnimate}>
                    <Link href={link.href} className="text-2xl font-bold font-opensans text-foreground py-3 hover:scale-110 hover:text-accent">
                        {link.label}
                    </Link>
                </motion.div>
            ))}
        </motion.nav>
    );
}

export function AppNavLink({ className, linkClassName, onLinkClick, ...props }: NavigationLinksProps) {
    return (
        <nav className={className} {...props}>
            {navLinks.map((link, index) => (
                <Link
                    key={index}
                    href={link.href}
                    onClick={onLinkClick}
                    className={cn('text-foreground hover:text-primary transition-colors', linkClassName)}
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
