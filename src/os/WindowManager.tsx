import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AppId } from "./types";

interface WinState {
  id: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Ctx {
  windows: WinState[];
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  toggleMinimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  updatePos: (id: AppId, x: number, y: number) => void;
  isOpen: (id: AppId) => boolean;
}

const WMContext = createContext<Ctx | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [topZ, setTopZ] = useState(10);

  const openApp = useCallback((id: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      const nextZ = topZ + 1;
      setTopZ(nextZ);
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: nextZ } : w));
      }
      const count = prev.length;
      const baseX = 80 + (count * 36) % 240;
      const baseY = 70 + (count * 28) % 160;
      return [
        ...prev,
        { id, z: nextZ, minimized: false, maximized: false, x: baseX, y: baseY, w: 820, h: 560 },
      ];
    });
  }, [topZ]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((p) => p.filter((w) => w.id !== id));
  }, []);
  const focusApp = useCallback((id: AppId) => {
    setTopZ((z) => z + 1);
    setWindows((p) => p.map((w) => (w.id === id ? { ...w, z: topZ + 1, minimized: false } : w)));
  }, [topZ]);
  const toggleMinimize = useCallback((id: AppId) => {
    setWindows((p) => p.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  }, []);
  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((p) => p.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, []);
  const updatePos = useCallback((id: AppId, x: number, y: number) => {
    setWindows((p) => p.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);
  const isOpen = useCallback((id: AppId) => windows.some((w) => w.id === id && !w.minimized), [windows]);

  const value = useMemo(
    () => ({ windows, openApp, closeApp, focusApp, toggleMinimize, toggleMaximize, updatePos, isOpen }),
    [windows, openApp, closeApp, focusApp, toggleMinimize, toggleMaximize, updatePos, isOpen]
  );

  return <WMContext.Provider value={value}>{children}</WMContext.Provider>;
}

export function useWM() {
  const ctx = useContext(WMContext);
  if (!ctx) throw new Error("useWM outside provider");
  return ctx;
}
