import { motion } from "framer-motion";

const LOGS = [
  {
    org: "VaultofCodes",
    role: "Web Development Intern",
    bullets: [
      "Developed responsive web interfaces and futuristic UI systems",
      "Improved UI/UX experiences and frontend responsiveness",
      "Built backend-integrated contact form systems",
      "Optimized layouts and interactive user experiences",
    ],
  },
  {
    org: "EduSkills + AICTE",
    role: "UiPath RPA Developer Virtual Intern",
    bullets: [
      "Completed 10-week RPA Developer Virtual Internship",
      "Learned UiPath automation workflows and implementation methodologies",
      "Worked on robotic process automation concepts and business workflows",
      "Explored enterprise automation systems and AI-assisted processes",
    ],
  },
  {
    org: "EduSkills",
    role: "Java Full Stack Developer Intern",
    bullets: [
      "Worked with Java, Spring Boot, and Hibernate frameworks",
      "Built backend systems using MySQL databases",
      "Integrated frontend systems with REST APIs",
      "Explored scalable full-stack application architecture",
    ],
  },
  {
    org: "VaultofCodes",
    role: "AI & Prompt Engineering Intern",
    bullets: [
      "Worked on AI-powered workflows and prompt engineering systems",
      "Built modern AI interaction concepts and automation flows",
      "Explored advanced prompting strategies and productivity systems",
      "Collaborated on real-world AI-focused internship tasks",
    ],
  },
  {
    org: "Cisco Networking Academy",
    role: "Cybersecurity Essentials Learner",
    bullets: [
      "Completed Cybersecurity Essentials-VIP 2026 program",
      "Achieved Mastered Learner level with score of 91",
      "Learned network security, endpoint protection, and defense systems",
      "Explored cybersecurity threats, vulnerabilities, and secure infrastructure",
    ],
  },
];

export function ExperienceApp() {
  return (
    <div className="space-y-5">
      <div className="text-xs font-mono text-cyan/80">› experience.log // mission_history</div>
      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-cyan via-electric to-purple-glow" />
        {LOGS.map((m, i) => (
          <motion.div
            key={m.org}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative mb-5"
          >
            <span className="absolute -left-[18px] top-3 h-3 w-3 rounded-full bg-cyan glow-cyan" />
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="font-display text-lg text-glow-cyan">{m.org}</div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan/30 text-cyan">MISSION&nbsp;{i + 1}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.role}</div>
              <ul className="mt-3 space-y-1 text-sm">
                {m.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><span className="text-cyan">›</span><span>{b}</span></li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
