// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = "https://unknownplanet40.github.io/rj-portfolio";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ryan James V. Capadocia — IT Support Engineer & Software Developer",
    template: "%s | Ryan James V. Capadocia",
  },
  description:
    "Personal portfolio of Ryan James V. Capadocia — IT Support Engineer, Software Developer, and Problem Solver based in Imus, Cavite, Philippines. Specializing in IT support, systems administration, and full-stack web development.",
  keywords: [
    "Ryan James Capadocia",
    "IT Support Engineer",
    "Software Developer",
    "Help Desk",
    "Systems Administration",
    "Next.js developer",
    "Philippines",
    "Cavite",
    "portfolio",
    "CapsStream",
  ],
  authors: [{ name: "Ryan James V. Capadocia" }],
  creator: "Ryan James V. Capadocia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ryan James V. Capadocia — IT Support Engineer & Software Developer",
    description:
      "Personal portfolio of Ryan James V. Capadocia — IT Support, Systems Administration, and Full-Stack Web Development.",
    siteName: "Ryan James V. Capadocia",
    images: [
      {
        url: `${basePath}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ryan James V. Capadocia — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan James V. Capadocia — IT Support Engineer & Software Developer",
    description:
      "Personal portfolio — IT Support, Systems Administration, and Full-Stack Web Development.",
    images: [`${basePath}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: `${basePath}/favicon.ico`,
    apple: `${basePath}/icons/icon-192x192.png`,
  },
  manifest: `${basePath}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RJ Portfolio",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan James V. Capadocia",
  jobTitle: "IT Support Engineer & Software Developer",
  url: siteUrl,
  sameAs: [
    "https://github.com/Unknownplanet40",
    "https://linkedin.com/in/rj45",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Imus",
    addressRegion: "Cavite",
    addressCountry: "PH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Cavite State University – Imus Campus",
  },
  knowsAbout: [
    "IT Support",
    "Hardware Troubleshooting",
    "Network Administration",
    "Web Development",
    "Next.js",
    "TypeScript",
    "React",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preload above-the-fold logo images (Navbar is 'use client' so priority prop
            cannot emit server-side preload hints — we do it explicitly here) */}
        <link
          rel="preload"
          as="image"
          href={`${basePath}/logo/logo-transparent_dark.png`}
          // shown in light mode
        />
        <link
          rel="preload"
          as="image"
          href={`${basePath}/logo/logo-transparent_light.png`}
          // shown in dark mode
        />
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* PWA Manifest fallback & meta */}
        <link rel="manifest" href={`${basePath}/manifest.json`} />
        <meta name="application-name" content="RJ Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RJ Portfolio" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LoadingScreen />
          <PwaRegister />
          <ReadingProgress />
          <a
            href="#about"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-[var(--radius-lg)] focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
