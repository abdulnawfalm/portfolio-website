import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form backend.
 * Needs these in .env.local (and in Vercel → Project → Settings → Environment Variables):
 *   GMAIL_USER=you@gmail.com
 *   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   (a Google "App password", not your normal password)
 *   CONTACT_TO=where-messages-go@example.com (optional, defaults to GMAIL_USER)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Simple spam guard: at most 5 messages per visitor every 10 minutes */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes line breaks so nothing can be injected into email headers */
function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Quick check that email is set up — only answers in development */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({
    ok: true,
    gmailUser: Boolean(process.env.GMAIL_USER),
    gmailAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD),
    contactTo: Boolean(process.env.CONTACT_TO),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    // Spam trap: the hidden "website" field is only ever filled by bots.
    // Pretend it worked so bots don't retry.
    if (body.website) return NextResponse.json({ ok: true });

    const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
    }

    const name = oneLine(String(body.name ?? ""));
    const email = oneLine(String(body.email ?? ""));
    const company = oneLine(String(body.company ?? ""));
    const message = String(body.message ?? "").trim();

    if (!name || name.length > 100) {
      return NextResponse.json({ error: "Please add your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Please add a valid email address." }, { status: 400 });
    }
    if (company.length > 150) {
      return NextResponse.json({ error: "Company name is too long." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Please write a message between 10 and 5000 characters." }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      console.error("[contact] GMAIL_USER or GMAIL_APP_PASSWORD is missing");
      return NextResponse.json({ error: "Email is not set up yet." }, { status: 500 });
    }

    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    const subject = `Portfolio enquiry from ${name}${company ? `, ${company}` : ""}`;
    const received = new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" });

    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: user },
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email }, // press Reply in Gmail to answer the sender directly
      subject,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        ...(company ? [`Company: ${company}`] : []),
        `Received: ${received} (Dubai time)`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
          <p style="margin:0 0 4px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          ${company ? `<p style="margin:0 0 4px;color:#555">${escapeHtml(company)}</p>` : ""}
          <p style="margin:0 0 16px;color:#999;font-size:13px">${escapeHtml(received)} (Dubai time)</p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Full details go to the server log only; visitors get a friendly message
    console.error("[contact] failed:", error);
    // While developing, show Gmail's exact reason on the form so problems are easy to fix.
    // On the live site, visitors only see the friendly message.
    const detail = error instanceof Error ? error.message : String(error);
    const friendly = "Your message couldn't be sent. Please try again.";
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? friendly : `${friendly} (Details: ${detail})` },
      { status: 500 },
    );
  }
}