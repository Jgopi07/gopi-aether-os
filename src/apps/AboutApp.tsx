import { motion } from "framer-motion";
import { Sparkles, Github, Linkedin, Mail } from "lucide-react";

export function AboutApp() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 rounded-2xl glass flex items-center justify-center overflow-hidden">
          <span className="font-display text-3xl text-cyan text-glow-cyan">JG</span>
          <motion.div
            className="absolute inset-x-0 h-px bg-cyan/80 glow-cyan"
            initial={{ y: 0 }} animate={{ y: 80 }} transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
          />
        </div>
        <div className="flex-1">
          <div className="text-xs font-mono text-cyan/70">› identity_scan ... [VERIFIED]</div>
          <h1 className="font-display text-2xl md:text-3xl text-glow-cyan">Jangili Gopi</h1>
          <p className="text-sm text-muted-foreground">Full Stack Developer · AI-Powered Digital Creator</p>
        </div>
      </div>

      <div className="glass rounded-xl p-4 leading-relaxed text-sm">
        Passionate Full Stack Developer focused on building immersive AI-powered web experiences using modern
        technologies. Specialized in <span className="text-cyan">MERN stack</span> development, futuristic UI systems,
        scalable backend architecture, interactive animations, and intelligent digital experiences.
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { k: "Stack", v: "MERN · Next · Java" },
          { k: "Focus", v: "AI · UI · Backend" },
          { k: "Mode", v: "Production-ready" },
        ].map((s) => (
          <div key={s.k} className="glass rounded-xl p-3">
            <div className="text-[10px] font-mono text-muted-foreground tracking-widest">{s.k.toUpperCase()}</div>
            <div className="text-sm text-cyan mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <a href="https://github.com/Jgopi07" target="_blank" rel="noreferrer" className="glass px-3 py-2 rounded-lg flex items-center gap-2 text-xs hover:glow-cyan transition"><Github className="h-4 w-4" /> GitHub</a>
        <a href="https://www.linkedin.com/in/gopi-varma-3123302bb/" target="_blank" rel="noreferrer" className="glass px-3 py-2 rounded-lg flex items-center gap-2 text-xs hover:glow-cyan transition"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        <a href="mailto:gopijangili123@gmail.com" className="glass px-3 py-2 rounded-lg flex items-center gap-2 text-xs hover:glow-cyan transition"><Mail className="h-4 w-4" /> Email</a>
        <span className="ml-auto text-[10px] font-mono text-cyan flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI VERIFIED</span>
      </div>
    </div>
  );
}
