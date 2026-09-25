import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import HeroBackground from "@/app/components/Herobackground";
import Footer from "@/app/components/Footer";
import { projects } from "@/data/projects";

/* Every project page is built ahead of time, so opening one is instant */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false; // unknown slugs → 404

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = project.caseStudy?.title ?? project.title;
  return {
    title: `${title}, case study by Abdul Nawfal`,
    description: project.caseStudy?.intro ?? project.summary,
  };
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

/** Label on the left, content on the right (stacked on phones) */
function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
      <h2 className="text-[13px] font-medium uppercase tracking-[0.1em] text-neutral-400 md:col-span-3 md:pt-2">
        {label}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const cs = project.caseStudy;
  const next = projects[(index + 1) % projects.length];
  const nextTitle = next.caseStudy?.title ?? next.title;

  // Facts under the intro; any left empty are hidden
  const meta = (
    cs
      ? [
          { k: "Client", v: cs.client },
          { k: "Role", v: cs.role },
          { k: "Duration", v: cs.duration },
          { k: "Year", v: cs.year },
        ]
      : [
          { k: "Client", v: project.client },
          { k: "Category", v: project.category },
          { k: "Year", v: project.year },
        ]
  ).filter((m): m is { k: string; v: string } => Boolean(m.v));

  return (
    <>
      <Header />
      <main className="text-black">
        {/* ── Intro (same soft lavender backdrop as the home hero) ── */}
        <div className="relative isolate -mt-20 pt-20 md:-mt-24 md:pt-24">
          <HeroBackground />
          <section className="px-5 pb-12 pt-12 md:px-10 md:pb-16 md:pt-20 lg:px-16">
            <div className="mx-auto w-full max-w-[1200px]">
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 rounded-full bg-white/70 py-2 pl-3 pr-4 text-[14px] font-medium text-black backdrop-blur hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-x-0.5" />
                Work
              </Link>

              <h1 className="mt-8 max-w-[16ch] text-balance text-[clamp(44px,7vw,112px)] font-medium leading-[1] tracking-[-0.05em]">
                {cs?.title ?? project.title}
              </h1>

              <p className="mt-6 max-w-[44rem] text-pretty text-[18px] leading-[1.6] text-neutral-600 md:mt-8 md:text-[22px]">
                {cs?.intro ?? project.summary}
              </p>

              {/* Project facts */}
              <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 md:mt-14">
                {meta.map((m) => (
                  <div key={m.k}>
                    <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-400">
                      {m.k}
                    </dt>
                    <dd className="mt-1.5 text-[17px] font-medium md:text-[19px]">
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        {/* ── Cover image ─────────────────────────────── */}
        {(cs?.cover ?? project.image) && (
          // "relative" keeps the image above the intro's lavender fade
          <div className="relative px-5 md:px-10 lg:px-16">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[1200px] overflow-hidden rounded-[24px] bg-neutral-100 md:rounded-[32px]">
              {/* The cover is the first big image on the page, so fetch it first */}
              <Image
                src={(cs?.cover ?? project.image) as string}
                alt={`${cs?.title ?? project.title} preview`}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                loading="eager"
                fetchPriority="high"
                placeholder={project.blur ? "blur" : "empty"}
                blurDataURL={project.blur}
                className="object-cover"
              />
            </div>
          </div>
        )}

        {cs ? (
          <div className="relative px-5 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
            <div className="mx-auto w-full max-w-[1200px] space-y-20 md:space-y-28">
              {cs.overview && (
                <Block label="Overview">
                  <p className="text-pretty text-[22px] leading-[1.5] tracking-[-0.015em] text-black md:text-[30px]">
                    {cs.overview}
                  </p>
                </Block>
              )}

              {cs.challenge && (
                <Block label="The challenge">
                  <p className="max-w-[46rem] text-pretty text-[17px] leading-[1.75] text-neutral-600 md:text-[19px]">
                    {cs.challenge}
                  </p>
                </Block>
              )}

              {/* Image collection (graphic design): masonry columns, 1 on phones, 2 on tablets, 3 on desktop */}
              {cs.gallery && cs.gallery.length > 0 && (
                <section aria-label="Collection">
                  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
                    {cs.gallery.map((g, i) => (
                      <figure
                        key={i}
                        className={`relative break-inside-avoid overflow-hidden rounded-[20px] bg-[#F5F5F7] ${
                          g.shape === "portrait"
                            ? "aspect-[4/5]"
                            : g.shape === "landscape"
                              ? "aspect-video"
                              : "aspect-square"
                        }`}
                      >
                        {g.src ? (
<Image
                            src={g.src}
                            alt={g.alt}
                            fill
                            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#F5F5F7] text-[13px] font-medium text-black/35">
                            {g.alt}
                          </div>
                        )}
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {cs.whatIDid && cs.whatIDid.length > 0 && (
                <Block label="What I did">
                  <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                    {cs.whatIDid.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-4 rounded-[20px] bg-[#F5F5F7] p-5 md:p-6"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-semibold tabular-nums text-black">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="pt-1.5 text-pretty text-[16px] leading-[1.6] text-black md:text-[17px]">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}

              <Block
                label={cs.outcome && cs.outcome.length > 0 ? "Outcome" : "Tags"}
              >
                {cs.outcome && cs.outcome.length > 0 && (
                  <dl className="mb-12 grid grid-cols-3 gap-4 md:gap-8">
                    {cs.outcome.map((o) => (
                      <div key={o.label}>
                        <dd className="text-[clamp(36px,6vw,80px)] font-medium leading-none tracking-[-0.05em] tabular-nums">
                          {o.value}
                        </dd>
                        <dt className="mt-3 text-[13px] leading-snug text-neutral-500 md:text-[16px]">
                          {o.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="flex flex-wrap gap-2">
                  {cs.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-[#F5F5F7] px-4 py-2 text-[14px] font-medium text-black"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </div>
        ) : (
          <div className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
            <p className="mx-auto w-full max-w-[1200px] text-[18px] text-neutral-500">
              The full case study for this project is coming soon.
            </p>
          </div>
        )}

        {/* ── Next project ────────────────────────────── */}
        <div className="px-5 pb-20 md:px-10 md:pb-28 lg:px-16">
          <Link
            href={`/work/${next.slug}`}
            className="group mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 rounded-[28px] bg-[#F5F5F7] p-8 outline-none focus-visible:ring-2 focus-visible:ring-black md:rounded-[36px] md:p-12"
          >
            <span className="min-w-0">
              <span className="block text-[13px] font-medium uppercase tracking-[0.1em] text-black/50">
                Next project
              </span>
              <span className="mt-3 block text-[clamp(30px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.04em]">
                {nextTitle}
              </span>
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black text-white md:h-20 md:w-20">
              <ArrowRight className="h-5 w-5 motion-safe:transition-transform motion-safe:duration-500 group-hover:translate-x-1 md:h-6 md:w-6" />
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}