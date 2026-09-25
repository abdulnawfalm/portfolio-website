/**
 * Static background for the header + hero: soft tint at the top
 * and a colour glow along the bottom. No animation.
 * It runs 160px past the hero and fades to the page colour, so there is no hard edge.
 * All colours live in globals.css under "Hero background colours".
 */
export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -bottom-40 -z-10 overflow-hidden">
      <div className="hero-bg-color absolute inset-0" />
    </div>
  );
}