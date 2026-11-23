import type { CSSProperties } from "react";

const beans = [
  { left: "3%",  top: "3%",  size: 30, rot: -30, delay: 0,   tone: "#4b2e1e" },
  { left: "13%", top: "9%",  size: 22, rot: 40,  delay: 1.2, tone: "#6b4430" },
  { left: "30%", top: "2%",  size: 26, rot: 70,  delay: 0.6, tone: "#3b2216" },
  { left: "48%", top: "6%",  size: 20, rot: -50, delay: 1.8, tone: "#5a3a28" },
  { left: "67%", top: "3%",  size: 28, rot: 20,  delay: 0.3, tone: "#6b4430" },
  { left: "82%", top: "8%",  size: 22, rot: -70, delay: 1.5, tone: "#4b2e1e" },
  { left: "94%", top: "2%",  size: 30, rot: 50,  delay: 0.9, tone: "#3b2216" },
];

function Bean({ size, tone }: { size: number; tone: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none">
      <ellipse cx="20" cy="28" rx="16" ry="25" fill={tone} />
      <ellipse cx="14" cy="18" rx="4" ry="9" fill="white" opacity="0.12" />
      <path
        d="M20 4 C 8 20, 32 36, 20 52"
        stroke="#e0dcd1"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export default function CoffeeBeans() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 z-0">
      {beans.map((b, i) => (
        <div
          key={i}
          className="bean absolute drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
          style={
            {
              left: b.left,
              top: b.top,
              "--rot": `${b.rot}deg`,
              animationDelay: `${b.delay}s`,
            } as CSSProperties
          }
        >
          <Bean size={b.size} tone={b.tone} />
        </div>
      ))}
    </div>
  );
}