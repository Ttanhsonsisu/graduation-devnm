import React, { useState } from 'react';
import {
  saveRsvp,
  getSavedRsvp,
  type RsvpData,
  type AttendanceType,
  ATTENDANCE_LABEL_MAP,
} from '../lib/supabase';
import { FallingPetals } from '../components/FallingPetals';

interface InvitationPageProps {
  onReplay?: () => void;
}

interface AttendanceOption {
  key: AttendanceType;
  label: string;
  icon: string;
  desc: string;
}

const ATTENDANCE_OPTIONS: AttendanceOption[] = [
  {
    key: 'morning_only',
    icon: '☀️',
    label: 'Mình qua trường chơi buổi sáng thôi!',
    desc: 'Tham gia tập 1 - Gặp gỡ, chúc mừng & tán gẫu tại trường',
  },
  {
    key: 'dinner_only',
    icon: '🌙',
    label: 'Mình đi ăn tối (7h) nhé!',
    desc: 'Tham gia tập 2 - Tụ tập liên hoan, nâng ly tại quán',
  },
  {
    key: 'both',
    icon: '🔥',
    label: 'Mình đi cả sáng lẫn tối, tới bến luôn!',
    desc: 'Cháy hết mình từ trường đến bàn tiệc tối',
  },
  {
    key: 'absent',
    icon: '🥲',
    label: 'Tiếc quá, đợt này bận mất rồi, chúc từ xa nha.',
    desc: 'Không tham gia được nhưng vẫn luôn hướng về Đạo Hữu',
  },
];

export const InvitationPage: React.FC<InvitationPageProps> = () => {
  const [submittedRsvp, setSubmittedRsvp] = useState<RsvpData | null>(() => getSavedRsvp());
  const [name, setName] = useState(() => getSavedRsvp()?.guest_name || '');
  const [phone, setPhone] = useState(() => getSavedRsvp()?.phone_number || '');
  const [email, setEmail] = useState(() => getSavedRsvp()?.email || '');
  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceType>(
    () => getSavedRsvp()?.attendance_type || 'both'
  );
  const [message, setMessage] = useState(() => getSavedRsvp()?.message || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Vui lòng nhập tên hoặc biệt danh của bạn nhé!');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    const payload: Omit<RsvpData, 'id' | 'created_at' | 'status'> = {
      guest_name: name.trim(),
      phone_number: phone.trim() || undefined,
      email: email.trim() || undefined,
      attendance_type: selectedAttendance,
      message: message.trim() || undefined,
    };

    try {
      await saveRsvp(payload);
      setSubmittedRsvp({
        ...payload,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditRsvp = () => {
    setSubmittedRsvp(null);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        color: '#f5eedc',
        fontFamily: 'var(--font-sans)',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(20px, 4.5vh, 48px) clamp(16px, 3.5vw, 32px)',
        boxSizing: 'border-box',
        zIndex: 50,
      }}
    >
      {/* 1. Epic Panoramic Background Image: backdround-main.png */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <img
          src="/backdround-main.png"
          alt="Biển mây tiên cảnh ngắm trăng"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
        />

        {/* Atmospheric Vignette & Contrast Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom, rgba(3, 7, 18, 0.45) 0%, rgba(3, 7, 18, 0.65) 45%, rgba(2, 5, 12, 0.88) 100%),
              radial-gradient(ellipse at 50% 15%, transparent 35%, rgba(1, 3, 8, 0.65) 100%)
            `,
          }}
        />
      </div>

      {/* 2. Falling Flower Petals Layer (Cánh hoa rơi bồng bềnh dưới nội dung) */}
      <FallingPetals />

      {/* 3. Main Celestial Glass Shell (Khung Nội Dung Kính Tiên Khí - z-index: 10) */}
      <div className="glass-shell">
        {/* Subtle Ambient Refraction Orbs behind Glass */}
        <div className="glass-glow-ambient-1" />
        <div className="glass-glow-ambient-2" />

        {/* 4 Sleek Runic Corner Brackets */}
        <span className="glass-corner-rune glass-corner-tl" />
        <span className="glass-corner-rune glass-corner-tr" />
        <span className="glass-corner-rune glass-corner-bl" />
        <span className="glass-corner-rune glass-corner-br" />

        {/* ==================================================================== */}
        {/* PHẦN 1: LỜI NGỎ (HERO SECTION)                                        */}
        {/* ==================================================================== */}
        <section style={{ textAlign: 'center', marginBottom: '44px', position: 'relative', zIndex: 2 }}>
          {/* Top Pill Badge */}
          <div style={{ marginBottom: '16px' }}>
            <span className="glass-pill-badge">
              ✦ THIỆP MỜI ✦
            </span>
          </div>

          {/* Tiêu đề lớn (Font thư pháp/cổ điển) */}
          <h1
            style={{
              fontFamily: 'var(--font-serif), serif',
              fontSize: 'clamp(24px, 5.5vw, 42px)',
              fontWeight: 900,
              letterSpacing: '2px',
              background: 'linear-gradient(180deg, #ffffff 0%, #ffeaa7 35%, #f59e0b 75%, #d97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(230, 198, 112, 0.65))',
              textTransform: 'uppercase',
              margin: '6px 0 8px',
              lineHeight: 1.25,
            }}
          >
            LỄ TỐT NGHIỆP CỦA TUẤN ANH
          </h1>

          {/* Phụ đề (Font hiện đại, dễ đọc) */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 2.8vw, 18px)',
              fontWeight: 600,
              color: '#2ce6c8',
              letterSpacing: '0.8px',
              margin: '0 0 24px',
              textShadow: '0 0 16px rgba(44, 230, 200, 0.55)',
            }}
          >
            Cuối cùng thì cũng tốt nghiệp thành công!
          </p>

          {/* Golden Celestial Divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', margin: '20px 0 26px' }}>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(44, 230, 200, 0.3), rgba(230, 198, 112, 0.8))' }} />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffe89e" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 232, 158, 0.8))' }}>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(44, 230, 200, 0.3), rgba(230, 198, 112, 0.8))' }} />
          </div>

          {/* Nội dung thư ngỏ (Font Sans-serif) - Frosted Glass Card */}
          <div className="glass-card-hero">
            <p style={{ margin: '0 0 14px', color: 'rgba(245, 238, 220, 0.95)', fontSize: 'clamp(14.5px, 2.4vw, 16px)' }}>
              Chào anh em! Sau bao năm thì cuối cùng mình cũng chính thức ra trường. Thật ra buổi lễ của mình chủ yếu là lên nhận bằng thôi, với lại không có chụp ảnh. Nên anh em nào rảnh rỗi thì cứ ghé qua trường chơi, nói chuyện với mình cho vui nhé.
            </p>
            <p style={{ margin: 0, fontWeight: 600, color: '#ffe89e', fontSize: 'clamp(14.5px, 2.4vw, 16px)', textShadow: '0 0 10px rgba(255, 232, 158, 0.3)' }}>
              Trọng điểm là buổi tối có set một kèo đi ăn để anh em tụ tập. Mọi người nhớ sắp xếp thời gian tham gia cùng mình nha!
              <br />
              <span style={{ color: '#e2c370', marginLeft: '4px' }}>P/S: Tất nhiên buổi tối là chỉ có hội anh em Xuân Khê hihi</span>
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* PHẦN 2: LỊCH TRÌNH & TỌA ĐỘ (THÔNG TIN BUỔI LỄ - GỌN GÀNG, BỎ ICON)   */}
        {/* ==================================================================== */}
        <section style={{ marginBottom: '44px', position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontWeight: 800,
                letterSpacing: '2px',
                color: '#ffe89e',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 0 18px rgba(230, 198, 112, 0.65)',
              }}
            >
              LỊCH TRÌNH
            </h2>
            <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, transparent, #2ce6c8, transparent)', margin: '8px auto 0' }} />
          </div>

          {/* 2-Column Responsive Grid for Sáng & Tối */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '22px',
            }}
          >
            {/* Khung 1: Tập 1 - Sáng (Glass Morning Card) */}
            <div className="glass-card-morning">
              <div>
                {/* Header Tập 1 (Sleek & Clean, No Clutter) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif), serif',
                      fontSize: 'clamp(16px, 3vw, 19px)',
                      fontWeight: 700,
                      color: '#ffe89e',
                      margin: 0,
                      letterSpacing: '0.5px',
                    }}
                  >
                    Tập 1 - Nhận bằng
                  </h3>
                  <span className="glass-chip-cyan">SÁNG</span>
                </div>

                {/* Thời gian */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#2ce6c8', fontWeight: 700 }}>
                    THỜI GIAN
                  </div>
                  <div style={{ fontSize: 'clamp(14.5px, 2.2vw, 16.5px)', fontWeight: 700, color: '#ffffff', marginTop: '3px' }}>
                    09:00 sáng, thứ bảy 12/09/2026
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(230, 198, 112, 0.9)' }}>
                    Ngày nhận bằng
                  </div>
                </div>

                {/* Địa điểm */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#2ce6c8', fontWeight: 700 }}>
                    ĐỊA ĐIỂM
                  </div>
                  <div style={{ fontSize: 'clamp(14.5px, 2.2vw, 16.5px)', fontWeight: 700, color: '#ffffff', marginTop: '3px' }}>
                    Hội trường G3 · ĐH Xây Dựng Hà Nội
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(245, 238, 220, 0.8)', marginTop: '2px' }}>
                    Số 55 Giải Phóng, Bạch Mai, Hà Nội
                  </div>
                </div>

                {/* Lưu ý nhỏ */}
                <div
                  style={{
                    backgroundColor: 'rgba(44, 230, 200, 0.08)',
                    borderLeft: '3px solid #2ce6c8',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: 'rgba(245, 238, 220, 0.92)',
                    fontStyle: 'italic',
                    marginBottom: '20px',
                    lineHeight: 1.6,
                  }}
                >
                  <strong>Lưu ý nhỏ:</strong> Khúc này chủ yếu là gặp nhau tán dóc ở trường, anh em đến chơi là chính nhé!
                </div>
              </div>

              {/* Nút bấm Google Maps dẫn đường */}
              <a
                href="https://maps.google.com/?q=Đại+học+Xây+dựng+Hà+Nội+55+Giải+Phóng"
                target="_blank"
                rel="noopener noreferrer"
                className="maps-btn"
                style={{ alignSelf: 'flex-start' }}
              >
                <span>Bấm vào đây để Google Maps dẫn đường</span>
                <span style={{ fontSize: '11px', opacity: 0.8 }}>↗</span>
              </a>
            </div>

            {/* Khung 2: Tập 2 - Tối (Glass Evening Card) */}
            <div className="glass-card-evening">
              <div>
                {/* Header Tập 2 (Sleek & Clean, No Clutter) */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif), serif',
                      fontSize: 'clamp(16px, 3vw, 19px)',
                      fontWeight: 700,
                      color: '#ffe89e',
                      margin: 0,
                      letterSpacing: '0.5px',
                    }}
                  >
                    Tập 2 - Kèo ăn tối tụ tập
                  </h3>
                  <span className="glass-chip-amber">TỐI</span>
                </div>

                {/* Thời gian */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f59e0b', fontWeight: 700 }}>
                    THỜI GIAN
                  </div>
                  <div style={{ fontSize: 'clamp(14.5px, 2.2vw, 16.5px)', fontWeight: 700, color: '#ffffff', marginTop: '3px' }}>
                    19:00 (7h tối) cùng ngày
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(230, 198, 112, 0.9)' }}>
                    Thời điểm anh em hội quân nâng ly
                  </div>
                </div>

                {/* Địa điểm */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#f59e0b', fontWeight: 700 }}>
                    ĐỊA ĐIỂM
                  </div>
                  <div
                    style={{
                      marginTop: '6px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(245, 158, 11, 0.08)',
                      border: '1px dashed rgba(245, 158, 11, 0.45)',
                      fontSize: '13.5px',
                      color: '#f5eedc',
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>Địa điểm:</strong> Mình đang chọn địa điểm
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* PHẦN 3: FORM XÁC NHẬN THAM DỰ (RSVP: TÊN, SĐT, EMAIL, PHƯƠNG ÁN)     */}
        {/* ==================================================================== */}
        <section id="rsvp-section" className="glass-card-rsvp">
          {/* Form Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif), serif',
                fontSize: 'clamp(20px, 4.5vw, 30px)',
                fontWeight: 800,
                letterSpacing: '2px',
                color: '#ffe89e',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 0 20px rgba(230, 198, 112, 0.7)',
              }}
            >
              XÁC NHẬN THAM DỰ VỚI MÌNH NHÉ!!!
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(13px, 2.2vw, 14.5px)',
                color: 'rgba(245, 238, 220, 0.85)',
                margin: '6px 0 0',
              }}
            >
              Điền nhanh để Tuấn Anh biết anh em nào đi nha.
            </p>
          </div>

          {/* Form Success View (Nếu đã chốt) */}
          {submittedRsvp ? (
            <div
              style={{
                textAlign: 'center',
                padding: '28px 20px',
                backgroundColor: 'rgba(44, 230, 200, 0.08)',
                border: '1px solid rgba(44, 230, 200, 0.6)',
                borderRadius: '14px',
                backdropFilter: 'blur(16px)',
                animation: 'fadeInScale 0.6s ease-out forwards',
              }}
            >
              <div style={{ fontSize: '46px', marginBottom: '10px' }}>🎉</div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif), serif',
                  fontSize: 'clamp(18px, 3.5vw, 24px)',
                  color: '#2ce6c8',
                  margin: '0 0 8px',
                  fontWeight: 700,
                  textShadow: '0 0 15px rgba(44, 230, 200, 0.5)',
                }}
              >
                ĐÃ XÁC NHẬN THÀNH CÔNG!
              </h3>
              <p style={{ fontSize: '15px', color: '#f5eedc', margin: '0 0 18px' }}>
                Cảm ơn <strong>{submittedRsvp.guest_name}</strong> đã phản hồi! Tuấn Anh đã ghi nhận thông tin:
              </p>

              <div
                style={{
                  display: 'inline-block',
                  textAlign: 'left',
                  backgroundColor: 'rgba(6, 14, 30, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '16px 22px',
                  marginBottom: '22px',
                  fontSize: '14.5px',
                  lineHeight: 1.8,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  minWidth: 'min(100%, 340px)',
                }}
              >
                <div>👤 <strong>Họ tên:</strong> {submittedRsvp.guest_name}</div>
                {submittedRsvp.phone_number && (
                  <div>📱 <strong>Số điện thoại:</strong> {submittedRsvp.phone_number}</div>
                )}
                {submittedRsvp.email && (
                  <div>✉️ <strong>Email:</strong> {submittedRsvp.email}</div>
                )}
                <div>
                  🎯 <strong>Lựa chọn:</strong>{' '}
                  <span style={{ color: '#ffe89e', fontWeight: 700 }}>
                    {ATTENDANCE_LABEL_MAP[submittedRsvp.attendance_type]}
                  </span>
                </div>
                {submittedRsvp.message && (
                  <div style={{ marginTop: '4px' }}>💌 <strong>Lời nhắn:</strong> "{submittedRsvp.message}"</div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleEditRsvp}
                  className="glass-secondary-btn"
                >
                  <span>✏️</span>
                  <span>Thay đổi câu trả lời</span>
                </button>
              </div>
            </div>
          ) : (
            /* Main Input Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Field 1: Tên của bạn */}
              <div>
                <label
                  htmlFor="user-name"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#ffe89e',
                    marginBottom: '8px',
                    letterSpacing: '0.5px',
                  }}
                >
                  Tên của bạn là gì? <span style={{ color: '#ff6b6b' }}>*</span>
                </label>
                <input
                  id="user-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nam, Huy, Linh..."
                  className="rsvp-input"
                />
                {formError && (
                  <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '6px' }}>
                    {formError}
                  </div>
                )}
              </div>

              {/* Field 2 & 3: Số điện thoại & Email (2 Cột Responsive) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                }}
              >
                {/* Số điện thoại */}
                <div>
                  <label
                    htmlFor="user-phone"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#ffe89e',
                      marginBottom: '8px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Số điện thoại <span style={{ color: 'rgba(230, 198, 112, 0.7)', fontWeight: 400 }}>(tiện nhắn địa điểm)</span>
                  </label>
                  <input
                    id="user-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ví dụ: 0912 345 678"
                    className="rsvp-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="user-email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#ffe89e',
                      marginBottom: '8px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Email <span style={{ color: 'rgba(230, 198, 112, 0.7)', fontWeight: 400 }}>(tùy chọn)</span>
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ví dụ: friend@gmail.com"
                    className="rsvp-input"
                  />
                </div>
              </div>

              {/* Field 4: Bạn tham gia được tăng nào? */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#ffe89e',
                    marginBottom: '12px',
                    letterSpacing: '0.5px',
                  }}
                >
                  Bạn tham gia được tăng nào? <span style={{ color: '#2ce6c8' }}>(Rất quan trọng để mình đặt bàn)</span>
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {ATTENDANCE_OPTIONS.map((opt) => {
                    const isSelected = selectedAttendance === opt.key;
                    return (
                      <div
                        key={opt.key}
                        onClick={() => setSelectedAttendance(opt.key)}
                        className={`rsvp-option-btn ${isSelected ? 'selected' : ''}`}
                      >
                        {/* Custom Radio Circle */}
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid #2ce6c8' : '2px solid rgba(255, 255, 255, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {isSelected && (
                            <div
                              style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#2ce6c8',
                                boxShadow: '0 0 8px #2ce6c8',
                              }}
                            />
                          )}
                        </div>

                        {/* Icon Container */}
                        <div className="rsvp-icon-box">
                          {opt.icon}
                        </div>

                        {/* Option Label & Details */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: isSelected ? 700 : 600, color: isSelected ? '#ffffff' : '#f5eedc', fontSize: '14.5px' }}>
                            {opt.label}
                          </div>
                          <div style={{ fontSize: '12.5px', color: isSelected ? 'rgba(44, 230, 200, 0.95)' : 'rgba(166, 158, 144, 0.85)', marginTop: '2px' }}>
                            {opt.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Field 5: Lời nhắn gửi */}
              <div>
                <label
                  htmlFor="user-message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#ffe89e',
                    marginBottom: '8px',
                    letterSpacing: '0.5px',
                  }}
                >
                  Lời nhắn gửi <span style={{ color: 'rgba(230, 198, 112, 0.7)', fontWeight: 400 }}>(tùy chọn)</span>
                </label>
                <textarea
                  id="user-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Để lại vài lời chúc, hoặc dặn dò mình hôm đó ăn gì/mặc gì thì ghi vào đây nhé..."
                  className="rsvp-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Nút bấm Gửi: ĐỒNG Ý HỘI QUÂN */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rsvp-submit-btn"
                >
                  {isSubmitting ? (
                    <span>ĐANG GỬI TÂM THƯ...</span>
                  ) : (
                    <>
                      <span>Gửi phản hồi</span>
                    </>
                  )}
                </button>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(230, 198, 112, 0.75)',
                    marginTop: '10px',
                    letterSpacing: '0.5px',
                  }}
                >
                  Thông tin sẽ được gửi trực tiếp đến Tuấn Anh
                </div>
              </div>
            </form>
          )}
        </section>

        {/* ==================================================================== */}
        {/* FOOTER & NÚT XEM LẠI HOẠT CẢNH MỞ CỔNG                               */}
        {/* ==================================================================== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '1px',
              color: 'rgba(230, 198, 112, 0.75)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Trần Tuấn Anh - 0001167 - 67IT2 - 67CNPM1 · ĐH Xây Dựng Hà Nội
          </div>
        </div>
      </div>
    </div>
  );
};


