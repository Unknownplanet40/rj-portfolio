// src/app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GitHubStatsSection } from "@/components/sections/GitHubStats";
import { Timeline } from "@/components/sections/Timeline";
import { Contact } from "@/components/sections/Contact";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { fetchGitHubStats } from "@/lib/github";

export default async function HomePage() {
  const githubStats = await fetchGitHubStats();

  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider flip />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider flip />
      <Experience />
      <SectionDivider />
      <Education />
      <SectionDivider flip />
      <Certifications />
      <SectionDivider />
      <Timeline />
      <SectionDivider flip />
      <GitHubStatsSection stats={githubStats} />
      <SectionDivider flip />
      <Contact />
    </>
  );
}

