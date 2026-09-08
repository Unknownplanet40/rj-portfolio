// src/components/sections/GitHubStats.tsx
"use client";

import { Star, Users, BookOpen, GitFork } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { ScrollAnimation, StaggerContainer, staggerItem } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { computeLanguagePercentages } from "@/lib/utils";
import type { GitHubStats as GitHubStatsType } from "@/types";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GitHubStatsSectionProps {
  stats: GitHubStatsType;
}

export function GitHubStatsSection({ stats }: GitHubStatsSectionProps) {
  const languages = computeLanguagePercentages(stats.languages);

  const statCards = [
    { label: "Public Repos", value: stats.publicRepos, icon: <BookOpen size={18} /> },
    { label: "Total Stars", value: stats.totalStars, icon: <Star size={18} /> },
    { label: "Followers", value: stats.followers, icon: <Users size={18} /> },
    { label: "Following", value: stats.following, icon: <Users size={18} /> },
  ];

  return (
    <section
      id="github"
      className="section bg-[var(--color-bg-secondary)] overflow-hidden"
      aria-labelledby="github-heading"
    >
      <div className="container min-w-0">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>GitHub</SectionLabel>
          <SectionHeading id="github-heading">
            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:text-[var(--color-accent)] transition-colors"
            >
              <Github size={32} />
              @{stats.username}
            </a>
          </SectionHeading>
        </ScrollAnimation>

        {/* Stats cards */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 min-w-0">
          {statCards.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItem}
              className="flex flex-col gap-2 p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] text-center min-w-0"
            >
              <span className="text-[var(--color-text-muted)] flex justify-center">{s.icon}</span>
              <span className="text-3xl font-bold text-[var(--color-text)]">
                <AnimatedCounter value={s.value} />
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">{s.label}</span>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* 2-Column Grid with strict width constraints and min-w-0 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full min-w-0">
          {/* Languages Column */}
          {languages.length > 0 && (
            <ScrollAnimation className="w-full min-w-0">
              <div className="flex flex-col gap-5 p-6 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] w-full min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--color-text)]">Top Languages</h3>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    {languages.length} detected
                  </span>
                </div>

                {/* Aggregate multi-segment bar */}
                <div
                  className="flex rounded-full overflow-hidden h-2.5 w-full bg-[var(--color-bg-secondary)]"
                  role="img"
                  aria-label="Language breakdown"
                >
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      style={{ width: `${l.percentage}%`, background: l.color }}
                      title={`${l.name}: ${l.percentage}%`}
                      className="shrink-0 h-full"
                    />
                  ))}
                </div>

                {/* Language list with bounded progress bars */}
                <div className="flex flex-col gap-3 w-full min-w-0">
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between gap-3 w-full min-w-0 text-sm"
                    >
                      {/* Name & Dot */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: l.color }}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-[var(--color-text-secondary)] truncate">
                          {l.name}
                        </span>
                      </div>

                      {/* Bounded Progress Track */}
                      <div
                        className="w-24 sm:w-36 h-2 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden shrink-0 border border-[var(--color-border)]/50"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, Math.max(l.percentage, 4))}%`,
                            background: l.color,
                          }}
                        />
                      </div>

                      {/* Percentage label */}
                      <span className="text-xs font-mono font-medium text-[var(--color-text-muted)] w-9 text-right shrink-0">
                        {l.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Pinned Repositories Column */}
          {stats.pinnedRepos.length > 0 && (
            <ScrollAnimation delay={0.15} className="w-full min-w-0">
              <div className="flex flex-col gap-4 p-6 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] w-full min-w-0 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[var(--color-text)]">Top Repositories</h3>
                  <a
                    href={`https://github.com/${stats.username}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--color-accent)] hover:underline font-medium"
                  >
                    View all →
                  </a>
                </div>

                <div className="flex flex-col gap-3 w-full min-w-0">
                  {stats.pinnedRepos.slice(0, 4).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-[var(--radius-lg)]",
                        "border border-[var(--color-border)] hover:border-[var(--color-accent)]",
                        "transition-all hover:shadow-[var(--shadow-sm)]",
                        "group w-full min-w-0 overflow-hidden"
                      )}
                    >
                      <BookOpen
                        size={15}
                        className="text-[var(--color-text-muted)] mt-0.5 shrink-0 group-hover:text-[var(--color-accent)] transition-colors"
                      />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-sm font-medium text-[var(--color-text)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                          {repo.name}
                        </p>
                        {repo.description && (
                          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                            {repo.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5">
                          {repo.language && (
                            <span className="text-[10px] text-[var(--color-text-muted)]">
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
                            <Star size={10} />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]">
                            <GitFork size={10} />
                            {repo.forks_count}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Fallback if no repos */}
          {stats.pinnedRepos.length === 0 && (
            <ScrollAnimation delay={0.15} className="w-full min-w-0">
              <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-[var(--radius-2xl)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] text-center h-full min-h-[220px] w-full min-w-0 overflow-hidden">
                <Github size={32} className="text-[var(--color-text-muted)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                    @{stats.username}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    View repositories on GitHub
                  </p>
                </div>
                <a
                  href={`https://github.com/${stats.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[var(--color-accent)] hover:underline"
                >
                  Visit Profile →
                </a>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </div>
    </section>
  );
}
