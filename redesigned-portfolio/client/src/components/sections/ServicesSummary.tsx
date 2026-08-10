import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const keywords = [
  { label: "Backends", items: ["Node.js", "Express", "Laravel", "Python"] },
  { label: "Ecommerce", items: ["Shopify", "WooCommerce", "Custom", "POS"] },
  { label: "Deployment", items: ["AWS", "Vercel", "Railway", "Docker", "VPS", "PM2"] },
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
];

export default function ServicesSummary() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll(".keyword-row");
      rows.forEach((row) => {
        const inner = row.querySelector(".keyword-scroll");
        if (!inner) return;
        const width = inner.scrollWidth;
        gsap.to(inner, {
          x: -(width / 2),
          duration: 20,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="space-y-6">
        {keywords.map((kw) => (
          <div key={kw.label} className="keyword-row overflow-hidden">
            <div className="keyword-scroll flex items-center gap-6 whitespace-nowrap w-[200%]">
              {[...Array(3)].map((_, group) => (
                <div key={group} className="flex items-center gap-6 shrink-0">
                  <span className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl text-white/10 font-bold">
                    {kw.label}
                  </span>
                  <div className="w-20 h-[1px] bg-gold/20" />
                  {kw.items.map((item) => (
                    <span
                      key={item}
                      className="font-[var(--font-accent)] text-sm md:text-base text-gold/40 tracking-wider uppercase"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
