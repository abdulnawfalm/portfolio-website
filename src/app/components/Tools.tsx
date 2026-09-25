/* ── Edit these ─────────────────────────────────────────── */
// icon (optional): put an SVG/PNG logo in /public/tools/ and set icon: "/tools/figma.svg".
// fill: true for logos that already have their own square background (app icon style).
// Without an icon, the two-letter "mono" badge is shown instead.
type Tool = { name: string; mono: string; icon?: string; fill?: boolean };

const TOOLS: Tool[] = [
  { name: "Figma & Figma AI", mono: "Fi", icon: "/tools/figma.svg" },
  { name: "Framer", mono: "Fr", icon: "/tools/framer.svg" },
  { name: "Adobe Illustrator", mono: "Ai", icon: "/tools/illustrator.svg", fill: true },
  { name: "Adobe InDesign", mono: "Id", icon: "/tools/indesign.svg", fill: true },
  { name: "Claude", mono: "Cl", icon: "/tools/claude.svg", fill: true },
  { name: "ChatGPT", mono: "Ch", icon: "/tools/chatgpt.svg", fill: true },
  { name: "Lovable", mono: "Lo", icon: "/tools/lovable.svg" },
  { name: "Google Stitch", mono: "St", icon: "/tools/stitch.svg", fill: true },
  { name: "Material UI & Shadcn/UI", mono: "UI", icon: "/tools/material-ui.png" },
  { name: "VS Code", mono: "VS", icon: "/tools/vscode.svg" },
  { name: "Git & GitHub", mono: "Gi", icon: "/tools/git.svg" },
  { name: "Vercel", mono: "Ve", icon: "/tools/vercel.svg" },
];

/* ───────────────────────────────────────────────────────── */

export default function Tools() {
  return (
    <section id="skills" className="relative px-5 py-20 text-black md:px-10 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Heading */}
        <h2 className="text-[clamp(38px,4.4vw,68px)] font-medium leading-[1.05] tracking-[-0.04em]">
          Tools <span className="text-neutral-400">I use</span>
        </h2>

        {/*
          Grid with lines only BETWEEN cells — no outer border, no rounded corners.
          Every cell draws a left + top line; the list is pulled 1px up and left
          inside a clipped wrapper, which hides the lines on the outside edges.
          2 columns on phones, 3 on tablets, 4 on desktop.
        */}
        <div className="mt-12 overflow-hidden md:mt-16">
          <ul className="-ml-px -mt-px grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {TOOLS.map((tool) => (
              <li
                key={tool.name}
                className="group flex h-[150px] flex-col items-center justify-center gap-4 border-l border-t border-black/[0.08] px-3 text-center motion-safe:transition-colors motion-safe:duration-300 hover:bg-[#F5F5F7] md:h-[190px] lg:h-[210px]"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[14px] bg-[#F5F5F7] text-[15px] font-semibold tracking-[-0.02em] text-black motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 md:h-14 md:w-14 md:text-[16px]"
                >
                  {tool.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tool.icon}
                      alt=""
                      loading="lazy"
                      className={tool.fill ? "h-full w-full object-cover" : "h-7 w-7 object-contain md:h-8 md:w-8"}
                    />
                  ) : (
                    tool.mono
                  )}
                </span>
                <span className="text-balance text-[14px] font-medium leading-snug tracking-[-0.01em] text-black md:text-[16px]">
                  {tool.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}