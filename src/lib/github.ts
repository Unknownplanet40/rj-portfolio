// src/lib/github.ts
import type { GitHubRepo, GitHubStats } from "@/types";

const GITHUB_USERNAME = "Unknownplanet40";
const GITHUB_API = "https://api.github.com";

// Only allowed public repositories per portfolio configuration
const ALLOWED_REPO_NAMES = new Set([
  "CapsStream",
  "IDGenerator",
  "Ojt-system",
  "Simple-Blood-Bank-Management-System",
  "POS-Inventory-Management-System",
  "CSG-System",
  "customNewTab",
  "MySQL-Auto-Repair-Script",
  "Simple-Hulk-Buster-PixelArt-Project-Java-Applet",
  "Point-Of-Sale-P.O.S-Java-Project",
]);

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

let cachedStats: GitHubStats | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 1000 * 60 * 15; // 15 minutes

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const now = Date.now();
  if (cachedStats && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedStats;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 3600 } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API responded with status ${userRes.status}/${reposRes.status} (rate-limited)`
      );
    }

    const user = await userRes.json();
    const allRepos: GitHubRepo[] = await reposRes.json();

    // Strictly filter to allowed public repositories
    const allowedRepos = allRepos.filter(
      (r) => !r.fork && ALLOWED_REPO_NAMES.has(r.name)
    );

    // Aggregate language bytes for allowed repos
    const languages: Record<string, number> = {};
    const langFetches = allowedRepos.slice(0, 10).map(async (repo) => {
      try {
        const res = await fetch(
          `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
          { headers, next: { revalidate: 3600 } }
        );
        if (res.ok) {
          const data: Record<string, number> = await res.json();
          Object.entries(data).forEach(([lang, bytes]) => {
            languages[lang] = (languages[lang] ?? 0) + bytes;
          });
        }
      } catch {
        // ignore language fetch failure
      }
    });

    await Promise.all(langFetches);

    const totalStars = allowedRepos.reduce(
      (acc, r) => acc + (r.stargazers_count ?? 0),
      0
    );

    const pinnedRepos = [...allowedRepos]
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, 6);

    cachedStats = {
      username: GITHUB_USERNAME,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      publicRepos: allowedRepos.length > 0 ? allowedRepos.length : (user.public_repos ?? 10),
      totalStars,
      languages:
        Object.keys(languages).length > 0
          ? languages
          : getFallbackStats().languages,
      pinnedRepos:
        pinnedRepos.length > 0 ? pinnedRepos : getFallbackStats().pinnedRepos,
    };
    lastFetchTime = now;
    return cachedStats;
  } catch {
    if (!cachedStats) {
      console.info(
        "Note: Using configured portfolio project data for GitHub stats."
      );
    }
    cachedStats = getFallbackStats();
    lastFetchTime = now;
    return cachedStats;
  }
}

function getFallbackStats(): GitHubStats {
  return {
    username: GITHUB_USERNAME,
    followers: 12,
    following: 15,
    publicRepos: 10,
    totalStars: 24,
    languages: {
      Python: 68000,
      PHP: 54000,
      "C#": 42000,
      JavaScript: 38000,
      Java: 26000,
      HTML: 14000,
      CSS: 12000,
      "Shell Script": 8000,
    },
    pinnedRepos: [
      {
        id: 101,
        name: "CapsStream",
        description:
          "Self-hosted cinematic personal media server for movies, TV shows, and anime with TMDb metadata and hardware-accelerated player.",
        html_url: "https://github.com/Unknownplanet40/CapsStream",
        stargazers_count: 14,
        forks_count: 4,
        language: "Python",
        topics: ["python", "vue", "ffmpeg", "media-server", "tmdb", "sqlite"],
        fork: false,
      },
      {
        id: 102,
        name: "IDGenerator",
        description:
          "Desktop application for generating and printing school or organization ID cards with photo and template support.",
        html_url: "https://github.com/Unknownplanet40/IDGenerator",
        stargazers_count: 6,
        forks_count: 1,
        language: "C#",
        topics: ["csharp", "dotnet", "winforms", "id-cards"],
        fork: false,
      },
      {
        id: 103,
        name: "Ojt-system",
        description:
          "Web-based system for managing student internship (OJT) applications, company placements, and progress tracking.",
        html_url: "https://github.com/Unknownplanet40/Ojt-system",
        stargazers_count: 5,
        forks_count: 2,
        language: "PHP",
        topics: ["php", "mysql", "bootstrap", "internship-management"],
        fork: false,
      },
      {
        id: 104,
        name: "POS-Inventory-Management-System",
        description:
          "Point-of-sale and inventory management system with billing, stock tracking, and reporting features.",
        html_url:
          "https://github.com/Unknownplanet40/POS-Inventory-Management-System",
        stargazers_count: 4,
        forks_count: 1,
        language: "PHP",
        topics: ["php", "mysql", "pos", "inventory-management"],
        fork: false,
      },
      {
        id: 105,
        name: "Simple-Blood-Bank-Management-System",
        description:
          "Platform to manage donor records, track blood types, and schedule donation appointments efficiently.",
        html_url:
          "https://github.com/Unknownplanet40/Simple-Blood-Bank-Management-System",
        stargazers_count: 3,
        forks_count: 1,
        language: "PHP",
        topics: ["php", "mysql", "blood-bank-management"],
        fork: false,
      },
      {
        id: 106,
        name: "CSG-System",
        description:
          "Student governance management system for tracking officers, events, and organizational records.",
        html_url: "https://github.com/Unknownplanet40/CSG-System",
        stargazers_count: 3,
        forks_count: 0,
        language: "PHP",
        topics: ["php", "mysql", "student-council"],
        fork: false,
      },
    ],
  };
}
