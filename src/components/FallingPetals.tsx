import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: number; // 0 - 100%
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  swayDuration: number;
  rotateZ: number;
  colorType: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const FallingPetals: React.FC = () => {
  // Tạo danh sách các cánh hoa đào & linh hoa tiên giới với tham số ngẫu nhiên mượt mà
  const petals = useMemo<Petal[]>(() => {
    const list: Petal[] = [];
    const count = 32; // Số lượng vừa đủ để tạo cảm giác thơ mộng, không làm rối mắt

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 11 + 1);
      const r2 = seededRandom(i * 17 + 3);
      const r3 = seededRandom(i * 23 + 5);
      const r4 = seededRandom(i * 29 + 7);
      const r5 = seededRandom(i * 37 + 9);
      const r6 = seededRandom(i * 41 + 11);

      list.push({
        id: i,
        left: r1 * 100,
        size: r2 * 8 + 12, // 12px - 20px
        duration: r3 * 6 + 7, // 7s - 13s
        delay: r4 * 8, // 0s - 8s
        swayDuration: r5 * 2.5 + 2.5, // 2.5s - 5s
        rotateZ: r6 * 360,
        colorType: i % 3, // 0: Hồng đào, 1: Hồng phấn nhạt, 2: Cánh hoa ánh kim
      });
    }
    return list;
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none', // Không bao giờ cản trở click hay thao tác của người dùng
        overflow: 'hidden',
        zIndex: 2, // Nằm trên background-main.png (z-index: 1) nhưng dưới nội dung thiệp (z-index: 10)
      }}
      aria-hidden="true"
    >
      {petals.map((p) => {
        // Màu sắc cánh hoa đào / tiên hoa
        const petalColor =
          p.colorType === 0
            ? 'linear-gradient(135deg, rgba(255, 182, 193, 0.85) 0%, rgba(255, 105, 180, 0.75) 100%)'
            : p.colorType === 1
            ? 'linear-gradient(135deg, rgba(255, 220, 230, 0.9) 0%, rgba(255, 192, 203, 0.7) 100%)'
            : 'linear-gradient(135deg, rgba(255, 235, 170, 0.85) 0%, rgba(230, 198, 112, 0.65) 100%)';

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: '-40px',
              left: `${p.left}%`,
              animation: `petalFall ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform',
            }}
          >
            {/* Inner Petal Shape with 3D Sway & Rotation */}
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.3}px`,
                background: petalColor,
                borderRadius: '50% 0 50% 50%',
                transform: `rotate(${p.rotateZ}deg)`,
                boxShadow: '0 2px 8px rgba(255, 182, 193, 0.35)',
                filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.2))',
                animation: `petalSway ${p.swayDuration}s ease-in-out infinite alternate`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
