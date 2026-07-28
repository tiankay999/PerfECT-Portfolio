import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useScrollAnimations";
import { projects, worksBgUrl } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const titleRef = useRevealOnScroll();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-row",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={worksBgUrl} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-charcoal/40 to-obsidian" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/2 blur-[150px]" />
      </div>

      <div className="relative z-10">
        <div className="px-6 md:px-10 lg:px-20">
          {/* Header */}
          <div ref={titleRef} className="mb-24">
            <span className="font-[var(--font-accent)] text-[11px] tracking-[0.5em] uppercase text-gold/70 block mb-5">
              Structure in Code, Story in Results
            </span>
            <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-[9rem] font-bold text-white leading-[0.9]">
              Works
            </h2>
            <div className="w-20 h-[1px] bg-gold mt-8 mb-8" />
            <p className="text-white/50 text-lg md:text-xl font-light max-w-xl leading-relaxed font-[var(--font-body)]">
              Featured projects that reflect my process of solving real problems,
              combining usability, performance, and clean logic.
            </p>
          </div>

          {/* Projects list */}
          <div className="relative">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-row group relative border-b border-white/5 py-7 md:py-10 cursor-pointer transition-all duration-500 hover:pl-4 md:hover:pl-8"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="font-[var(--font-accent)] text-xs text-gold/30 tracking-widest w-6">
                      0{index + 1}
                    </span>
                    <h3 className="font-[var(--font-display)] text-xl md:text-2xl lg:text-3xl text-white/70 group-hover:text-gold transition-colors duration-500">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/25 text-xs font-[var(--font-accent)] hidden md:block tracking-wider">
                      {project.frameworks.map((f) => f.name).join(" / ")}
                    </span>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-500"
                    >
                      <ArrowUpRight size={16} className="text-white/50 group-hover:text-gold transition-colors" />
                    </a>
                  </div>
                </div>
                {/* Mobile image */}
                <div className="md:hidden mt-5 overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating preview (desktop) */}
      <div
        ref={previewRef}
        className="fixed z-50 pointer-events-none hidden md:block w-[420px] h-[260px] rounded-xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/5"
        style={{
          left: mousePos.x + 30,
          top: mousePos.y - 130,
          opacity: hoveredIndex !== null ? 1 : 0,
          transform: hoveredIndex !== null ? "scale(1)" : "scale(0.92)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {hoveredIndex !== null && (
          <img
            src={projects[hoveredIndex].image}
            alt="preview"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
