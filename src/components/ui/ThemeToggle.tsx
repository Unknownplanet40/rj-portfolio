// src/components/ui/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--color-bg-secondary)]",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "w-9 h-9 inline-flex items-center justify-center rounded-[var(--radius-lg)]",
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
        "hover:bg-[var(--color-surface-hover)]",
        "transition-all duration-[var(--transition-fast)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
        className
      )}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
