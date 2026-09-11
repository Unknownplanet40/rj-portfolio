// src/app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center drop-shadow-md">
              <Image
                src={`${basePath}/logo/logo-transparent_dark.png`}
                alt="Ryan James Logo"
                width={80}
                height={80}
                priority
                className="block dark:hidden object-contain w-full h-full"
              />
              <Image
                src={`${basePath}/logo/logo-transparent_light.png`}
                alt="Ryan James Logo"
                width={80}
                height={80}
                priority
                className="hidden dark:block object-contain w-full h-full"
              />
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
