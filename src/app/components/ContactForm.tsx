"use client";

import { useState } from "react";

/* ── Edit these ─────────────────────────────────────────── */
const EMAIL = "abdulnawfal11011@gmail.com"; // ← your email
const AVAILABILITY = "Open to full-time roles"; // e.g. "Open to full-time & contract roles"
const VISA_STATUS = "Visit visa"; // your current visa status
const PHONE = "+971 50 123 4567"; // ← placeholder — replace with your UAE number
const RESPONSE_TIME = "Usually within 24 hours"; // how fast you reply

/**
 * Where messages are sent: the backend route in src/app/api/contact/route.ts,
 * which emails them to you through Gmail (set GMAIL_USER and GMAIL_APP_PASSWORD).
 * Set to "" to fall back to opening the visitor's email app instead.
 */
const FORM_ENDPOINT = "/api/contact";

/* ───────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

type Status = "idle" | "sending" | "sent" | "error";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const inputBase =
  "w-full rounded-[14px] bg-[#F5F5F7] px-4 py-3.5 text-[16px] text-black outline-none placeholder:text-neutral-400 motion-safe:transition-shadow motion-safe:duration-200 focus:bg-white focus:ring-2 focus:ring-black aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500";

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between text-[14px] font-medium text-black">
        <span>
          {label}
          {required && <span className="ml-0.5 text-neutral-400">*</span>}
        </span>
        {hint && <span className="text-[12px] font-normal text-neutral-400">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Spam trap: real visitors never fill this hidden field
    if (data.website) return;

    // Simple checks
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = "Please add a valid email address.";
    if ((data.message ?? "").trim().length < 10) next.message = "Please add a short message (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    const payload = { ...data };
    delete (payload as Record<string, string>).website;

    // No endpoint yet → open the visitor's email app with everything filled in
    if (!FORM_ENDPOINT) {
      const subject = `Portfolio enquiry — ${data.company || data.name}`;
      const body = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company && `Company: ${data.company}`,
        "",
        data.message,
      ]
        .filter((l) => l !== undefined && l !== "")
        .join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(result.error || "Request failed");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setServerError(err instanceof Error && err.message !== "Request failed" ? err.message : "");
      setStatus("error");
    }
  };

  return (
    <section className="relative px-5 pb-20 pt-10 text-black md:px-10 md:pb-28 md:pt-16 lg:px-16 lg:pb-32">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ── Left: intro + details ───────────────────── */}
        <aside className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F7] px-3 py-1.5 text-[13px] font-medium text-black">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {AVAILABILITY}
          </p>

          <h1 className="mt-6 text-balance text-[clamp(40px,5vw,72px)] font-medium leading-[1.02] tracking-[-0.045em]">
            Let’s talk about <span className="text-neutral-400">your team.</span>
          </h1>
          <p className="mt-5 max-w-[28rem] text-pretty text-[16px] leading-[1.65] text-neutral-500 md:text-[18px]">
            Hiring for a UI/UX or product design role? Share a few details and I’ll get back to you with my availability and
            anything else you need.
          </p>

          {/* Details */}
          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-400">Visa status</dt>
              <dd className="mt-1.5 text-[17px] font-medium">{VISA_STATUS}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-400">Phone</dt>
              <dd className="mt-1.5">
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="text-[17px] font-medium tabular-nums text-black underline-offset-4 hover:underline">
                  {PHONE}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-400">Response time</dt>
              <dd className="mt-1.5 text-[17px] font-medium">{RESPONSE_TIME}</dd>
            </div>
          </dl>
        </aside>

        {/* ── Right: form ─────────────────────────────── */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] md:p-10">
            {status === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5" aria-hidden="true">
                    <path d="m5 12 4.5 4.5L19 7" />
                  </svg>
                </span>
                <h2 className="mt-6 text-[32px] font-medium leading-tight tracking-[-0.03em]">Thank you — message received.</h2>
                <p className="mt-3 max-w-[30rem] text-[16px] leading-[1.6] text-neutral-500">
                  {FORM_ENDPOINT
                    ? `I’ll reply to you by email. ${RESPONSE_TIME}.`
                    : "Your email app should have opened with your message ready to send. If it didn’t, email me directly at " + EMAIL + "."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-[14px] font-medium text-black underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                {/* Spam trap (hidden from people) */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Full name" required>
                    <input name="name" autoComplete="name" placeholder="Jane Smith" aria-invalid={!!errors.name} className={inputBase} />
                    {errors.name && <span className="mt-1.5 block text-[13px] text-red-600">{errors.name}</span>}
                  </Field>
                  <Field label="Work email" required>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      aria-invalid={!!errors.email}
                      className={inputBase}
                    />
                    {errors.email && <span className="mt-1.5 block text-[13px] text-red-600">{errors.email}</span>}
                  </Field>
                </div>

                <Field label="Company">
                  <input name="company" autoComplete="organization" placeholder="Company name" className={inputBase} />
                </Field>

                <Field label="Message" required>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about the role, the team and the next steps."
                    aria-invalid={!!errors.message}
                    className={`${inputBase} resize-y`}
                  />
                  {errors.message && <span className="mt-1.5 block text-[13px] text-red-600">{errors.message}</span>}
                </Field>

                {status === "error" && (
                  <p role="alert" className="rounded-[12px] bg-red-50 px-4 py-3 text-[14px] text-red-700">
                    {serverError || "Something went wrong sending your message."} You can also email me at {EMAIL}.
                  </p>
                )}

                <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px] text-neutral-400">Your details are only used to reply to you.</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex h-14 items-center gap-4 rounded-full bg-black pl-6 pr-1.5 text-[15px] font-medium text-white outline-none motion-safe:transition-colors motion-safe:duration-300 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                      <ArrowUpRight className={`h-4 w-4 motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:rotate-45`} />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}