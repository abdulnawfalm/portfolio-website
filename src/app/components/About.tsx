"use client";

import { useEffect, useId, useRef, useState } from "react";

/* ── Edit these ─────────────────────────────────────────── */
// Your photo in /public/. The card tries these in order and uses the first one it finds:
//  • portrait.png — cut-out with a see-through background: stands in front of the stripes
//  • portrait.jpg — normal photo: fills the panel (its own background covers the stripes)
const PHOTO_SOURCES = ["/portrait.png", "/portrait.jpg"];
// Where your face sits across the photo (0–100). 50 = centre. Adjust if your new photo looks off-centre.
const PHOTO_FACE_X = 38;
const FIRST_NAME = "Abdul";
const LAST_NAME = "Nawfal"; // second line under the first name
const POSITION = "UI/UX & Product Designer";
const EXPERIENCE = "2.5 yrs";
const LOCATION = "Dubai, UAE";
const MONOGRAM = "AN";

// The heading is split in two: the first part is black, the second part grey
const HEADING_DARK = "Designing the experience";
const HEADING_LIGHT = "behind better products.";

const INTRO =
  "I’m a UI/UX and Product Designer with two years of experience designing and developing digital products.";

const PARAGRAPHS = [
  "I design in Figma (including Figma AI) and bring those designs to life using modern front-end technologies, working across both web and mobile platforms.",
  "I use AI tools throughout my workflow to move faster without compromising quality, allowing me to deliver projects efficiently based on scope and timeline.",
];

const STATS = [
  { value: "20", unit: "+", label: "Projects completed" },
  { value: "100", unit: "%", label: "Satisfaction" },
];
/* ───────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/* ── Profile card ─────────────────────────────────────────
   The photo panel is cut with an SVG shape drawn on a 400 × 500 grid:
   a notch in the top-left (monogram) and a wider notch in the
   bottom-right (experience + location), all with soft rounded corners. */
const W = 400, H = 500, R = 26, C = 20;       // size, outer corner radius, notch corner radius
const N1W = 84, N1H = 84;                      // top-left notch
const N2W = 236, N2H = 84;                     // bottom-right notch
const PANEL_PATH = [
  `M${N1W + R},0`,
  `H${W - R}`, `A${R},${R} 0 0 1 ${W},${R}`,
  `V${H - N2H - R}`, `A${R},${R} 0 0 1 ${W - R},${H - N2H}`,
  `H${W - N2W + C}`, `A${C},${C} 0 0 0 ${W - N2W},${H - N2H + C}`,
  `V${H - R}`, `A${R},${R} 0 0 1 ${W - N2W - R},${H}`,
  `H${R}`, `A${R},${R} 0 0 1 0,${H - R}`,
  `V${N1H + R}`, `A${R},${R} 0 0 1 ${R},${N1H}`,
  `H${N1W - C}`, `A${C},${C} 0 0 0 ${N1W},${N1H - C}`,
  `V${R}`, `A${R},${R} 0 0 1 ${N1W + R},0`,
  "Z",
].join(" ");

/**
 * Fluted-glass background: a soft lavender glow seen through vertical ribs.
 * Each rib is a light-to-shade gradient; a slight blur makes it read as glass.
 */
function FlutedBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {/* Colour: Apple graphite, a soft glow behind the head so your face stays the brightest part */}
      <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_34%,#6E6E73_0%,rgba(110,110,115,0)_70%),linear-gradient(180deg,#48484A_0%,#2C2C2E_50%,#1D1D1F_100%)]" />
      {/* Vertical ribs: light edge, dark groove */}
      <div className="absolute inset-0 opacity-90 blur-[1.5px] [background:repeating-linear-gradient(90deg,rgba(255,255,255,0.14)_0px,rgba(255,255,255,0.02)_10px,rgba(0,0,0,0.35)_22px,rgba(255,255,255,0.14)_26px)]" />
      {/* Wider soft bands for depth */}
      <div className="absolute inset-0 opacity-70 blur-[8px] [background:repeating-linear-gradient(90deg,rgba(255,255,255,0)_0px,rgba(255,255,255,0.10)_40px,rgba(255,255,255,0)_80px,rgba(0,0,0,0.30)_120px,rgba(255,255,255,0)_160px)]" />
    </div>
  );
}

function ProfileCard() {
  const clipId = useId().replace(/:/g, "");
  // Which photo file we're trying; moves to the next one if a file is missing
  const [srcIndex, setSrcIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const src = PHOTO_SOURCES[srcIndex];
  const isCutout = src?.toLowerCase().endsWith(".png");
  // Move on only once per missing file (the error can be reported twice)
  const next = (failedSrc: string) => setSrcIndex((i) => (PHOTO_SOURCES[i] === failedSrc ? i + 1 : i));

  // Catch a file that already failed before the page became interactive
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) next(img.getAttribute("src") ?? "");
  }, [srcIndex]);

  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <div className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-[32px] bg-[#F5F5F7] p-5 md:p-6">

      {/* Shape definition (not visible) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform={`scale(${1 / W} ${1 / H})`}>
            <path d={PANEL_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className="relative aspect-[4/5]">
        {/* Photo panel, cut to the notched shape */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `url(#${clipId})` }}>
          <FlutedBackground />

          {/* Photo always sits IN FRONT of the stripes */}
          {src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              ref={imgRef}
              src={src}
              alt={`${FIRST_NAME} ${LAST_NAME}`.trim()}
              onError={() => next(src)}
              style={isCutout ? { transform: `translateX(-${PHOTO_FACE_X}%)` } : undefined}
              className={
                isCutout
                  ? "absolute -bottom-[2%] left-1/2 z-[1] h-[90%] w-auto max-w-none object-contain"
                  : "absolute inset-0 z-[1] h-full w-full object-cover object-[50%_25%]"
              }
            />
          )}
          {/* Dark fade at the bottom so the name reads clearly */}
          <div className="absolute inset-x-0 bottom-0 z-[2] h-[50%] bg-gradient-to-t from-[#1D1D1F]/90 via-[#1D1D1F]/40 to-transparent" />

          {/* Name + position — bottom-left, beside the info notch */}
          <div className="absolute bottom-[5%] left-[6%] right-[60%] z-[3] text-white">
            <p className="text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1] tracking-[-0.03em]">{FIRST_NAME}</p>
            {LAST_NAME && (
              <p className="text-[clamp(24px,2.6vw,32px)] font-normal leading-[1.05] tracking-[-0.03em]">{LAST_NAME}</p>
            )}
            <p className="mt-2 text-[12px] leading-snug text-white/80 md:text-[13px]">{POSITION}</p>
          </div>
        </div>

        {/* Top-left notch — monogram */}
        <div
          className="absolute left-0 top-0 flex items-center justify-center"
          style={{ width: pct(N1W - 12, W), height: pct(N1H - 12, H) }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-[16px] font-semibold tracking-[-0.02em] text-white md:h-14 md:w-14 md:text-[18px]">
            {MONOGRAM}
          </span>
        </div>

        {/* Bottom-right notch — experience + location */}
        <div
          className="absolute bottom-0 right-0 flex items-center justify-center gap-3 whitespace-nowrap pl-3 md:gap-4"
          style={{ width: pct(N2W - 10, W), height: pct(N2H - 10, H) }}
        >
          <div className="text-right leading-tight">
            <p className="text-[10px] uppercase tracking-[0.08em] text-black/50 md:text-[11px]">Experience</p>
            <p className="text-[14px] font-semibold tracking-[-0.02em] text-black sm:text-[17px] md:text-[19px]">{EXPERIENCE}</p>
          </div>
          <span aria-hidden="true" className="h-9 w-px bg-black/15" />
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.08em] text-black/50 md:text-[11px]">Location</p>
            <p className="text-[14px] font-semibold tracking-[-0.02em] text-black sm:text-[17px] md:text-[19px]">{LOCATION}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Text reveal (plays once, when the text first comes into view) ── */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: the CSS already shows the text without animating (motion-safe classes),
    // so we still just wait for the section to come into view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

function WordReveal({ text, shown, stepMs = 28 }: { text: string; shown: boolean; stepMs?: number }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span
              style={{ transitionDelay: `${i * stepMs}ms` }}
              className={`inline-block motion-safe:transition-[transform,opacity,filter] motion-safe:duration-700 ${EASE} ${
                shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-[60%] opacity-0 blur-[6px]"
              }`}
            >
              {w}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}

export default function About() {
  const { ref, shown } = useRevealOnce<HTMLDivElement>();
  const paraStart = INTRO.split(" ").length * 28 + 150;

  return (
    <section id="about" className="relative px-5 py-20 text-black md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Right on desktop / first on phones: profile card ── */}
        <div className="lg:order-2 lg:col-span-5">
          <ProfileCard />
        </div>

        {/* ── Left: content ───────────────────────────── */}
        <div ref={ref} className="lg:order-1 lg:col-span-7">
          <h2 className="text-balance text-[clamp(36px,4.2vw,64px)] font-medium leading-[1.05] tracking-[-0.04em]">
            {HEADING_DARK} <span className="text-neutral-400">{HEADING_LIGHT}</span>
          </h2>

          <p className="mt-8 text-pretty text-[20px] leading-[1.45] tracking-[-0.015em] text-black md:mt-10 md:text-[24px]">
            <WordReveal text={INTRO} shown={shown} />
          </p>

          <div className="mt-6 space-y-4 md:mt-8">
            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                style={{ transitionDelay: `${paraStart + i * 180}ms` }}
                className={`max-w-[38rem] text-pretty text-[16px] leading-[1.7] text-neutral-500 motion-safe:transition-[transform,opacity] motion-safe:duration-700 ${EASE} md:text-[17px] ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Stats — two columns with a thin vertical divider (experience lives on the card) */}
          <dl className="mt-12 grid max-w-[30rem] grid-cols-2 md:mt-14">
            {STATS.map((s, i) => (
              <div key={s.label} className={`flex flex-col justify-between ${i > 0 ? "border-l border-black/10 pl-4 md:pl-6" : "pr-4"}`}>
                <dt className="text-[11px] leading-snug text-neutral-500 sm:text-[13px] md:text-[14px]">{s.label}</dt>
                <dd className="mt-2 whitespace-nowrap text-[clamp(28px,4vw,52px)] font-medium leading-[1.05] tracking-[-0.04em]">
                  <span className="tabular-nums">{s.value}</span>
                  <span className="ml-[0.1em] text-neutral-400">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}