"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
// Removed unused imports

export default function ServicesSection() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Web Development",
          "Mobile Apps",
          "Cloud Solutions",
          "UI/UX Design",
          "Full Stack Development",
          "DevOps Consulting",
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Our <span className="text-[#fb7100]">Services</span>
          </h2>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            We specialize in{" "}
            <span
              ref={typedRef}
              className="text-[#fb7100] font-semibold"
            ></span>
          </div>
          <p className="text-lg text-white dark:text-white max-w-3xl mx-auto">
            Transform your ideas into reality with our comprehensive range of
            digital solutions. From concept to deployment, we&apos;ve got you
            covered.
          </p>
        </div>
      </div>
    </section>
  );
}
