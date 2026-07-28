import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import MagneticCursor from "@/components/MagneticCursor";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/sections/Hero";
import ServicesSummary from "@/components/sections/ServicesSummary";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Clients from "@/components/sections/Clients";
import QuoteSection from "@/components/sections/QuoteSection";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-obsidian">
      <MagneticCursor />
      <ParticleBackground />
      {/* Film grain noise overlay */}
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ServicesSummary />
        <Services />
        <About />
        <Works />
        <Clients />
        <QuoteSection />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
