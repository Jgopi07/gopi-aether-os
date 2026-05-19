export type AppId =
  | "about" | "skills" | "projects" | "experience" | "certifications"
  | "resume" | "contact" | "terminal" | "ai" | "github" | "recruiter";

export interface AppMeta {
  id: AppId;
  title: string;
  filename: string;
  icon: string; // lucide name
  accent: "cyan" | "purple" | "blue" | "red";
}

export const APPS: AppMeta[] = [
  { id: "about", title: "About", filename: "About.exe", icon: "User", accent: "cyan" },
  { id: "skills", title: "Skills", filename: "Skills.sys", icon: "Cpu", accent: "blue" },
  { id: "projects", title: "Projects", filename: "Projects.ai", icon: "Layers", accent: "purple" },
  { id: "experience", title: "Experience", filename: "Experience.log", icon: "Activity", accent: "cyan" },
  { id: "certifications", title: "Vault", filename: "Certifications.secure", icon: "ShieldCheck", accent: "purple" },
  { id: "resume", title: "Resume", filename: "Resume.pdf", icon: "FileText", accent: "blue" },
  { id: "contact", title: "Contact", filename: "Contact.link", icon: "Radio", accent: "cyan" },
  { id: "terminal", title: "Terminal", filename: "term.sh", icon: "TerminalSquare", accent: "cyan" },
  { id: "ai", title: "AI Assistant", filename: "ai.core", icon: "Sparkles", accent: "purple" },
  { id: "github", title: "GitHub", filename: "git.stat", icon: "Github", accent: "blue" },
  { id: "recruiter", title: "Recruiter", filename: "hr.mode", icon: "Briefcase", accent: "red" },
];
