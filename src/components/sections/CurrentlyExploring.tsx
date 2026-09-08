// src/components/sections/CurrentlyExploring.tsx
"use client";

import { Sparkles, CheckCircle2, Layers, Terminal, Clock } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { CURRENTLY_EXPLORING } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function CurrentlyExploring() {
  const { title, status, description, tools, focusAreas, lastUpdated, learningNote } = CURRENTLY_EXPLORING;

  return (
    <section
      id="exploring"
      className="section bg-[var(--color-bg)] overflow-hidden relative"
      aria-labelledby="exploring-heading"
    >
      <div className="container min-w-0">
        <ScrollAnimation className="flex flex-col gap-3 mb-10">
          <SectionLabel>Active Focus</SectionLabel>
          <SectionHeading id="exploring-heading">{title}</SectionHeading>
        </ScrollAnimation>

        {/* Elevated Glassmorphism Card */}
        <ScrollAnimation>
          <div className="relative rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] overflow-hidden p-6 sm:p-8 md:p-10">
            {/* Subtle top accent gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
              }}
            />

            {/* Ambient background glow */}
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-10 pointer-events-none"
              style={{
                background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-[var(--color-border)]">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span>{status}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono">
                <Clock size={12} />
                <span>{lastUpdated}</span>
              </div>
            </div>

            {/* Two-Column Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Mission & Active Toolset */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] tracking-tight mb-3">
                    Multi-Model AI Engineering Workflow
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Active Tools */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Active AI Tools &amp; Engines
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <div
                        key={tool.name}
                        className={cn(
                          "px-3.5 py-1.5 rounded-[var(--radius-lg)] text-xs font-medium",
                          "border border-[var(--color-border)] bg-[var(--color-bg-secondary)]",
                          "text-[var(--color-text)] flex items-center gap-2",
                          "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]",
                          "transition-all duration-150 cursor-default select-none shadow-sm"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                        <span>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continuous Learning Callout */}
                {learningNote && (
                  <div className="p-4 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-start gap-3.5 shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--color-text)] mb-0.5">
                        Continuous Learning
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] italic leading-relaxed">
                        &ldquo;{learningNote}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Focus Areas Checklist */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <Layers size={14} className="text-[var(--color-success)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Primary Focus Areas
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {focusAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-start gap-3 hover:border-[var(--color-border-strong)] transition-colors"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[var(--color-success)] shrink-0 mt-0.5"
                      />
                      <span className="text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] leading-snug">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
