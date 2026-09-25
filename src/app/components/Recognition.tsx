/* ── Edit these (placeholders — replace with your real details) ── */
const REVIEW = {
  quote:
    "I had the opportunity to work with Nawfal, and I was impressed by his creativity and willingness to learn. He contributed well to UI/UX design, social media creatives, and website design, while also taking the initiative to learn programming alongside his design work. His valuable ideas and proactive approach made him a great addition to the team.",
  name: "Mohamed Azath",
  role: "Senior Full Stack Developer",
  company: "Your Office Partners",
};

const AWARD = {
  title: "Employee of the Month",
  org: "Your Office Partners",
  date: "Month 2025",
  detail: "Recognised for outstanding design work and ownership across the product team.",
};

const CERT = {
  title: "User Experience Design",
  org: "Accenture",
  date: "2024",
  detail: "Research, wireframing, prototyping and usability testing.",
  link: "", // optional: credential URL, e.g. https://…
};
/* ───────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const CARD = `group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[28px] p-7 md:min-h-[500px] md:p-9 motion-safe:transition-transform motion-safe:duration-500 ${EASE} hover:-translate-y-1.5`;

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8 6.2 20l1.4-6.4L2.7 9.2l6.5-.7L12 2.5z" />
    </svg>
  );
}

/* 1 — Review: quiet text card */
function ReviewCard() {
  return (
    <figure className={`${CARD} justify-between bg-[#F5F5F7]`}>
      <div>
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-400">Team lead review</p>
        <blockquote className="mt-6 text-pretty text-[16px] leading-[1.65] text-black md:text-[17px]">
          “{REVIEW.quote}”
        </blockquote>
      </div>

      {/* Author tag */}
      <figcaption className="mt-10 inline-flex items-center self-start rounded-full bg-white px-5 py-3">
        <span className="leading-tight">
          <span className="block text-[15px] font-medium text-black">{REVIEW.name}</span>
          <span className="block text-[13px] text-neutral-500">
            {REVIEW.role}, {REVIEW.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* 2 — Award: text on top, a tilted award plaque peeking up from the bottom */
function AwardCard() {
  return (
    <article className={`${CARD} bg-[#F5F5F7]`}>
      <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-500">
        <StarIcon className="h-3.5 w-3.5 text-black" />
        Award
      </div>
      <h3 className="mt-6 text-[24px] font-medium leading-[1.15] tracking-[-0.03em] text-black md:text-[28px]">{AWARD.title}</h3>
      <p className="mt-3 text-pretty text-[15px] leading-[1.6] text-neutral-600">{AWARD.detail}</p>

      {/* Plaque — straightens and rises on hover */}
      <div
        aria-hidden="true"
        className={`absolute -bottom-6 left-7 right-7 rotate-[-5deg] rounded-[20px] bg-black p-6 text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] md:left-9 md:right-9 motion-safe:transition-transform motion-safe:duration-700 ${EASE} group-hover:-translate-y-3 group-hover:rotate-0`}
      >
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
            <StarIcon className="h-4 w-4" />
          </span>
          <span className="text-[12px] tabular-nums text-white/50">{AWARD.date}</span>
        </div>
        <p className="mt-6 text-[22px] font-medium leading-[1.1] tracking-[-0.02em]">{AWARD.title}</p>
        <p className="mt-1.5 pb-6 text-[13px] text-white/55">{AWARD.org}</p>
      </div>
    </article>
  );
}

/* 3 — Certification: a small certificate sheet resting on a soft glow */
function CertCard() {
  const Wrapper = CERT.link ? "a" : "article";
  const linkProps = CERT.link ? { href: CERT.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Wrapper {...linkProps} className={`${CARD} justify-between bg-[#F5F5F7] outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4`}>
      {/* Soft glow behind the sheet */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full hidden"
      />

      {/* Certificate sheet — lifts and turns slightly on hover */}
      <div
        aria-hidden="true"
        className={`relative mx-auto mt-2 w-[78%] rotate-[3deg] rounded-[14px] bg-white p-5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] motion-safe:transition-transform motion-safe:duration-700 ${EASE} group-hover:-translate-y-2 group-hover:rotate-[-2deg]`}
      >
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">Certificate</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F5F7] text-black">
            <StarIcon className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-5 text-[15px] font-medium leading-snug tracking-[-0.01em] text-black">{CERT.title}</p>
        {/* Placeholder "text" blocks on the sheet */}
        <div className="mt-4 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-neutral-100" />
          <span className="block h-1.5 w-4/5 rounded-full bg-neutral-100" />
          <span className="block h-1.5 w-3/5 rounded-full bg-neutral-100" />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="h-5 w-16 rounded-full bg-neutral-100" />
          <span className="text-[11px] tabular-nums text-neutral-400">{CERT.date}</span>
        </div>
      </div>

      {/* Text */}
      <div className="relative mt-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-500">Certification</p>
        <h3 className="mt-3 text-[24px] font-medium leading-[1.15] tracking-[-0.03em] text-black md:text-[28px]">{CERT.title}</h3>
        <p className="mt-2 text-[14px] text-neutral-500 md:text-[15px]">
          {CERT.org} · {CERT.date}
        </p>
        {CERT.link && (
          <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-black">
            View credential
            <ArrowUpRight className={`h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:rotate-45`} />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default function Recognition() {
  return (
    <section id="recognition" className="relative px-5 py-20 text-black md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="text-[clamp(38px,4.4vw,68px)] font-medium leading-[1.05] tracking-[-0.04em]">
          Recognition <span className="text-neutral-400">& reviews</span>
        </h2>

        {/* Three equal cards — stacked on phones, 2 + 1 on tablets, 3 across on desktop */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <ReviewCard />
          <AwardCard />
          <div className="md:col-span-2 lg:col-span-1">
            <CertCard />
          </div>
        </div>
      </div>
    </section>
  );
}