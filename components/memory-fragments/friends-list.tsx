'use client';

import Image from 'next/image';
import { type Friend } from '@/data/albums';

interface FriendsListProps {
    friends: Friend[];
}

export function FriendsList({ friends }: FriendsListProps) {
    return (
        <div className="mb-4">
            <h4 className="text-sm font-medium mb-3">
                Teman-teman di album ini:
            </h4>
            <div className="flex flex-wrap gap-2">
                {friends.map(friend => (
                    <div
                        key={friend.id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full cyberpunk-card neon-border"
                    >
                        <Image
                            src={friend.avatar}
                            alt={friend.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <span className="text-sm">
                            {friend.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}