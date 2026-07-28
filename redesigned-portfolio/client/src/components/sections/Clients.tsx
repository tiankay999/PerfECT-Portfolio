import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealOnScroll } from "@/hooks/useScrollAnimations";
import { clientImages, poster1Url, poster2Url } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRevealOnScroll();

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cells = gridRef.current!.querySelectorAll(".client-cell");
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32">
      <div className="px-6 md:px-10 lg:px-20">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <span className="font-[var(--font-accent)] text-xs tracking-[0.4em] uppercase text-gold block mb-4">
            Brands I've Worked With
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]">
            Clients
          </h2>
          <div className="w-16 h-[1.5px] bg-gold mt-6 mb-8" />
          <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            From startups to global teams, I build tools that ship. Solving real
            problems with precision and clarity.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {clientImages.map((img, i) => (
            <div
              key={i}
              className="client-cell relative aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 group"
            >
              <img
                src={img}
                alt="client"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
          {/* Posters */}
          <div
            className="client-cell relative aspect-square md:col-span-2 rounded-xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 group"
          >
            <img
              src={poster1Url}
              alt="poster"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div
            className="client-cell relative aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 group"
          >
            <img
              src={poster2Url}
              alt="poster"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
