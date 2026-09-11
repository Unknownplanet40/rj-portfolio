"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Tv,
  Film,
  Layers,
  Play,
  Trophy,
  BarChart3,
} from "lucide-react";
import type { ProjectPreview } from "@/types";
import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const PREVIEW_ICONS = [Tv, Film, Layers, Play, Trophy, BarChart3];

interface CapsStreamGalleryProps {
  previews: ProjectPreview[];
}

export function CapsStreamGallery({ previews }: CapsStreamGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activePreview = previews[activeIndex] ?? previews[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? previews.length - 1 : prev - 1));
  }, [previews.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === previews.length - 1 ? 0 : prev + 1));
  }, [previews.length]);

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  if (!previews || previews.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 w-full min-w-0 mt-0 md:mt-2">
      {/* Mockup Window Frame */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden shadow-sm min-w-0">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 text-xs">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
          </div>

          <div className="text-[11px] font-mono text-[var(--color-text-muted)] truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
            capsstream.local / {activePreview.title.toLowerCase().replace(/\s+/g, "-")}
          </div>

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="flex items-center gap-1 text-[11px] text-[var(--color-accent)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] rounded shrink-0"
            title="Expand screenshot"
            aria-label="Expand screenshot in lightbox"
          >
            <Maximize2 size={12} />
            <span className="hidden sm:inline">Expand</span>
          </button>
        </div>

        {/* Active Screenshot Display */}
        <div
          className="relative aspect-video w-full max-h-48 sm:max-h-none bg-neutral-950 overflow-hidden cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsLightboxOpen(true);
            }
          }}
          aria-label={`Open ${activePreview.title} in full view`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePreview.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={`${basePath}${activePreview.src}`}
                alt={activePreview.alt}
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Hover Overlay with Caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3 pointer-events-none">
            <p className="text-white text-xs font-medium drop-shadow-md">
              {activePreview.title}
            </p>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full">
              <Maximize2 size={10} /> Click to expand
            </span>
          </div>

          {/* Prev / Next Navigation Arrows
              Always visible on touch devices (@media hover:none),
              fade-in on hover for pointer devices */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous preview screenshot"
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full",
              "bg-black/60 hover:bg-black/85 text-white",
              "flex items-center justify-center transition-opacity duration-200",
              // Always show on touch; fade in on hover for pointer devices
              "[@media(hover:none)]:opacity-100 opacity-0 group-hover:opacity-100",
              "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            )}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next preview screenshot"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full",
              "bg-black/60 hover:bg-black/85 text-white",
              "flex items-center justify-center transition-opacity duration-200",
              "[@media(hover:none)]:opacity-100 opacity-0 group-hover:opacity-100",
              "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            )}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Screenshot Selector Chips */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
        role="tablist"
        aria-label="CapsStream preview screenshots"
      >
        {previews.map((preview, idx) => {
          const IconComponent = PREVIEW_ICONS[idx % PREVIEW_ICONS.length];
          const isActive = idx === activeIndex;

          return (
            <button
              key={preview.src}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-medium transition-all shrink-0 select-none",
                isActive
                  ? "bg-[var(--color-accent)] text-white shadow-sm"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
              )}
            >
              <IconComponent size={12} className={isActive ? "text-white" : "text-[var(--color-text-muted)]"} />
              <span>{preview.title}</span>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Full preview: ${activePreview.title}`}
          >
            <div
              className="relative w-full max-w-5xl bg-neutral-950 rounded-[var(--radius-2xl)] border border-neutral-800 overflow-hidden shadow-2xl flex flex-col max-h-[96dvh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/80 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                    CapsStream — {activePreview.title}
                  </h4>
                  <span className="text-xs text-neutral-400 font-mono shrink-0">
                    ({activeIndex + 1} / {previews.length})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] shrink-0 ml-2"
                  aria-label="Close full preview"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Lightbox Image Container
                  Use max-h instead of aspect-video so landscape phones don't overflow */}
              <div className="relative w-full bg-black flex items-center justify-center overflow-hidden" style={{ maxHeight: "calc(96dvh - 84px)" }}>
                <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={`${basePath}${activePreview.src}`}
                    alt={activePreview.alt}
                    fill
                    sizes="(max-width: 1200px) 95vw, 1200px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Prev / Next in Lightbox — always visible on touch */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Lightbox Footer Caption */}
              <div className="px-3 sm:px-4 py-2 bg-neutral-900/60 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 shrink-0">
                <p className="truncate">{activePreview.alt}</p>
                <span className="hidden sm:inline font-mono text-[11px] shrink-0 ml-4">
                  Use ← / → arrows · Esc to close
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
