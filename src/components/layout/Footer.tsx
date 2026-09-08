"use client";

import { MapPin, Heart, ArrowUp } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { CONTACT } from "@/data/portfolio";
import { APP_VERSION } from "@/lib/version";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="relative pt-2">
      {/* Glassmorphism card */}
      <div className="mx-4 mb-4 rounded-[var(--radius-2xl)] glass border border-[var(--color-border)] shadow-[var(--shadow-xl)] overflow-hidden">
        {/* Accent top-line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
          }}
        />

        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Branding */}
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                  <Image
                    src={`${basePath}/logo/logo-transparent_dark.png`}
                    alt="Ryan James Logo"
                    width={28}
                    height={28}
                    className="block dark:hidden object-contain w-7 h-7"
                  />
                  <Image
                    src={`${basePath}/logo/logo-transparent_light.png`}
                    alt="Ryan James Logo"
                    width={28}
                    height={28}
                    className="hidden dark:block object-contain w-7 h-7"
                  />
                </div>
                <span className="font-semibold text-sm text-[var(--color-text)]">
                  Ryan James V. Capadocia
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                <MapPin size={11} />
                Imus, Cavite, Philippines
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] transition-all duration-150"
              >
                <Github size={16} />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] transition-all duration-150"
              >
                <Linkedin size={16} />
              </a>

              {/* Scroll to top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
                className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] transition-all duration-150"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
              © {year} Ryan James V. Capadocia · Built with{" "}
              <Heart size={11} className="text-[var(--color-accent)]" fill="currentColor" />{" "}
              using Next.js
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://github.com/Unknownplanet40/rj-portfolio/releases/tag/v${APP_VERSION}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                title={`Release v${APP_VERSION} on GitHub`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                v{APP_VERSION}
              </a>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] font-mono text-[10px]">
                  ⌘K
                </kbd>{" "}
                to open command palette
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
