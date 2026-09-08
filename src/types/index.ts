// src/types/index.ts

export interface Skill {
  name: string;
  category: "it-support" | "software-dev";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyDisplay: string;
  period: string;
  location?: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  location?: string;
  website?: string;
  description?: string;
  branchNote?: string;
  skills?: string[];
  logo?: string;
}

export interface TimelineEvent {
  year: string;
  events: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork?: boolean;
}

export interface GitHubStats {
  username: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  languages: Record<string, number>;
  pinnedRepos: GitHubRepo[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  category: string;
  action: () => void;
  icon?: string;
}

export interface CurrentlyExploringData {
  title: string;
  status: string;
  description: string;
  tools: Array<{
    name: string;
    category?: string;
  }>;
  focusAreas: string[];
  lastUpdated: string;
  learningNote?: string;
}
