"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

/* ── Edit these ─────────────────────────────────────────── */
const LINKEDIN_URL = "https://www.linkedin.com/in/abdulnawfal/";
const RESUME_URL = "/Abdul_Nawfal_Resume.pdf"; // the file lives in /public
const RESUME_FILENAME = "Abdul_Nawfal_Resume.pdf"; // name the visitor's download gets

const SKILLS = [
  "UI/UX Design",
  "Product Design",
  "Graphic Design",
  "Web & Mobile",
  "SaaS",
  "Fintech",
  "E-Commerce",
];
const ROTATE_EVERY_MS = 2200;

const AVAILABILITY = "Open to full-time roles";
const LOCATION = "Dubai, UAE";
const INTRO =
  "I design and build digital experiences from idea to interface, combining product thinking, UI/UX design, prototyping and front end development to create functional, user focused products.";
/* ───────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * Pill button with an icon circle on the right.
 * Hover: the background shade deepens slightly, the label nudges toward the
 * icon, and the arrow slides out of the circle while a fresh one slides in.
 */
function CtaButton({
  label,
  variant,
  icon,
  ...props
}: {
  label: string;
  variant: "dark" | "light";
  icon: "down" | "up-right";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const dark = variant === "dark";
  const Icon = icon === "down" ? ArrowDown : ArrowUpRight;

  // The wrapper that moves is the full size of the circle, so the hidden copy
  // sits completely outside the circle and can never peek in.
  const out =
    icon === "down"
      ? "group-hover:translate-y-full group-focus-visible:translate-y-full"
      : "group-hover:-translate-y-full group-hover:translate-x-full group-focus-visible:-translate-y-full group-focus-visible:translate-x-full";
  const start = icon === "down" ? "-translate-y-full" : "translate-y-full -translate-x-full";
  const into =
    icon === "down"
      ? "group-hover:translate-y-0 group-focus-visible:translate-y-0"
      : "group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0";
  const move = `motion-safe:transition-transform motion-safe:duration-500 ${EASE}`;

  return (
    <a
      {...props}
      className={`group inline-flex h-14 items-center justify-between gap-4 rounded-full pl-6 pr-1.5 text-[15px] font-medium outline-none motion-safe:transition-colors motion-safe:duration-300 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
        dark ? "bg-black text-white hover:bg-neutral-800" : "bg-[#F5F5F7] text-black hover:bg-[#E8E8ED]"
      }`}
    >
      <span className={`whitespace-nowrap ${move} group-hover:translate-x-1 group-focus-visible:translate-x-1`}>{label}</span>
      <span
        className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full ${
          dark ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <span className={`absolute inset-0 flex items-center justify-center ${move} ${out}`}>
          <Icon className="h-4 w-4" />
        </span>
        <span aria-hidden="true" className={`absolute inset-0 flex items-center justify-center ${start} ${move} ${into}`}>
          <Icon className="h-4 w-4" />
        </span>
      </span>
    </a>
  );
}

/** "I design ___" — cycles through SKILLS with a vertical slide. */
function RotatingSkill() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const list = [...SKILLS, SKILLS[0]]; // extra copy of the first item for a seamless loop

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, ROTATE_EVERY_MS);
    return () => clearInterval(id);
  }, []);

  // When we land on the duplicate first item, jump back to 0 without animation
  useEffect(() => {
    if (index === SKILLS.length) {
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 750);
      return () => clearTimeout(t);
    }
  }, [index]);

  // Each slot is taller than the letters (1.4em) so descenders like g, p, y
  // never reach into the next slot. Inactive words are also faded out,
  // so nothing from the previous or next word can peek into view.
  const SLOT = 1.4;
  const move = animate ? `motion-safe:duration-700 ${EASE}` : "duration-0";

  return (
    <span className="relative block overflow-hidden" style={{ height: `${SLOT}em` }}>
      <span
        className={`block motion-safe:transition-transform ${move}`}
        style={{ transform: `translateY(-${index * SLOT}em)` }}
      >
        {list.map((skill, i) => (
          <span
            key={i}
            aria-hidden={i !== index}
            className={`block whitespace-nowrap motion-safe:transition-opacity ${move} ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: `${SLOT}em`, lineHeight: `${SLOT}em` }}
          >
            {skill}
          </span>
        ))}
      </span>
    </span>
  );
}

/** True when the visitor asked their device to reduce motion */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true, // server render: skip the sparkles until the browser decides
  );
}

/**
 * Aceternity "Sparkles", light theme: a glowing line under the title and a
 * cloud of fine dark particles that fades out. Sits behind the hero content.
 */
function HeroSparkles() {
  const reduceMotion = usePrefersReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-4 h-28 w-full max-w-[40rem] md:mt-6 md:h-36">
      {/* Gradients */}
      <div className="absolute inset-x-[12%] top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
      <div className="absolute inset-x-[12%] top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      <div className="absolute inset-x-[37%] top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
      <div className="absolute inset-x-[37%] top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

      {/* Core component (the glow line stays, particles are skipped for reduced motion) */}
      {!reduceMotion && (
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={1200}
        className="h-full w-full"
        particleColor="#1D1D1F"
      />
      )}

      {/* Radial gradient to prevent sharp edges (white for the light theme) */}
      <div className="absolute inset-0 h-full w-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
    </div>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const reveal = (delayMs: number) => ({
    style: { transitionDelay: `${delayMs}ms` },
    className: `block motion-safe:transition-transform motion-safe:duration-[1100ms] ${EASE} ${
      ready ? "translate-y-0" : "motion-safe:translate-y-[115%]"
    }`,
  });

  const fade = (delayMs: number) => ({
    style: { transitionDelay: `${delayMs}ms` },
    className: `motion-safe:transition-[opacity,transform] motion-safe:duration-700 ease-out ${
      ready ? "translate-y-0 opacity-100" : "motion-safe:translate-y-4 motion-safe:opacity-0"
    }`,
  });

  return (
    <section id="home" className="px-5 pb-20 pt-14 text-black md:px-10 md:pb-28 md:pt-20 lg:px-16 lg:pb-32 lg:pt-24">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Availability badge, same style as the contact page */}
        <div style={fade(100).style} className={`${fade(100).className} flex flex-wrap items-center gap-3`}>
          {/* Light green: available now */}
          <p className="inline-flex items-center gap-2 rounded-full bg-[#E9F8EF] px-3.5 py-2 text-[13px] font-semibold text-[#1A7F45] ring-1 ring-inset ring-[#1A7F45]/15 md:text-[14px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22A55B] opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22A55B]" />
            </span>
            {AVAILABILITY}
          </p>
          {/* Warm sand: location */}
          <p className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#FFF6E8_0%,#FFE9D2_100%)] px-3.5 py-2 text-[13px] font-semibold text-[#B45309] ring-1 ring-inset ring-[#F59E0B]/30 md:text-[14px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {LOCATION}
          </p>
        </div>

        {/* Title, with the sparkles glowing underneath */}
        <div className="mt-8 md:mt-10">
        <h1 className="relative z-20 text-[clamp(48px,7.4vw,120px)] font-medium leading-[1] tracking-[-0.05em]">
          <span className="sr-only">I design {SKILLS.join(", ")}.</span>
          <span aria-hidden="true">
            {/* Extra bottom padding (cancelled by a negative margin) gives the "g"
                room so its tail is never cut off by the reveal mask */}
            <span className="block overflow-hidden pb-[0.22em] -mb-[0.22em]">
              <span {...reveal(150)}>
                <span className="text-neutral-400">I design</span>
              </span>
            </span>
            {/* The rotating slot is 1.4em tall for safe descenders; negative margins
                pull it back so the two lines keep their tight spacing */}
            <span className="block overflow-hidden -my-[0.19em]">
              <span {...reveal(280)}>
                <RotatingSkill />
              </span>
            </span>
          </span>
        </h1>
          <HeroSparkles />
        </div>

        {/* Intro on the left, buttons on the right (stacked on phones) */}
        <div
          style={fade(550).style}
          className={`${fade(550).className} relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between`}
        >
          <p className="max-w-[34rem] text-pretty text-[17px] leading-[1.65] text-neutral-500 md:text-[19px]">
            {INTRO}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton label="Download Resume" variant="dark" icon="down" href={RESUME_URL} download={RESUME_FILENAME} />
            <CtaButton
              label="LinkedIn"
              variant="light"
              icon="up-right"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}