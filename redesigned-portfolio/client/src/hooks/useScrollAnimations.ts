import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useRevealOnScroll(deps: any[] = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    if (children.length === 0 && !el.hasAttribute("data-reveal")) return;

    const ctx = gsap.context(() => {
      const targets = el.hasAttribute("data-reveal")
        ? [el]
        : Array.from(children);

      gsap.fromTo(
        targets,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}

export function useSplitTextReveal(deps: any[] = []) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll(".char");
      if (chars.length === 0) return;

      gsap.fromTo(
        chars,
        { opacity: 0, y: 80, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}

export function useCountUp(deps: any[] = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const counters = el.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        const suffix = counter.getAttribute("data-suffix") || "";
        const isDecimal = target % 1 !== 0;

        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              const current = this.targets()[0].val;
              counter.textContent =
                (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}

export function useParallax(deps: any[] = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const speed = parseFloat(el.getAttribute("data-speed") || "0.3");
      gsap.to(el, {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, deps);

  return ref;
}
