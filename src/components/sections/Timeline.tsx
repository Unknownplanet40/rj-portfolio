"use client";

import { Clock } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { TIMELINE } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Timeline() {
  return (
    <section id="timeline" className="section" aria-labelledby="timeline-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Timeline</SectionLabel>
          <SectionHeading id="timeline-heading">My Journey</SectionHeading>
        </ScrollAnimation>

        <div className="relative max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--color-border)]" aria-hidden="true" />

          <div className="flex flex-col gap-8">
            {TIMELINE.map((item, i) => (
              <ScrollAnimation key={item.year} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  {/* Year marker */}
                  <div className="relative shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-[0_0_0_4px_var(--color-bg)]">
                    <Clock size={16} className="text-white" />
                  </div>

                  {/* Events */}
                  <div className="flex flex-col gap-2 pb-2 pt-2 flex-1">
                    <span className="font-bold text-[var(--color-accent)] text-lg leading-none">
                      {item.year}
                    </span>
                    <ul className="flex flex-col gap-2">
                      {item.events.map((event, j) => (
                        <li
                          key={j}
                          className={cn(
                            "flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                          )}
                        >
                          <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)] mt-2 shrink-0" />
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
