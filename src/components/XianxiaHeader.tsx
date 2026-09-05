import React from 'react';

export const XianxiaHeader: React.FC = () => {
  return (
    <div className="xianxia-header">
      {/* 4 Ornate Golden Corner Accents */}
      <span className="xianxia-corner xianxia-corner-tl" />
      <span className="xianxia-corner xianxia-corner-tr" />
      <span className="xianxia-corner xianxia-corner-bl" />
      <span className="xianxia-corner xianxia-corner-br" />

      {/* Decorative Top Embellishment */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '2px',
        }}
      >
        <svg width="20" height="8" viewBox="0 0 24 10" fill="none" style={{ opacity: 0.8 }}>
          <path d="M0 5h16M16 5l-4-4M16 5l-4 4" stroke="#e6c670" strokeWidth="1.2" />
        </svg>

        <span
          style={{
            fontFamily: 'var(--font-epic), serif',
            fontSize: 'clamp(10px, 2.8vw, 13px)',
            letterSpacing: 'clamp(2px, 0.8vw, 4px)',
            color: '#2ce6c8',
            fontWeight: 700,
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(44, 230, 200, 0.7)',
            whiteSpace: 'nowrap',
          }}
        >
          ✦ LỄ TỐT NGHIỆP ✦
        </span>

        <svg width="20" height="8" viewBox="0 0 24 10" fill="none" style={{ opacity: 0.8 }}>
          <path d="M24 5H8M8 5l4-4M8 5l4 4" stroke="#e6c670" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Hero Graduate Name with 3D Gold Gradient */}
      <h1
        style={{
          fontFamily: 'var(--font-serif), serif',
          fontSize: 'clamp(20px, 5.5vw, 32px)',
          fontWeight: 900,
          letterSpacing: 'clamp(1.5px, 0.6vw, 2.5px)',
          background: 'linear-gradient(180deg, #ffffff 0%, #ffe89e 40%, #e6a82c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 16px rgba(230, 198, 112, 0.6))',
          textTransform: 'uppercase',
          margin: '2px 0 5px',
          lineHeight: 1.15,
          whiteSpace: 'nowrap',
        }}
      >
        TRẦN TUẤN ANH
      </h1>

      {/* Desktop Layout: 1 line with flanking golden lines */}
      <div className="xianxia-major-desktop">
        <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(230, 198, 112, 0.6))' }} />
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(11px, 1.4vw, 13px)',
            fontWeight: 500,
            letterSpacing: '0.8px',
            color: '#f5eedc',
            margin: 0,
            whiteSpace: 'nowrap',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
          }}
        >
          Cử nhân Đại học Xây Dựng · Ngành Công nghệ Thông tin
        </p>
        <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(230, 198, 112, 0.6))' }} />
      </div>

      {/* Mobile Layout: 2 elegant lines that fit any phone width */}
      <div className="xianxia-major-mobile">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%', justifyContent: 'center' }}>
          <span style={{ width: '16px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(230, 198, 112, 0.6))' }} />
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(10px, 3vw, 12px)',
              fontWeight: 500,
              letterSpacing: '0.5px',
              color: '#f5eedc',
              margin: 0,
              whiteSpace: 'nowrap',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
            }}
          >
            Cử nhân Đại học Xây Dựng
          </p>
          <span style={{ width: '16px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(230, 198, 112, 0.6))' }} />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(9.5px, 2.7vw, 11px)',
            fontWeight: 400,
            letterSpacing: '0.6px',
            color: 'rgba(230, 198, 112, 0.9)',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Ngành Công nghệ Thông tin
        </p>
      </div>
    </div>
  );
};
