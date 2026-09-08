// src/components/ui/Card.tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "shadow-[var(--shadow-sm)]",
        hover && "card-hover cursor-pointer",
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <span
      id={id}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]",
        className
      )}
    >
      <span className="w-4 h-px bg-[var(--color-accent)] inline-block" />
      {children}
    </span>
  );
}

export function SectionHeading({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)]",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <p
      id={id}
      className={cn(
        "text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl",
        className
      )}
    >
      {children}
    </p>
  );
}
