import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealOnScroll } from "@/hooks/useScrollAnimations";
import { aboutImageUrl, aboutBgUrl } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRevealOnScroll();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Image reveal with clip-path
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: imgRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Bio text lines
      gsap.fromTo(
        ".bio-line",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".bio-content",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bioParagraphs = [
    `I'm a passionate software developer with experience in fullstack development, who believes that great ideas deserve exceptional execution. With a background in building POS systems for businesses, e-commerce platforms, online study platforms, and AI-powered text processing utilities, I help bring complex visions to life pixel by pixel, line by line.`,
    `My work blends clean, modern aesthetics with performance-driven functionality. Whether it's designing an intuitive user interface with React, Next.js, and Tailwind CSS, or architecting robust backend systems using Node.js, Java, MySQL, and MongoDB/PostgreSQL, I focus on delivering scalable results that matter.`,
    `When I'm not coding or creating tools like QuestionsDey, you'll find me sharing the latest industry insights on my tech branding platform, STEEZE TECH on TikTok and Youtube, or exploring new technological trends, or mapping out my next big project.`,
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={aboutBgUrl} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-obsidian/75" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-gold/2 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 md:px-10 lg:px-20">
        {/* Header */}
        <div ref={titleRef} className="mb-24">
          <span className="font-[var(--font-accent)] text-[11px] tracking-[0.5em] uppercase text-gold/70 block mb-5">
            Craft in Details, Strength in Structure
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-[9rem] font-bold text-white leading-[0.9]">
            About
          </h2>
          <div className="w-20 h-[1px] bg-gold mt-8 mb-8" />
          <p className="text-white/50 text-lg md:text-xl font-light max-w-xl leading-relaxed font-[var(--font-body)]">
            Crafting impactful digital experiences that blend design,
            technology, and strategy.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20">
          <div ref={imgRef} className="lg:col-span-2 overflow-hidden rounded-2xl border border-gold/10">
            <img
              src={aboutImageUrl}
              alt=" Christian Kwabena Asante"
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </div>

          <div className="bio-content lg:col-span-3 flex flex-col justify-center gap-8">
            {bioParagraphs.map((para, i) => (
              <p
                key={i}
                className="bio-line text-white/55 text-base md:text-lg font-light leading-relaxed font-[var(--font-body)]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
