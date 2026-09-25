import type { Metadata } from "next";
import Header from "@/app/components/Header";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Abdul Nawfal",
  description: "Hiring for a UI/UX or product design role? Get in touch with Abdul Nawfal.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}