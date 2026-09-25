import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import HeroBackground from "@/app/components/Herobackground";
import Work from "@/app/components/Work";
import About from "@/app/components/About";
import Tools from "@/app/components/Tools";
import Recognition from "@/app/components/Recognition";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Pulled up under the transparent header so one background covers both */}
        <div className="relative isolate -mt-20 pt-20 md:-mt-24 md:pt-24">
          <HeroBackground />
          <Hero />
        </div>
        <Work />
        <About />
        <Tools />
        <Recognition />
      </main>
      <Footer />
    </>
  );
}