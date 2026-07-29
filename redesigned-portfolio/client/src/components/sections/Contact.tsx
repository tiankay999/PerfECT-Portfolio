import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealOnScroll } from "@/hooks/useScrollAnimations";
import { socials } from "@/lib/constants";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRevealOnScroll();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-36"
    >
      <div className="px-6 md:px-10 lg:px-20">
        {/* Header */}
        <div ref={titleRef} className="mb-20">
          <span className="font-[var(--font-accent)] text-[11px] tracking-[0.5em] uppercase text-gold/70 block mb-5">
            Let's Connect, Let's Create
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-[9rem] font-bold text-white leading-[0.9]">
            Contact
          </h2>
          <div className="w-20 h-[1px] bg-gold mt-8 mb-8" />
          <p className="text-white/50 text-lg md:text-xl font-light max-w-xl leading-relaxed font-[var(--font-body)]">
            Whether it's a new build or improving an existing product, I'm open
            to meaningful conversations. Just reach out.
          </p>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 mb-24">
          <div className="contact-item flex items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center shrink-0">
              <Mail size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-gold/50 text-[10px] font-[var(--font-accent)] tracking-[0.3em] uppercase mb-2">
                E-mail
              </p>
              <p className="text-white text-lg md:text-xl font-[var(--font-body)] font-light">
                tiankay999@gmail.com
              </p>
            </div>
          </div>

          <div className="contact-item flex items-start gap-5">
            <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center shrink-0">
              <Phone size={20} className="text-gold" />
            </div>
            <div>
              <p className="text-gold/50 text-[10px] font-[var(--font-accent)] tracking-[0.3em] uppercase mb-2">
                Phone
              </p>
              <p className="text-white text-lg md:text-xl font-[var(--font-body)] font-light">
                +233 550 450575
              </p>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mb-24">
          <p className="text-gold/40 text-[10px] font-[var(--font-accent)] tracking-[0.3em] uppercase mb-8">
            Social Media
          </p>
          <div className="flex flex-wrap gap-3">
            {socials.map((social, i) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item flex items-center gap-2 px-6 py-3 rounded-full border border-white/8 hover:border-gold/25 hover:bg-gold/5 transition-all duration-500 text-white/60 hover:text-gold font-[var(--font-accent)] text-sm"
              >
                {social.name}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden border-t border-b border-white/5 py-7">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 px-8">
                <span className="font-[var(--font-display)] text-2xl md:text-4xl text-white/8">
                  Your Vision, My Engineering
                </span>
                <span className="text-gold/20">&#10038;</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-[11px] font-[var(--font-accent)] tracking-wider">
          <p>&copy; {new Date().getFullYear()} Christian Asante. All rights reserved.</p>
          <p>Crafted with care in every pixel.</p>
        </div>
      </div>
    </section>
  );
}
