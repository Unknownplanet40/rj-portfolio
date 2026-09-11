// src/data/portfolio.ts
import type {
  Certification,
  Education,
  Experience,
  NavLink,
  Project,
  Skill,
  TimelineEvent,
  CurrentlyExploringData,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Exploring", href: "#exploring" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  name: "Ryan James V. Capadocia",
  roles: ["IT Support Engineer", "Software Developer", "Problem Solver"],
  tagline:
    "I build reliable software, troubleshoot technical issues, and create practical solutions—from enterprise IT support to modern web applications.",
};

export const ABOUT = {
  bio: [
    "Ryan James V. Capadocia is an entry-level IT professional passionate about technology, troubleshooting, and software development.",
    "He graduated with a Bachelor of Science in Information Technology from Cavite State University – Imus Campus. His experience spans hardware troubleshooting, desktop assembly, CCTV installation, end-user support, and full-stack web application development.",
    "His goal is to build reliable systems that solve real-world problems—combining technical depth with a practical, user-first mindset.",
  ],
  stats: [
    { label: "Projects Built", value: 6 },
    { label: "Certifications", value: 6 },
    { label: "Years Learning", value: 4 },
    { label: "Technologies", value: 20 },
  ],
};

export const EDUCATION: Education[] = [
  {
    id: "bsit",
    degree: "Bachelor of Science in Information Technology (BSIT)",
    school: "Cavite State University – Imus Campus",
    period: "Sep 2021 – Sep 2025",
    location: "Cavite Civic Center, Palico IV, City of Imus, Cavite 4103",
    website: "https://www.cvsu-imus.edu.ph/",
    logo: "/logo/cvsu-favicon.png",
    description:
      "Graduated under the Department of Computer Studies (DCS). Comprehensive academic program covering software engineering, database design & administration, network infrastructure, systems analysis, and enterprise IT troubleshooting.",
    skills: [
      "PHP",
      "MySQL",
      "Web Development",
      "Systems Analysis",
      "Network Administration",
      "Hardware & IT Support",
    ],
  },
  {
    id: "senior-high",
    degree: "Senior High School — TVL Track (Information & Communications Technology)",
    school: "AMA Computer College / AMA University",
    branchNote: "Las Piñas Campus (formerly Alabang–Zapote Rd; relocated)",
    period: "Mar 2018 – Jun 2020",
    location: "Almanza Uno, Las Piñas City, Metro Manila",
    website: "https://www.amaes.edu.ph/",
    logo: "/logo/ama-favicon.ico",
    description:
      "Specialized Technical-Vocational-Livelihood (TVL-ICT) track by the pioneer of computer education in the Philippines. Rigorous coursework covering computer systems servicing, Java object-oriented programming (OOP), desktop application engineering with Visual Basic .NET, and relational database fundamentals.",
    skills: [
      "Java",
      "Visual Basic .NET (VB.NET)",
      "OOP",
      "Database Design",
      "Computer Systems Servicing",
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "sql-ds",
    title: "SQL for Data Science",
    issuer: "UC Davis / Coursera",
    platform: "Coursera",
    date: "Nov 2025",
    url: "https://www.coursera.org/account/accomplishments/verify/IUIGISBGM2AI",
  },
  {
    id: "git-github",
    title: "Git, GitHub & Markdown Crash Course",
    issuer: "SDE Arts / Udemy",
    platform: "Udemy",
    date: "Mar 2024",
    url: "https://www.udemy.com/certificate/UC-ffcbaba1-3c5a-48b4-b6cd-6cf9cce9ae7f/",
  },
  {
    id: "php-mysql",
    title: "PHP & MySQL - Certification Course",
    issuer: "YouAccel / Udemy",
    platform: "Udemy",
    date: "Feb 2023",
    url: "https://www.udemy.com/certificate/UC-8774bce3-fbb4-4cfb-a9ea-b35e314b0547/",
  },
  {
    id: "java",
    title: "Java Programming: Complete Beginner to Advanced",
    issuer: "Codein Academy / Udemy",
    platform: "Udemy",
    date: "Jan 2023",
    url: "https://www.udemy.com/certificate/UC-56c10cfd-a74c-40b9-b439-76e2687c8416/",
  },
  {
    id: "css",
    title: "Learn CSS - For Beginners",
    issuer: "YouAccel / Udemy",
    platform: "Udemy",
    date: "Oct 2022",
    url: "https://www.udemy.com/certificate/UC-1a81cf4d-0800-4518-9854-3dda9d404eef/",
  },
  {
    id: "html",
    title: "Learn HTML - For Beginners",
    issuer: "YouAccel / Udemy",
    platform: "Udemy",
    date: "Oct 2022",
    url: "https://www.udemy.com/certificate/UC-be64134b-989b-48ca-aa1d-001e4e19ebf5/",
  },
];

export const SKILLS: Skill[] = [
  // IT Support
  { name: "Hardware Troubleshooting", category: "it-support" },
  { name: "Windows Installation", category: "it-support" },
  { name: "Windows Server", category: "it-support" },
  { name: "Active Directory", category: "it-support" },
  { name: "Printer Support", category: "it-support" },
  { name: "Network Troubleshooting", category: "it-support" },
  { name: "CCTV Installation", category: "it-support" },
  { name: "Remote Support", category: "it-support" },
  { name: "Inventory Management", category: "it-support" },
  { name: "Microsoft Office", category: "it-support" },
  { name: "Technical Documentation", category: "it-support" },
  { name: "End-User Support", category: "it-support" },
  // Software Dev
  { name: "Python", category: "software-dev" },
  { name: "PHP", category: "software-dev" },
  { name: "C#", category: "software-dev" },
  { name: ".NET", category: "software-dev" },
  { name: "Java", category: "software-dev" },
  { name: "JavaScript", category: "software-dev" },
  { name: "TypeScript", category: "software-dev" },
  { name: "Vue.js", category: "software-dev" },
  { name: "React", category: "software-dev" },
  { name: "Next.js", category: "software-dev" },
  { name: "SQLite", category: "software-dev" },
  { name: "MySQL", category: "software-dev" },
  { name: "Tailwind CSS", category: "software-dev" },
  { name: "Bootstrap", category: "software-dev" },
  { name: "REST API", category: "software-dev" },
  { name: "Git", category: "software-dev" },
  { name: "GitHub", category: "software-dev" },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "intern-2025",
    role: "IT Support Intern",
    company: "undisclosed",
    companyDisplay: "Company Undisclosed",
    period: "2025",
    responsibilities: [
      "Configured Windows operating systems and installed hardware drivers",
      "Assembled desktop computers and diagnosed hardware and software issues",
      "Installed and configured printers across multiple workstations",
      "Provided end-user technical support and resolved day-to-day IT issues",
      "Managed inventory records using Microsoft Excel",
      "Installed software applications and performed preventive maintenance",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "capsstream",
    title: "CapsStream",
    description:
      "A modern, self-hosted cinematic personal media server for movies, TV shows, and anime. Points to your media folders, automatically matches titles against TMDb for rich metadata (posters, cast, episode guides), and streams through a hardware-accelerated web player. Built for simplicity — runs directly from an external hard drive with no cloud service required.",
    highlights: [
      "Self-hosted",
      "TMDb Metadata",
      "Hardware-Accelerated Streaming",
      "Multi-Profile",
      "Watch History",
      "Android TV App",
      "Achievements",
      "Watch Stats",
    ],
    tech: ["Python", "Vue.js 3", "FFmpeg", "TMDb API", "SQLite"],
    github: "https://github.com/Unknownplanet40/CapsStream",
    demo: undefined,
    featured: true,
    previews: [
      {
        title: "Home Dashboard",
        src: "/projects/capsstream/home.webp",
        alt: "CapsStream Home Page Dashboard with media collections and hero banner",
      },
      {
        title: "Movie Catalog",
        src: "/projects/capsstream/movies.webp",
        alt: "CapsStream Movie Catalog browsing and filtering",
      },
      {
        title: "Details & Episodes",
        src: "/projects/capsstream/details.webp",
        alt: "CapsStream TMDb rich metadata details and episode picker",
      },
      {
        title: "Video Player",
        src: "/projects/capsstream/player.webp",
        alt: "CapsStream hardware-accelerated video player with resume playback",
      },
      {
        title: "Achievements",
        src: "/projects/capsstream/achievements.webp",
        alt: "CapsStream gamified achievements and trophies system",
      },
      {
        title: "Watch Stats",
        src: "/projects/capsstream/stats.webp",
        alt: "CapsStream viewing statistics and watch time analytics",
      },
    ],
  },
  {
    id: "ojt-system",
    title: "Internship Management System",
    description:
      "A web-based system for managing student internship (OJT) applications, company placements, and progress tracking.",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    github: "https://github.com/Unknownplanet40/Ojt-system",
  },
  {
    id: "blood-bank",
    title: "Blood Bank Management System",
    description:
      "A platform to manage donor records, track blood types, and schedule donation appointments efficiently.",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    github: "https://github.com/Unknownplanet40/Simple-Blood-Bank-Management-System",
  },
  {
    id: "pos-inventory",
    title: "POS & Inventory Management System",
    description:
      "A point-of-sale and inventory management system with billing, stock tracking, and reporting features.",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    github: "https://github.com/Unknownplanet40/POS-Inventory-Management-System",
  },
  {
    id: "csg-system",
    title: "CSG System",
    description:
      "A student governance management system for tracking officers, events, and organizational records.",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    github: "https://github.com/Unknownplanet40/CSG-System",
  },
  {
    id: "id-generator",
    title: "ID Generator",
    description:
      "A desktop application for generating and printing school or organization ID cards with photo and template support.",
    tech: ["C#", ".NET", "Windows Forms"],
    github: "https://github.com/Unknownplanet40/IDGenerator",
  },
  {
    id: "custom-newtab",
    title: "Custom New Tab",
    description:
      "A personalized browser new tab page extension with quick links, clock, and a clean minimal design.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Unknownplanet40/customNewTab",
  },
  {
    id: "mysql-repair",
    title: "MySQL Auto Repair Script",
    description:
      "An automated script that detects and repairs corrupted MySQL tables, reducing manual DBA intervention.",
    tech: ["MySQL", "Shell Script"],
    github: "https://github.com/Unknownplanet40/MySQL-Auto-Repair-Script",
  },
  {
    id: "hulk-buster",
    title: "Hulk Buster Pixel Art (Java Applet)",
    description:
      "A Java Applet project rendering the Iron Man Hulkbuster suit as pixel art — a creative Java graphics exercise.",
    tech: ["Java", "Java Applet"],
    github: "https://github.com/Unknownplanet40/Simple-Hulk-Buster-PixelArt-Project-Java-Applet",
  },
  {
    id: "java-pos",
    title: "Point of Sale – Java",
    description:
      "A desktop point-of-sale application built in Java with inventory management and transaction recording.",
    tech: ["Java", "Java Swing"],
    github: "https://github.com/Unknownplanet40/Point-Of-Sale-P.O.S-Java-Project",
  },
];


export const TIMELINE: TimelineEvent[] = [
  {
    year: "2021",
    events: ["Started BS Information Technology at CvSU Imus"],
  },
  {
    year: "2022",
    events: [
      "Began learning web development",
      "Earned HTML & CSS Certifications (YouAccel)",
    ],
  },
  {
    year: "2023",
    events: [
      "Earned PHP & MySQL Certification (YouAccel)",
      "Earned Java Programming Certification (Codein Academy)",
    ],
  },
  {
    year: "2024",
    events: [
      "Earned Git & GitHub Certification (SDE Arts)",
      "Began internship preparation",
    ],
  },
  {
    year: "2025",
    events: [
      "Graduated — BS Information Technology",
      "Completed IT Support Internship",
      "Earned SQL for Data Science Certification (Coursera)",
      "Released CapsStream v1.0",
    ],
  },
];

export const CONTACT = {
  linkedin: "https://linkedin.com/in/rj45",
  github: "https://github.com/Unknownplanet40",
  location: "Imus, Cavite, Philippines",
  resumeUrl: "/resume.pdf",
  formspreeId: "xrpgydwy", // Replace with your real Formspree form ID
};

export const CURRENTLY_EXPLORING: CurrentlyExploringData = {
  title: "Currently Exploring",
  status: "Building with AI",
  description:
    "I’m currently deep-diving into AI-assisted software development — using a multi-model workflow to design, build, and ship real projects faster while still owning architecture and code quality.",
  tools: [
    { name: "Claude" },
    { name: "Codex" },
    { name: "OpenCode" },
    { name: "OpenRouter" },
    { name: "Grok" },
    { name: "Google Gemini" },
    { name: "Antigravity" },
  ],
  focusAreas: [
    "Prompt engineering for complex full-stack features",
    "Multi-model AI pair-programming",
    "Turning ideas into production-ready applications",
    "Balancing speed with clean, maintainable, human-reviewed code",
  ],
  lastUpdated: "Recently updated",
  learningNote:
    "Still actively learning every day — treating every project as a chance to grow, experiment, and refine my craft.",
};
