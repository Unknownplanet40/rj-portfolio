// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "success" | "outline";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  const variants = {
    default:
      "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
    accent:
      "bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-transparent",
    success:
      "bg-[var(--color-success-subtle)] text-[var(--color-success)] border border-transparent",
    outline:
      "border border-[var(--color-border-strong)] text-[var(--color-text-secondary)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Tech tag — slightly larger, used in project cards
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-[var(--radius-md)]",
        "text-xs font-medium",
        "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
        "border border-[var(--color-border)]",
        "transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        className
      )}
    >
      {children}
    </span>
  );
}
