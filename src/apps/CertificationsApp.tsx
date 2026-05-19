import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";
import { useState } from "react";

const CERTS = [
  {
    name: "UiPath RPA Developer Virtual Internship",
    issuer: "EduSkills + AICTE + UiPath",
  },
  {
    name: "AI & Prompt Engineering Internship",
    issuer: "VaultofCodes",
  },
  {
    name: "Full Stack Developer Bootcamp",
    issuer: "GeeksforGeeks",
  },
  {
    name: "Career Essentials in Software Development",
    issuer: "Microsoft + LinkedIn",
  },
  {
    name: "Cybersecurity Essentials-VIP 2026",
    issuer: "Cisco Networking Academy",
  },
  {
    name: "Java Full Stack Development Internship",
    issuer: "EduSkills",
  },
  {
    name: "Kubernetes Certification",
    issuer: "Simplilearn",
  },
  {
    name: "Docker Certification",
    issuer: "Simplilearn",
  },
  {
    name: "Introduction to DevOps",
    issuer: "Simplilearn",
  },
  {
    name: "Getting Started with Jenkins",
    issuer: "Simplilearn",
  },
  {
    name: "Git Training Certification",
    issuer: "Simplilearn",
  },
  {
    name: "Programming Foundations Beyond the Fundamentals",
    issuer: "LinkedIn Learning",
  },
  {
    name: "Programming Foundations Fundamentals",
    issuer: "LinkedIn Learning",
  },
  {
    name: "Python for Machine Learning",
    issuer: "Great Learning",
  },
  {
    name: "RDBMS PostgreSQL Certification",
    issuer: "Infosys Springboard",
  },
  {
    name: "PHP and MySQL Certification",
    issuer: "SoloLearn",
  },
  {
    name: "SQL Intermediate Certification",
    issuer: "HackerRank",
  },
  {
    name: "SQL Basic Certification",
    issuer: "HackerRank",
  },
  {
    name: "Java Basic Certification",
    issuer: "HackerRank",
  },
  {
    name: "Getting Started with Java",
    issuer: "Coursera",
  },
  {
    name: "Python Certification",
    issuer: "Spoken Tutorial Project, IIT Bombay",
  },
  {
    name: "C Programming Certification",
    issuer: "Spoken Tutorial Project, IIT Bombay",
  },
  {
    name: "HTML Certification",
    issuer: "Spoken Tutorial Project, IIT Bombay",
  },
  {
    name: "Complete CSS Guide",
    issuer: "Udemy",
  },
  {
    name: "Mastering HTML5",
    issuer: "Udemy",
  },
];

export function CertificationsApp() {
  const [unlocked, setUnlocked] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div className="text-xs font-mono text-cyan/80">› vault.secure // authentication_required</div>
      <div className="grid sm:grid-cols-2 gap-4">
        {CERTS.map((c, i) => {
          const open = unlocked === i;
          return (
            <motion.button
              key={c.name}
              onClick={() => setUnlocked(open ? null : i)}
              whileHover={{ y: -2 }}
              className="text-left glass rounded-xl p-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-cyan" />
                  <div>
                    <div className="font-display text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.issuer}</div>
                  </div>
                </div>
                <Lock className={`h-4 w-4 transition ${open ? "text-cyan" : "text-muted-foreground"}`} />
              </div>
              <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 text-xs font-mono text-cyan border border-cyan/30 rounded p-2">
                  [SCAN] integrity verified · [AUTH] signature valid · [OK] certificate accessible
                </div>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
