import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { useRevealOnScroll, useCountUp } from "@/hooks/useScrollAnimations";
import { testimonials, stats } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useCountUp();
  const titleRef = useRevealOnScroll();

  useEffect(() => {
    if (!cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-36 bg-charcoal/20">
      <div className="px-6 md:px-10 lg:px-20">
        {/* Header */}
        <div ref={titleRef} className="mb-24">
          <span className="font-[var(--font-accent)] text-[11px] tracking-[0.5em] uppercase text-gold/70 block mb-5">
            What People Say
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-[9rem] font-bold text-white leading-[0.9]">
            Testimonials
          </h2>
          <div className="w-20 h-[1px] bg-gold mt-8" />
        </div>

        {/* Testimonial cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-28">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden"
            >
              {/* Top gold hairline */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Quote size={32} className="text-gold/20" />
              <p className="text-white/55 text-base md:text-lg font-light leading-relaxed flex-1 font-[var(--font-body)]">
                "{t.quote}"
              </p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} className="text-amber-400/70 fill-amber-400/70" />
                ))}
              </div>
              <div className="flex items-center gap-4 pt-5 border-t border-white/5">
                <img
                  src={t.company}
                  alt={`${t.title} — client of Christian Asante`}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-medium text-sm font-[var(--font-accent)]">{t.name}</p>
                  <p className="text-white/35 text-xs font-[var(--font-accent)]">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-28" />

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span
                className="stat-number font-[var(--font-display)] text-7xl md:text-8xl lg:text-9xl gold-text leading-none"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </span>
              <p className="text-white/40 text-xs md:text-sm font-[var(--font-accent)] tracking-[0.3em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
