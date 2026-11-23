// شوكولاتة سايحة بشكل عضوي: حافة متموجة + نقط بأشكال وميل مختلف + قطرات معلقة

// x: مكان النقطة، w: عرض الساق، len: الطول، bulb: حجم البصلة في الآخر، lean: ميل بسيط
const drips = [
  { x: 45,   w: 26, len: 70,  bulb: 8,  lean: 4 },
  { x: 140,  w: 18, len: 150, bulb: 10, lean: -6 },
  { x: 215,  w: 34, len: 55,  bulb: 5,  lean: 2 },
  { x: 320,  w: 20, len: 120, bulb: 9,  lean: 7 },
  { x: 400,  w: 14, len: 185, bulb: 12, lean: -3 },
  { x: 495,  w: 30, len: 80,  bulb: 7,  lean: 5 },
  { x: 590,  w: 22, len: 135, bulb: 10, lean: -8 },
  { x: 680,  w: 38, len: 60,  bulb: 4,  lean: 0 },
  { x: 775,  w: 16, len: 170, bulb: 11, lean: 6 },
  { x: 860,  w: 28, len: 95,  bulb: 8,  lean: -4 },
  { x: 955,  w: 20, len: 125, bulb: 9,  lean: 3 },
  { x: 1045, w: 32, len: 65,  bulb: 6,  lean: -5 },
  { x: 1135, w: 15, len: 160, bulb: 11, lean: 8 },
  { x: 1225, w: 26, len: 100, bulb: 8,  lean: -2 },
  { x: 1320, w: 22, len: 140, bulb: 10, lean: 5 },
  { x: 1400, w: 30, len: 72,  bulb: 6,  lean: -6 },
];

// قطرات صغيرة منفصلة (بتنزل لوحدها تحت النقط)
const droplets = [
  { x: 142, y: 205, r: 5 },
  { x: 402, y: 240, r: 6 },
  { x: 592, y: 190, r: 4.5 },
  { x: 778, y: 225, r: 5.5 },
  { x: 1138, y: 215, r: 5 },
  { x: 1322, y: 195, r: 4 },
];

const BASE = 28; // متوسط ارتفاع الحافة العلوية

// حافة علوية متموجة (مش مسطرة)
function topEdge() {
  let d = `M0 0 L0 ${BASE}`;
  for (let x = 0; x <= 1440; x += 60) {
    const y = BASE + Math.sin(x / 90) * 6 + Math.cos(x / 37) * 3;
    d += ` L${x} ${y.toFixed(1)}`;
  }
  return d;
}

// نقطة بساق ماسكة في الحافة وبصلة تقيلة في الآخر
function dripPath({ x, w, len, bulb, lean }: (typeof drips)[number]) {
  const r = w / 2;
  const top = BASE - 4;
  const bottom = BASE + len;
  const bx = x + lean; // مكان آخر النقطة بعد الميل
  const br = r + bulb / 2; // نص قطر البصلة
  const neck = bottom - br * 2;

  return [
    // يمين: نازل من الحافة بانحناء ناعم
    `M${x - r - 22} ${top}`,
    `C${x - r - 4} ${top} ${x - r} ${top + 10} ${x - r + lean * 0.3} ${top + 40}`,
    // الساق الشمال لحد الرقبة
    `C${x - r + lean * 0.6} ${neck - 10} ${bx - r} ${neck} ${bx - br} ${neck + br * 0.8}`,
    // البصلة
    `C${bx - br - 2} ${bottom - br * 0.3} ${bx - br * 0.6} ${bottom + br * 0.3} ${bx} ${bottom + br * 0.35}`,
    `C${bx + br * 0.6} ${bottom + br * 0.3} ${bx + br + 2} ${bottom - br * 0.3} ${bx + br} ${neck + br * 0.8}`,
    // الساق اليمين راجعة فوق
    `C${bx + r} ${neck} ${x + r + lean * 0.6} ${neck - 10} ${x + r + lean * 0.3} ${top + 40}`,
    `C${x + r} ${top + 10} ${x + r + 4} ${top} ${x + r + 22} ${top}`,
  ].join(" ");
}

export default function ChocolateDrip() {
  const edge = topEdge();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 drop-shadow-[0_10px_8px_rgba(40,20,10,0.35)]"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="choco" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f2010" />
            <stop offset="55%" stopColor="#5b3220" />
            <stop offset="100%" stopColor="#74432a" />
          </linearGradient>
        </defs>

        {/* الحافة العلوية المتموجة */}
        <path d={`${edge} L1440 0 Z`} fill="url(#choco)" />

        {/* النقط */}
        {drips.map((d, i) => (
          <path key={i} d={dripPath(d)} fill="url(#choco)" />
        ))}

        {/* قطرات صغيرة منفصلة */}
        {droplets.map((d, i) => (
          <ellipse
            key={i}
            cx={d.x}
            cy={d.y}
            rx={d.r}
            ry={d.r * 1.3}
            fill="#6a3b24"
          />
        ))}

        {/* لمعة على كل نقطة */}
        {drips.map((d, i) => (
          <path
            key={`h${i}`}
            d={`M${d.x - d.w / 4 + d.lean * 0.3} ${BASE + 28} Q${d.x - d.w / 4 + d.lean * 0.6} ${
              BASE + d.len * 0.5
            } ${d.x - d.w / 5 + d.lean} ${BASE + d.len - 10}`}
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {/* لمعة على الحافة */}
        <path d={edge} stroke="#ffffff" strokeOpacity="0.08" strokeWidth="5" fill="none" transform="translate(0 -10)" />
      </svg>
    </div>
  );
}