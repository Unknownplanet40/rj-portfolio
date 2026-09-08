// src/app/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center text-center gap-8 py-20">
        {/* Large 404 */}
        <div className="relative">
          <span
            className="text-[12rem] font-bold leading-none select-none pointer-events-none"
            style={{ color: "var(--color-bg-tertiary)" }}
            aria-hidden="true"
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl">
                RJ
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-md">
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">
            Page not found
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
            you back to the portfolio.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-lg)] bg-[var(--color-accent)] text-white font-medium text-sm hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
