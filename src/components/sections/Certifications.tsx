"use client";

import { Award, Calendar, ExternalLink } from "lucide-react";
import { ScrollAnimation, StaggerContainer, staggerItem } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CERTIFICATIONS } from "@/data/portfolio";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PLATFORM_COLORS: Record<string, string> = {
  Coursera: "accent",
  Udemy: "success",
  YouAccel: "success",
  "Codein Academy": "default",
  "SDE Arts": "outline",
};

export function Certifications() {
  return (
    <section id="certifications" className="section" aria-labelledby="certifications-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Certifications</SectionLabel>
          <SectionHeading id="certifications-heading">
            Verified Credentials
          </SectionHeading>
        </ScrollAnimation>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <motion.article
              key={cert.id}
              variants={staggerItem}
              className={cn(
                "flex flex-col gap-4 p-5 rounded-[var(--radius-xl)]",
                "border border-[var(--color-border)] bg-[var(--color-surface)]",
                "shadow-[var(--shadow-sm)] card-hover",
                "group"
              )}
              aria-label={cert.title}
            >
              {/* Icon + platform */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-accent-subtle)] flex items-center justify-center text-[var(--color-accent)]">
                  <Award size={18} />
                </div>
                <Badge variant={(PLATFORM_COLORS[cert.platform] as "accent" | "success" | "default" | "outline") ?? "default"}>
                  {cert.platform}
                </Badge>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-[var(--color-text)] text-sm leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)]">{cert.issuer}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                  <Calendar size={11} />
                  {cert.date}
                </span>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline flex items-center gap-1 text-xs"
                    aria-label={`View ${cert.title} certificate`}
                  >
                    View <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
