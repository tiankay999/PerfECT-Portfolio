import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;

    const moveX = gsap.quickTo(dot, "left", { duration: 0.1, ease: "power3" });
    const moveY = gsap.quickTo(dot, "top", { duration: 0.1, ease: "power3" });
    const ringX = gsap.quickTo(ring, "left", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring, "top", { duration: 0.4, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      moveX(e.clientX - 2);
      moveY(e.clientY - 2);
      ringX(e.clientX - 20);
      ringY(e.clientY - 20);
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    const handleEnter = () => {
      gsap.to(ring, { scale: 1.5, borderColor: "rgba(207, 163, 85, 0.6)", duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(207, 163, 85, 0.2)", duration: 0.3 });
    };

    window.addEventListener("mousemove", handleMove);

    const interactables = document.querySelectorAll("a, button, [data-magnetic]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="fixed inset-0 z-[9999] pointer-events-none hidden lg:block" style={{ opacity: 0 }}>
      <div ref={ringRef} className="absolute w-10 h-10 rounded-full border border-gold/20 transition-none" />
      <div ref={dotRef} className="absolute w-1 h-1 rounded-full bg-gold" />
    </div>
  );
}
