# Memory Fragments Components

This directory contains the refactored `MemoryFragments` section components, following Next.js best practices, clean code principles, and DRY (Don't Repeat Yourself) methodology.

## Architecture Overview

The original monolithic component has been refactored into:
- **Modular Components**: Small, focused, reusable components
- **Custom Hooks**: Logic extraction for state management
- **Type Safety**: Comprehensive TypeScript types
- **Performance Optimizations**: Proper memoization and image optimization

## Components

### `AlbumCard`
Main component for displaying individual album cards with expandable content.

**Props:**
- `album: Album` - Album data
- `isExpanded: boolean` - Whether the album is expanded
- `onToggle: () => void` - Toggle handler
- `onPhotoSelect: (photo: Photo) => void` - Photo selection handler
- `variants: Variants` - Animation variants

### `PhotoGrid`
Grid component for displaying photos within an album.

**Props:**
- `photos: Photo[]` - Array of photos
- `onPhotoSelect: (photo: Photo) => void` - Photo selection handler

### `PhotoModal`
Modal component for displaying full-size photos with navigation.

**Props:**
- `photo: Photo` - Selected photo
- `onClose: () => void` - Close handler
- `onNavigate?: (direction: 'prev' | 'next') => void` - Navigation handler
- `showNavigation?: boolean` - Whether to show navigation buttons

### `FriendsList`
Component for displaying friends associated with an album.

**Props:**
- `friends: Friend[]` - Array of friends

### `TagsList`
Component for displaying tags associated with an album.

**Props:**
- `tags: string[]` - Array of tag strings

## Custom Hooks

### `usePhotoModal`
Manages photo modal state and navigation logic.

**Parameters:**
- `albums: Album[]` - Array of all albums

**Returns:**
- `selectedPhoto: Photo | null` - Currently selected photo
- `currentAlbum: Album | null` - Album containing the selected photo
- `shouldShowNavigation: boolean` - Whether navigation should be shown
- `openPhotoModal: (photo: Photo, album: Album) => void` - Open modal
- `closePhotoModal: () => void` - Close modal
- `navigatePhoto: (direction: 'prev' | 'next') => void` - Navigate photos

### `useAlbumState`
Manages album expansion state.

**Returns:**
- `expandedAlbum: string | null` - ID of expanded album
- `handleAlbumToggle: (albumId: string) => void` - Toggle album
- `isAlbumExpanded: (albumId: string) => boolean` - Check if album is expanded

## Performance Optimizations

1. **Image Optimization**: Proper Next.js Image component usage with:
   - `fill` prop for responsive layouts
   - Appropriate `sizes` attributes
   - `priority` flags for above-the-fold content

2. **Memoization**: Strategic use of `useCallback` and `useMemo`

3. **Code Splitting**: Components can be lazy-loaded if needed

## Accessibility Features

- Keyboard navigation support in photo modal
- Proper ARIA labels on interactive elements
- Focus management
- Semantic HTML structure

## Usage Example

```tsx
import { MemoryFragments } from '@/components/sections/memory-fragments';

export default function Page() {
    return (
        <main>
            <MemoryFragments />
        </main>
    );
}
```

## File Structure

```
components/memory-fragments/
├── album-card.tsx          # Album card component
├── photo-grid.tsx          # Photo grid component
├── photo-modal.tsx         # Photo modal component
├── friends-list.tsx        # Friends list component
├── tags-list.tsx          # Tags list component
├── index.ts               # Barrel exports
└── README.md              # This documentation
```

## Best Practices Implemented

1. **Single Responsibility**: Each component has one clear purpose
2. **DRY Principle**: No code duplication
3. **TypeScript**: Full type safety
4. **Performance**: Optimized renders and image loading
5. **Accessibility**: WCAG compliance
6. **Maintainability**: Clear separation of concerns
7. **Testability**: Components are easily testable in isolation