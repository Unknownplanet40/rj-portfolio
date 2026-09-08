"use client";

import { Briefcase, Calendar, Building2, CheckCircle2 } from "lucide-react";
import { ScrollAnimation, StaggerContainer, staggerItem } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { EXPERIENCE } from "@/data/portfolio";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Experience</SectionLabel>
          <SectionHeading id="experience-heading">Professional History</SectionHeading>
        </ScrollAnimation>

        <div className="flex flex-col gap-8 max-w-2xl">
          {EXPERIENCE.map((exp, i) => (
            <ScrollAnimation key={exp.id} delay={i * 0.1}>
              <article className="relative flex gap-5">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 shrink-0 rounded-[var(--radius-xl)] bg-[var(--color-accent-subtle)] flex items-center justify-center text-[var(--color-accent)]">
                    <Briefcase size={18} />
                  </div>
                  <div className="w-px flex-1 bg-[var(--color-border)] mt-3" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 pb-8 flex-1">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-[var(--color-text)]">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]">
                        <Building2 size={13} />
                        {exp.companyDisplay}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                        <Calendar size={13} />
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5 italic">
                      Details available upon request
                    </p>
                  </div>

                  <StaggerContainer className="flex flex-col gap-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <motion.div
                        key={idx}
                        variants={staggerItem}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 size={15} className="text-[var(--color-success)] mt-0.5 shrink-0" />
                        <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {resp}
                        </span>
                      </motion.div>
                    ))}
                  </StaggerContainer>
                </div>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
