import { useState, useRef, useEffect } from 'react';
import { SealButton } from './components/SealButton';
import { CelestialParticles } from './components/CelestialParticles';
import { AudioController } from './components/AudioController';
import { XianxiaHeader } from './components/XianxiaHeader';
import { CelestialClouds } from './components/CelestialClouds';
import { InvitationPage } from './pages/InvitationPage';
import './App.css';

type SceneState = 'INITIAL' | 'BREAKING' | 'PLAYING_GATE' | 'INVITATION';

export function App() {
  const [sceneState, setSceneState] = useState<SceneState>('INITIAL');
  const [showClouds, setShowClouds] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize video frame & audio setup
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0.01;
    }
  }, []);

  const cloudsTriggeredRef = useRef<boolean>(false);

  // Handle Music Play/Pause toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((err) => {
        console.warn('Audio play prevented:', err);
      });
    }
  };

  // Trigger seal break & open gate video
  const handleBreakSeal = () => {
    if (sceneState !== 'INITIAL') return;
    cloudsTriggeredRef.current = false;

    // 1. Screen shockwave animation
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 700);

    // 2. Play background epic music
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((err) => {
        console.warn('Audio play prevented:', err);
      });
    }

    // 3. Transition state & start video playback
    setSceneState('BREAKING');
    setTimeout(() => {
      setSceneState('PLAYING_GATE');
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.warn('Video play error:', err);
        });
      }
    }, 400);
  };

  // Smoothly start rolling clouds ~0.8s before video ends so there is zero freeze/stutter!
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || cloudsTriggeredRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0 && currentTime >= duration - 0.85) {
      cloudsTriggeredRef.current = true;
      setShowClouds(true);
    }
  };

  // Video ended fallback -> ensure clouds are triggered
  const handleVideoEnded = () => {
    if (!cloudsTriggeredRef.current) {
      cloudsTriggeredRef.current = true;
      setShowClouds(true);
    }
  };

  // Clouds have fully covered the entire screen -> switch scene to Invitation Page under the clouds
  const handleCloudsCovered = () => {
    setSceneState('INVITATION');
  };

  // Clouds have completely parted to both sides -> finish transition
  const handleCloudsEnd = () => {
    setShowClouds(false);
  };

  // Replay from beginning (from Invitation Page back to Gate Landing Page)
  const handleReplay = () => {
    cloudsTriggeredRef.current = false;
    setShowClouds(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.01;
    }
    setSceneState('INITIAL');
  };

  return (
    <div
      className={`app-container ${isShaking ? 'shockwave-active' : ''}`}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '100svh',
        overflow: sceneState === 'INVITATION' ? 'auto' : 'hidden',
        backgroundColor: '#030509',
      }}
    >
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/music-base.mp3"
        loop
        preload="auto"
      />

      {/* Floating Audio Toggle at Bottom Right - Only inside Invitation Page */}
      {sceneState === 'INVITATION' && (
        <AudioController
          isPlaying={isAudioPlaying}
          onToggle={toggleAudio}
        />
      )}

      {/* Celestial Clouds Transition Layer: slides from both sides covering entire screen */}
      {showClouds && (
        <CelestialClouds
          onFullyCovered={handleCloudsCovered}
          onAnimationEnd={handleCloudsEnd}
        />
      )}

      {/* Full Page View: INVITATION PAGE (NOT a popup, full-page experience) */}
      {sceneState === 'INVITATION' ? (
        <InvitationPage onReplay={handleReplay} />
      ) : (
        <>
          {/* Fullscreen Responsive Background Video */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <video
              ref={videoRef}
              src="/0905.mp4"
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover',
                filter: sceneState === 'INITIAL' ? 'brightness(0.85) contrast(1.05)' : 'brightness(1)',
                transition: 'filter 0.8s ease',
              }}
            />

            {/* Xianxia Atmospheric Vignette & Mist Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  sceneState === 'INITIAL'
                    ? 'radial-gradient(circle at center, rgba(3, 7, 18, 0.15) 0%, rgba(3, 7, 18, 0.65) 60%, rgba(1, 3, 8, 0.95) 100%)'
                    : 'radial-gradient(circle at center, transparent 40%, rgba(2, 4, 10, 0.6) 100%)',
                pointerEvents: 'none',
                transition: 'background 0.8s ease',
                zIndex: 2,
              }}
            />

            {/* Ambient Top & Bottom Ancient Mist */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '140px',
                background: 'linear-gradient(to bottom, rgba(3, 6, 14, 0.75) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '140px',
                background: 'linear-gradient(to top, rgba(3, 6, 14, 0.85) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          </div>

          {/* Floating Celestial Dust & Stardust Particles */}
          <CelestialParticles />

          {/* Main Foreground Container */}
          <main
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(14px, 2.5vh, 24px) clamp(16px, 3vw, 24px)',
              boxSizing: 'border-box',
              pointerEvents: 'none',
            }}
          >
            {/* Top Header: Xianxia Plaque */}
            <header
              style={{
                opacity: sceneState === 'INITIAL' ? 1 : 0,
                transform: sceneState === 'INITIAL' ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                textAlign: 'center',
                pointerEvents: sceneState === 'INITIAL' ? 'auto' : 'none',
                maxWidth: '92vw',
                zIndex: 15,
              }}
            >
              <XianxiaHeader />
            </header>

            {/* Center Button Aligned Exactly with the Main Door Medallion (Y: 50%, X: 50%) */}
            {sceneState === 'INITIAL' && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  pointerEvents: 'auto',
                  opacity: sceneState === 'INITIAL' ? 1 : 0,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <SealButton onActivate={handleBreakSeal} />
              </div>
            )}

            {/* Spacer when in INITIAL to keep footer at bottom */}
            {sceneState === 'INITIAL' && <div style={{ flex: 1 }} />}

            {/* Bottom Student Info Footer */}
            <footer
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '36px',
                zIndex: 15,
                paddingBottom: 'clamp(4px, 1vh, 12px)',
              }}
            >
              {sceneState === 'INITIAL' && (
                <div className="xianxia-footer">
                  <span className="xianxia-footer-bar" />
                  <span className="xianxia-footer-text">
                    Trần Tuấn Anh - 0001167 - 67IT2 - 67CNPM1
                  </span>
                  <span className="xianxia-footer-bar" />
                </div>
              )}
            </footer>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
