"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

export default function ServicesSection() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initTyped = () => {
      try {
        if (typedRef.current && !typedInstance.current) {
          // Clear any existing content
          typedRef.current.innerHTML = "";

          typedInstance.current = new Typed(typedRef.current, {
            strings: [
              "360 Digital Marketing",
              "Web / App Development",
              "Advertisement Campaigns",
              "Software Development",
              "AI Solutions",
              "Commercial Photography",
              "UI/UX Design",
              "SEO Services",
              "Social Media Marketing",
              "Branding Services",
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 800,
            loop: true,
            showCursor: true,
            cursorChar: "|",
            smartBackspace: true,
            fadeOut: false,
            autoInsertCss: true,
            onComplete: () => {
              // Animation completed
            },
            onStringTyped: () => {
              // String typed
            },
          });
        }
      } catch (error) {
        console.warn("Typed.js initialization error:", error);
        // Fallback: show static text
        if (typedRef.current) {
          typedRef.current.textContent = "Digital Solutions";
        }
      }
    };

    // Initialize with a delay to ensure DOM is ready
    const timer = setTimeout(initTyped, 1000);

    return () => {
      clearTimeout(timer);
      try {
        if (typedInstance.current) {
          typedInstance.current.destroy();
          typedInstance.current = null;
        }
      } catch (error) {
        console.warn("Typed.js cleanup error:", error);
      }
    };
  }, [isClient]);

  return (
    <section
      className="relative z-10 py-20 sm:py-16 px-4 services-section "
      data-scroll
      data-scroll-speed="0.4"
    >
      <div className="max-w-6xl mx-auto relative z-20  ">
        <div className="bg-black/20 border  rounded-2xl backdrop-blur-sm p-6 sm:p-6 md:p-8 lg:p-12 mx-2 sm:mx-4 overflow-hidden ">
          {/* Content */}
          <div className="text-center">
            <h2 className="animate-heading text-4xl sm:text-4xl md:text-6xl font-bold text-white mb-8 sm:mb-8">
              Our{" "}
              <span className="gradient-underline  bg-gradient-to-r from-[#FB7100] via-[#f31554] to-[#9C27B0] bg-clip-text  text-4xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
                Services
              </span>
            </h2>

            <div className="text-lg sm:text-lg md:text-xl lg:text-3xl text-gray-300 mb-10 sm:mb-8 min-h-[120px] sm:min-h-[80px] md:min-h-[60px] flex flex-col items-center justify-center gap-4 sm:gap-3 px-2 overflow-hidden">
              <span className="text-white text-center text-lg sm:text-base">
                We specialize in
              </span>
              <div className="w-full flex justify-center">
                <span
                  ref={typedRef}
                  className="gradient-text-enhanced font-semibold text-center max-w-[90%] sm:max-w-[85%] md:max-w-[600px] break-words leading-tight block"
                  style={{
                    minHeight: "2em",
                    lineHeight: "1.3",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {!isClient && "Digital Solutions"}
                </span>
              </div>
            </div>

            <p className="text-base sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10 sm:mb-8 px-4">
              Transform your ideas into reality with our comprehensive range of
              digital solutions. From concept to deployment, we&apos;ve got you
              covered with cutting-edge technology and creative expertise.
            </p>

            {/* Enhanced decorative elements */}
            <div className="mt-8 flex justify-center space-x-4 sm:space-x-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#FB7100] to-[#f31554] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#f31554] to-[#9C27B0] rounded-full animate-pulse delay-300"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#9C27B0] to-[#FB7100] rounded-full animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
