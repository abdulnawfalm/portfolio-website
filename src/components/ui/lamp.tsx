"use client";
import React from "react";
import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";

type LampProps = {
  className?: string;
  /** Colour of the light beams and the soft glow */
  color?: string;
  /** Colour of the bright line and the hot spot under it */
  glow?: string;
};

/**
 * Aceternity "Lamp" effect, used as a background.
 * The masking layers use the page colour (var(--background)),
 * so the lamp works on the light theme and the dark theme.
 */
export function LampBackground({ className, color = "#6366F1", glow = "#818CF8" }: LampProps) {
  const bg = "var(--background)";
  const t = { delay: 0.3, duration: 0.8, ease: "easeInOut" } as const;

  return (
    <MotionConfig reducedMotion="user">
      <div
        aria-hidden="true"
        className={cn(
          "lamp-bg pointer-events-none absolute inset-x-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_4rem,black_55%,transparent)]",
          className,
        )}
      >
        {/* Smaller lamp on phones, full size from tablets up */}
        <div className="h-full w-full origin-top scale-[0.62] sm:scale-[0.8] md:scale-100">
        <div className="relative isolate z-0 flex h-full w-full scale-y-125 items-center justify-center">
          {/* Left beam */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            viewport={{ once: true }}
            transition={t}
            style={{ backgroundImage: `conic-gradient(from 70deg at center top, ${color}, transparent, transparent)` }}
            className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
          >
            <div className="absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]" style={{ background: bg }} />
            <div className="absolute bottom-0 left-0 z-20 h-full w-40 [mask-image:linear-gradient(to_right,white,transparent)]" style={{ background: bg }} />
          </motion.div>

          {/* Right beam */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            viewport={{ once: true }}
            transition={t}
            style={{ backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${color})` }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem]"
          >
            <div className="absolute bottom-0 right-0 z-20 h-full w-40 [mask-image:linear-gradient(to_left,white,transparent)]" style={{ background: bg }} />
            <div className="absolute bottom-0 right-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]" style={{ background: bg }} />
          </motion.div>

          {/* Soften the bottom edge */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl" style={{ background: bg }} />
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

          {/* Glow */}
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl" style={{ background: color }} />
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            viewport={{ once: true }}
            transition={t}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
            style={{ background: glow }}
          />

          {/* The lamp line */}
          <motion.div
            initial={{ width: "15rem" }}
            whileInView={{ width: "30rem" }}
            viewport={{ once: true }}
            transition={t}
            className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
            style={{ background: glow }}
          />

          {/* Hide everything above the line */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" style={{ background: bg }} />
        </div>
        </div>
      </div>
    </MotionConfig>
  );
}
