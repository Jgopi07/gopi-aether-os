import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { BootSequence } from "@/os/BootSequence";
import { BattlefieldBackground } from "@/os/BattlefieldBackground";
import { TopBar } from "@/os/TopBar";
import { Dock, MobileDock } from "@/os/Dock";
import { WindowManagerProvider, useWM } from "@/os/WindowManager";
import { WindowsLayer } from "@/os/WindowsLayer";
import { AppGrid } from "@/os/AppGrid";
import { Briefcase } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gopi OS — Jangili Gopi · Full Stack Developer Portfolio" },
      { name: "description", content: "Cinematic AI Operating System portfolio of Jangili Gopi — Full Stack Developer. Explore projects, skills, experience and AI assistant inside Gopi OS." },
      { property: "og:title", content: "Gopi OS — Futuristic AI Portfolio" },
      { property: "og:description", content: "An immersive AI operating system portfolio with holographic windows, AI assistant, and neural defense battlefield." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [booted, setBooted] = useState(false);
  return (
    <WindowManagerProvider>
      <BattlefieldBackground />
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      {booted && <Desktop />}
      <Toaster theme="dark" position="top-right" toastOptions={{ className: "glass-strong font-mono text-xs" }} />
    </WindowManagerProvider>
  );
}

function Desktop() {
  const wm = useWM();
  // open About by default on first boot (desktop only)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
      const t = setTimeout(() => wm.openApp("about"), 600);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line

  return (
    <main className="relative h-screen w-screen overflow-hidden scanlines">
      <TopBar />
      <AppGrid variant="desktop" />
      <AppGrid variant="mobile" />
      <WindowsLayer />
      <Dock />
      <MobileDock />

      {/* Recruiter shortcut */}
      <button
        onClick={() => wm.openApp("recruiter")}
        className="hidden md:flex fixed top-12 right-4 z-30 glass-strong rounded-full px-4 py-2 text-xs font-display tracking-widest text-warning items-center gap-2 hover:glow-red transition"
      >
        <Briefcase className="h-3.5 w-3.5" /> ENTER RECRUITER MODE
      </button>

      {/* watermark */}
      <div className="hidden md:block fixed bottom-3 right-4 z-30 text-[10px] font-mono text-muted-foreground">
        gopi-os // build 2049.11.{new Date().getDate()}
      </div>
    </main>
  );
}

// jsx global namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX { interface IntrinsicElements { [elemName: string]: any } }
}
