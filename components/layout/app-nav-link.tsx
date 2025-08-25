import Link from 'next/link';
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
