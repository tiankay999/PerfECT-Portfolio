import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRevealOnScroll } from "@/hooks/useScrollAnimations";
import { heroBgUrl } from "@/lib/constants";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const subtitleRef = useRevealOnScroll();

  const titleText = "Christian Asante";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate subtitle
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      // Animate title chars
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 80, rotateX: -40 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.04,
            delay: 0.3,
          }
        );
      }

      // Animate tagline lines
      gsap.fromTo(
        ".hero-tagline",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          delay: 1.2,
        }
      );

      // Animate scroll indicator
      gsap.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 2.2 }
      );

      // Animate gold line
      gsap.fromTo(
        ".hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", delay: 1, transformOrigin: "left" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* An empty src makes the browser re-request the document, so only
            render the backdrop when one is actually configured. */}
        {heroBgUrl && (
          <img
            src={heroBgUrl}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/30 to-obsidian" />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-10 lg:px-20 pt-20">
        <div ref={subtitleRef} className="hero-subtitle mb-8">
          <span className="font-[var(--font-accent)] text-xs md:text-sm tracking-[0.5em] uppercase text-gold/80">
            I engineer digital experiences with precision
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-[var(--font-display)] text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.85] tracking-tight text-white mb-10"
          style={{ perspective: "1000px" }}
        >
          {titleText.split("").map((char, i) => (
            <span
              key={i}
              className="char inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          {/* Lets the single h1 carry the role and location for search engines
              and screen readers without altering the visual composition.
              GSAP only animates .char spans, so this stays static. */}
          <span className="sr-only">
            {" "}
            \u2014 Software Engineer and Full-Stack Web Developer in Ghana
          </span>
        </h1>

        <div className="hero-line w-24 h-[1px] bg-gradient-to-r from-gold to-transparent mb-10" />

        <div className="max-w-lg">
          <p className="hero-tagline text-base md:text-lg lg:text-xl text-white/60 font-light leading-relaxed font-[var(--font-body)]">
            Building scalable web experiences that feel effortless
          </p>
          <p className="hero-tagline text-base md:text-lg lg:text-xl text-white/60 font-light leading-relaxed font-[var(--font-body)] mt-2">
            Driven by clean design and thoughtful engineering
          </p>
          <p className="hero-tagline text-base md:text-lg lg:text-xl text-gold/90 font-light leading-relaxed font-[var(--font-body)] mt-2">
            Crafted with intent.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-[var(--font-accent)] text-[9px] tracking-[0.4em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  );
}
