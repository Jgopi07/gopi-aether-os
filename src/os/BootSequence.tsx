import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "[BIOS] POST OK ... Neural BIOS v4.9",
  "Initializing GOPI OS...",
  "Loading Neural Matrix...",
  "Connecting AI Core...",
  "Mounting /dev/holographic ... OK",
  "Threat Detection Enabled...",
  "Defense Protocol Activated...",
  "Spawning AI Drones [4/4] ... OK",
  "Welcome, Operator.",
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"intro" | "boot" | "logo" | "done">("intro");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("boot"), 1600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "boot") return;
    if (shown >= LINES.length) {
      const t = setTimeout(() => setPhase("logo"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), 230);
    return () => clearTimeout(t);
  }, [shown, phase]);

  useEffect(() => {
    if (phase !== "logo") return;
    const t = setTimeout(() => { setPhase("done"); onDone(); }, 1900);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* scan line */}
          <div className="pointer-events-none absolute inset-x-0 h-px bg-cyan/60 animate-scan glow-cyan" />
          <div className="absolute inset-0 grid-bg opacity-30" />

          {phase === "intro" && (
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1.4 }}
              className="font-display text-cyan text-glow-cyan text-xl md:text-3xl"
            >
              YEAR&nbsp;2026
            </motion.div>
          )}

          {phase === "boot" && (
            <div className="w-[90%] max-w-xl font-mono text-xs md:text-sm text-cyan/90 space-y-1">
              {LINES.slice(0, shown).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <span className="text-muted-foreground">›</span>
                  <span>{l}</span>
                  <span className="text-cyan">[OK]</span>
                </motion.div>
              ))}
              <div className="pt-4 h-1 w-full bg-white/5 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(shown / LINES.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-cyan via-electric to-purple-glow"
                />
              </div>
            </div>
          )}

          {phase === "logo" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="text-center"
            >
              <div className="font-display tracking-[0.35em] text-4xl md:text-6xl text-cyan text-glow-cyan animate-pulse-glow">
                GOPI&nbsp;OS
              </div>
              <div className="mt-3 text-[10px] md:text-xs font-mono text-muted-foreground tracking-[0.4em]">
                NEURAL&nbsp;DEFENSE&nbsp;OPERATING&nbsp;SYSTEM
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
