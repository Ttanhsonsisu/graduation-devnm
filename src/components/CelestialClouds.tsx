import React, { useEffect } from 'react';

interface CelestialCloudsProps {
  /** Khi mây đã cuộn vào che kín 100% màn hình (tại mốc 50% thời gian) */
  onFullyCovered: () => void;
  /** Khi mây đã rẽ ra hoàn toàn về 2 bên (kết thúc animation) */
  onAnimationEnd: () => void;
}

export const CelestialClouds: React.FC<CelestialCloudsProps> = ({
  onFullyCovered,
  onAnimationEnd,
}) => {
  useEffect(() => {
    // Đúng mốc 1.25s: mây che kín 100% -> tráo trang thiệp mời bên dưới lớp mây
    const coverTimer = setTimeout(() => {
      onFullyCovered();
    }, 1250);

    // Mốc 2.5s: mây rẽ ra hoàn tất -> unmount layer mây
    const endTimer = setTimeout(() => {
      onAnimationEnd();
    }, 2500);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(endTimer);
    };
  }, [onFullyCovered, onAnimationEnd]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* Background White Fog Layer to guarantee 100% opacity when clouds meet */}
      <div
        className="cloud-backdrop-fog"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#f8fafc',
        }}
      />

      {/* LEFT CLOUD FLOCK (Kéo từ bên trái vào rồi lướt ra bên trái) */}
      <div
        className="cloud-flock-left"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '75vw',
        }}
      >
        {/* Top-Left Cloud */}
        <img
          src="/cloud.png"
          alt=""
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: 'clamp(380px, 65vw, 900px)',
            opacity: 0.98,
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))',
            transform: 'scale(1.2) rotate(-5deg)',
          }}
        />

        {/* Center-Left Cloud */}
        <img
          src="/cloud.png"
          alt=""
          style={{
            position: 'absolute',
            top: '25%',
            left: '-5%',
            width: 'clamp(440px, 72vw, 1000px)',
            opacity: 0.99,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))',
            transform: 'scale(1.35) rotate(4deg)',
          }}
        />

        {/* Bottom-Left Cloud */}
        <img
          src="/cloud.png"
          alt=""
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: 'clamp(400px, 68vw, 920px)',
            opacity: 0.98,
            filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.15))',
            transform: 'scale(1.25) rotate(-2deg)',
          }}
        />
      </div>

      {/* RIGHT CLOUD FLOCK (Kéo từ bên phải vào rồi lướt ra bên phải) */}
      <div
        className="cloud-flock-right"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '75vw',
        }}
      >
        {/* Top-Right Cloud (flipped horizontally) */}
        <img
          src="/cloud.png"
          alt=""
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: 'clamp(380px, 65vw, 900px)',
            opacity: 0.98,
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))',
            transform: 'scaleX(-1) scale(1.2) rotate(5deg)',
          }}
        />

        {/* Center-Right Cloud */}
        <img
          src="/cloud.png"
          alt=""
          style={{
            position: 'absolute',
            top: '25%',
            right: '-5%',
            width: 'clamp(440px, 72vw, 1000px)',
            opacity: 0.99,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))',
            transform: 'scaleX(-1) scale(1.35) rotate(-4deg)',
          }}
        />

        {/* Bottom-Right Cloud */}
        <img
          src="/cloud.png"
          alt=""
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: 'clamp(400px, 68vw, 920px)',
            opacity: 0.98,
            filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.15))',
            transform: 'scaleX(-1) scale(1.25) rotate(3deg)',
          }}
        />
      </div>

      {/* Center Golden Qi Radiance when clouds meet */}
      <div
        className="cloud-golden-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '60vw',
          height: '60vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 235, 170, 0.6) 0%, rgba(255, 255, 255, 0.85) 50%, transparent 80%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
};
