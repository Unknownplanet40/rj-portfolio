// src/components/layout/LoadingScreen.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STORAGE_KEY = "rj_logo_reveal_seen";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = useCallback(() => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore storage errors
    }
    setIsVisible(false);
  }, []);

  // Initial check on mount: only show once per browser session
  useEffect(() => {
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      setIsVisible(true);
      safetyTimeoutRef.current = setTimeout(() => {
        dismiss();
      }, 15000);
    }

    return () => {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [dismiss]);

  // Global listener for replay requests (e.g., clicking logo in navbar)
  useEffect(() => {
    const handleReplay = () => {
      setIsVisible(true);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        dismiss();
      }, 15000);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("replay-logo-reveal", handleReplay);
    return () => window.removeEventListener("replay-logo-reveal", handleReplay);
  }, [dismiss]);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, dismiss]);

  // When video metadata is loaded, set dynamic safety timeout
  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      const vidDuration = videoRef.current.duration;
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = setTimeout(() => {
        dismiss();
      }, Math.ceil(vidDuration * 1000) + 2500);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="logo-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#05070c] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
          role="dialog"
          aria-label="Logo reveal intro"
        >
          {/* Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-45"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #2563eb 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {/* Top Control Bar */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/80 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition-all"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span className="hidden sm:inline">
                {isMuted ? "Unmute" : "Muted"}
              </span>
            </button>

            {/* Skip Button */}
            <button
              onClick={dismiss}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white/95 hover:text-white border border-white/15 text-xs font-medium flex items-center gap-2 transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="Skip logo reveal"
            >
              <span>Skip</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Video Container (Clean, no progressbar overlay) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.85)] border border-white/10 bg-black/70 backdrop-blur-md"
          >
            <video
              ref={videoRef}
              src={`${basePath}/logo/LogoReval_Version.mp4`}
              autoPlay
              muted={isMuted}
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={dismiss}
              onError={dismiss}
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Skip Hint */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xs text-white/40 mt-4 font-mono tracking-wider"
          >
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[10px]">ESC</kbd> or click Skip anytime
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
