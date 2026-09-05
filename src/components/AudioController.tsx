import React from 'react';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="audio-controller-wrapper">
      <button
        type="button"
        className={`audio-controller-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={onToggle}
        aria-label={isPlaying ? 'Tắt âm nhạc' : 'Bật âm nhạc'}
        title={isPlaying ? 'Tạm dừng bản nhạc Thiên Hạ Thanh Sơn' : 'Phát bản nhạc Thiên Hạ Thanh Sơn'}
      >
        {/* Concentric soundwave ripple rings */}
        {isPlaying && (
          <>
            <span className="audio-ripple-ring ring-1" aria-hidden="true" />
            <span className="audio-ripple-ring ring-2" aria-hidden="true" />
          </>
        )}

        {/* Music Note Icon */}
        <span className={`audio-note-icon ${!isPlaying ? 'muted' : ''}`} aria-hidden="true">
          {isPlaying ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 5px rgba(254, 240, 138, 0.7))' }}
            >
              <path d="M9 18V5l12-2v13" fill="none" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
              <line x1="2" y1="2" x2="22" y2="22" stroke="#f87171" strokeWidth="2.2" />
            </svg>
          )}
        </span>

        {/* Dynamic Sound Wave Equalizer Bars */}
        <div className="audio-wave-bars" aria-hidden="true">
          <span className={`audio-bar bar-1 ${isPlaying ? 'playing' : ''}`} />
          <span className={`audio-bar bar-2 ${isPlaying ? 'playing' : ''}`} />
          <span className={`audio-bar bar-3 ${isPlaying ? 'playing' : ''}`} />
          <span className={`audio-bar bar-4 ${isPlaying ? 'playing' : ''}`} />
          <span className={`audio-bar bar-5 ${isPlaying ? 'playing' : ''}`} />
        </div>

        {/* Track Title */}
        <span className={`audio-controller-text ${!isPlaying ? 'muted' : ''}`}>
          {isPlaying ? 'Thiên Hạ Thanh Sơn' : 'Bật Âm Nhạc'}
        </span>
      </button>
    </div>
  );
};
