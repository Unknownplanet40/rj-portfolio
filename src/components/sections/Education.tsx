"use client";

import Image from "next/image";
import { GraduationCap, MapPin, Calendar, ExternalLink } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading, Card } from "@/components/ui/Card";
import { EDUCATION } from "@/data/portfolio";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Education() {
  return (
    <section id="education" className="section bg-[var(--color-bg-secondary)]" aria-labelledby="education-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Education</SectionLabel>
          <SectionHeading id="education-heading">Academic Background</SectionHeading>
        </ScrollAnimation>

        <div className="flex flex-col gap-6">
          {EDUCATION.map((edu, i) => (
            <ScrollAnimation key={edu.id} delay={i * 0.1}>
              <Card className="flex gap-5 items-start" hover>
                <div className="shrink-0 w-16 h-16 rounded-[var(--radius-xl)] bg-white flex items-center justify-center overflow-hidden border border-[var(--color-border)] shadow-sm">
                  {edu.logo ? (
                    <Image
                      src={`${basePath}${edu.logo}`}
                      alt={`${edu.school} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <GraduationCap size={22} className="text-[var(--color-accent)]" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-semibold text-[var(--color-text)] text-lg leading-snug">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-[var(--color-accent)] text-sm">
                      {edu.school}
                    </p>
                    {edu.branchNote && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] font-normal">
                        {edu.branchNote}
                      </span>
                    )}
                    {edu.website && (
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 sm:ml-auto"
                        aria-label={`Visit ${edu.school} official website`}
                      >
                        Official site <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-0.5">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <Calendar size={12} />
                      {edu.period}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                      {edu.description}
                    </p>
                  )}
                  {edu.skills && edu.skills.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {edu.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-full text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] font-medium border border-[var(--color-border)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
