"use client";

import { Monitor, Code2 } from "lucide-react";
import { ScrollAnimation, StaggerContainer, staggerItem } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { SKILLS } from "@/data/portfolio";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Skills() {
  const itSkills = SKILLS.filter((s) => s.category === "it-support");
  const devSkills = SKILLS.filter((s) => s.category === "software-dev");

  return (
    <section id="skills" className="section bg-[var(--color-bg-secondary)]" aria-labelledby="skills-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Skills</SectionLabel>
          <SectionHeading id="skills-heading">What I Work With</SectionHeading>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {/* IT Support */}
          <SkillGroup
            icon={<Monitor size={18} />}
            title="IT Support"
            subtitle="Hardware · Networking · Systems"
            skills={itSkills.map((s) => s.name)}
            accentClass="bg-[var(--color-accent-subtle)] text-[var(--color-accent)]"
          />

          {/* Software Dev */}
          <SkillGroup
            icon={<Code2 size={18} />}
            title="Software Development"
            subtitle="Web · Desktop · Databases"
            skills={devSkills.map((s) => s.name)}
            accentClass="bg-[var(--color-success-subtle)] text-[var(--color-success)]"
          />
        </div>
      </div>
    </section>
  );
}

function SkillGroup({
  icon,
  title,
  subtitle,
  skills,
  accentClass,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  skills: string[];
  accentClass: string;
}) {
  return (
    <ScrollAnimation>
      <div className="flex flex-col gap-6 p-6 rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] h-full">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-[var(--radius-xl)] flex items-center justify-center", accentClass)}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-text)] text-base">{title}</h3>
            <p className="text-xs text-[var(--color-text-muted)]">{subtitle}</p>
          </div>
        </div>

        {/* Skill tags */}
        <StaggerContainer className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={staggerItem}
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-[var(--radius-lg)]",
                "text-xs font-medium border border-[var(--color-border)]",
                "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
                "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                "transition-colors duration-150 cursor-default"
              )}
            >
              {skill}
            </motion.span>
          ))}
        </StaggerContainer>
      </div>
    </ScrollAnimation>
  );
}
