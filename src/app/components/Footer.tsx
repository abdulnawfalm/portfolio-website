"use client";

import { useEffect, useState } from "react";

/* ── Edit these ─────────────────────────────────────────── */
const EMAIL = "abdulnawfal11011@gmail.com"; // ← your email
const NAME = "Abdul Nawfal";
const WORDMARK = "DESIGNER"; // big word at the bottom — matches your header logo
const LOCATION = "Dubai, UAE";
const TIME_ZONE = "Asia/Dubai";

/** Opens a new Gmail message addressed to you, in a new tab */
const GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent("Hello Abdul")}`;

const QUICK_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Tools", href: "/#skills" },
  { label: "Recognition", href: "/#recognition" },
];

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abdulnawfal/" },
  { label: "GitHub", href: "https://github.com/abdulnawfalm" },
  { label: "Behance", href: "https://www.behance.net/AbdulNawfal" },
];
/* ───────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

/** Live local time in Dubai, updated every 20 seconds (shown after the page loads to avoid a mismatch) */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {time ?? "--:--"} local time
    </span>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const colTitle = "text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-400";

  return (
    <footer id="contact" className="relative isolate overflow-hidden px-5 pt-24 text-black md:px-10 md:pt-32 lg:px-16 lg:pt-40">
      {/* Soft lavender glow at the bottom — echoes the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_30%_100%,#E6DAFA_0%,transparent_70%),radial-gradient(50%_50%_at_85%_100%,#F1E7F9_0%,transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-[1200px]">
        {/* ── Call to action ─────────────────────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[14ch] text-[clamp(44px,6.4vw,104px)] font-medium leading-[1] tracking-[-0.045em]">
            Let’s build something <span className="text-neutral-400">together.</span>
          </h2>

          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end lg:pb-3">
            {/* Gmail button: opens a new Gmail message to you in a new tab */}
            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 shrink-0 items-center gap-3 whitespace-nowrap rounded-full bg-black pl-5 pr-1.5 text-[15px] font-medium leading-none text-white outline-none motion-safe:transition-colors motion-safe:duration-300 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:text-[17px]"
            >
              <MailIcon className="h-[18px] w-[18px] shrink-0" />
              <span className="mr-2">Email me on Gmail</span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black">
                <ArrowUpRight className={`h-4 w-4 motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:rotate-45`} />
              </span>
            </a>

            {/* Your address, click to copy */}
            <button
              type="button"
              onClick={copyEmail}
              className="pl-1 text-[13px] text-neutral-500 underline-offset-4 hover:text-black hover:underline"
            >
              <span aria-live="polite">{copied ? "Email copied ✓" : `${EMAIL} · click to copy`}</span>
            </button>
          </div>
        </div>

        {/* ── Info columns ───────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-28 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <p className={colTitle}>Based in</p>
            <p className="mt-4 text-[22px] font-medium tracking-[-0.02em] md:text-[26px]">{LOCATION}</p>
            <p className="mt-2 text-[14px] text-neutral-500">
              <LocalTime />
            </p>
          </div>

          <nav aria-label="Footer">
            <p className={colTitle}>Quick links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`inline-block text-[16px] text-black motion-safe:transition-transform motion-safe:duration-300 ${EASE} hover:translate-x-1 md:text-[17px]`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={colTitle}>Social</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[16px] text-black md:text-[17px]"
                  >
                    {s.label}
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 text-neutral-400 motion-safe:transition-transform motion-safe:duration-300 ${EASE} group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom row ─────────────────────────────────── */}
        <div className="mt-20 flex items-center justify-between gap-4 text-[13px] text-neutral-500 md:mt-28">
          <span>
            © {new Date().getFullYear()} {NAME}
          </span>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2 rounded-full bg-white/70 py-2 pl-4 pr-2 text-black outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-black"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <ArrowUp className={`h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-300 ${EASE} group-hover:-translate-y-0.5`} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Giant wordmark, sitting on the bottom edge ───── */}
      <p
        aria-hidden="true"
        className="pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[clamp(64px,19vw,300px)] font-semibold uppercase leading-[0.78] tracking-[-0.06em] text-black/[0.07]"
      >
        {WORDMARK}
      </p>
    </footer>
  );
}