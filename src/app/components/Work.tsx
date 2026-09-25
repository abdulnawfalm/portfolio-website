"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { projects, type GalleryItem, type Project } from "@/data/projects";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Left padding that lines the first card up with the 1200px container used by the other sections
const EDGE = "px-5 md:px-10 lg:px-[max(4rem,calc((100vw-1200px)/2))]";
const SCROLL_PAD = "scroll-px-5 md:scroll-px-10 lg:scroll-px-[max(4rem,calc((100vw-1200px)/2))]";

// Placeholder backgrounds (brand lavender → violet) until real images are added
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(160deg,#D9CCF8 0%,#A48BEA 55%,#5B41B8 100%)",
  "linear-gradient(200deg,#E6DDFB 0%,#B7A2F0 50%,#6A50C6 100%)",
  "linear-gradient(145deg,#CDBDF5 0%,#9479E0 55%,#4E3AA6 100%)",
  "linear-gradient(185deg,#E2D8FA 0%,#AE97EE 50%,#624ABF 100%)",
  "linear-gradient(170deg,#D4C6F7 0%,#9C83E5 55%,#5540B0 100%)",
  "linear-gradient(210deg,#DDD1F9 0%,#A68EEB 52%,#5D45BA 100%)",
];

function Arrow({ dir, className = "" }: { dir: "left" | "right" | "up-right"; className?: string }) {
  const d =
    dir === "left" ? ["M19 12H5", "m11 6-6 6 6 6"] : dir === "right" ? ["M5 12h14", "m13 6 6 6-6 6"] : ["M7 17 17 7", "M8 7h9v9"];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d={d[0]} />
      <path d={d[1]} />
    </svg>
  );
}

/**
 * Folder thumbnail (used for the graphic design project):
 * the posts peek out of a violet folder, like a file of work.
 * Drawn on a 200 × 210 grid, the same shape as the card (20:21).
 */
function FolderThumb({ posts }: { posts: GalleryItem[] }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div className="absolute inset-0 bg-[#150B2E]">
      {/* Soft lavender glow behind the folder */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_62%,rgba(150,110,245,0.45)_0%,transparent_70%)]" />

      {/* Back of the folder, with its tab on the right */}
      <svg viewBox="0 0 200 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M12,102 Q12,94 20,94 L120,94 Q126,94 130,90 L134,86 Q137,84 142,84 L178,84 Q188,84 188,94 L188,194 Q188,202 180,202 L20,202 Q12,202 12,194 Z"
          fill="#35197A"
        />
      </svg>

      {/* The posts, sliding up a little on hover */}
      <div
        className={`absolute left-[10%] right-[10%] top-[6%] grid grid-cols-3 gap-[3px] overflow-hidden rounded-[10px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] motion-safe:transition-transform motion-safe:duration-700 ${EASE} group-hover:-translate-y-2`}
      >
        {posts.map((post) => (
          <div key={post.src} className="relative aspect-[4/5] bg-[#2A1560]">
            <Image
              src={post.src as string}
              alt=""
              fill
              sizes="(min-width: 1024px) 150px, (min-width: 768px) 16vw, 28vw"
              loading="eager"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Front of the folder, with its tab on the left */}
      <svg viewBox="0 0 200 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`front-${uid}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#8A5CF0" />
            <stop offset="55%" stopColor="#5B34C4" />
            <stop offset="100%" stopColor="#2E1570" />
          </linearGradient>
          <radialGradient id={`shine-${uid}`} cx="0.3" cy="0.55" r="0.7">
            <stop offset="0%" stopColor="#E3D5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E3D5FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          id={`shape-${uid}`}
          d="M8,110 Q8,100 18,100 L74,100 Q80,100 84,105 L94,114 Q98,118 104,118 L182,118 Q192,118 192,128 L192,192 Q192,202 182,202 L18,202 Q8,202 8,192 Z"
          fill={`url(#front-${uid})`}
        />
        <path
          d="M8,110 Q8,100 18,100 L74,100 Q80,100 84,105 L94,114 Q98,118 104,118 L182,118 Q192,118 192,128 L192,192 Q192,202 182,202 L18,202 Q8,202 8,192 Z"
          fill={`url(#shine-${uid})`}
        />
      </svg>
    </div>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  // No cover image but a gallery of posts → show them inside a folder
  const folderPosts = project.image ? [] : (project.caseStudy?.gallery ?? []).filter((g) => g.src).slice(0, 6);
  const isFolder = folderPosts.length > 0;

  return (
    <li data-card className="w-[84vw] shrink-0 snap-start sm:w-[62vw] md:w-[46vw] lg:w-[440px]">
      <Link href={`/work/${project.slug}`} className="group block outline-none">
        {/* Image */}
        <div className="relative aspect-[20/21] overflow-hidden rounded-[22px] md:rounded-[26px]">
          <div className={`absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 ${EASE} group-hover:scale-[1.04]`}>
            {project.image ? (
              // next/image serves a small, sized WebP instead of the full original file.
              // "eager": all 6 load right away, so cards never pop in when you scroll or swipe.
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 46vw, (min-width: 640px) 62vw, 84vw"
                loading="eager"
                placeholder={project.blur ? "blur" : "empty"}
                blurDataURL={project.blur}
                className="object-cover"
              />
            ) : folderPosts.length > 0 ? (
              <FolderThumb posts={folderPosts} />
            ) : (
              <div className="h-full w-full" style={{ background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length] }} />
            )}
          </div>

          {/* Arrow — top right, turns on hover */}
          <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-xl md:right-6 md:top-6">
            <Arrow dir="up-right" className={`h-4 w-4 motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:rotate-45`} />
          </span>

          {/* Soft fade so the text reads on any image */}
          {!isFolder && <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#2B1760]/45 to-transparent" />}

          {/* Project name + category — text only */}
          <div className={`absolute bottom-6 left-6 right-6 text-white md:bottom-7 md:left-7 motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:-translate-y-1`}>
            <p className="text-[24px] font-medium leading-tight tracking-[-0.02em] md:text-[28px]">{project.title}</p>
            <p className="mt-1 text-[15px] text-white/70 md:text-[17px]">{project.category}</p>
          </div>
        </div>

      </Link>
    </li>
  );
}

export default function Work() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  /** Move one card left or right */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F4F7] text-black outline-none motion-safe:transition-colors motion-safe:duration-300 hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-35";

  return (
    <section id="work" className="relative py-20 text-black md:py-28 lg:py-32">
      {/* Heading row — lined up with the 1200px container */}
      <div className="px-5 md:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1200px] items-end justify-between gap-6">
          <div>
            <h2 className="text-[clamp(38px,4.4vw,68px)] font-medium leading-[1.05] tracking-[-0.04em]">
              Selected <span className="text-neutral-400">work</span>
            </h2>
            <p className="mt-3 text-[14px] tabular-nums text-neutral-400 md:text-[16px]">
              ({String(projects.length).padStart(2, "0")}) projects
            </p>
          </div>

          {/* Arrow buttons — tablet and desktop; phones just swipe */}
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous project" className={btn}>
              <Arrow dir="left" className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next project" className={btn}>
              <Arrow dir="right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling row — starts in line with the heading and runs off the right edge */}
      <ul
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        aria-label="Projects — scroll sideways"
        className={`mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 outline-none md:mt-14 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${EDGE} ${SCROLL_PAD}`}
      >
        {projects.map((project, i) => (
          <Card key={project.slug} project={project} index={i} />
        ))}
      </ul>

      <p className="mt-6 px-5 text-[13px] text-neutral-400 md:hidden">Swipe to see more →</p>
    </section>
  );
}