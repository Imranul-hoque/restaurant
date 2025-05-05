"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade" | "slide-up" | "slide-right" | "slide-left";
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade",
  delay = 0,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      switch (animation) {
        case "fade":
          tl.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, delay }
          );
          break;
        case "slide-up":
          tl.fromTo(
            sectionRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, delay }
          );
          break;
        case "slide-right":
          tl.fromTo(
            sectionRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, delay }
          );
          break;
        case "slide-left":
          tl.fromTo(
            sectionRef.current,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1, delay }
          );
          break;
      }
    }

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, [animation, delay]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
