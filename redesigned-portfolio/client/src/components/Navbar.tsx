import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/lib/constants";

const navLinks = ["Home", "Services", "About", "Works", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([null, null]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "power3.inOut" });
      gsap.to(linesRef.current[0], { rotate: 45, y: 4, duration: 0.3 });
      gsap.to(linesRef.current[1], { rotate: -45, y: -4, duration: 0.3 });
    } else {
      gsap.to(menuRef.current, { xPercent: 100, duration: 0.6, ease: "power3.inOut" });
      gsap.to(linesRef.current[0], { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(linesRef.current[1], { rotate: 0, y: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 ${scrolled ? "bg-obsidian/90 backdrop-blur-xl border-b border-gold/10" : "bg-transparent"
          }`}
      >
        <div className="flex items-center gap-3" data-magnetic>
          <img
            src="/manus-storage/logo-mark_7ba3f31f.png"
            alt="SN"
            className="w-9 h-9 md:w-11 md:h-11 object-contain"
          />
          <span className="font-[var(--font-display)] text-sm md:text-base font-bold tracking-wide text-white/90">
            Christian Asante
          </span>
        </div>
        <button
          ref={burgerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col items-center justify-center gap-1.5 w-11 h-11 md:w-12 md:h-12 rounded-full border border-gold/15 hover:border-gold/40 transition-all duration-300 bg-white/5 backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          <span ref={(el) => { linesRef.current[0] = el; }} className="block w-5 h-[1.5px] bg-white rounded-full origin-center" />
          <span ref={(el) => { linesRef.current[1] = el; }} className="block w-5 h-[1.5px] bg-white rounded-full origin-center" />
        </button>
      </header>

      {/* Fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full md:w-[55%] h-full z-40 bg-obsidian/97 backdrop-blur-3xl border-l border-gold/5"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col h-full pt-28 px-8 md:px-14">
          <nav className="flex-1 flex flex-col justify-center gap-3">
            {navLinks.map((link) => (
              <div key={link} className="overflow-hidden">
                <button
                  onClick={() => scrollToSection(link)}
                  className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-8xl text-white/60 hover:text-gold transition-all duration-500 hover:tracking-wider ease-in-out text-left"
                >
                  {link}
                </button>
              </div>
            ))}
          </nav>

          <div className="pb-12 flex flex-col gap-6">
            <div className="w-full h-px bg-gradient-to-r from-gold/20 to-transparent mb-2" />
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/50 font-[var(--font-accent)] mb-2">E-mail</p>
                <p className="text-base tracking-wide text-white/70 font-[var(--font-body)]">dev.syednoor@gmail.com</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold/50 font-[var(--font-accent)] mb-2">Social Media</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-white/50 hover:text-gold transition-colors duration-300 font-[var(--font-accent)]"
                    >
                      {s.name} <ArrowUpRight size={11} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
