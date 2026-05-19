import { useWM } from "@/os/WindowManager";
import { Briefcase, FileText, Layers, User, Send } from "lucide-react";

export function RecruiterApp() {
  const wm = useWM();
  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-mono text-warning">› hr.mode // ats_optimized</div>
        <div className="font-display text-xl text-glow-cyan flex items-center gap-2"><Briefcase className="h-5 w-5" /> Recruiter Dashboard</div>
        <p className="text-xs text-muted-foreground mt-1">Streamlined evaluation · key signals first.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { k: "Role", v: "Full Stack Developer" },
          { k: "Stack", v: "MERN · Next · Java" },
          { k: "Availability", v: "Open to opportunities" },
        ].map((s) => (
          <div key={s.k} className="glass rounded-xl p-3">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">{s.k}</div>
            <div className="text-sm text-cyan mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-4">
        <div className="text-[10px] font-mono text-cyan tracking-widest mb-2">SUMMARY</div>
        <p className="text-sm leading-relaxed">
          Full Stack Developer building immersive, AI-powered web experiences. MERN expertise plus Java/Spring backend.
          Two internships shipped (VaultofCodes · EduSkills). Strong UI engineering & production-ready architecture.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Action icon={<User className="h-4 w-4" />} label="Profile" onClick={() => wm.openApp("about")} />
        <Action icon={<Layers className="h-4 w-4" />} label="Featured Projects" onClick={() => wm.openApp("projects")} />
        <Action icon={<FileText className="h-4 w-4" />} label="Resume + ATS" onClick={() => wm.openApp("resume")} />
        <Action icon={<Send className="h-4 w-4" />} label="Contact" onClick={() => wm.openApp("contact")} />
      </div>
    </div>
  );
}

function Action({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="glass-strong rounded-xl p-4 flex items-center justify-between hover:glow-cyan transition text-left">
      <span className="flex items-center gap-2 text-sm text-cyan">{icon} {label}</span>
      <span className="text-xs font-mono text-muted-foreground">OPEN ›</span>
    </button>
  );
}
