import { useEffect, useRef, useState } from "react";
import { useWM } from "@/os/WindowManager";
import type { AppId } from "@/os/types";

type Line = { type: "in" | "out" | "sys"; text: string };

const HELP = [
  "Available commands:",
  "",
  " scan-profile  ",
  "",
  "Core:",
  "  help, clear, whoami, system-info",
  "",
  "Navigation:",
  "  about, skills, projects, experience, certifications",
  "  contact, resume, recruiter-mode",
  "",
  "Open Apps:",
  "  open <about|skills|projects|experience|certifications|resume|contact|ai|github|recruiter>",
  "",
  "Projects:",
  "  open-varmax",
  "  open-realestate",
  "  open-zenflow",
  "  open-portfolio",
  "",
  "Socials:",
  "  github, linkedin, portfolio",
  "",
  "AI Commands:",
  "  launch-ai",
  "  defense-mode",
  "  launch-defense",
  "  ai-overdrive",
  "",
  "Modes:",
  "  stark-mode",
  "  matrix",
];

export function TerminalApp() {
  const wm = useWM();
  const [lines, setLines] = useState<Line[]>([
    { type: "sys", text: "GOPI OS Terminal v2.026 — type 'help' to begin." },
  ]);
  const [val, setVal] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...lines, { type: "in", text: raw }];
    const out = (t: string | string[]) => (Array.isArray(t) ? t : [t]).forEach((x) => next.push({ type: "out", text: x }));

    if (!cmd) { setLines(next); return; }
    setHist((h) => [raw, ...h].slice(0, 50)); setHi(-1);

    const openMap: Record<string, AppId> = {
      about: "about", skills: "skills", projects: "projects", experience: "experience",
      certifications: "certifications", resume: "resume", contact: "contact", ai: "ai",
      github: "github", recruiter: "recruiter",
    };

    if (cmd === "help") out(HELP);
    else if (cmd === "clear") { setLines([]); return; }
    else if (cmd === "about") { wm.openApp("about"); out("› opening About.exe"); }
    else if (cmd === "skills") { wm.openApp("skills"); out("› neural skill scan initiated"); }
    else if (cmd === "projects") { wm.openApp("projects"); out("› loading Projects.ai"); }
    else if (cmd === "experience") { wm.openApp("experience"); out("› mission log decoded"); }
    else if (cmd === "certifications") {
  wm.openApp("certifications");
  out("› certification vault unlocked");
}else if (cmd === "portfolio") {
  window.open("https://gopi-aether-os.vercel.app", "_blank");
  out("› launching Gopi OS portfolio");
}else if (cmd === "open-realestate") {
  window.open("https://real-estate-ai.vercel.app/", "_blank");
  out("› launching Real Estate AI");
}

else if (cmd === "open-zenflow") {
  window.open("https://zenflow-meditation-app.vercel.app/", "_blank");
  out("› launching Zenflow Meditation App");
}else if (cmd === "whoami") {
  out([
    "Jangili Gopi",
    "Full Stack Developer",
    "AI-Powered Digital Creator",
    "Specialized in futuristic web systems and immersive UI engineering",
  ]);
}else if (cmd === "system-info") {
  out([
    "GOPI OS v2.026",
    "Status: ONLINE",
    "Neural Core: ACTIVE",
    "Defense Systems: STABLE",
    "AI Assistant: CONNECTED",
    "Environment: Production",
  ]);
}else if (cmd === "scan-profile") {
  out([
    "Scanning developer profile...",
    "✓ MERN Stack detected",
    "✓ AI Systems detected",
    "✓ Responsive Engineering detected",
    "✓ UI/UX Systems detected",
    "✓ Recruiter Compatibility: HIGH",
  ]);
}
    else if (cmd === "contact") { wm.openApp("contact"); out("› opening communication channel"); }
    else if (cmd === "resume") { wm.openApp("resume"); out("› ATS scan in progress"); }
    else if (cmd === "github") { window.open("https://github.com/Jgopi07", "_blank"); out("› launching github.com/Jgopi07"); }
    else if (cmd === "linkedin") { window.open("https://www.linkedin.com/in/gopi-varma-3123302bb/", "_blank"); out("› opening LinkedIn"); }
    else if (cmd.startsWith("open ")) {
      const id = openMap[cmd.slice(5).trim()];
      if (id) { wm.openApp(id); out(`› opening ${id}`); }
      else out("ERR: unknown app");
    }
    else if (cmd === "defense-mode" || cmd === "launch-defense") out("⚡ DEFENSE PROTOCOL // drones engaging hostiles");
    else if (cmd === "launch-ai") { wm.openApp("ai"); out("› AI core online"); }
    else if (cmd === "open-varmax") { window.open("https://varma-x-ai.vercel.app/", "_blank"); out("› launching VarmaX-AI"); }
    else if (cmd === "recruiter-mode") { wm.openApp("recruiter"); out("› recruiter dashboard engaged"); }
    else if (cmd === "stark-mode") { document.documentElement.classList.toggle("stark"); out("✦ STARK MODE TOGGLED"); }
    else if (cmd === "matrix") { document.documentElement.classList.toggle("matrix"); out("01001101 MATRIX ENGAGED"); }
    else if (cmd === "ai-overdrive") out("☢ AI OVERDRIVE // all holograms intensified");
    else out(`command not found: ${cmd} (try 'help')`);

    setLines(next);
    setVal("");
  };

  return (
    <div className="font-mono text-xs h-full flex flex-col">
      <div className="text-cyan/60 mb-2">root@gopi-os:~$ neural shell</div>
      <div className="flex-1 overflow-auto space-y-0.5 pr-2">
        {lines.map((l, i) => (
          <div key={i} className={l.type === "in" ? "text-cyan" : l.type === "sys" ? "text-purple-glow" : "text-foreground/85"}>
            {l.type === "in" ? <><span className="text-muted-foreground">$ </span>{l.text}</> : l.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); run(val); }} className="flex items-center gap-2 pt-2 border-t border-border mt-2">
        <span className="text-cyan">$</span>
        <input
          autoFocus
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") { const n = Math.min(hist.length - 1, hi + 1); if (n >= 0) { setHi(n); setVal(hist[n]); } }
            if (e.key === "ArrowDown") { const n = Math.max(-1, hi - 1); setHi(n); setVal(n === -1 ? "" : hist[n]); }
          }}
          className="flex-1 bg-transparent outline-none text-cyan caret-cyan"
          placeholder="type a command..."
        />
      </form>
    </div>
  );
}
