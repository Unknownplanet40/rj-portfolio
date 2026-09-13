// src/components/ui/CommandPalette.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Code2,
  Briefcase,
  Mail,
  Sun,
  Moon,
  ChevronRight,
  Clock,
  GraduationCap,
  Award,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { useTheme } from "next-themes";
import { APP_VERSION } from "@/lib/version";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      description: "Back to the top",
      category: "Navigation",
      icon: <Home size={16} />,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "about",
      label: "About Me",
      description: "Who I am and what I do",
      category: "Navigation",
      icon: <User size={16} />,
      action: () => scrollTo("about"),
    },
    {
      id: "skills",
      label: "Skills",
      description: "IT Support & Software Development skills",
      category: "Navigation",
      icon: <Code2 size={16} />,
      action: () => scrollTo("skills"),
    },
    {
      id: "projects",
      label: "Projects",
      description: "CapsStream and other projects",
      category: "Navigation",
      icon: <Code2 size={16} />,
      action: () => scrollTo("projects"),
    },
    {
      id: "experience",
      label: "Experience",
      description: "IT Support Internship",
      category: "Navigation",
      icon: <Briefcase size={16} />,
      action: () => scrollTo("experience"),
    },
    {
      id: "education",
      label: "Education",
      description: "BS Information Technology — CvSU Imus",
      category: "Navigation",
      icon: <GraduationCap size={16} />,
      action: () => scrollTo("education"),
    },
    {
      id: "certifications",
      label: "Certifications",
      description: "SQL, Git, PHP, Java, HTML, CSS",
      category: "Navigation",
      icon: <Award size={16} />,
      action: () => scrollTo("certifications"),
    },
    {
      id: "timeline",
      label: "Timeline",
      description: "My journey from 2021 to 2025",
      category: "Navigation",
      icon: <Clock size={16} />,
      action: () => scrollTo("timeline"),
    },
    {
      id: "github",
      label: "GitHub Stats",
      description: "Repositories and contributions",
      category: "Navigation",
      icon: <Github size={16} />,
      action: () => scrollTo("github"),
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch",
      category: "Navigation",
      icon: <Mail size={16} />,
      action: () => scrollTo("contact"),
    },
    {
      id: "theme",
      label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      description: "Toggle color scheme",
      category: "Actions",
      icon: isDark ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        setTheme(isDark ? "light" : "dark");
        onClose();
      },
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Open PDF resume",
      category: "Actions",
      icon: <ChevronRight size={16} />,
      action: () => {
        window.open("/resume.pdf", "_blank");
        onClose();
      },
    },
    {
      id: "github-profile",
      label: "Open GitHub Profile",
      description: "github.com/Unknownplanet40",
      category: "Links",
      icon: <Github size={16} />,
      action: () => {
        window.open("https://github.com/Unknownplanet40", "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: "linkedin.com/in/rj45",
      category: "Links",
      icon: <User size={16} />,
      action: () => {
        window.open("https://linkedin.com/in/rj45", "_blank");
        onClose();
      },
    },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % flatFiltered.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + flatFiltered.length) % flatFiltered.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        flatFiltered[selectedIndex]?.action();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatFiltered, selectedIndex]);

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(
              "fixed top-[15vh] left-1/2 -translate-x-1/2 z-[1001]",
              "w-full max-w-xl mx-4",
              "rounded-[var(--radius-2xl)] border border-[var(--color-border)]",
              "bg-[var(--color-surface)] shadow-[var(--shadow-xl)]",
              "overflow-hidden"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)]">
              <Search size={18} className="text-[var(--color-text-muted)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, sections, links…"
                className={cn(
                  "flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
                  "text-sm outline-none"
                )}
                aria-label="Search commands"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[380px] overflow-y-auto py-2">
              {flatFiltered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                      {category}
                    </p>
                    {items.map((item) => {
                      const isSelected = flatIndex === selectedIndex;
                      const currentIndex = flatIndex++;
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 text-left",
                            "transition-colors duration-75",
                            isSelected
                              ? "bg-[var(--color-accent)] text-white"
                              : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                          )}
                        >
                          <span
                            className={cn(
                              "shrink-0",
                              isSelected
                                ? "text-white"
                                : "text-[var(--color-text-muted)]"
                            )}
                          >
                            {item.icon}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-medium truncate">
                              {item.label}
                            </span>
                            {item.description && (
                              <span
                                className={cn(
                                  "block text-xs truncate",
                                  isSelected
                                    ? "text-white/70"
                                    : "text-[var(--color-text-muted)]"
                                )}
                              >
                                {item.description}
                              </span>
                            )}
                          </span>
                          <ChevronRight
                            size={14}
                            className={cn(
                              "shrink-0",
                              isSelected ? "text-white/70" : "text-[var(--color-text-muted)]"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] font-mono">↵</kbd>
                select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] font-mono">ESC</kbd>
                close
              </span>
              <span className="ml-auto font-mono text-[10px] text-[var(--color-text-muted)]">
                v{APP_VERSION}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
