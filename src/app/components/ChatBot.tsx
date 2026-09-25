"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QUICK_PROMPTS, getAnswer, type Answer } from "@/lib/chat-answers";

/**
 * "Ask about me" chat. No API key needed: answers come from
 * src/lib/chat-answers.ts, matched by keywords right in the browser.
 */

type Message = { id: number; from: "user" | "bot"; answer: Answer };

const GREETING: Answer = {
  match: [],
  text: "Hi there! I'm Abdul Nawfal, a UI/UX and product designer, open to new opportunities. Ask me anything, or pick a question below.",
};

const TYPING_DELAY = 550; // short pause so replies feel natural

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5c.4 3.9 1.3 5.9 2.7 7.1 1.3 1.2 3.3 1.9 6.8 2.4-3.5.5-5.5 1.2-6.8 2.4-1.4 1.2-2.3 3.2-2.7 7.1-.4-3.9-1.3-5.9-2.7-7.1C7.9 13.2 5.9 12.5 2.5 12c3.4-.5 5.4-1.2 6.8-2.4C10.7 8.4 11.6 6.4 12 2.5Z" />
      <path d="M19 2.5c.2 1.5.6 2.3 1.1 2.8.5.5 1.3.8 2.4 1-1.1.2-1.9.5-2.4 1-.5.5-.9 1.3-1.1 2.8-.2-1.5-.6-2.3-1.1-2.8-.5-.5-1.3-.8-2.4-1 1.1-.2 1.9-.5 2.4-1 .5-.5.9-1.3 1.1-2.8Z" opacity=".55" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden="true">
      <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function ArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Download({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" className={className} aria-hidden="true">
      <path d="M12 4v11" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", answer: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Closing wipes the thread, so every visit starts fresh
  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setMessages([{ id: 0, from: "bot", answer: GREETING }]);
      setInput("");
      setTyping(false);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Escape closes; on phones the chat is full screen, so the page behind stops scrolling
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const phone = window.matchMedia("(max-width: 767px)").matches;
    if (phone) document.documentElement.style.overflow = "hidden";
    else inputRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      if (phone) document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Keep the newest message in view (scrolls the chat only, never the page)
  useEffect(() => {
    const el = listRef.current;
    if (!el || !open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, open]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  function ask(question: string) {
    const text = question.trim();
    if (!text || typing) return;

    setMessages((prev) => [...prev, { id: Date.now(), from: "user", answer: { match: [], text } }]);
    setInput("");
    setTyping(true);

    const answer = getAnswer(text);
    timerRef.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "bot", answer }]);
      setTyping(false);
    }, TYPING_DELAY);
  }

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      {/* ── Chat window ─────────────────────────────── */}
      <section
        id="chat-panel"
        role="dialog"
        aria-label="Ask about Abdul Nawfal"
        aria-hidden={!open}
        className={`fixed inset-0 z-[70] flex flex-col bg-white text-black motion-safe:transition-[opacity,transform] motion-safe:duration-300 ${EASE} md:inset-auto md:bottom-[104px] md:right-8 md:h-[min(500px,calc(100dvh-140px))] md:w-[340px] md:overflow-hidden md:rounded-[24px] md:shadow-[0_30px_80px_-30px_rgba(40,20,90,0.35)] md:ring-1 md:ring-black/[0.06] ${
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 bg-[linear-gradient(180deg,#F1EDF6_0%,#FFFFFF_100%)] px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2A1560] text-white">
            <Sparkle className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[15px] font-medium tracking-[-0.01em]">Abdul Nawfal</p>
            <p className="mt-0.5 text-[12px] text-neutral-500">UI/UX &amp; Product Designer</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-black">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for full-time roles
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            tabIndex={open ? 0 : -1}
            aria-label="Close chat"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5F4F7] text-black outline-none motion-safe:transition-colors hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black"
          >
            <CloseIcon className="h-3 w-3" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          aria-live="polite"
          className="flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-4 py-3 [scrollbar-width:thin]"
        >
          {messages.map((m) =>
            m.from === "user" ? (
              <div
                key={m.id}
                className="ml-auto w-fit max-w-[85%] whitespace-pre-wrap break-words rounded-[16px] rounded-br-[6px] bg-black px-3.5 py-2 text-[14px] leading-[1.5] text-white"
              >
                {m.answer.text}
              </div>
            ) : (
              <div
                key={m.id}
                className="w-fit max-w-[90%] rounded-[16px] rounded-bl-[6px] bg-[#F5F4F7] px-3.5 py-2.5 text-[14px] leading-[1.55] text-black"
              >
                {m.answer.text}

                {m.answer.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.answer.links.map((link) =>
                      link.download ? (
                        <a
                          key={link.label}
                          href={link.href}
                          download
                          tabIndex={open ? 0 : -1}
                          className="inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-2 text-[13px] font-medium text-white motion-safe:transition-colors hover:bg-neutral-800"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          tabIndex={open ? 0 : -1}
                          className="group inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-black motion-safe:transition-colors hover:bg-black hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight className={`h-3.5 w-3.5 motion-safe:transition-transform motion-safe:duration-300 ${EASE} group-hover:rotate-45`} />
                        </Link>
                      ),
                    )}
                  </div>
                ) : null}
              </div>
            ),
          )}

          {/* Typing dots */}
          {typing && (
            <div className="flex w-fit items-center gap-1 rounded-[18px] rounded-bl-[6px] bg-[#F5F4F7] px-4 py-3.5" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-neutral-400 motion-safe:animate-bounce"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick questions: always visible, wrapped so every option shows */}
        <div className="flex flex-wrap gap-1.5 px-3 pb-2 pt-1">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.label}
              type="button"
              onClick={() => ask(prompt.question)}
              disabled={typing}
              tabIndex={open ? 0 : -1}
              className="rounded-full bg-[#F1EDF6] px-2.5 py-1.5 text-[11.5px] font-medium capitalize text-black outline-none motion-safe:transition-colors motion-safe:duration-200 hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
            >
              {prompt.label.trim()}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1"
        >
          <div className="flex items-center gap-2 rounded-full bg-[#F5F4F7] p-1 pl-4 motion-safe:transition-colors focus-within:bg-[#EFEBF6]">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask a question"
              maxLength={300}
              tabIndex={open ? 0 : -1}
              className="no-focus-ring min-w-0 flex-1 border-0 bg-transparent py-2 text-[16px] text-black shadow-none outline-none ring-0 placeholder:text-neutral-400 focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none md:text-[14px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              tabIndex={open ? 0 : -1}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white outline-none motion-safe:transition-opacity disabled:opacity-30"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </form>
      </section>

      {/* ── Launcher button (bottom right): glassy lavender pill ── */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close chat" : "Ask about me"}
        className={`group fixed bottom-5 right-5 z-[60] h-[52px] items-center gap-2.5 rounded-full bg-[#F1EDF6]/90 pl-1.5 text-[14px] font-medium text-black shadow-[0_18px_40px_-14px_rgba(60,30,140,0.55)] outline-none ring-1 ring-white/70 backdrop-blur-xl motion-safe:transition-colors motion-safe:duration-300 hover:bg-black hover:text-white md:bottom-8 md:right-8 ${
          open ? "hidden pr-1.5 md:flex" : "flex pr-5"
        }`}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(145deg,#6A45DB_0%,#2A1560_100%)] text-white">
          {open ? (
            <CloseIcon className="h-3 w-3" />
          ) : (
            <>
              <Sparkle className={`h-[18px] w-[18px] motion-safe:transition-transform motion-safe:duration-500 ${EASE} group-hover:rotate-12`} />
              {/* Online dot */}
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#F1EDF6] group-hover:bg-black">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </>
          )}
        </span>
        {!open && <span className="tracking-[-0.01em]">Ask about me</span>}
      </button>
    </>
  );
}
