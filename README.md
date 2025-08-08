# 🌟 Wuniverse - Memory Keeper of Friendship

<div align="center">

![Wuniverse Banner](https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop&crop=center)

**A futuristic cyberpunk-themed platform for preserving and reliving precious memories with friends through photos, music, and interactive storytelling**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.11-ff69b4?style=flat-square&logo=framer)](https://www.framer.com/motion/)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

</div>

## 🎭 About Wuniverse

**Wuniverse** is a modern, interactive web application designed to serve as a digital memory keeper for friendships. Built with a stunning cyberpunk aesthetic, it provides an immersive platform where users can store, organize, and relive precious moments through photo albums, curated music playlists, and interactive storytelling features.

The website combines cutting-edge web technologies with thoughtful UX design to create a unique experience that celebrates the beauty of human connections and the memories we create together.

## ✨ Core Features

### 🎵 **Interactive Music Player**
Experience nostalgia through sound with our feature-rich music player:

- **Full Playback Controls**: Play, pause, skip, previous, shuffle, and repeat functionality
- **Visual Feedback**: Animated album covers with rotation effects during playback
- **Playlist Management**: Browse and select from curated memory soundtracks
- **Volume Control**: Adjustable volume with mute functionality
- **Progress Tracking**: Visual progress bar with time display
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Graceful fallback for audio loading issues
- **Keyboard Support**: Space bar for play/pause, arrow keys for navigation

### 📸 **Memory Fragments (Photo Albums)**
Organize and browse through cherished memories:

- **Album Grid Layout**: Beautiful grid display of photo albums with hover effects
- **Interactive Album Cards**: Click to expand and view detailed album information
- **Photo Gallery**: Full-screen photo viewing with navigation controls
- **Friend Tagging System**: Identify and tag friends in photos with avatar displays
- **Memory Descriptions**: Rich text descriptions for each photo and album
- **Tags & Categories**: Organize albums with custom tags and categories
- **Responsive Gallery**: Adaptive layout for all screen sizes
- **Lazy Loading**: Performance-optimized image loading
- **Zoom & Pan**: Interactive photo viewing capabilities

### 🎨 **Cyberpunk Design System**
Immerse yourself in a futuristic visual experience:

- **Neon Color Palette**: Vibrant cyan (#00ffff), magenta (#ff00ff), and yellow (#ffff00)
- **Animated Backgrounds**: Dynamic gradient animations and particle effects
- **Glitch Effects**: Text glitch animations for futuristic aesthetics
- **Neon Borders**: Glowing borders and shadows throughout the interface
- **Grid Overlays**: Cyberpunk-inspired grid patterns and backgrounds
- **Typography**: Rajdhani font family for a futuristic look
- **Smooth Transitions**: Framer Motion animations for seamless interactions
- **Glass Morphism**: Translucent elements with backdrop blur effects

### 📱 **Responsive & Accessible**
Built with modern web standards:

- **Mobile-First Design**: Optimized for mobile devices and scales up
- **Touch Interactions**: Gesture support for mobile navigation
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Focus Management**: Proper focus handling for interactive elements
- **High Contrast**: Cyberpunk theme with sufficient color contrast
- **Fast Loading**: Optimized performance with code splitting and lazy loading

### 🔧 **Developer Experience**
Built with modern development practices:

- **TypeScript**: Full type safety and IntelliSense support
- **Modular Architecture**: Clean component structure and separation of concerns
- **Custom Hooks**: Reusable logic with React hooks
- **Error Boundaries**: Graceful error handling and recovery
- **ESLint & Prettier**: Code quality and formatting consistency
- **Performance Monitoring**: Optimized bundle size and loading times

## 🛠️ Technology Stack

| Technology | Version | Purpose | Why We Chose It |
|------------|---------|---------|------------------|
| **Next.js** | 15.4.4 | React framework | Server-side rendering, App Router, optimized performance |
| **React** | 19.1.0 | UI library | Component-based architecture, virtual DOM, ecosystem |
| **TypeScript** | 5.x | Type safety | Better developer experience, catch errors early |
| **Tailwind CSS** | 4.x | Styling | Utility-first, rapid development, consistent design |
| **Framer Motion** | 12.23.11 | Animations | Smooth animations, gesture support, performant |
| **React Icons** | 5.5.0 | Icon library | Comprehensive icon sets, tree-shaking support |
| **Lucide React** | 0.532.0 | Modern icons | Clean, consistent iconography |
| **Simple Icons** | 15.8.0 | Brand icons | Social media and brand recognition |

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wuniverse.git
   cd wuniverse
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   
   # Using pnpm
   pnpm install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using yarn
   yarn dev
   
   # Using pnpm
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start

# Or use a single command
npm run build && npm start
```

### Development Commands

```bash
# Run development server with Turbopack (faster)
npm run dev

# Build for production
npm run build

# Start production server on port 3001
npm start

# Run ESLint for code quality
npm run lint

# Run type checking
npx tsc --noEmit
```

## 📁 Project Structure

```
wuniverse/
├── 📁 app/                           # Next.js App Router
│   ├── 🎨 globals.css              # Global styles & cyberpunk theme
│   ├── ⚛️ layout.tsx                # Root layout with metadata & providers
│   ├── 🏠 page.tsx                  # Homepage with all sections
│   └── 🌐 favicon.ico               # Application favicon
├── 📁 components/                    # React components
│   ├── 📁 layout/                   # Layout components
│   │   ├── app-header.tsx          # Navigation header with responsive menu
│   │   ├── app-footer.tsx          # Footer with social links
│   │   └── app-sidebar-mobile.tsx  # Mobile navigation sidebar
│   ├── 📁 sections/                 # Main page sections
│   │   ├── hero.tsx                # Hero section with cyberpunk effects
│   │   ├── music-player.tsx        # Interactive music player component
│   │   └── memory-fragments.tsx    # Photo albums with modals
│   ├── 📁 memory-fragments/         # Album-related components
│   │   ├── album-card.tsx          # Individual album card component
│   │   ├── album-details-modal.tsx # Album detail modal with photo grid
│   │   ├── photo-modal.tsx         # Full-screen photo viewer
│   │   ├── photo-grid.tsx          # Grid layout for album photos
│   │   ├── tags-list.tsx           # Tag display component
│   │   └── index.ts                # Barrel exports
│   └── 📁 ui/                       # Reusable UI components
│       └── placeholder-image.tsx    # Development placeholder component
├── 📁 contexts/                      # React context providers
│   └── theme-provider.tsx          # Theme management (dark mode only)
├── 📁 data/                         # Static data and types
│   ├── albums.ts                   # Photo albums data with TypeScript types
│   ├── soundtracks.ts              # Music playlist data
│   └── navigations.ts              # Navigation and social links
├── 📁 hooks/                        # Custom React hooks
│   ├── use-photo-modal.ts          # Photo modal state management
│   └── index.ts                    # Hook exports
├── 📁 layouts/                      # Layout configurations
│   └── app-layout.tsx              # Main app layout with sidebar
├── 📁 constants/                    # Application constants
│   └── animations.ts               # Framer Motion animation variants
├── 📁 types/                        # TypeScript type definitions
│   └── animations.ts               # Animation-related types
├── 📁 public/                       # Static assets
│   └── 🎵 soundtracks/              # Audio files for music player
├── ⚙️ tailwind.config.js            # Tailwind CSS configuration
├── ⚙️ tsconfig.json                 # TypeScript configuration
├── ⚙️ next.config.ts                # Next.js configuration
├── ⚙️ postcss.config.mjs            # PostCSS configuration
├── ⚙️ eslint.config.mjs             # ESLint configuration
└── 📦 package.json                  # Dependencies and scripts
```

## 🎨 Design Philosophy

### Cyberpunk Aesthetic
Wuniverse embraces a cyberpunk visual language that combines:

- **Neon Colors**: Electric blues, magentas, and yellows create a vibrant, futuristic atmosphere
- **Dark Backgrounds**: Deep blacks and dark greys provide contrast and focus
- **Geometric Patterns**: Grid overlays and angular shapes reinforce the digital theme
- **Glowing Effects**: Subtle glows and shadows add depth and interactivity
- **Typography**: Rajdhani font family provides a clean, futuristic look

### User Experience Principles
- **Intuitive Navigation**: Clear hierarchy and logical flow
- **Responsive Design**: Seamless experience across all devices
- **Performance First**: Fast loading times and smooth animations
- **Accessibility**: WCAG guidelines compliance for inclusive design
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 🔧 Customization Guide

### Adding New Albums

1. **Prepare your photos**: Add images to the `public/` directory
2. **Update albums data**: Edit `data/albums.ts`:
   ```typescript
   export const albums: Album[] = [
     {
       id: 'unique-id',
       title: 'Your Album Title',
       year: 2024,
       description: 'Album description',
       coverPhoto: '/path/to/cover.jpg',
       photos: [
         {
           id: 'photo-1',
           url: '/path/to/photo.jpg',
           alt: 'Photo description',
           description: 'Optional photo description'
         }
       ],
       friends: [
         { id: 'friend-1', name: 'Friend Name', avatar: '/avatar.jpg' }
       ],
       tags: ['tag1', 'tag2']
     }
   ];
   ```

### Adding Music Tracks

1. **Add audio files**: Place MP3 files in `public/soundtracks/`
2. **Update soundtracks data**: Edit `data/soundtracks.ts`:
   ```typescript
   export const soundtracks: Soundtrack[] = [
     {
       id: 'track-1',
       title: 'Song Title',
       artist: 'Artist Name',
       fileName: 'audio-file.mp3',
       duration: '3:45',
       coverArt: '/cover-art.jpg'
     }
   ];
   ```

### Customizing Colors

Edit the CSS variables in `app/globals.css`:
```css
:root {
  --neon-cyan: #your-color;
  --neon-magenta: #your-color;
  --neon-yellow: #your-color;
  /* Add more custom colors */
}
```

### Modifying Animations

Animations are configured in `constants/animations.ts`. You can:
- Adjust timing and easing
- Add new animation variants
- Customize Framer Motion properties

## 🚧 Development Roadmap

### Phase 1: Core Features ✅
- [x] Basic photo album functionality
- [x] Music player implementation
- [x] Responsive design
- [x] TypeScript integration
- [x] Cyberpunk theme implementation

### Phase 2: Enhanced Features 🚧
- [ ] **Advanced Search**: Global search across photos, albums, and music
- [ ] **Photo Upload**: Direct photo upload functionality
- [ ] **Comments System**: Add comments to photos and albums
- [ ] **Video Support**: Support for video files in albums
- [ ] **Export Features**: Export albums and playlists

### Phase 3: Social Features 🔮
- [ ] **User Profiles**: Individual user accounts and profiles
- [ ] **Sharing**: Share albums and photos with others
- [ ] **Collaborative Albums**: Multiple users can contribute to albums
- [ ] **Real-time Chat**: Built-in messaging system
- [ ] **Activity Feed**: See friend activities and updates

### Phase 4: Advanced Features 🔮
- [ ] **Audio Visualization**: Real-time audio spectrum visualization
- [ ] **Face Recognition**: Automatic friend tagging in photos
- [ ] **Timeline Stories**: Rich multimedia storytelling
- [ ] **AR Integration**: Augmented reality photo viewing
- [ ] **AI Curation**: Smart album and playlist recommendations

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a new branch for your feature
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

### Areas for Contribution
- 🐛 **Bug Fixes**: Help us squash bugs
- ✨ **New Features**: Implement items from our roadmap
- 📖 **Documentation**: Improve guides and examples
- 🎨 **Design**: Enhance UI/UX and accessibility
- ⚡ **Performance**: Optimize loading and runtime performance
- 🧪 **Testing**: Add unit and integration tests

## 📊 Performance Metrics

### Bundle Analysis
- **Main Bundle**: ~50.6 kB (gzipped)
- **First Load JS**: ~155 kB total
- **Lighthouse Score**: 95+ performance rating
- **Core Web Vitals**: All green metrics

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component with lazy loading
- **Font Optimization**: Optimized Google Fonts loading
- **Tree Shaking**: Unused code elimination
- **Compression**: Gzip and Brotli compression

## 🔒 Security & Privacy

- **No Personal Data Collection**: All data is static and local
- **HTTPS Ready**: Designed for secure deployments
- **Content Security Policy**: CSP headers for XSS protection
- **Dependency Security**: Regular security audits
- **Privacy First**: No tracking or analytics by default

## 📱 Browser Support

### Desktop
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+
- ✅ Samsung Internet 14+
- ✅ Firefox Mobile 88+

## 🎯 SEO & Accessibility

### SEO Features
- **Meta Tags**: Comprehensive meta tags for social sharing
- **Open Graph**: Rich social media previews
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Auto-generated XML sitemap
- **Semantic HTML**: Proper HTML5 semantic structure

### Accessibility Features
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Responsive Text**: Scalable font sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

### Design Inspiration
- **Cyberpunk 2077**: Visual aesthetics and color palette
- **Ghost in the Shell**: Futuristic UI concepts
- **Blade Runner 2049**: Atmospheric lighting and effects

### Resources
- **Unsplash**: High-quality placeholder images
- **Google Fonts**: Rajdhani typography
- **React Icons**: Comprehensive icon library
- **Framer Motion**: Smooth animation library

### Special Thanks
- The Next.js team for an amazing framework
- The React community for continuous innovation
- The open-source community for inspiration and tools

---

<div align="center">

**Built with ❤️ to preserve the beauty of friendship**

*Wuniverse - Where memories live forever in the digital realm*

[![GitHub stars](https://img.shields.io/github/stars/your-username/wuniverse?style=social)](https://github.com/your-username/wuniverse)
[![Twitter Follow](https://img.shields.io/twitter/follow/xenvoid404?style=social)](https://twitter.com/xenvoid404)

[🌐 Live Demo](https://wuniverse.web.id) | [📖 Documentation](https://github.com/your-username/wuniverse/wiki) | [🐛 Report Bug](https://github.com/your-username/wuniverse/issues) | [💡 Request Feature](https://github.com/your-username/wuniverse/issues)

</div>
