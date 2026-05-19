import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

const PDF = "/Jangili_Gopi_FullStack_Developer_Resume.pdf";

export function ResumeApp() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="text-xs font-mono text-cyan/80">› resume.pdf // ats_scan</div>
          <div className="font-display text-lg text-glow-cyan flex items-center gap-2"><FileText className="h-4 w-4" /> Jangili Gopi — Full Stack Developer & AI-Powered Digital Creator</div>
        </div>
        <a
  href={PDF}
  target="_blank"
  rel="noopener noreferrer"
  className="glass px-3 py-2 rounded-lg flex items-center gap-2 text-xs hover:glow-cyan transition"
>
  <FileText className="h-4 w-4" />
  Open
</a>
        <a href={PDF} download className="glass px-3 py-2 rounded-lg flex items-center gap-2 text-xs hover:glow-cyan transition">
          <Download className="h-4 w-4" /> Download
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
  { k: "ATS Score", v: "94%" },
  { k: "Projects", v: "5+" },
  { k: "Core Skills", v: "20+" },
  { k: "Experience", v: "3 Roles" },
].map((s) => (
          <motion.div key={s.k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-3 text-center">
            <div className="text-[10px] font-mono text-muted-foreground uppercase">{s.k}</div>
            <div className="font-display text-cyan text-glow-cyan">{s.v}</div>
          </motion.div>
        ))}
      </div>

      <div className="relative flex-1 rounded-xl overflow-hidden glass min-h-[320px]">
        <div className="glass rounded-xl p-3 text-xs font-mono text-cyan/80">
  AI Analysis:
  Full Stack • MERN • AI Workflows • Responsive Systems • UI Engineering
</div>
        <iframe src={PDF} title="Resume" className="w-full h-full" />
        <div className="absolute inset-x-0 top-0 h-px bg-cyan animate-scan glow-cyan pointer-events-none" />
      </div>
    </div>
  );
}
