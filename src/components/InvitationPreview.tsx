import React from 'react';

interface InvitationPreviewProps {
  onReplay: () => void;
}

export const InvitationPreview: React.FC<InvitationPreviewProps> = ({ onReplay }) => {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 20,
        width: '100%',
        maxWidth: '720px',
        margin: 'auto',
        padding: '24px 16px',
        animation: 'fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Scroll / Talisman parchment container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: 'rgba(10, 15, 26, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '2px solid rgba(230, 198, 112, 0.65)',
          borderRadius: '16px',
          boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 35px rgba(230, 198, 112, 0.35), inset 0 0 25px rgba(230, 198, 112, 0.15)',
          padding: 'clamp(24px, 5vw, 44px)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Ancient decorative corner brackets */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px', borderTop: '2px solid #e6c670', borderLeft: '2px solid #e6c670' }} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderTop: '2px solid #e6c670', borderRight: '2px solid #e6c670' }} />
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '24px', height: '24px', borderBottom: '2px solid #e6c670', borderLeft: '2px solid #e6c670' }} />
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '24px', height: '24px', borderBottom: '2px solid #e6c670', borderRight: '2px solid #e6c670' }} />

        {/* Header Ribbon / Emblem */}
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-epic), serif',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#2ce6c8',
              border: '1px solid rgba(44, 230, 200, 0.5)',
              padding: '4px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(44, 230, 200, 0.08)',
            }}
          >
            Đăng Đỉnh Chi Lộ · Phá Cảnh Xuất Thế
          </span>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontFamily: 'var(--font-epic), serif',
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 900,
            color: '#ffe89e',
            letterSpacing: '3px',
            textShadow: '0 0 20px rgba(230, 198, 112, 0.8)',
            marginBottom: '8px',
          }}
        >
          THIỆP MỜI DỰ LỄ TỐT NGHIỆP
        </h1>

        <h2
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(245, 238, 220, 0.85)',
            marginBottom: '24px',
          }}
        >
          « Thiên Hạ Thanh Sơn · Vạn Trượng Hào Khí »
        </h2>

        {/* Divider line with diamond center */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            margin: '20px 0',
          }}
        >
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(230, 198, 112, 0.7))' }} />
          <div style={{ width: '8px', height: '8px', backgroundColor: '#e6c670', transform: 'rotate(45deg)' }} />
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(230, 198, 112, 0.7))' }} />
        </div>

        {/* Content text */}
        <p
          style={{
            fontFamily: 'var(--font-serif), serif',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            lineHeight: 1.8,
            color: '#f5eedc',
            maxWidth: '560px',
            margin: '0 auto 28px',
          }}
        >
          Trân trọng kính mời Đạo Hữu cùng đến chứng kiến khoảnh khắc phá vỡ phong ấn học thuật,
          vượt qua lôi kiếp thử thách, chính thức bước vào cảnh giới mới trên con đường tương lai.
        </p>

        {/* Replay action button */}
        <button
          type="button"
          onClick={onReplay}
          style={{
            background: 'linear-gradient(135deg, rgba(230, 198, 112, 0.2) 0%, rgba(13, 20, 36, 0.9) 100%)',
            border: '1px solid #e6c670',
            borderRadius: '30px',
            color: '#ffe89e',
            padding: '12px 28px',
            fontFamily: 'var(--font-epic), serif',
            fontSize: '13px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(230, 198, 112, 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(230, 198, 112, 0.6)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(230, 198, 112, 0.3)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ↺ Khai Môn Lần Nữa
        </button>
      </div>
    </div>
  );
};
