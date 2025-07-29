# 🚀 Wuniverse - Memory Keeper of Friendship

<div align="center">

![Wuniverse](https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop&crop=center)

**Tempat untuk menyimpan dan mengenang foto-foto kenangan lama bersama teman dengan tema cyberpunk yang futuristik**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.11-ff69b4?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## ✨ Fitur Utama

### 🎵 **Memory Soundtrack**
- **Music Player Interaktif**: Pemutar musik dengan kontrol lengkap (play, pause, next, previous, shuffle, repeat)
- **Playlist Management**: Tambah, kelola, dan putar berbagai musik kenangan
- **Visual Effects**: Animasi berputar saat musik diputar dan visualisasi cyberpunk
- **Music Memories**: Setiap lagu dikaitkan dengan kenangan spesifik

### 📸 **Memory Fragments (Photo Albums)**
- **Album Collection**: Kumpulan album foto dengan kategorisasi berdasar waktu dan tema
- **Interactive Dropdown**: Klik album untuk melihat detail lengkap
- **Photo Carousel**: Gallery foto dengan navigasi dan mode fullscreen
- **Friend Tagging**: Identifikasi teman-teman yang ada di setiap foto
- **Timeline Integration**: Album terintegrasi dengan tahun kejadian

### ⏰ **Memory Timeline**
- **Interactive Timeline**: Perjalanan kronologis pertemanan dari awal hingga perpisahan
- **3 Fase Utama**:
  - 🎮 **Pertama Kali Bermain** (2020)
  - 🏗️ **Membangun Memory** (2021) 
  - 👋 **Perpisahan** (2023)
- **Visual Storytelling**: Setiap fase dilengkapi gambar dan deskripsi mendalam

### 👥 **Friends Network**
- **Profile Cards**: Kartu profil teman dengan design mirip Instagram
- **Status Indicator**: Status online/offline/away real-time
- **Detailed Modals**: Modal profil lengkap dengan:
  - Bio dan personality traits
  - Favorite games
  - Social media links
  - Memorable moments
  - Achievements and badges
- **Social Integration**: Link langsung ke berbagai platform media sosial

## 🎨 Design System

### **Cyberpunk Theme**
- **Color Palette**: Neon cyan (#00ffff), magenta (#ff00ff), dan yellow (#ffff00)
- **Typography**: Font Rajdhani untuk nuansa futuristik
- **Visual Effects**: 
  - Neon borders dan glow effects
  - Glitch animations untuk text
  - Grid overlay patterns
  - Scanning line animations
  - Gradient cyberpunk backgrounds

### **Dark/Light Mode Support**
- Tema cyberpunk yang adaptif untuk mode gelap dan terang
- Transisi smooth antar tema
- Konsistensi visual di semua komponen

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.4.4 | React framework dengan App Router |
| **React** | 19.1.0 | UI library dengan server components |
| **TypeScript** | 5.x | Type safety dan developer experience |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Framer Motion** | 12.23.11 | Smooth animations dan interactions |
| **React Icons** | 5.5.0 | Icon library dengan berbagai set |
| **Simple Icons** | 15.8.0 | Brand icons untuk social media |

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x atau lebih baru
- npm, yarn, atau pnpm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd wuniverse

# Install dependencies
npm install
# atau
yarn install
# atau
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

### Build untuk Production

```bash
# Build aplikasi
npm run build
# atau
yarn build
# atau
pnpm build

# Start production server
npm start
# atau
yarn start
# atau
pnpm start
```

## 📁 Struktur Proyek

```
wuniverse/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles dengan cyberpunk theme
│   ├── layout.tsx               # Root layout dengan metadata
│   └── page.tsx                 # Homepage dengan semua sections
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── app-header.tsx       # Navigation header
│   │   ├── app-footer.tsx       # Footer component
│   │   └── theme-toggle.tsx     # Dark/light mode toggle
│   ├── sections/                # Main page sections
│   │   ├── hero.tsx             # Hero section dengan glitch effects
│   │   ├── music-player.tsx     # Interactive music player
│   │   ├── memory-fragments.tsx # Photo albums dengan dropdowns
│   │   ├── memory-timeline.tsx  # Timeline pertemanan
│   │   └── friends-network.tsx  # Friends profiles dengan modals
│   └── ui/                      # Reusable UI components
│       └── placeholder-image.tsx # Development placeholder
├── contexts/                     # React contexts
│   └── theme-provider.tsx       # Theme management
├── data/                        # Static data
│   ├── soundtracks.ts           # Music data
│   ├── albums.ts                # Photo albums data
│   ├── timeline.ts              # Timeline events
│   ├── friends.ts               # Friends profiles
│   └── navigations.ts           # Navigation data
├── layouts/                     # Layout configurations
│   └── app-layout.tsx           # Main app layout
└── public/                      # Static assets
    ├── soundtrack/              # Music files
    └── images/                  # Image assets
```

## 🎯 Fitur Mendatang

- [ ] **Audio Visualizer**: Visualisasi spectrum audio untuk music player
- [ ] **Photo Upload**: Kemampuan upload foto baru ke album
- [ ] **Comments System**: Sistem komentar di foto dan album
- [ ] **Video Support**: Dukungan untuk video dalam album
- [ ] **Timeline Expansion**: Tambah event timeline baru
- [ ] **Friends Chat**: Mini chat system antar teman
- [ ] **Memory Search**: Search functionality untuk cari foto/music
- [ ] **Backup/Export**: Export data kenangan ke berbagai format

## 🌟 Customization

### Mengubah Data

1. **Music**: Edit `data/soundtracks.ts`
2. **Albums**: Edit `data/albums.ts` 
3. **Timeline**: Edit `data/timeline.ts`
4. **Friends**: Edit `data/friends.ts`

### Mengubah Theme

1. **Colors**: Edit CSS variables di `app/globals.css`
2. **Typography**: Ganti font di `app/layout.tsx`
3. **Animations**: Modifikasi Framer Motion variants di components

### Menambah Asset

1. **Music**: Tambah file ke `public/soundtrack/`
2. **Images**: Tambah ke `public/images/`
3. **Update Data**: Update data files dengan path baru

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📝 License

Proyek ini dibuat untuk keperluan personal dan edukasi. Silakan gunakan sebagai inspirasi atau template.

## 💫 Credits

- **Design Inspiration**: Cyberpunk 2077, Ghost in the Shell
- **Images**: Unsplash.com untuk placeholder images
- **Icons**: React Icons dan Simple Icons
- **Fonts**: Google Fonts (Rajdhani)

---

<div align="center">

**Dibuat dengan ❤️ untuk mengenang persahabatan yang tak terlupakan**

*Wuniverse - Where memories live forever*

</div>
