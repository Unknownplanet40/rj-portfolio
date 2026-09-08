# Architecture & Technical Design

## Overview
Ryan James V. Capadocia's personal portfolio is a modern, high-performance static web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. It is designed to present a sleek, corporate, Apple/Vercel/Linear-inspired aesthetic with rich interactive features for recruiters and engineering leads.

---

## Architectural Principles

1. **Static Export First (`output: 'export'`)**:
   - Compiles to 100% pre-rendered HTML/CSS/JS in the `./out` directory.
   - Hosted with zero server costs on GitHub Pages or any static CDN (e.g. Vercel, Cloudflare Pages).
   - Configured with robust `basePath` handling for custom domains or subpath deployments (`/rj-portfolio`).

2. **Dual-Profile Recruiter Framing**:
   - Highlights capabilities in both **IT Support / Systems Administration** and **Full-Stack Web Development**.
   - Showcases hardware, networking, Active Directory, virtualization, and ticketing alongside React, Next.js, Node.js, and TypeScript.

3. **Accessibility & Usability (WCAG 2.1 AA Compliant)**:
   - Skip to main content link for keyboard navigation.
   - Command palette (`Cmd+K` or `Ctrl+K`) for rapid page navigation and actions.
   - High contrast dark/light themes with smooth transition via `next-themes`.
   - Semantic HTML5 section elements and ARIA landmarks throughout.

---

## Directory Structure

```
rj-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions static deployment to GitHub Pages
├── public/
│   ├── avatar.jpg              # Professional AI-generated avatar
│   ├── og-image.jpg            # Open Graph social preview banner (1200x630)
│   ├── rss.xml                 # Static RSS 2.0 feed
│   └── ...
├── src/
│   ├── app/
│   │   ├── globals.css         # Token system, dot grid background, custom utilities
│   │   ├── layout.tsx          # Root layout with ThemeProvider, SEO, ReadingProgress
│   │   ├── page.tsx            # Main single-page portfolio assembling all sections
│   │   ├── not-found.tsx       # Custom styled 404 page
│   │   ├── robots.ts           # Dynamic robots.txt generation
│   │   └── sitemap.ts          # XML sitemap generator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Sticky glass navbar with scroll spy & mobile menu
│   │   │   ├── Footer.tsx      # Clean minimal footer with social links
│   │   │   └── LoadingScreen.tsx # Elegant initial loading screen
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # High-impact introduction with dynamic role switcher
│   │   │   ├── About.tsx       # Bio, background, and animated counter metrics
│   │   │   ├── Education.tsx   # BS Information Technology degree card
│   │   │   ├── Certifications.tsx # 6 verified IT & Cloud certifications
│   │   │   ├── Skills.tsx      # Categorized skill badges (IT Support & Dev)
│   │   │   ├── Experience.tsx  # Interactive career timeline & responsibilities
│   │   │   ├── Projects.tsx    # Featured showcase (CapsStream) + project deck
│   │   │   ├── GitHubStats.tsx # Live/fallback GitHub repository & activity cards
│   │   │   ├── Timeline.tsx    # Chronological milestone progression (2021–2025)
│   │   │   └── Contact.tsx     # Formspree email form + direct contact channels
│   │   └── ui/
│   │       ├── AnimatedCounter.tsx # Smooth viewport-triggered count-up
│   │       ├── Badge.tsx       # Technology badges and status pills
│   │       ├── Button.tsx      # Primary, secondary, outline, and ghost buttons
│   │       ├── Card.tsx        # Elevated card container with hover effect
│   │       ├── CommandPalette.tsx # Spotlight/Raycast-style Cmd+K menu
│   │       ├── ReadingProgress.tsx# Sticky top-of-page scroll progress indicator
│   │       ├── ScrollAnimation.tsx # Framer Motion scroll-reveal wrappers
│   │       ├── SkeletonLoader.tsx # Skeleton loading state components
│   │       └── ThemeToggle.tsx # Dark/light mode switcher
│   ├── data/
│   │   ├── portfolio.ts        # Single source of truth for resume, bio, links, and projects
│   │   └── github.ts           # GitHub user repositories & metrics data service
│   ├── lib/
│   │   ├── github.ts           # Octokit / REST API client with fallback mock data
│   │   └── utils.ts            # Tailwind class merge utility (`clsx` + `tailwind-merge`)
│   └── types/
│       └── index.ts            # Full TypeScript interfaces for all data structures
├── next.config.ts              # Next.js export configuration
├── package.json                # Project dependencies and build scripts
├── tailwind.config.ts          # Custom color tokens, animations, and typography
└── tsconfig.json               # Strict TypeScript compiler options
```

---

## Performance & Optimization

- **Zero Client-Side Waterfalls**: Data is statically embedded at build time with graceful offline fallbacks.
- **Image Optimization**: Unoptimized export mode with explicit dimensions and modern formats (`.webp`/`.jpg`).
- **CSS Architecture**: Utility-driven with Tailwind CSS, purged in production down to minimal critical CSS.
- **Micro-Interactions**: Framer Motion animations trigger strictly on scroll into view with GPU-accelerated transforms (`translate3d`, `opacity`).
