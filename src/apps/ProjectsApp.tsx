import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    name: "VarmaX-AI",
    tag: "Futuristic AI Platform",
    desc: "Advanced AI-powered interaction system with cinematic UI.",
    stack: ["React", "AI", "Tailwind"],
    repo: "https://github.com/Jgopi07/VarmaX-AI",
    live: "https://varma-x-ai.vercel.app/",
    scores: { complexity: 92, innovation: 96, scalability: 88, performance: 90 },
  },
  {
  name: "Eternal Hearts Infinity",
  tag: "AI Visual Novel Platform",
  desc: "Futuristic romantic visual novel experience with cinematic storytelling, adaptive music, AI voice narration, and immersive UI animations.",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Framer Motion",
    "Zustand"
  ],
  repo: "https://github.com/Jgopi07/eternal-hearts-infinity",
  live: "https://eternal-hearts-infinity.vercel.app/",
  scores: {
    complexity: 95,
    innovation: 97,
    scalability: 90,
    performance: 94
  },
},
  {
    name: "Real Estate AI",
    tag: "Smart Listings",
    desc: "AI-powered real estate platform with smart recommendations.",
    stack: ["JS", "AI", "HTML/CSS"],
    repo: "https://github.com/Jgopi07/-real-estate-ai",
    live: "https://jgopi07.github.io/-real-estate-ai/",
    scores: { complexity: 80, innovation: 85, scalability: 78, performance: 88 },
  },
  {
    name: "Zenflow Meditation",
    tag: "Ambient Experience",
    desc: "Futuristic meditation app with calming ambient animations.",
    stack: ["JS", "CSS", "Audio"],
    repo: "https://github.com/Jgopi07/zenflow-meditation-app",
    live: "https://jgopi07.github.io/zenflow-meditation-app/",
    scores: { complexity: 72, innovation: 82, scalability: 70, performance: 92 },
  },
  {
    name: "ContactForm",
    tag: "Secure Backend",
    desc: "Backend integrated form system with secure validation.",
    stack: ["Node", "Express", "Validation"],
    repo: "https://github.com/Jgopi07/ContactForm",
    live: "https://jgopi07.github.io/ContactForm/",
    scores: { complexity: 65, innovation: 70, scalability: 75, performance: 88 },
  },
];

export function ProjectsApp() {
  return (
    <div className="space-y-5">
      <div className="text-xs font-mono text-cyan/80">› projects.ai // {PROJECTS.length} modules loaded</div>
      <div className="grid md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{ boxShadow: "inset 0 0 60px oklch(0.88 0.20 195 / 0.15)" }} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono text-cyan tracking-widest">{p.tag.toUpperCase()}</div>
                <div className="font-display text-lg text-glow-cyan">{p.name}</div>
              </div>
              <div className="flex gap-1">
                <a href={p.repo} target="_blank" rel="noreferrer" className="p-1.5 glass rounded hover:glow-cyan"><Github className="h-3.5 w-3.5" /></a>
                <a href={p.live} target="_blank" rel="noreferrer" className="p-1.5 glass rounded hover:glow-cyan"><ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{p.desc}</p>

            {/* live preview */}
            <div className="mt-3 rounded-lg overflow-hidden border border-border aspect-video bg-background/60 relative">
              <iframe src={p.live} title={p.name} className="w-full h-full" loading="lazy" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {p.stack.map((s) => (
                <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan/30 text-cyan">{s}</span>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2 mt-3">
              {Object.entries(p.scores).map(([k, v]) => (
                <div key={k} className="text-center">
                  <div className="text-[9px] font-mono text-muted-foreground uppercase">{k.slice(0, 4)}</div>
                  <div className="font-display text-cyan text-sm">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
