'use client';

interface TagsListProps {
    tags: string[];
}

export function TagsList({ tags }: TagsListProps) {
    return (
        <div>
            <h4 className="text-sm font-medium mb-3">
                Tags:
            </h4>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 border border-cyan-500/30"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}