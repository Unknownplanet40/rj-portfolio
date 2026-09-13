// src/components/sections/Contact.tsx
"use client";

import { useState } from "react";
import { MapPin, Download, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { ScrollAnimation } from "@/components/ui/ScrollAnimation";
import { SectionLabel, SectionHeading } from "@/components/ui/Card";
import { Button, LinkButton } from "@/components/ui/Button";
import { CONTACT } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || CONTACT.formspreeId;

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const contactLinks = [
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/rj45",
      href: CONTACT.linkedin,
      icon: <Linkedin size={18} />,
    },
    {
      id: "github",
      label: "GitHub",
      value: "github.com/Unknownplanet40",
      href: CONTACT.github,
      icon: <Github size={18} />,
    },
    {
      id: "location",
      label: "Location",
      value: CONTACT.location,
      href: null,
      icon: <MapPin size={18} />,
    },
  ];

  return (
    <section id="contact" className="section bg-[var(--color-bg)]" aria-labelledby="contact-heading">
      <div className="container">
        <ScrollAnimation className="flex flex-col gap-3 mb-12">
          <SectionLabel>Contact</SectionLabel>
          <SectionHeading id="contact-heading">Let&apos;s Work Together</SectionHeading>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Form */}
          <ScrollAnimation>
            <form
              onSubmit={handleSubmit}
              noValidate
              suppressHydrationWarning
              aria-label="Contact form"
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-[var(--color-text)]">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  suppressHydrationWarning
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className={cn(
                    "w-full px-4 py-3 rounded-[var(--radius-lg)]",
                    "border border-[var(--color-border)] bg-[var(--color-surface)]",
                    "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
                    "text-sm outline-none",
                    "focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20",
                    "transition-colors duration-150"
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-[var(--color-text)]">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  suppressHydrationWarning
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={cn(
                    "w-full px-4 py-3 rounded-[var(--radius-lg)]",
                    "border border-[var(--color-border)] bg-[var(--color-surface)]",
                    "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
                    "text-sm outline-none",
                    "focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20",
                    "transition-colors duration-150"
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-medium text-[var(--color-text)]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  suppressHydrationWarning
                  value={formData.message}
                  onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the opportunity or project…"
                  className={cn(
                    "w-full px-4 py-3 rounded-[var(--radius-lg)] resize-none",
                    "border border-[var(--color-border)] bg-[var(--color-surface)]",
                    "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
                    "text-sm outline-none",
                    "focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-20",
                    "transition-colors duration-150"
                  )}
                />
              </div>

              {/* Status messages */}
              {formState === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-[var(--radius-lg)] bg-[var(--color-success-subtle)] text-[var(--color-success)] text-sm">
                  <CheckCircle2 size={16} />
                  Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {formState === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-[var(--radius-lg)] bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={formState === "loading"}
                leftIcon={<Send size={16} />}
                disabled={formState === "success"}
                id="contact-submit"
                className="w-full"
              >
                {formState === "success" ? "Message Sent!" : "Send Message"}
              </Button>
            </form>
          </ScrollAnimation>

          {/* Contact links */}
          <ScrollAnimation delay={0.15} className="flex flex-col gap-6">
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              I&apos;m currently open to IT Support, Help Desk, Systems Administration, and Junior Software Engineer opportunities.
              Feel free to reach out through any of the channels below, or use the form to send me a direct message.
            </p>

            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <div
                  key={link.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-[var(--radius-xl)]",
                    "border border-[var(--color-border)] bg-[var(--color-surface)]",
                    link.href && "hover:border-[var(--color-accent)] transition-colors card-hover"
                  )}
                >
                  <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      {link.label}
                    </p>
                    {link.href ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors truncate block"
                        id={`contact-${link.id}`}
                      >
                        {link.value}
                      </a>
                    ) : (
                      <span className="text-sm text-[var(--color-text)]">{link.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Download Resume */}
            <LinkButton
              href={`${basePath}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              leftIcon={<Download size={16} />}
              id="contact-download-resume"
              className="w-full justify-center"
            >
              Download Resume
            </LinkButton>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
