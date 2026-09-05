---
name: xianxia-ui-fx
description: >-
  Expert guidelines and procedures for designing and implementing Xianxia/Xuanhuan (Tiên Hiệp / Huyền Huyễn)
  themed web applications, epic visual effects, celestial runes, responsive full-screen video gates,
  and cinematic audio-visual transitions for graduation invitation websites.
---

# Xianxia & Xuanhuan Epic Visual Design Skill

Use this skill when developing or enhancing the graduation invitation interface inspired by the Xianxia / Xuanhuan universe (such as "Thế Giới Hoàn Mỹ" / Perfect World, "Thiên Hạ Thanh Sơn").

## Core Aesthetic Principles

1. **Color Palette & Aura**:
   - **Primary Golden Divinity (Kim Quang)**: `#f3cf7a`, `#ffd700`, `#ffaa00`, glowing accents with `box-shadow: 0 0 25px rgba(255, 215, 0, 0.6)`.
   - **Deep Celestial Abyss (Huyền Cực / Hạo Hãn)**: `#050811`, `#0a1128`, `#0c1b33`, `#16203b`.
   - **Verdant Mountain Mist (Thanh Sơn Khí)**: `#0e3d36`, `#1a5b50`, `#2be0b5` accents.
   - **Crimson Rune / Seal Accents**: `#ff4500`, `#d4380d`.

2. **Typography & Mystical Runes**:
   - Headers: Elegant serif / calligraphy fonts (`Cinzel`, `Noto Serif`, `Philosopher`, or majestic traditional Vietnamese-supporting serifs).
   - Accents: Ancient talisman inscriptions (Phù chú, Trận pháp, Cổ văn), circular array rings (Pháp trận Bát Quái) rotating with CSS keyframes.

3. **Responsive Fullscreen Video Gate**:
   - Video element must use `position: fixed` or `absolute`, `width: 100%`, `height: 100%`, `object-fit: cover`.
   - On iOS / Mobile: Always include `playsInline`, `webkit-playsinline`, `muted` attribute fallback for autoplay compliance, then unmute on user interaction gesture.
   - Soft gradient overlays (`linear-gradient(to top, rgba(5,8,17,0.85) 0%, rgba(5,8,17,0.2) 50%, rgba(5,8,17,0.7) 100%)`) to guarantee text readability and blend letterboxing.

4. **Interactive Seal-Breaking Experience**:
   - Center button: Designed as a "Cổ Tộc Trận Pháp" / "Khai Phong Ấn" seal or celestial talisman.
   - Outer rotating aura rings, pulsing golden glow, hover expansion, particles/stardust backdrop.
   - Audio feedback: Integrate `music-base.mp3` smoothly with fade-in upon the first user interaction to comply with modern browser autoplay policies.
   - State Machine: `IDLE` (Poster/Video paused at frame 0, seal waiting) -> `BREAKING` (Burst effects, video playing gate open) -> `ENDED` / `INVITATION` (Transition smoothly into the invitation scroll).
