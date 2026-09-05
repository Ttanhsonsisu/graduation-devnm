import React, { useState } from 'react';

interface SealButtonProps {
  onActivate: () => void;
  disabled?: boolean;
}

export const SealButton: React.FC<SealButtonProps> = ({ onActivate, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsPressed(true);
    onActivate();
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'manipulation',
      }}
    >
      {/* Outer Rotating Celestial Rune Ring */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(280px, 45vw, 420px)',
          height: 'clamp(280px, 45vw, 420px)',
          borderRadius: '50%',
          border: '1.5px dashed rgba(230, 198, 112, 0.45)',
          boxShadow: isHovered
            ? '0 0 45px rgba(230, 198, 112, 0.5), inset 0 0 30px rgba(44, 230, 200, 0.25)'
            : '0 0 25px rgba(230, 198, 112, 0.2)',
          animation: 'spinClockwise 32s linear infinite',
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      >
        {/* 8 Rune Nodes around circumference */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <span
            key={deg}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translate(clamp(138px, 22.4vw, 208px)) rotate(-${deg}deg)`,
              width: '8px',
              height: '8px',
              backgroundColor: '#ffe89e',
              borderRadius: '50%',
              boxShadow: '0 0 10px #ffe89e, 0 0 18px #2ce6c8',
            }}
          />
        ))}
      </div>

      {/* Middle Counter-Rotating Bagua / Rune Ring */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(230px, 36vw, 340px)',
          height: 'clamp(230px, 36vw, 340px)',
          borderRadius: '50%',
          border: '1px solid rgba(44, 230, 200, 0.4)',
          borderStyle: 'double',
          borderWidth: '3px',
          animation: 'spinCounterClockwise 22s linear infinite',
          pointerEvents: 'none',
          opacity: isHovered ? 0.9 : 0.65,
          transition: 'opacity 0.4s ease',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          style={{ width: '100%', height: '100%', opacity: 0.7 }}
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(230, 198, 112, 0.3)" strokeWidth="0.8" strokeDasharray="3 4" />
          <polygon points="50,4 61,38 96,50 61,62 50,96 39,62 4,50 39,38" fill="none" stroke="rgba(230, 198, 112, 0.4)" strokeWidth="0.6" />
        </svg>
      </div>

      {/* Pulsing Qi Aura Glow */}
      <div
        style={{
          position: 'absolute',
          width: 'clamp(170px, 26vw, 240px)',
          height: 'clamp(170px, 26vw, 240px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 198, 112, 0.3) 0%, rgba(44, 230, 200, 0.15) 50%, transparent 75%)',
          animation: 'auraRadiance 3.5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Core Xianxia Seal Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        aria-label="Tap để mở thiệp"
        style={{
          position: 'relative',
          width: 'clamp(145px, 22vw, 190px)',
          height: 'clamp(145px, 22vw, 190px)',
          borderRadius: '50%',
          background: isHovered
            ? 'radial-gradient(circle, #251b0e 0%, #0d121f 70%, #060910 100%)'
            : 'radial-gradient(circle, #1a1408 0%, #090e18 70%, #030509 100%)',
          border: '2px solid rgba(230, 198, 112, 0.85)',
          boxShadow: isHovered
            ? '0 0 35px rgba(230, 198, 112, 0.7), inset 0 0 25px rgba(230, 198, 112, 0.4), 0 0 15px rgba(44, 230, 200, 0.4)'
            : '0 0 20px rgba(230, 198, 112, 0.45), inset 0 0 15px rgba(230, 198, 112, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'default' : 'pointer',
          outline: 'none',
          transform: isPressed ? 'scale(0.94)' : isHovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease',
          zIndex: 10,
          padding: '12px',
        }}
      >
        {/* Ancient Talisman Emblem Icon */}
        <div
          style={{
            marginBottom: '6px',
            color: '#ffe89e',
            filter: 'drop-shadow(0 0 8px rgba(255, 232, 158, 0.8))',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {/* Celestial Door / Seal Break Emblem */}
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
            <circle cx="12" cy="12" r="2" fill="#ffe89e" />
          </svg>
        </div>

        {/* Action Text: "TAP ĐỂ MỞ THIỆP" */}
        <span
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            fontWeight: 700,
            letterSpacing: '1.8px',
            color: '#ffe89e',
            textShadow: '0 0 12px rgba(230, 198, 112, 0.9), 0 2px 4px rgba(0,0,0,0.9)',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          CHẠM ĐỂ
        </span>

        <span
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(11px, 1.6vw, 13px)',
            fontWeight: 600,
            color: '#e6c670',
            letterSpacing: '1.2px',
            marginTop: '2px',
            textShadow: '0 0 8px rgba(230, 198, 112, 0.6)',
            textTransform: 'uppercase',
          }}
        >
          MỞ THIỆP
        </span>
      </button>
    </div>
  );
};
