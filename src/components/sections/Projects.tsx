// src/components/sections/Projects.tsx
"use client";

import { useState } from "react";
import {
  ExternalLink,
  Star,
  Zap,
  CheckCircle2,
  Monitor,
  Server,
  Cpu,
  Database,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { motion } from "framer-motion";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PROJECTS } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { CapsStreamGallery } from "@/components/sections/CapsStreamGallery";

export function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  const [filter, setFilter] = useState<string | null>(null);

  const allTech = Array.from(new Set(others.flatMap((p) => p.tech)));
  const filteredOthers = filter
    ? others.filter((p) => p.tech.includes(filter))
    : others;

  return (
    <section id="projects" className="section bg-[var(--color-bg-secondary)]" aria-labelledby="projects-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Projects</SectionLabel>
          <SectionHeading id="projects-heading">Things I&apos;ve Built</SectionHeading>
        </ScrollAnimation>

        {/* Featured Project */}
        {featured && (
          <ScrollAnimation className="mb-14 w-full min-w-0">
            <article
              className={cn(
                "w-full rounded-[var(--radius-2xl)] border border-[var(--color-border)]",
                "bg-[var(--color-surface)] overflow-hidden",
                "p-5 sm:p-6 md:p-10 shadow-[var(--shadow-md)]",
                "card-hover group"
              )}
              aria-label={`Featured project: ${featured.title}`}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start w-full min-w-0">
                {/* Left: info */}
                <div className="flex flex-col gap-5 min-w-0">
                  {/* Title row + inline Featured badge */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 shrink-0 rounded-[var(--radius-xl)] bg-[var(--color-accent-subtle)] flex items-center justify-center text-[var(--color-accent)]">
                      <Zap size={20} />
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] leading-tight break-words">
                        {featured.title}
                      </h3>
                      {/* Featured badge — inline, never overlaps */}
                      <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent)] text-white">
                        <Star size={11} fill="currentColor" />
                        Featured
                      </span>
                    </div>
                  </div>

                  <p className="text-[var(--color-text-secondary)] leading-relaxed break-words min-w-0 w-full">
                    {featured.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {featured.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3 flex-wrap">
                    {featured.github && (
                      <LinkButton
                        href={featured.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="md"
                        leftIcon={<Github size={15} />}
                        id="capsstream-github"
                      >
                        GitHub
                      </LinkButton>
                    )}
                    {featured.demo && (
                      <LinkButton
                        href={featured.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="md"
                        leftIcon={<ExternalLink size={15} />}
                        id="capsstream-demo"
                      >
                        Live Demo
                      </LinkButton>
                    )}
                  </div>
                </div>

                {/* Right: gallery + key features */}
                <div className="flex flex-col gap-4">
                  {featured.previews && featured.previews.length > 0 && (
                    <CapsStreamGallery previews={featured.previews} />
                  )}
                  {featured.highlights && (
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                        Key Features
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {featured.highlights.map((h) => (
                          <span
                            key={h}
                            className={cn(
                              "px-3 py-1.5 rounded-[var(--radius-lg)] text-xs font-medium",
                              "border border-[var(--color-border)]",
                              "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
                            )}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* System Architecture Flow Container */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      System Architecture &amp; Data Flow
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-success)] bg-[var(--color-success-subtle)] px-2.5 py-0.5 rounded-full border border-[var(--color-success)]/20 w-fit">
                    <CheckCircle2 size={12} />
                    Self-Hosted · Runs from External HDD
                  </span>
                </div>

                {/* 1-col mobile → 2-col sm → 4-col lg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Stage 1: Client */}
                  <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col gap-2 relative group/card hover:border-[var(--color-accent)]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center">
                        <Monitor size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                        FRONTEND
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-text)]">Vue 3 + Pinia</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">Web Player &amp; Android TV</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">HLS Player</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Multi-Profile</span>
                    </div>
                  </div>

                  {/* Stage 2: Backend */}
                  <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col gap-2 relative group/card hover:border-[var(--color-accent)]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-success-subtle)] text-[var(--color-success)] flex items-center justify-center">
                        <Server size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                        BACKEND
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-text)]">Python API</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">Media Scanner &amp; Endpoints</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Folder Watcher</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Watch Stats</span>
                    </div>
                  </div>

                  {/* Stage 3: Processing Engine */}
                  <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col gap-2 relative group/card hover:border-[var(--color-accent)]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center">
                        <Cpu size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                        PROCESSING
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-text)]">FFmpeg Core</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">Hardware Accelerated</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Direct Stream</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Transcoding</span>
                    </div>
                  </div>

                  {/* Stage 4: Database & API */}
                  <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col gap-2 relative group/card hover:border-[var(--color-accent)]/50 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center">
                        <Database size={16} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                        DATA &amp; API
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-text)]">SQLite &amp; TMDb</h4>
                      <p className="text-xs text-[var(--color-text-muted)]">Metadata &amp; Poster Cache</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-auto pt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Episodes &amp; Cast</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">Local DB</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </ScrollAnimation>
        )}

        {/* Other Projects */}
        <div className="flex flex-col gap-6">
          <ScrollAnimation className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">
              Other Projects
            </h3>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
              <button
                onClick={() => setFilter(null)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all",
                  !filter
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                )}
                aria-pressed={!filter}
              >
                All
              </button>
              {allTech.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(tech === filter ? null : tech)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-all",
                    filter === tech
                      ? "bg-[var(--color-accent)] text-white"
                      : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
                  )}
                  aria-pressed={filter === tech}
                >
                  {tech}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          {/* Horizontal scroll deck */}
          <div className="scroll-x flex gap-5 pb-4 -mx-6 px-6 md:-mx-10 md:px-10">
            {filteredOthers.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={cn(
                  "shrink-0 w-72 flex flex-col gap-4 p-5",
                  "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
                  "bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
                  "card-hover"
                )}
                aria-label={project.title}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-[var(--color-text)] leading-snug">
                    {project.title}
                  </h4>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  )}
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <Tag key={t} className="text-[10px] px-2 py-0.5">
                      {t}
                    </Tag>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 text-[var(--color-text-muted)]">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
