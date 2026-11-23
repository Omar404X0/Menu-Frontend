import type { CSSProperties } from "react";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seeded(23);
const r2 = (n: number) => Math.round(n * 10) / 10;

// صف من الفقاقيع الكبيرة المتداخلة: كل صف له y ومدى أحجام
function makeRow(y: number, rMin: number, rMax: number, step: number) {
  const out: { cx: number; cy: number; r: number }[] = [];
  let x = -40;
  while (x < 1480) {
    const r = rMin + rand() * (rMax - rMin);
    out.push({
      cx: r2(x),
      cy: r2(y + (rand() - 0.5) * 26),
      r: r2(r),
    });
    x += step * (0.55 + rand() * 0.9); // مسافات غير منتظمة، ودايمًا فيه تداخل
  }
  return out;
}

// طبقات: الخلفية (كبيرة وأفتح)، الوسط، والقدام (أصغر وأوضح)
const back = makeRow(70, 44, 78, 70);
const mid = makeRow(100, 36, 64, 58);
const front = makeRow(132, 26, 52, 46);

// فقاقيع صغيرة جدًا بتدي ملمس الرغوة
const tiny = Array.from({ length: 70 }, () => ({
  cx: r2(rand() * 1440),
  cy: r2(30 + rand() * 150),
  r: r2(2 + rand() * 5),
}));

const ice = [
  { x: 10, y: 52, w: 58, rot: -14, delay: 0 },
  { x: 28, y: 64, w: 48, rot: 18, delay: 1.2 },
  { x: 46, y: 50, w: 62, rot: -8, delay: 0.6 },
  { x: 63, y: 65, w: 50, rot: 22, delay: 1.8 },
  { x: 80, y: 52, w: 58, rot: -20, delay: 0.3 },
  { x: 94, y: 64, w: 48, rot: 12, delay: 1.5 },
];

export default function IcedFoam() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-10 z-0 h-[max(15rem,16.7vw)] md:-top-16"
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <radialGradient id="fb" cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#fdf6f3" />
            <stop offset="100%" stopColor="#ead3d0" />
          </radialGradient>
          <radialGradient id="fm" cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fff9f6" />
            <stop offset="100%" stopColor="#f0dcd9" />
          </radialGradient>
          <radialGradient id="ff" cx="35%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fffaf8" />
            <stop offset="100%" stopColor="#f4e4e1" />
          </radialGradient>
          <filter id="soft" x="-10%" y="-20%" width="120%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#8c5a70" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ملّي الجزء الأوسط عشان مفيش فراغات */}
        <rect x="-40" y="90" width="1520" height="50" fill="#fffaf7" />

        <g filter="url(#soft)">
          {back.map((c, i) => (
            <circle key={`b${i}`} cx={c.cx} cy={c.cy} r={c.r} fill="url(#fb)" />
          ))}
        </g>
        <g filter="url(#soft)">
          {mid.map((c, i) => (
            <circle key={`m${i}`} cx={c.cx} cy={c.cy} r={c.r} fill="url(#fm)" />
          ))}
        </g>
        <g filter="url(#soft)">
          {front.map((c, i) => (
            <circle key={`f${i}`} cx={c.cx} cy={c.cy} r={c.r} fill="url(#ff)" />
          ))}
        </g>

        {/* ملمس الرغوة */}
        {tiny.map((c, i) => (
          <circle key={`t${i}`} cx={c.cx} cy={c.cy} r={c.r} fill="#ffffff" opacity="0.9" />
        ))}
      </svg>

      {ice.map((c, i) => (
        <span
          key={`i${i}`}
          className={`ice-cube absolute ${i % 2 === 1 ? "max-md:hidden" : ""}`}
          style={
            {
              left: `${c.x}%`,
              top: `${c.y}%`,
              "--s": c.w,
              "--rot": `${c.rot}deg`,
              animationDelay: `${c.delay}s`,
            } as CSSProperties
          }
        >
          <span className="absolute left-[14%] top-[12%] h-[22%] w-[38%] rotate-[-20deg] rounded-full bg-white/70 blur-[1px]" />
        </span>
      ))}
    </div>
  );
}