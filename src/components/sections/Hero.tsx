// src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Download,
  ArrowDown,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";
import { HERO, CONTACT } from "@/data/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

      {/* Animated gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
            animation: "blob-drift 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15 dark:opacity-10"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            animation: "blob-drift 16s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--color-bg) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6 order-2 md:order-1">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] pulse-dot" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text)] leading-[1.08]"
            >
              Ryan James V.
              <br />
              Capadocia
            </motion.h1>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-8 overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-lg font-semibold text-[var(--color-accent)]"
              >
                {HERO.roles[roleIndex]}
              </motion.p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-lg"
            >
              {HERO.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <LinkButton
                href={`${basePath}/resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                leftIcon={<Download size={16} />}
                id="hero-download-resume"
              >
                Download Resume
              </LinkButton>

              <LinkButton
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                size="lg"
                id="hero-view-projects"
              >
                View Projects
              </LinkButton>

              <LinkButton
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                leftIcon={<Github size={16} />}
                id="hero-github"
                aria-label="GitHub profile"
              >
                GitHub
              </LinkButton>

              <LinkButton
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                leftIcon={<Linkedin size={16} />}
                id="hero-linkedin"
                aria-label="LinkedIn profile"
              >
                LinkedIn
              </LinkButton>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Outer glow ring — animated */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #2563eb, #60a5fa, #2563eb)",
                  animation: "spin 6s linear infinite",
                  opacity: 0.7,
                }}
              />
              {/* White gap between glow and photo */}
              <div className="absolute -inset-0.5 rounded-full bg-[var(--color-bg)]" />
              {/* Outer ambient ring */}
              <div className="absolute -inset-4 rounded-full border border-[var(--color-border)] opacity-40" />

              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[var(--shadow-xl)] bg-[var(--color-surface)]">
                <Image
                  src={`${basePath}/profile/profile-display.png`}
                  alt="Ryan James V. Capadocia — IT Support Engineer and Software Developer"
                  fill
                  className="object-cover object-top"
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to About section"
            className="flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors group"
          >
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
