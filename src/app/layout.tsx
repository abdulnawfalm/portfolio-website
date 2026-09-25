import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatBot from "@/app/components/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Abdul Nawfal — UI/UX & Product Designer",
  description: "UI/UX and product design for web, mobile, SaaS, fintech and e-commerce.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative isolate bg-background font-sans text-foreground">
        {children}
        {/* AI chat assistant, on every page */}
        <ChatBot />
      </body>
    </html>
  );
}