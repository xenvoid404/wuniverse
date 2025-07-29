'use client';

interface PlaceholderImageProps {
    width: number;
    height: number;
    text?: string;
    className?: string;
}

export function PlaceholderImage({ width, height, text = 'Image', className = '' }: PlaceholderImageProps) {
    return (
        <div 
            className={`bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 flex items-center justify-center text-muted-foreground ${className}`}
            style={{ width, height }}
        >
            <div className="text-center">
                <div className="text-sm opacity-75">{text}</div>
                <div className="text-xs opacity-50">{width}x{height}</div>
            </div>
        </div>
    );
}