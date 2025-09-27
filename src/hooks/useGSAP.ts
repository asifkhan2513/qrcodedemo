"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = (
  callback: (context: gsap.Context) => void,
  dependencies: unknown[] = []
) => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    contextRef.current = gsap.context(callback);

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, dependencies);

  return contextRef.current;
};

export const useScrollTrigger = (
  element: string | Element,
  animation: gsap.TweenVars,
  trigger?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...trigger,
      },
    });

    tl.from(element, animation);

    return () => {
      tl.kill();
    };
  }, [element, animation, trigger]);
};

export const useParallax = (element: string | Element, speed: number = 0.5) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(element, {
      y: -100 * speed,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [element, speed]);
};

export const useFloatingAnimation = (
  element: string | Element,
  options?: {
    duration?: number;
    yOffset?: number;
    rotation?: number;
    delay?: number;
  }
) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const {
      duration = 3,
      yOffset = 20,
      rotation = 5,
      delay = 0,
    } = options || {};

    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay });

    tl.to(element, {
      y: yOffset,
      rotation: rotation,
      duration: duration,
      ease: "power1.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [element, options]);
};

export const useTypewriterEffect = (
  element: string | Element,
  text: string,
  options?: {
    duration?: number;
    delay?: number;
    cursor?: boolean;
  }
) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const { duration = 2, delay = 0, cursor = true } = options || {};

    const tl = gsap.timeline({ delay });

    // Clear initial text
    gsap.set(element, { text: "" });

    // Typewriter effect
    tl.to(element, {
      text: {
        value: text,
        delimiter: "",
      },
      duration: duration,
      ease: "none",
    });

    // Add cursor if needed
    if (cursor) {
      tl.set(element, {
        text: text + "|",
      });
    }

    return () => {
      tl.kill();
    };
  }, [element, text, options]);
};
