// src/components/pwa/PwaRegister.tsx
"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // 1. Register service worker in production or local dev
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register(`${basePath}/sw.js`)
          .then((registration) => {
            console.debug("PWA Service Worker registered with scope:", registration.scope);
          })
          .catch((err) => {
            console.debug("PWA Service Worker registration failed:", err);
          });
      });
    }

    // 2. Capture beforeinstallprompt for install banner
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if user previously dismissed banner in this session
      const dismissed = sessionStorage.getItem("pwa_prompt_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      console.debug("PWA successfully installed!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    try {
      sessionStorage.setItem("pwa_prompt_dismissed", "true");
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {showInstallBanner && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed bottom-6 right-6 z-50 max-w-sm rounded-[var(--radius-xl)] glass border border-[var(--color-border)] shadow-[var(--shadow-xl)] p-4 flex items-center gap-3.5"
          role="alert"
          aria-live="polite"
        >
          <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center shrink-0">
            <Download size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[var(--color-text)] leading-tight">
              Install Portfolio App
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-tight">
              Add to home screen for instant offline access
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-xs font-semibold hover:bg-[var(--color-accent)]/90 transition-all active:scale-95 shadow-sm"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss install prompt"
              className="p-1 rounded-[var(--radius-md)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-all"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
