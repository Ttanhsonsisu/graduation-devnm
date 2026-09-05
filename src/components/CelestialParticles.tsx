import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const CelestialParticles: React.FC = () => {
  const particles = useMemo(() => {
    const list: Particle[] = [];
    const colors = [
      'rgba(230, 198, 112, 0.75)', // Gold
      'rgba(255, 235, 160, 0.9)',  // Light gold
      'rgba(44, 230, 200, 0.65)',  // Cyan Qi
      'rgba(255, 255, 255, 0.85)', // White stardust
    ];

    for (let i = 0; i < 28; i++) {
      const r1 = seededRandom(i * 7 + 1);
      const r2 = seededRandom(i * 13 + 3);
      const r3 = seededRandom(i * 19 + 5);
      const r4 = seededRandom(i * 23 + 7);
      const r5 = seededRandom(i * 29 + 11);
      const r6 = seededRandom(i * 31 + 13);
      list.push({
        id: i,
        left: r1 * 100,
        bottom: r2 * 80,
        size: r3 * 3.5 + 1.5,
        duration: r4 * 6 + 4,
        delay: r5 * 5,
        color: colors[Math.floor(r6 * colors.length)],
      });
    }
    return list;
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `floatingParticle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
