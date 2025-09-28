"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Define interface for elements with cleanup functions
interface ElementWithCleanup extends Element {
  _gsapCleanup?: () => void;
}

interface GSAPAnimationsProps {
  children: React.ReactNode;
}

const GSAPAnimations: React.FC<GSAPAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;

    try {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        try {
          // Simple loading sequence
          const masterTl = gsap.timeline();

          // Logo entrance
          const logoElement = document.querySelector(".logo-animation");
          if (logoElement) {
            masterTl.from(logoElement, {
              scale: 0,
              rotation: 360,
              duration: 1.5,
              ease: "back.out(1.7)",
              delay: 0.5,
            });
          }

          // Heading animation
          const headingElement = document.querySelector(".main-heading");
          if (headingElement) {
            masterTl.from(
              headingElement,
              {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
              },
              "-=0.5"
            );
          }

          // Subtitle and description
          const subtitleElement = document.querySelector(".subtitle");
          const descriptionElement = document.querySelector(".description");

          if (subtitleElement) {
            masterTl.from(
              subtitleElement,
              {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.5"
            );
          }

          if (descriptionElement) {
            masterTl.from(
              descriptionElement,
              {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.3"
            );
          }

          // Cards with simple stagger
          const cardElements = document.querySelectorAll(".card-animation");
          if (cardElements.length > 0) {
            masterTl.from(
              cardElements,
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.3"
            );
          }

          // Scroll-triggered animations
          const servicesElement = document.querySelector(".services-section");
          if (servicesElement) {
            gsap.from(servicesElement, {
              scrollTrigger: {
                trigger: servicesElement,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 100,
              duration: 1,
              ease: "power2.out",
            });
          }

          // Simple parallax for background elements
          const parallaxElements = document.querySelectorAll(".parallax-bg");
          if (parallaxElements.length > 0) {
            gsap.to(parallaxElements, {
              scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
              y: -100,
              ease: "none",
            });
          }

          // Gentle floating animation
          const floatingElements =
            document.querySelectorAll(".floating-element");
          if (floatingElements.length > 0) {
            gsap.to(floatingElements, {
              y: "+=20",
              duration: 3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              stagger: 0.5,
            });
          }

          // Simple hover animations for cards
          const cards = document.querySelectorAll(".card-animation");
          cards.forEach((card) => {
            const cardElement = card as HTMLElement;

            const handleMouseEnter = () => {
              gsap.to(cardElement, {
                y: -8,
                scale: 1.03,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            const handleMouseLeave = () => {
              gsap.to(cardElement, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            };

            cardElement.addEventListener("mouseenter", handleMouseEnter);
            cardElement.addEventListener("mouseleave", handleMouseLeave);

            // Store cleanup functions
            (cardElement as ElementWithCleanup)._gsapCleanup = () => {
              cardElement.removeEventListener("mouseenter", handleMouseEnter);
              cardElement.removeEventListener("mouseleave", handleMouseLeave);
            };
          });

          // Text reveal animations for headings
          const headings = document.querySelectorAll(".animate-heading");
          headings.forEach((heading) => {
            gsap.from(heading, {
              scrollTrigger: {
                trigger: heading,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              opacity: 0,
              y: 30,
              duration: 1,
              ease: "power2.out",
            });
          });
        } catch (error) {
          console.warn("GSAP animation error:", error);
        }
      }, containerRef);

      return () => {
        try {
          // Clean up event listeners
          const cards = document.querySelectorAll(".card-animation");
          cards.forEach((card) => {
            const cardWithCleanup = card as ElementWithCleanup;
            if (cardWithCleanup._gsapCleanup) {
              cardWithCleanup._gsapCleanup();
            }
          });

          ctx.revert();
        } catch (error) {
          console.warn("GSAP cleanup error:", error);
        }
      };
    } catch (error) {
      console.error("GSAP initialization error:", error);
    }
  }, [isClient]);

  return <div ref={containerRef}>{children}</div>;
};

export default GSAPAnimations;
