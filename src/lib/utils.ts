// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return dateStr;
}

export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? "";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

/** Convert bytes to human-readable size */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Compute language percentages from bytes map */
export function computeLanguagePercentages(
  languages: Record<string, number>
): Array<{ name: string; percentage: number; color: string }> {
  const LANG_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    PHP: "#777bb4",
    Python: "#3572A5",
    "C#": "#178600",
    Java: "#b07219",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Shell: "#89e051",
    "Shell Script": "#89e051",
    Dockerfile: "#384d54",
  };

  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / total) * 100),
      color: LANG_COLORS[name] ?? "#737373",
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);
}
