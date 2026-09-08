"use client";

import { ScrollAnimation, StaggerContainer, staggerItem } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ABOUT } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ParallaxProfileCard } from "@/components/ui/ParallaxProfileCard";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div className="flex flex-col gap-8">
            <ScrollAnimation>
              <SectionLabel>About</SectionLabel>
              <SectionHeading id="about-heading" className="mt-3">
                Bridging IT Support &amp; Software Engineering
              </SectionHeading>
            </ScrollAnimation>

            <StaggerContainer className="flex flex-col gap-4">
              {ABOUT.bio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={staggerItem}
                  className="text-[var(--color-text-secondary)] leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </StaggerContainer>

            {/* Stats grid */}
            <ScrollAnimation delay={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {ABOUT.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1 p-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                  >
                    <span className="text-3xl font-bold text-[var(--color-text)]">
                      <AnimatedCounter value={stat.value} suffix="+" />
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Parallax Depth Card */}
          <ScrollAnimation delay={0.15} className="flex justify-center md:justify-end items-center">
            <div className="relative">
              {/* Subtle background grid card */}
              <div className="absolute -inset-4 rounded-[var(--radius-3xl)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] dot-grid opacity-50 pointer-events-none" />
              <ParallaxProfileCard basePath={basePath} />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
