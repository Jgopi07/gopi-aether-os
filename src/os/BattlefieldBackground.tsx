import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Cinematic AI universe: massive neural core, cyber skyline, drones, corruption parasites.
 * Hybrid SVG (core + skyline) + Canvas (particles/drones/creatures) for premium quality at low cost.
 */
export function BattlefieldBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = matchMedia("(max-width: 768px)").matches;

    const STARS = isMobile ? 60 : 160;
    const PARTICLES = isMobile ? 24 : 70;
    const CREATURES = isMobile ? 2 : 5;
    const DRONES = isMobile ? 2 : 4;
    const EMITTERS = isMobile ? 20 : 50; // core energy particles

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * DPR; canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: STARS }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.7,
      r: Math.random() * 0.9 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    const particles = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.1 + 0.3,
    }));

    type Emit = { a: number; r: number; v: number; life: number };
    const emitters: Emit[] = Array.from({ length: EMITTERS }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 20 + Math.random() * 60,
      v: 0.3 + Math.random() * 0.7,
      life: Math.random(),
    }));

    type Creature = { x: number; y: number; vx: number; vy: number; hp: number; phase: number };
    const creatures: Creature[] = Array.from({ length: CREATURES }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.8,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      hp: 100, phase: Math.random() * Math.PI * 2,
    }));

    type Drone = { x: number; y: number; target: number; trail: { x: number; y: number }[] };
    const drones: Drone[] = Array.from({ length: DRONES }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h * 0.6,
      target: i % Math.max(1, creatures.length), trail: [],
    }));

    type Blast = { x: number; y: number; r: number; life: number };
    const blasts: Blast[] = [];

    const mouse = { x: w / 2, y: h / 2 };
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    if (!isMobile) window.addEventListener("mousemove", onMove);

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;

      // stars
      for (const s of stars) {
        s.tw += 0.04;
        const a = 0.4 + Math.sin(s.tw) * 0.3;
        ctx.fillStyle = `rgba(180,220,255,${a})`;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }

      // volumetric light rays from core
      const rayGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.7);
      rayGrad.addColorStop(0, "rgba(120,220,255,0.18)");
      rayGrad.addColorStop(0.3, "rgba(80,140,255,0.06)");
      rayGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, w, h);

      // god rays
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.05);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 8; i++) {
        ctx.rotate((Math.PI * 2) / 8);
        const g = ctx.createLinearGradient(0, 0, 0, -Math.max(w, h));
        g.addColorStop(0, "rgba(120,220,255,0.15)");
        g.addColorStop(1, "rgba(120,220,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(-6, 0); ctx.lineTo(6, 0);
        ctx.lineTo(40, -Math.max(w, h)); ctx.lineTo(-40, -Math.max(w, h));
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();

      // core energy emitters (spiraling out)
      ctx.globalCompositeOperation = "lighter";
      for (const e of emitters) {
        e.r += e.v;
        e.a += 0.01;
        e.life -= 0.005;
        if (e.life <= 0 || e.r > Math.min(w, h) * 0.35) {
          e.r = 20 + Math.random() * 40; e.a = Math.random() * Math.PI * 2; e.life = 1;
        }
        const x = cx + Math.cos(e.a) * e.r;
        const y = cy + Math.sin(e.a) * e.r;
        ctx.fillStyle = `rgba(140,230,255,${e.life * 0.8})`;
        ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      // ambient particles
      ctx.fillStyle = "rgba(140,220,255,0.45)";
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }

      // creatures (corruption parasites — elegant glowing tendrils)
      for (const c of creatures) {
        c.x += c.vx; c.y += c.vy; c.phase += 0.04;
        if (c.x < 40 || c.x > w - 40) c.vx *= -1;
        if (c.y < 40 || c.y > h - 120) c.vy *= -1;

        // soft purple halo
        const halo = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 38);
        halo.addColorStop(0, "rgba(200,120,255,0.35)");
        halo.addColorStop(1, "rgba(200,120,255,0)");
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(c.x, c.y, 38, 0, Math.PI * 2); ctx.fill();

        // tendrils
        ctx.strokeStyle = `rgba(210,140,255,${0.45 + Math.sin(c.phase) * 0.15})`;
        ctx.lineWidth = 1;
        for (let k = 0; k < 4; k++) {
          ctx.beginPath();
          const ang = c.phase + (k * Math.PI) / 2;
          for (let i = 0; i < 18; i++) {
            const rr = i * 1.6;
            const x = c.x + Math.cos(ang + i * 0.3) * rr;
            const y = c.y + Math.sin(ang + i * 0.3) * rr;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // core
        ctx.fillStyle = "rgba(230,160,255,0.9)";
        ctx.beginPath(); ctx.arc(c.x, c.y, 2.4, 0, Math.PI * 2); ctx.fill();
      }

      // drones (cinematic patrol) + lasers
      for (const d of drones) {
        const target = creatures[d.target % Math.max(1, creatures.length)];
        if (target) {
          const dx = target.x - d.x, dy = target.y - d.y;
          const dist = Math.hypot(dx, dy) || 1;
          d.x += (dx / dist) * 0.9;
          d.y += (dy / dist) * 0.9;
        }
        // gentle mouse drift
        d.x += (mouse.x - d.x) * 0.0015;
        d.y += (mouse.y - d.y) * 0.0015;

        // trail
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > 14) d.trail.shift();
        for (let i = 0; i < d.trail.length - 1; i++) {
          const a = i / d.trail.length;
          ctx.strokeStyle = `rgba(120,220,255,${a * 0.5})`;
          ctx.lineWidth = a * 1.8;
          ctx.beginPath();
          ctx.moveTo(d.trail[i].x, d.trail[i].y);
          ctx.lineTo(d.trail[i + 1].x, d.trail[i + 1].y);
          ctx.stroke();
        }

        // body
        ctx.fillStyle = "rgba(160,240,255,0.95)";
        ctx.beginPath(); ctx.arc(d.x, d.y, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(120,220,255,0.5)";
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.arc(d.x, d.y, 9, 0, Math.PI * 2); ctx.stroke();

        // laser
        if (target) {
          const dist = Math.hypot(target.x - d.x, target.y - d.y);
          if (dist < 300) {
            const grad = ctx.createLinearGradient(d.x, d.y, target.x, target.y);
            grad.addColorStop(0, "rgba(140,230,255,0.95)");
            grad.addColorStop(1, "rgba(200,140,255,0.1)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.9;
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(target.x, target.y); ctx.stroke();
            target.hp -= 0.5;
            if (target.hp <= 0) {
              blasts.push({ x: target.x, y: target.y, r: 6, life: 1 });
              target.x = 60 + Math.random() * (w - 120);
              target.y = 60 + Math.random() * (h - 200);
              target.hp = 100;
            }
          }
        }
      }

      // blasts
      for (let i = blasts.length - 1; i >= 0; i--) {
        const b = blasts[i];
        b.r += 2; b.life -= 0.03;
        ctx.strokeStyle = `rgba(255,200,220,${b.life})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.stroke();
        if (b.life <= 0) blasts.splice(i, 1);
      }

      if (!reduced) raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space radial backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, oklch(0.18 0.10 250) 0%, oklch(0.07 0.04 260) 35%, oklch(0.02 0.01 260) 75%)",
        }}
      />
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* SVG: massive neural core */}
      <NeuralCore />

      {/* SVG: cyber skyline */}
      <CyberSkyline />

      {/* Canvas: particles, drones, creatures */}
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />

      {/* Atmospheric fog vignettes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, oklch(0.02 0.01 260 / 0.6) 80%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      {/* Lens bloom */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.20 195 / 0.18) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

function NeuralCore() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.svg
        viewBox="-200 -200 400 400"
        className="w-[90vmin] h-[90vmin] max-w-[1100px] max-h-[1100px] opacity-90"
        style={{ filter: "drop-shadow(0 0 60px oklch(0.85 0.20 200 / 0.55))" }}
      >
        <defs>
          <radialGradient id="coreCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(220,250,255,1)" />
            <stop offset="35%" stopColor="rgba(140,230,255,0.9)" />
            <stop offset="70%" stopColor="rgba(80,160,255,0.35)" />
            <stop offset="100%" stopColor="rgba(60,100,255,0)" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(140,230,255,0.9)" />
            <stop offset="50%" stopColor="rgba(180,120,255,0.5)" />
            <stop offset="100%" stopColor="rgba(140,230,255,0.9)" />
          </linearGradient>
        </defs>

        {/* Outer slow ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        >
          <circle r="180" fill="none" stroke="url(#ringGrad)" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.5" />
          <circle r="160" fill="none" stroke="rgba(140,230,255,0.4)" strokeWidth="0.4" strokeDasharray="20 4 2 4" />
          {Array.from({ length: 36 }).map((_, i) => (
            <line key={i} x1={170} y1={0} x2={185} y2={0}
              stroke="rgba(140,230,255,0.6)" strokeWidth="0.5"
              transform={`rotate(${i * 10})`} />
          ))}
        </motion.g>

        {/* Middle ring counter-rotate */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <circle r="130" fill="none" stroke="rgba(180,120,255,0.5)" strokeWidth="0.6" strokeDasharray="8 3" />
          <circle r="115" fill="none" stroke="rgba(140,230,255,0.5)" strokeWidth="0.4" />
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 30})`}>
              <rect x="110" y="-2" width="14" height="4" fill="rgba(140,230,255,0.6)" />
            </g>
          ))}
        </motion.g>

        {/* Inner reactor ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <circle r="85" fill="none" stroke="url(#ringGrad)" strokeWidth="1" />
          <circle r="70" fill="none" stroke="rgba(140,230,255,0.7)" strokeWidth="0.4" strokeDasharray="4 2" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} r="3" cx={Math.cos((i / 6) * Math.PI * 2) * 85}
              cy={Math.sin((i / 6) * Math.PI * 2) * 85}
              fill="rgba(180,240,255,0.95)" />
          ))}
        </motion.g>

        {/* Pulsing core */}
        <motion.circle
          r="55" fill="url(#coreCenter)"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          r="22" fill="rgba(240,255,255,1)"
          animate={{ scale: [1, 1.2, 1], opacity: [0.9, 0.6, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Scan line */}
        <motion.line
          x1="-180" x2="180" y1="0" y2="0"
          stroke="rgba(140,230,255,0.45)" strokeWidth="0.4"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
}

function CyberSkyline() {
  // Procedural skyline silhouette
  const buildings = Array.from({ length: 60 }, (_, i) => {
    const h = 20 + ((i * 37) % 90);
    return { x: i * 24, h };
  });
  return (
    <svg
      className="absolute inset-x-0 bottom-0 w-full h-[40vh] opacity-70"
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(10,15,40,0)" />
          <stop offset="60%" stopColor="rgba(10,15,40,0.6)" />
          <stop offset="100%" stopColor="rgba(2,4,15,1)" />
        </linearGradient>
        <linearGradient id="b1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(80,140,220,0.6)" />
          <stop offset="100%" stopColor="rgba(10,20,45,1)" />
        </linearGradient>
      </defs>
      {/* far layer */}
      <g opacity="0.45">
        {buildings.map((b, i) => (
          <rect key={i} x={b.x - 6} y={400 - b.h * 1.4} width="18" height={b.h * 1.4} fill="rgba(40,70,140,0.6)" />
        ))}
      </g>
      {/* mid layer */}
      <g opacity="0.85">
        {buildings.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={400 - b.h * 2} width="16" height={b.h * 2} fill="url(#b1)" />
            {/* window lights */}
            {Array.from({ length: Math.floor(b.h / 8) }).map((_, j) => (
              <rect key={j} x={b.x + 4 + (j % 2) * 6} y={400 - b.h * 2 + j * 10 + 6}
                width="2" height="2" fill={j % 5 === 0 ? "rgba(255,120,180,0.9)" : "rgba(140,230,255,0.8)"} />
            ))}
          </g>
        ))}
      </g>
      {/* front spires */}
      <g>
        {[120, 380, 720, 1080, 1320].map((x, i) => (
          <g key={i}>
            <polygon points={`${x - 8},400 ${x + 8},400 ${x},${180 + i * 10}`}
              fill="rgba(20,40,80,0.95)" stroke="rgba(140,230,255,0.5)" strokeWidth="0.5" />
            <circle cx={x} cy={185 + i * 10} r="2" fill="rgba(255,140,180,0.9)" />
          </g>
        ))}
      </g>
      <rect x="0" y="0" width="1440" height="400" fill="url(#sky)" />
    </svg>
  );
}
