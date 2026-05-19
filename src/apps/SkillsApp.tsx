import { motion } from "framer-motion";

const GROUPS = [
  { label: "Frontend", color: "var(--neon-cyan)", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", color: "var(--electric-blue)", items: ["Node.js", "Express.js", "Java", "Spring Boot", "Hibernate"] },
  { label: "Database", color: "var(--purple-glow)", items: ["MongoDB", "MySQL"] },
  { label: "Tools & Concepts", color: "var(--neon-cyan)", items: ["Git", "GitHub", "VS Code", "REST APIs", "JWT", "OOP", "DBMS", "ChatGPT workflows"] },
];

const SCORES = [
  { k: "Frontend", v: 92 },
  { k: "Backend", v: 80 },
  { k: "UI Innovation", v: 95 },
  { k: "AI Integration", v: 88 },
  { k: "Problem Solving", v: 85 },
];

export function SkillsApp() {
  return (
    <div className="space-y-6">
      <div className="text-xs font-mono text-cyan/80">› neural_skill_scan ... [STREAMING]</div>

      {/* Radar */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="glass rounded-xl p-4 flex items-center justify-center">
          <Radar data={SCORES} />
        </div>
        <div className="glass rounded-xl p-4 space-y-3">
          <div className="font-display text-sm text-cyan tracking-widest">AI ENGINEERING ANALYSIS</div>
          {SCORES.map((s) => (
            <div key={s.k}>
              <div className="flex justify-between text-xs font-mono">
                <span>{s.k}</span><span className="text-cyan">{s.v}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded mt-1 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.v}%` }} transition={{ duration: 1.2 }}
                  className="h-full bg-gradient-to-r from-cyan via-electric to-purple-glow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {GROUPS.map((g) => (
          <div key={g.label} className="glass rounded-xl p-4">
            <div className="text-[10px] font-mono tracking-[0.3em] mb-3" style={{ color: g.color }}>{g.label.toUpperCase()}</div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="px-2.5 py-1 rounded-md text-xs font-mono border"
                  style={{ borderColor: g.color, color: g.color, background: `${g.color}1a` }}
                >{s}</motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Radar({ data }: { data: { k: string; v: number }[] }) {
  const size = 240, cx = size / 2, cy = size / 2, r = 95;
  const n = data.length;
  const points = data.map((d, i) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const rr = (d.v / 100) * r;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr];
  });
  const path = points.map((p, i) => (i === 0 ? "M" : "L") + p[0] + "," + p[1]).join(" ") + " Z";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <circle key={s} cx={cx} cy={cy} r={r * s} fill="none" stroke="oklch(0.85 0.18 200 / 0.15)" />
      ))}
      {data.map((_, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="oklch(0.85 0.18 200 / 0.15)" />;
      })}
      <motion.path d={path} fill="oklch(0.88 0.20 195 / 0.2)" stroke="oklch(0.88 0.20 195)" strokeWidth={1.5}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      {data.map((d, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + Math.cos(a) * (r + 14), y = cy + Math.sin(a) * (r + 14);
        return <text key={d.k} x={x} y={y} fontSize={9} textAnchor="middle" fill="currentColor" className="font-mono fill-muted-foreground">{d.k}</text>;
      })}
    </svg>
  );
}
