import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealOnScroll } from "@/hooks/useScrollAnimations";
import { servicesData, servicesBgUrl } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRevealOnScroll();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={servicesBgUrl} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/95 to-obsidian" />
        {/* Subtle gold glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[150px]" />
      </div>

      <div className="relative z-10">
        <div className="px-6 md:px-10 lg:px-20">
          {/* Header */}
          <div ref={titleRef} className="mb-24">
            <span className="font-[var(--font-accent)] text-[11px] tracking-[0.5em] uppercase text-gold/70 block mb-5">
              Your Vision, My Engineering
            </span>
            <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-[9rem] font-bold text-white leading-[0.9]">
              Services
            </h2>
            <div className="w-20 h-[1px] bg-gold mt-8 mb-8" />
            <p className="text-white/50 text-lg md:text-xl font-light max-w-xl leading-relaxed font-[var(--font-body)]">
              End-to-end development that transforms ideas into products.
              <br />From architecture to deployment. Delivered with care.
            </p>
          </div>

          {/* Service cards */}
          <div ref={cardsRef} className="flex flex-col gap-10">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="service-card rounded-2xl p-8 md:p-14 group relative overflow-hidden"
              >
                {/* Card glow accent */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                  <div className="lg:w-2/5">
                    <span className="font-[var(--font-display)] text-6xl md:text-7xl text-gold/10 font-bold leading-none block mb-4">
                      0{index + 1}
                    </span>
                    <h3 className="font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl text-white/90 group-hover:text-gold transition-colors duration-500">
                      {service.title}
                    </h3>
                  </div>
                  <div className="lg:w-3/5">
                    <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-8 font-[var(--font-body)]">
                      {service.description}
                    </p>
                    <div className="space-y-5">
                      {service.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold/60 mt-2 shrink-0" />
                          <div>
                            <p className="text-white/80 text-sm md:text-base font-[var(--font-accent)] font-medium">
                              {item.title}
                            </p>
                            <p className="text-white/30 text-xs md:text-sm mt-1 font-[var(--font-body)]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
