// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SECTION_IDS = ["about", "skills", "projects", "experience", "education", "certifications", "timeline", "github", "exploring", "contact"];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);
  const { isOpen: paletteOpen, open: openPalette, close: closePalette } = useCommandPalette();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <>
      <CommandPalette isOpen={paletteOpen} onClose={closePalette} />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          isScrolled
            ? "glass border-b border-[var(--color-border)] shadow-[var(--shadow-sm)]"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav
          className="container flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            onClick={() => {
              if (window.scrollY < 30) {
                window.dispatchEvent(new CustomEvent("replay-logo-reveal"));
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-[var(--radius-md)]"
            aria-label="Ryan James logo - Click to scroll to top"
            title="Click to go to top"
          >
            <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <Image
                src={`${basePath}/logo/logo-transparent_dark.png`}
                alt="Ryan James Logo"
                width={32}
                height={32}
                className="block dark:hidden object-contain w-8 h-8"
                priority
                loading="eager"
              />
              <Image
                src={`${basePath}/logo/logo-transparent_light.png`}
                alt="Ryan James Logo"
                width={32}
                height={32}
                className="hidden dark:block object-contain w-8 h-8"
                priority
                loading="eager"
              />
            </div>
            <span className="font-semibold text-sm text-[var(--color-text)] hidden sm:block">
              Ryan James
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={cn(
                      "px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium",
                      "transition-all duration-150",
                      isActive
                        ? "text-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Command palette trigger */}
            <button
              onClick={openPalette}
              aria-label="Open command palette (Ctrl+K)"
              className={cn(
                "hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--radius-lg)]",
                "text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]",
                "hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-secondary)]",
                "transition-all duration-150 bg-[var(--color-surface)]",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              )}
            >
              <Terminal size={13} />
              <span>⌘K</span>
            </button>

            <ThemeToggle />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={cn(
                "md:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-lg)]",
                "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
                "hover:bg-[var(--color-surface-hover)] transition-all duration-150"
              )}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cn(
                "md:hidden bg-[var(--color-surface)] overflow-hidden",
                isScrolled && "border-t border-[var(--color-border)]"
              )}
            >
              <ul className="container py-3 flex flex-col gap-1" role="list">
                {NAV_LINKS.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium",
                          "transition-all duration-150",
                          isActive
                            ? "text-[var(--color-accent)] bg-[var(--color-accent-subtle)]"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                        )}
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={openPalette}
                    className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-[var(--radius-md)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                  >
                    <Terminal size={14} />
                    Command Palette
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
