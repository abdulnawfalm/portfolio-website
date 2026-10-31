"use client";

import { useEffect, useState } from "react";

/* ── Edit these ─────────────────────────────────────────── */
const LINKEDIN_URL = "https://www.linkedin.com/in/abdulnawfal/";
const RESUME_URL = "/Abdul_Nawfal_Resume.pdf"; // the file lives in /public
const RESUME_FILENAME = "Abdul_Nawfal_Resume.pdf"; // name the visitor's download gets

/** What you do: shown as pills above the headline */
const SKILLS = ["UI/UX Design", "Product Design", "Graphic Design", "AI Development", "Fintech & SaaS"];

/** Headline: the first part gets the colour gradient */
const HEADLINE_GRADIENT = "I design";
const HEADLINE_REST = ["products", "that drive results"]; // "products" sits on line one

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
    <section id="home" className="relative px-5 pb-20 pt-14 text-black md:px-10 md:pb-28 md:pt-20 lg:px-16 lg:pb-32 lg:pt-24">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center">
        {/* What I do */}
        <ul
          aria-label="What I do"
          style={fade(100).style}
          className={`${fade(100).className} flex max-w-[44rem] flex-wrap items-center justify-center gap-2 md:gap-2.5`}
        >
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-[#F5F5F7] px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-black/70 md:text-[14px]"
            >
              {skill}
            </li>
          ))}
        </ul>

        {/* Headline: "I design" in the colour gradient */}
        <h1 className="mt-8 text-[clamp(44px,7.2vw,112px)] font-medium leading-[1.02] tracking-[-0.05em] md:mt-10">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span {...reveal(150)}>
              <span className="hero-gradient bg-[linear-gradient(90deg,#4F9BE0_0%,#9B5FC0_30%,#E8458B_60%,#F07B4F_85%,#F5B03E_100%)] bg-clip-text pr-[0.04em] text-transparent">
                {HEADLINE_GRADIENT}
              </span>{" "}
              {HEADLINE_REST[0]}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span {...reveal(280)}>{HEADLINE_REST[1]}</span>
          </span>
        </h1>

        {/* Intro and buttons */}
        <div
          style={fade(550).style}
          className={`${fade(550).className} mt-8 flex flex-col items-center gap-9 md:mt-10`}
        >
          <p className="max-w-[40rem] text-pretty text-[17px] leading-[1.65] text-neutral-500 md:text-[19px]">
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