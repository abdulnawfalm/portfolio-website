"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/* ── Edit these ─────────────────────────────────────────── */
const LOGO = "Designer"; // matches the big wordmark in the footer
const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Tools", href: "#skills" },
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

/** Let the page scroll again (the open mobile menu locks it) */
function unlockPageScroll() {
  document.documentElement.style.overflow = "";
}

/** Smoothly scrolls to a section; instant for visitors who reduce motion */
function scrollToSection(href: string) {
  const el = document.getElementById(href.replace("#", ""));
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", href);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu; growing past tablet width closes it too
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  // Stop the page behind the open menu from scrolling
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  /**
   * Section link: close the menu, unlock scrolling, then glide to the section.
   * On other pages (like /contact) go to that section on the home page instead.
   */
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    unlockPageScroll();
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    requestAnimationFrame(() => scrollToSection(href));
  };

  return (
    <header
      className={`sticky top-0 z-50 text-black motion-safe:transition-[background-color] motion-safe:duration-300 ${
        open ? "bg-white" : scrolled ? "bg-white/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="px-5 md:px-10 lg:px-16">
        <div className="mx-auto grid h-20 w-full max-w-[1200px] grid-cols-[1fr_auto] items-center md:h-24 md:grid-cols-[1fr_auto_1fr]">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="justify-self-start text-[20px] font-semibold uppercase leading-none tracking-[-0.04em] text-black"
          >
            {LOGO}
          </Link>

          {/* Desktop nav: soft pill group in the centre */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full bg-white/80 p-1 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.05] backdrop-blur-md">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => go(e, item.href)}
                    className="flex h-10 items-center rounded-full px-5 text-[14px] font-medium tracking-[-0.01em] text-black/70 outline-none motion-safe:transition-colors motion-safe:duration-300 hover:bg-[#F5F5F7] hover:text-black focus-visible:bg-[#F5F5F7] focus-visible:text-black"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end">
            {/* Desktop Contact: same black pill as the rest of the site */}
            <Link
              href="/contact"
              className="group hidden h-11 items-center gap-3 rounded-full bg-black pl-5 pr-1.5 text-[14px] font-medium text-white outline-none motion-safe:transition-colors motion-safe:duration-300 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:inline-flex"
            >
              Contact
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                <ArrowUpRight className={`h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:rotate-45`} />
              </span>
            </Link>

            {/* Mobile menu button: black circle with a plus that turns into an X */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 items-center gap-2.5 pl-2 text-[13px] font-medium text-black md:hidden"
            >
              <span aria-hidden="true" className="w-10 text-right">{open ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <svg
                  viewBox="0 0 14 14"
                  className={`h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-300 ${EASE} ${open ? "rotate-45" : "rotate-0"}`}
                >
                  <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth={1.6} />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu: full screen below the header bar */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col overflow-y-auto bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] motion-safe:transition-opacity motion-safe:duration-200 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="pt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => go(e, item.href)}
                  className="flex items-center justify-between rounded-[20px] bg-[#F5F5F7] px-5 py-5 text-black active:bg-[#F5F5F7]"
                >
                  <span className="text-[26px] font-medium leading-none tracking-[-0.03em]">{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 rotate-45 text-neutral-400" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact call to action */}
        <Link
          href="/contact"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            setOpen(false);
            unlockPageScroll();
          }}
          className="mt-6 flex h-14 items-center justify-between rounded-full bg-black pl-6 pr-1.5 text-[15px] font-medium text-white active:bg-neutral-800"
        >
          Get in touch
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>

        <div className="mt-auto flex items-center justify-between pt-10 text-[13px] font-medium text-neutral-500">
          <span>© {new Date().getFullYear()} Abdul Nawfal</span>
          <span>Dubai, UAE</span>
        </div>
      </div>
    </header>
  );
}
