import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { APPS } from "./types";
import { useWM } from "./WindowManager";

export function Dock() {
  const wm = useWM();
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 22 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 hidden md:flex"
    >
      <div className="glass-strong rounded-2xl px-3 py-2 flex items-end gap-2 glow-cyan">
        {APPS.map((app) => {
          const Icon = (Icons as any)[app.icon] ?? Icons.Square;
          const open = wm.isOpen(app.id);
          const color =
            app.accent === "purple" ? "text-purple-glow" :
            app.accent === "red" ? "text-warning" :
            app.accent === "blue" ? "text-electric" : "text-cyan";
          return (
            <button
              key={app.id}
              onClick={() => wm.openApp(app.id)}
              className="group relative flex flex-col items-center"
              title={app.title}
            >
              <div className={`h-12 w-12 rounded-xl glass flex items-center justify-center transition-all group-hover:-translate-y-2 group-hover:scale-110 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition text-[10px] font-mono whitespace-nowrap glass px-2 py-1 rounded">
                {app.title}
              </span>
              {open && <span className="h-1 w-1 rounded-full bg-cyan mt-1 glow-cyan" />}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export function MobileDock() {
  const wm = useWM();
  const items = APPS.filter((a) => ["about", "projects", "ai", "terminal", "contact"].includes(a.id));
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden glass-strong border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 safe-bottom">
        {items.map((app) => {
          const Icon = (Icons as any)[app.icon] ?? Icons.Square;
          return (
            <button
              key={app.id}
              onClick={() => wm.openApp(app.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl active:bg-white/5"
            >
              <Icon className="h-5 w-5 text-cyan" />
              <span className="text-[10px] font-mono text-muted-foreground">{app.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
