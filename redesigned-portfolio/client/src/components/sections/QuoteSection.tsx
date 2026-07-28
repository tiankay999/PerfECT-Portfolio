import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { quotes } from "@/lib/constants";
import { RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quote-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const nextQuote = () => {
    if (!quoteRef.current) return;
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        gsap.fromTo(quoteRef.current!, { y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      },
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-charcoal/30">
      <div className="quote-section px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center text-center">
        <div
          ref={quoteRef}
          className="max-w-3xl"
        >
          <p className="font-[var(--font-display)] text-2xl md:text-4xl lg:text-5xl text-white/70 font-light italic leading-relaxed">
            "{quotes[currentQuote].text}"
          </p>
        </div>
        <button
          onClick={nextQuote}
          className="mt-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 transition-all duration-500"
          aria-label="Next quote"
        >
          <RefreshCw size={16} className="text-white/40" />
        </button>
      </div>
    </section>
  );
}
