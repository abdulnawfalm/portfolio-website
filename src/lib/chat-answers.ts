export type Answer = {
  /** Words that route a question here — lowercase, no punctuation */
  match: string[];
  text: string;
  /** Optional buttons rendered under the answer */
  links?: { label: string; href: string; download?: boolean }[];
};

/** One resume, used for every application. Lives in /public. */
export const RESUME = "/Abdul_Nawfal_UIUX_Designer.pdf";

/** Short label on the chip, full question sent to the answer engine */
export const QUICK_PROMPTS: { label: string; question: string }[] = [
  { label: "Resume", question: "Can I download your resume?" },
  { label: "Location", question: "Where are you based?" },
  { label: "Experience", question: "How many years of experience do you have?" },
  { label: "Availability", question: "Are you available for full-time roles?" },
  { label: "specialize ", question: "What do you specialize in?" },
];

/**
 * Edit these answers freely — this is the whole knowledge base.
 * First entry whose `match` words appear in the question wins,
 * so put more specific entries above general ones.
 */
export const ANSWERS: Answer[] = [
  {
    match: ["resume", "resumé", "cv", "download", "curriculum", "profile pdf"],
    text: "Here it is.",
    links: [{ label: "Download resume", href: RESUME, download: true }],
  },
  {
    match: ["relocate", "relocation", "relocating", "move", "moving", "shift", "dubai", "uae", "emirates", "abroad", "overseas", "visa", "sponsor", "onsite", "on-site", "bangalore", "bengaluru", "india", "chennai"],
    text:
      "Based in Dubai, UAE, and ready to join on-site. Current visa status: Visit visa.",
  },
  {
    match: ["experience", "experienced", "years", "year", "yrs", "how long", "senior", "junior", "level", "background", "career", "worked"],
    text:
      "2.5 years of relevant experience in designing user interfaces and products, with 20+ projects shipped. Most recently a UI/UX Designer role covering HR software, a ship chartering platform, and client web work.",
  },
  {
    match: ["available", "availability", "free", "full time", "full-time", "fulltime", "part time", "hire", "hiring", "join", "start", "notice", "period", "open to", "on-site", "onsite", "office"],
    text:
      "Yes, looking for a full-time UI/UX Designer or Product Designer role, on-site and working from the office. Open to positions in Dubai, UAE, and available immediately. Current visa status: Visit visa.",
    links: [{ label: "Get in touch", href: "/contact" }],
  },
  {
    match: ["specialize", "specialise", "specialty", "skill", "skills", "what do you do", "what does he do", "expertise", "strength", "good at", "stack", "tech", "react", "next", "front end", "frontend", "front-end", "code", "coding", "develop", "ui", "ux", "user experience", "mobile", "mobile app"],
    text:
      "Interface and product design first — user experience design, dashboards, and mobile apps. I also build front-end in React, Next.js and Tailwind. Figma, VS Code, and AI tooling.",
  },
  {
    match: ["work", "works", "project", "projects", "portfolio", "case study", "case studies", "example", "samples", "show me", "built", "shipped", "dashboard", "app", "website"],
    text:
      "Six case studies on the site — ship chartering, HR dashboard, HR mobile app, real estate, e-commerce, and a learning dashboard. Each one covers the brief, the hard part, and what I actually did.",
    links: [{ label: "See the work", href: "/#work" }],
  },
  {
    match: ["contact", "email", "mail", "reach", "talk", "speak", "call", "interview", "connect", "linkedin", "phone", "schedule", "meeting"],
    text:
      "abdulnawfal11011@gmail.com, or use the contact form. I reply within a day.",
    links: [{ label: "Contact", href: "/contact" }],
  },
  {
    match: ["tool", "tools", "figma", "framer", "software", "adobe", "illustrator", "indesign", "ai tool", "vs code", "git"],
    text:
      "Figma for design and systems, Framer for sites, Adobe Illustrator and InDesign for brand work, and VS Code with Git and Vercel on the build side. I use AI tooling throughout.",
  },
  {
    match: ["location", "located", "based", "where", "live", "city", "country", "chennai", "india", "timezone", "time zone"],
    text:
      "Based in Dubai, UAE. Current visa status: Visit visa.",
  },
];

ANSWERS.push(
  {
    match: ["hi", "hello", "hey", "good morning", "good evening"],
    text:
      "Hello. Ask me about Abdul's experience, availability, relocation plans, skills, or the work itself.",
  },
  {
    match: ["who", "about", "tell me", "introduce", "yourself", "himself", "bio"],
    text:
      "Abdul Nawfal is a UI/UX and Product Designer based in Dubai, UAE, with 2.5 years of experience and 20+ projects shipped. He designs interfaces and builds them in React and Next.js, and he's open to full-time roles in the UAE. Current visa status: Visit visa.",
    links: [{ label: "See the work", href: "/#work" }],
  },
);

export const FALLBACK =
  "I don't have that one on file. Ask me about experience, availability, relocation, my skills, or the work — or email abdulnawfal11011@gmail.com and Abdul will reply directly.";

/**
 * Scores every entry by how many of its keywords appear, so a question
 * touching several topics lands on the strongest match rather than the
 * first one listed.
 */
export function getAnswer(question: string): Answer {
  const q = question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ");

  let best: Answer | null = null;
  let bestScore = 0;

  for (const answer of ANSWERS) {
    const score = answer.match.reduce(
      (total, word) => (q.includes(word) ? total + word.length : total),
      0,
    );
    if (score > bestScore) {
      best = answer;
      bestScore = score;
    }
  }

  return best ?? { match: [], text: FALLBACK };
}