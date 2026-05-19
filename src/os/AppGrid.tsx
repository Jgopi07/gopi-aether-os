import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { APPS } from "./types";
import { useWM } from "./WindowManager";

/** Desktop icon grid (desktop) + mobile app card grid (mobile). */
export function AppGrid({ variant }: { variant: "desktop" | "mobile" }) {
  const wm = useWM();
  if (variant === "desktop") {
    return (
      <div className="hidden md:grid grid-cols-1 gap-3 absolute top-16 left-6 z-10">
        {APPS.slice(0, 7).map((app, i) => {
          const Icon = (Icons as any)[app.icon] ?? Icons.Square;
          return (
            <motion.button
              key={app.id}
              onDoubleClick={() => wm.openApp(app.id)}
              onClick={() => wm.openApp(app.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="group w-20 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5"
            >
              <div className="h-12 w-12 rounded-xl glass flex items-center justify-center group-hover:glow-cyan transition">
                <Icon className="h-5 w-5 text-cyan" />
              </div>
              <span className="text-[10px] font-mono text-center text-foreground/80">{app.filename}</span>
            </motion.button>
          );
        })}
      </div>
    );
  }
  // mobile springboard — scrollable, dock-safe
  return (
    <div className="md:hidden absolute inset-x-0 top-10 bottom-[80px] overflow-y-auto overscroll-contain">
      <div className="px-5 pt-6 pb-8 grid grid-cols-3 gap-5 sm:grid-cols-4">
        {APPS.map((app, i) => {
          const Icon = (Icons as any)[app.icon] ?? Icons.Square;
          const color =
            app.accent === "purple" ? "text-purple-glow" :
            app.accent === "red" ? "text-warning" :
            app.accent === "blue" ? "text-electric" : "text-cyan";
          return (
            <motion.button
              key={app.id}
              onClick={() => wm.openApp(app.id)}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="flex flex-col items-center gap-2 active:scale-95 transition"
            >
              <div className={`h-[68px] w-[68px] rounded-2xl glass-strong flex items-center justify-center ${color}`}
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.5)" }}>
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-[10px] font-mono text-foreground/85 truncate max-w-[72px]">{app.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
