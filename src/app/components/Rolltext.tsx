const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

/**
 * Framer-style letter roll: each letter slides up while a copy rolls in from below.
 * The parent element needs the `group` class.
 */
export default function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex overflow-hidden leading-[1.25]">
        {text.split("").map((ch, i) => {
          const char = ch === " " ? "\u00A0" : ch;
          const delay = { transitionDelay: `${i * 18}ms` };
          return (
            <span key={i} className="relative inline-block">
              <span
                style={delay}
                className={`block motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}
              >
                {char}
              </span>
              <span
                style={delay}
                className={`absolute left-0 top-full block motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}
              >
                {char}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}