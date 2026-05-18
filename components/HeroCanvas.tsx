"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

const BLOB_COLORS = [
  (h: number) => `hsla(${200 + h * 30},60%,${35 + h * 15}%,`,
  (h: number) => `hsla(${130 + h * 25},50%,${28 + h * 18}%,`,
  (h: number) => `hsla(${290 + h * 20},45%,${38 + h * 20}%,`,
  (h: number) => `hsla(${30 + h * 25},65%,${55 + h * 15}%,`,
];

const impressBlobs = Array.from({ length: 35 }, (_, i) => ({
  x: Math.random(),
  y: Math.random(),
  rx: 0.06 + Math.random() * 0.18,
  ry: 0.04 + Math.random() * 0.1,
  colorFn: BLOB_COLORS[i % BLOB_COLORS.length],
  h: Math.random(),
  speed: 0.08 + Math.random() * 0.25,
  phase: Math.random() * Math.PI * 2,
}));

const stars = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random() * 0.72,
  r: 1.2 + Math.random() * 4,
  phase: Math.random() * Math.PI * 2,
}));

const swirls = Array.from({ length: 7 }, () => ({
  x: Math.random(),
  y: Math.random() * 0.75,
  r: 0.08 + Math.random() * 0.18,
  phase: Math.random() * Math.PI * 2,
  speed: 0.15 + Math.random() * 0.2,
}));

const monCols = [0, 0.18, 0.48, 0.73, 1.0];
const monRows = [0, 0.18, 0.42, 0.62, 0.82, 1.0];
const monPal = ["#e63946", "#f4d03f", "#2196f3", "#fff", "#fff", "#fff", "#fff"];
const monCells = (() => {
  const cells: { x: number; y: number; w: number; h: number; color: string; phase: number }[] = [];
  for (let r = 0; r < monRows.length - 1; r++)
    for (let c = 0; c < monCols.length - 1; c++)
      cells.push({
        x: monCols[c], y: monRows[r],
        w: monCols[c + 1] - monCols[c],
        h: monRows[r + 1] - monRows[r],
        color: monPal[Math.floor(Math.random() * monPal.length)],
        phase: Math.random() * Math.PI * 2,
      });
  return cells;
})();

const dots = Array.from({ length: 900 }, () => ({
  x: Math.random(), y: Math.random(),
  r: 1.5 + Math.random() * 7,
  hue: Math.random() * 360,
  speed: 0.15 + Math.random() * 0.5,
  phase: Math.random() * Math.PI * 2,
  dx: (Math.random() - 0.5) * 0.0015,
  dy: (Math.random() - 0.5) * 0.0015,
}));

const absShapes = Array.from({ length: 14 }, (_, i) => ({
  x: Math.random(), y: Math.random(),
  r: 0.12 + Math.random() * 0.28,
  hue: (i / 14) * 360,
  speed: 0.08 + Math.random() * 0.3,
  phase: Math.random() * Math.PI * 2,
  sides: 3 + (i % 4),
  rot0: Math.random() * Math.PI,
}));

function drawImpressionist(c: CanvasRenderingContext2D, W: number, H: number, t: number) {
  c.fillStyle = "#001a15";
  c.fillRect(0, 0, W, H);
  for (const b of impressBlobs) {
    const x = b.x * W + Math.sin(t * b.speed + b.phase) * W * 0.04;
    const y = b.y * H + Math.cos(t * b.speed * 0.7 + b.phase) * H * 0.03;
    c.save();
    c.translate(x, y);
    c.rotate(Math.sin(t * 0.25 + b.phase) * 0.35);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, b.rx * W);
    g.addColorStop(0, b.colorFn(b.h) + "0.75)");
    g.addColorStop(1, b.colorFn(b.h) + "0)");
    c.fillStyle = g;
    c.beginPath();
    c.ellipse(0, 0, b.rx * W, b.ry * H, 0, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
  for (let row = 0; row < 22; row++) {
    const y = (row / 22) * H;
    c.beginPath();
    c.moveTo(0, y);
    for (let x = 0; x <= W; x += 6)
      c.lineTo(x, y + Math.sin(x * 0.018 + t * 0.6 + row * 0.7) * 5);
    c.strokeStyle = `rgba(255,255,255,${0.018 + (row % 4 === 0 ? 0.02 : 0)})`;
    c.lineWidth = 1.2;
    c.stroke();
  }
}

function drawStarryNight(c: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#010c1c");
  bg.addColorStop(0.5, "#071b40");
  bg.addColorStop(1, "#1a082e");
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);
  for (const s of swirls) {
    const cx = s.x * W, cy = s.y * H;
    const maxR = s.r * Math.min(W, H);
    for (let ring = 6; ring >= 1; ring--) {
      c.beginPath();
      c.arc(cx, cy, (ring / 6) * maxR, 0, Math.PI * 2);
      c.strokeStyle = `rgba(80,130,230,${0.04 + 0.015 * ring})`;
      c.lineWidth = 7 - ring;
      c.stroke();
    }
    c.save();
    c.translate(cx, cy);
    for (let arm = 0; arm < 3; arm++) {
      c.beginPath();
      const aOff = (arm / 3) * Math.PI * 2 + t * s.speed + s.phase;
      for (let i = 0; i <= 120; i++) {
        const ang = aOff + (i / 120) * Math.PI * 5;
        const rr = (i / 120) * maxR;
        if (i === 0) c.moveTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
        else c.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
      }
      c.strokeStyle = "rgba(90,140,255,0.18)";
      c.lineWidth = 2.5;
      c.stroke();
    }
    c.restore();
  }
  for (const s of stars) {
    const glow = 0.6 + 0.4 * Math.sin(t * 2.5 + s.phase);
    const sx = s.x * W, sy = s.y * H;
    const sr = s.r * glow;
    const h = c.createRadialGradient(sx, sy, 0, sx, sy, sr * 7);
    h.addColorStop(0, `rgba(255,245,170,${0.22 * glow})`);
    h.addColorStop(1, "transparent");
    c.fillStyle = h;
    c.beginPath(); c.arc(sx, sy, sr * 7, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(sx, sy, sr, 0, Math.PI * 2);
    c.fillStyle = `rgba(255,245,180,${0.55 + 0.45 * glow})`;
    c.fill();
  }
  c.fillStyle = "#030108";
  c.beginPath(); c.moveTo(0, H);
  for (let x = 0; x <= W; x += 4) {
    const y = H * 0.74 + Math.sin(x * 0.0028) * H * 0.09 + Math.sin(x * 0.0065 + 1.2) * H * 0.05;
    c.lineTo(x, y);
  }
  c.lineTo(W, H); c.closePath(); c.fill();
}

function drawMondrian(c: CanvasRenderingContext2D, W: number, H: number, t: number) {
  c.fillStyle = "#f7f2e8";
  c.fillRect(0, 0, W, H);
  const lw = Math.max(5, W * 0.009);
  for (const cell of monCells) {
    const pulse = 0.88 + 0.12 * Math.sin(t * 0.35 + cell.phase);
    c.save();
    c.globalAlpha = pulse;
    c.fillStyle = cell.color;
    c.fillRect(cell.x * W + lw * 0.5, cell.y * H + lw * 0.5, cell.w * W - lw, cell.h * H - lw);
    c.restore();
  }
  c.strokeStyle = "#111";
  c.lineWidth = lw;
  c.lineCap = "square";
  for (const x of monCols) { c.beginPath(); c.moveTo(x * W, 0); c.lineTo(x * W, H); c.stroke(); }
  for (const y of monRows) { c.beginPath(); c.moveTo(0, y * H); c.lineTo(W, y * H); c.stroke(); }
}

function drawPointillist(c: CanvasRenderingContext2D, W: number, H: number, t: number) {
  c.fillStyle = "#fef9ee";
  c.fillRect(0, 0, W, H);
  for (const d of dots) {
    const x = ((d.x + d.dx * t * 8) % 1 + 1) % 1;
    const y = ((d.y + d.dy * t * 8) % 1 + 1) % 1;
    const hue = (d.hue + t * 22 * d.speed) % 360;
    const size = d.r * (0.75 + 0.45 * Math.sin(t * d.speed + d.phase));
    c.beginPath();
    c.arc(x * W, y * H, size, 0, Math.PI * 2);
    c.fillStyle = `hsla(${hue},82%,54%,0.72)`;
    c.fill();
  }
}

function drawAbstract(c: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const bg = c.createLinearGradient(0, 0, W, H);
  const hShift = (t * 15) % 360;
  bg.addColorStop(0, `hsl(${hShift},80%,60%)`);
  bg.addColorStop(0.33, `hsl(${hShift + 80},75%,55%)`);
  bg.addColorStop(0.66, `hsl(${hShift + 160},80%,58%)`);
  bg.addColorStop(1, `hsl(${hShift + 240},75%,60%)`);
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);
  c.globalAlpha = 0.55;
  for (const s of absShapes) {
    const x = s.x * W + Math.sin(t * s.speed + s.phase) * W * 0.12;
    const y = s.y * H + Math.cos(t * s.speed * 0.8 + s.phase) * H * 0.1;
    const r = s.r * Math.min(W, H) * (0.78 + 0.32 * Math.sin(t * s.speed * 0.5));
    const rot = s.rot0 + t * s.speed * 0.35;
    const hue = (s.hue + t * 28) % 360;
    c.save();
    c.translate(x, y);
    c.rotate(rot);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, `hsla(${hue},92%,70%,1)`);
    g.addColorStop(1, `hsla(${(hue + 70) % 360},90%,55%,0)`);
    c.fillStyle = g;
    c.beginPath();
    for (let i = 0; i <= s.sides; i++) {
      const ang = (i / s.sides) * Math.PI * 2;
      const pr = r * (0.65 + 0.35 * Math.sin(ang * 2.5 + t * 0.8));
      if (i === 0) c.moveTo(Math.cos(ang) * pr, Math.sin(ang) * pr);
      else c.lineTo(Math.cos(ang) * pr, Math.sin(ang) * pr);
    }
    c.closePath();
    c.fill();
    c.restore();
  }
  c.globalAlpha = 1;
}

const STYLES = [
  { label: "印象派 / Impressionism", draw: drawImpressionist },
  { label: "星月夜 / Starry Night",  draw: drawStarryNight },
  { label: "モンドリアン / Mondrian", draw: drawMondrian },
  { label: "点描 / Pointillism",     draw: drawPointillist },
  { label: "抽象 / Abstract",        draw: drawAbstract },
];

const STYLE_SEC = 12;
const TRANSITION_SEC = 2;

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const [styleLabel, setStyleLabel] = useState(STYLES[0].label);
  const [labelVisible, setLabelVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const off = document.createElement("canvas");
    offRef.current = off;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      off.width = canvas.width;
      off.height = canvas.height;
    }
    window.addEventListener("resize", resize);
    resize();

    let startTime: number | null = null;
    let labelIdx = -1;
    let rafId: number;

    function animate(ts: number) {
      if (!canvas || !ctx) return;
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;
      const W = canvas.width;
      const H = canvas.height;

      const si = Math.floor(elapsed / STYLE_SEC) % STYLES.length;
      const ni = (si + 1) % STYLES.length;
      const sT = elapsed % STYLE_SEC;
      const tPos = STYLE_SEC - TRANSITION_SEC;

      if (si !== labelIdx) {
        labelIdx = si;
        setLabelVisible(false);
        setTimeout(() => {
          setStyleLabel(STYLES[si].label);
          setLabelVisible(true);
        }, 600);
      }

      STYLES[si].draw(ctx, W, H, elapsed);

      if (sT >= tPos) {
        const alpha = (sT - tPos) / TRANSITION_SEC;
        const offCtx = off.getContext("2d");
        if (offCtx) {
          STYLES[ni].draw(offCtx, W, H, elapsed);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.drawImage(off, 0, 0);
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <header className="relative h-screen flex flex-col justify-center items-center text-white text-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/28 via-black/8 to-black/38" />

      {/* hero text */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <h1
          className="font-light tracking-[clamp(0.5rem,2vw,1.5rem)]"
          style={{ fontSize: "clamp(3rem,8vw,6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
        >
          WAC
        </h1>
        <p
          className="opacity-85 tracking-[0.3rem]"
          style={{ fontSize: "clamp(0.9rem,2vw,1.2rem)", textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}
        >
          World Art Creator
        </p>
        <p className="mt-8 text-sm tracking-[0.15rem] opacity-60 animate-bounce">
          ↓ &nbsp; Scroll to Explore
        </p>
      </div>

      {/* style badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-700"
        style={{ opacity: labelVisible ? 1 : 0 }}>
        <Badge variant="outline" className="text-white/70 border-white/30 bg-black/20 backdrop-blur-sm tracking-widest text-[0.7rem] uppercase">
          {styleLabel}
        </Badge>
      </div>
    </header>
  );
}
