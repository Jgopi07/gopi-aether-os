import { AnimatePresence } from "framer-motion";
import { useWM } from "./WindowManager";
import { Window } from "./Window";
import { AboutApp } from "@/apps/AboutApp";
import { SkillsApp } from "@/apps/SkillsApp";
import { ProjectsApp } from "@/apps/ProjectsApp";
import { ExperienceApp } from "@/apps/ExperienceApp";
import { CertificationsApp } from "@/apps/CertificationsApp";
import { ResumeApp } from "@/apps/ResumeApp";
import { ContactApp } from "@/apps/ContactApp";
import { TerminalApp } from "@/apps/TerminalApp";
import { AIAssistantApp } from "@/apps/AIAssistantApp";
import { GitHubApp } from "@/apps/GitHubApp";
import { RecruiterApp } from "@/apps/RecruiterApp";
import type { AppId } from "./types";

const RENDER: Record<AppId, () => React.ReactElement> = {
  about: () => <AboutApp />,
  skills: () => <SkillsApp />,
  projects: () => <ProjectsApp />,
  experience: () => <ExperienceApp />,
  certifications: () => <CertificationsApp />,
  resume: () => <ResumeApp />,
  contact: () => <ContactApp />,
  terminal: () => <TerminalApp />,
  ai: () => <AIAssistantApp />,
  github: () => <GitHubApp />,
  recruiter: () => <RecruiterApp />,
};

export function WindowsLayer() {
  const wm = useWM();
  return (
    <AnimatePresence>
      {wm.windows.map((w) => (
        <Window key={w.id} id={w.id}>{RENDER[w.id]()}</Window>
      ))}
    </AnimatePresence>
  );
}
