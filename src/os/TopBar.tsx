import { useEffect, useState } from "react";
import { Shield, Cpu, Wifi } from "lucide-react";

export function TopBar() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours();
  const greeting = h < 5 ? "Defense Systems Active" : h < 12 ? "Good Morning, Developer" : h < 18 ? "Neural Core Online" : h < 22 ? "Good Evening, Operator" : "Defense Systems Active";
  return (
    <div className="fixed top-0 inset-x-0 z-40 glass border-b border-border">
      <div className="flex items-center justify-between px-3 md:px-5 py-1.5 text-[11px] font-mono">
        <div className="flex items-center gap-2 text-cyan">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-glow text-cyan" />
          <span className="font-display tracking-[0.25em] text-glow-cyan">GOPI&nbsp;OS</span>
          <span className="hidden md:inline text-muted-foreground ml-3">› {greeting}</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="hidden sm:flex items-center gap-1"><Shield className="h-3 w-3 text-cyan" /> SECURE</span>
          <span className="hidden sm:flex items-center gap-1"><Cpu className="h-3 w-3 text-electric" /> 98%</span>
          <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> NEURAL</span>
          <span className="text-foreground">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
        </div>
      </div>
    </div>
  );
}
