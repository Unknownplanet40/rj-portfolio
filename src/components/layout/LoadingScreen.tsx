// src/components/layout/LoadingScreen.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const triggerLoading = useCallback((durationMs = 1500) => {
    setIsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dismiss();
    }, durationMs);
  }, [dismiss]);

  // Initial load: show for 1.5s then fade out
  useEffect(() => {
    triggerLoading(1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerLoading]);

  // Global listener for replay requests (e.g. clicking logo in navbar)
  useEffect(() => {
    const handleReplay = () => {
      triggerLoading(1200);
    };

    window.addEventListener("replay-logo-reveal", handleReplay);
    return () => window.removeEventListener("replay-logo-reveal", handleReplay);
  }, [triggerLoading]);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={dismiss}
          className="fixed inset-0 z-[99999] bg-[var(--color-bg)] flex flex-col items-center justify-center p-4 overflow-hidden select-none cursor-pointer"
          role="dialog"
          aria-label="Loading screen"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--color-accent) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Logo & Dots Container */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 flex flex-col items-center justify-center gap-6"
          >
            {/* Logo */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <Image
                src={`${basePath}/logo/logo-transparent_dark.png`}
                alt="Ryan James Logo"
                width={96}
                height={96}
                priority
                className="block dark:hidden object-contain w-full h-full drop-shadow-md"
              />
              <Image
                src={`${basePath}/logo/logo-transparent_light.png`}
                alt="Ryan James Logo"
                width={96}
                height={96}
                priority
                className="hidden dark:block object-contain w-full h-full drop-shadow-md"
              />
            </div>

            {/* Loading Dots */}
            <div
              className="flex items-center gap-2"
              role="status"
              aria-label="Loading"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]"
                  animate={{
                    scale: [0.75, 1.25, 0.75],
                    opacity: [0.35, 1, 0.35],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <span className="sr-only">Loading...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
