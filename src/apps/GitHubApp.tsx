import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const LANGS = [
  { name: "JavaScript", v: 42, c: "var(--neon-cyan)" },
  { name: "TypeScript", v: 24, c: "var(--electric-blue)" },
  { name: "React/Tailwind", v: 18, c: "var(--purple-glow)" },
  { name: "Java", v: 10, c: "var(--warning-red)" },
  { name: "Python", v: 6, c: "var(--neon-cyan)" },
];

const SCORES = [
  { k: "Frontend Engineering", v: 95 },
  { k: "UI Innovation", v: 97 },
  { k: "Responsive Systems", v: 92 },
  { k: "AI Integration", v: 89 },
  { k: "Cinematic Storytelling", v: 96 },
];

export function GitHubApp() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="text-xs font-mono text-cyan/80">› github.stat // Jgopi07</div>
          <div className="font-display text-lg text-glow-cyan flex items-center gap-2"><Github className="h-4 w-4" /> Jgopi07 — AI development ecosystem</div>
        </div>
        <a href="https://github.com/Jgopi07" target="_blank" rel="noreferrer" className="glass px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 hover:glow-cyan">
          <ExternalLink className="h-3 w-3" /> Visit profile
        </a>
      </div>

      {/* Contribution heatmap */}
      <div className="glass rounded-xl p-4 overflow-x-auto">
        <div className="text-[10px] font-mono text-muted-foreground tracking-widest mb-2">CONTRIBUTION&nbsp;GRAPH</div>
        <div className="grid grid-flow-col grid-rows-7 gap-1" style={{ width: "max-content" }}>
          {Array.from({ length: 7 * 26 }).map((_, i) => {
            const pattern = [0.1,0.2,0.4,0.7,0.9,0.5,0.3];
const v = pattern[i % pattern.length];
            const op = v < 0.3 ? 0.08 : v < 0.55 ? 0.25 : v < 0.8 ? 0.5 : 0.9;
            return <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.002 }}
              className="h-3 w-3 rounded-[2px]" style={{ background: `oklch(0.88 0.20 195 / ${op})` }} />;
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="text-[10px] font-mono text-cyan tracking-widest mb-3">TOP LANGUAGES</div>
          {LANGS.map((l) => (
            <div key={l.name} className="mb-2">
              <div className="flex justify-between text-xs font-mono"><span>{l.name}</span><span style={{ color: l.c }}>{l.v}%</span></div>
              <div className="h-1.5 bg-white/5 rounded overflow-hidden mt-1">
                <motion.div initial={{ width: 0 }} animate={{ width: `${l.v * 2.4}%` }} className="h-full" style={{ background: l.c, boxShadow: `0 0 8px ${l.c}` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="text-[10px] font-mono text-purple-glow tracking-widest mb-3">AI DEVELOPMENT ANALYSIS</div>
          {SCORES.map((s) => (
            <div key={s.k} className="mb-2">
              <div className="flex justify-between text-xs font-mono"><span>{s.k}</span><span className="text-cyan">{s.v}</span></div>
              <div className="h-1.5 bg-white/5 rounded mt-1 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.v}%` }} transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-cyan via-electric to-purple-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
  { k: "Projects", v: "11+" },
  { k: "Tech Stack", v: "20+" },
  { k: "AI Systems", v: "5+" },
  { k: "Status", v: "ACTIVE" },
].map((s) => (
          <div key={s.k} className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">{s.k}</div>
            <div className="font-display text-cyan text-glow-cyan">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-4">
  <div className="text-[10px] font-mono text-cyan tracking-widest mb-3">
    FEATURED REPOSITORIES
  </div>

  <div className="space-y-3">
    {[
      {
  name: "Eternal Hearts Infinity",
  link: "https://github.com/Jgopi07/eternal-hearts-infinity",
},
      {
        name: "Gopi OS (Portfolio)",
        link: "https://github.com/Jgopi07/gopi-aether-os",
      },
      {
        name: "VarmaX AI",
        link: "https://github.com/Jgopi07/VarmaX-AI",
      },
      {
        name: "Real Estate AI",
        link: "https://github.com/Jgopi07/-real-estate-ai",
      },
      {
        name: "Zenflow Meditation App",
        link: "https://github.com/Jgopi07/zenflow-meditation-app",
      },
      {
        name: "Simple Contact Form App",
        link: "https://github.com/Jgopi07/ContactForm",
      },
    ].map((p) => (
      <button
        key={p.name}
        onClick={() => window.open(p.link, "_blank")}
        className="w-full flex items-center justify-between glass rounded-lg px-3 py-2 hover:glow-cyan transition"
      >
        <div className="text-sm font-mono text-cyan">
          {p.name}
        </div>

        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    ))}
  </div>
</div>
    </div>
  );
}
