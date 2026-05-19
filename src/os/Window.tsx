import { motion, useDragControls } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useWM } from "./WindowManager";
import type { AppId } from "./types";
import { APPS } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

export function Window({ id, children }: { id: AppId; children: React.ReactNode }) {
  const wm = useWM();
  const meta = APPS.find((a) => a.id === id)!;
  const win = wm.windows.find((w) => w.id === id);
  const drag = useDragControls();
  const isMobile = useIsMobile();
  if (!win || win.minimized) return null;

  const accent =
    meta.accent === "purple" ? "var(--purple-glow)" :
    meta.accent === "red" ? "var(--warning-red)" :
    meta.accent === "blue" ? "var(--electric-blue)" : "var(--neon-cyan)";

  // === MOBILE: fullscreen futuristic app panel, no drag ===
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        style={{
          zIndex: win.z + 50,
          boxShadow: `inset 0 0 0 1px ${accent}, 0 0 80px ${accent}`,
        }}
        className="fixed inset-x-2 top-10 bottom-[88px] glass-strong rounded-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-background/40">
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan/90 truncate">
            <span className="h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
            <span className="truncate">{meta.filename}</span>
          </div>
          <button onClick={() => wm.closeApp(id)} aria-label="Close" className="p-1.5 rounded hover:bg-destructive/30">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="relative flex-1 overflow-y-auto overscroll-contain p-4">{children}</div>
      </motion.div>
    );
  }

  // === DESKTOP: draggable holographic window ===
  return (
    <motion.div
      drag={!win.maximized}
      dragControls={drag}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={() => wm.focusApp(id)}
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      style={{
        position: "absolute",
        left: win.maximized ? 12 : win.x,
        top: win.maximized ? 12 : win.y,
        width: win.maximized ? "calc(100% - 24px)" : Math.min(win.w, window.innerWidth - 24),
        height: win.maximized ? "calc(100% - 96px)" : Math.min(win.h, window.innerHeight - 120),
        zIndex: win.z,
        boxShadow: `0 0 0 1px ${accent}, 0 24px 80px oklch(0 0 0 / 0.6), 0 0 60px ${accent}`,
      }}
      className="glass-strong rounded-2xl overflow-hidden flex flex-col"
    >
      <div
        onPointerDown={(e) => !win.maximized && drag.start(e)}
        className="flex items-center justify-between px-3 py-2 border-b border-border bg-background/40 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-cyan/80">
          <span className="h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span className="truncate">{meta.filename}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => wm.toggleMinimize(id)} className="p-1 hover:bg-white/10 rounded"><Minus className="h-3 w-3" /></button>
          <button onClick={() => wm.toggleMaximize(id)} className="p-1 hover:bg-white/10 rounded"><Maximize2 className="h-3 w-3" /></button>
          <button onClick={() => wm.closeApp(id)} className="p-1 hover:bg-destructive/30 rounded"><X className="h-3 w-3" /></button>
        </div>
      </div>
      <div className="relative flex-1 overflow-auto p-5">{children}</div>
    </motion.div>
  );
}
