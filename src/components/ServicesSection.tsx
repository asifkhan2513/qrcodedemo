"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import Typed from "typed.js";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

export default function ServicesSection() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseDirection, setMouseDirection] = useState({ x: 0, y: 0 });
  const [isMouseMovingDown, setIsMouseMovingDown] = useState(false);
  const [lastMouseY, setLastMouseY] = useState(0);

  // Framer Motion values for smooth animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollYMotion = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Transform values for depth effect - only when mouse is moving down
  // Create dynamic depth effect
  const depthValue = useMotionValue(0);

  // Update depth based on mouse movement and scroll
  useEffect(() => {
    const updateDepth = () => {
      const scrollProgress = scrollYMotion.get() / 1000;
      const maxDepth = isMouseMovingDown ? 50 : 0;
      depthValue.set(scrollProgress * maxDepth);
    };

    const unsubscribeScroll = scrollYMotion.on("change", updateDepth);
    updateDepth(); // Initial call

    return unsubscribeScroll;
  }, [isMouseMovingDown, scrollYMotion, depthValue]);

  const services = useMemo(
    () => [
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
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll for depth effect
  useEffect(() => {
    const handleScroll = () => {
      scrollYMotion.set(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYMotion]);

  // Mouse tracking for cursor and directional effects
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update cursor position (offset for egg center)
      mouseX.set(e.clientX - 25);
      mouseY.set(e.clientY - 35);

      // Detect mouse movement direction (downward)
      const currentMouseY = e.clientY;
      const isMovingDown = currentMouseY > lastMouseY;
      setIsMouseMovingDown(isMovingDown);
      setLastMouseY(currentMouseY);

      // Calculate direction for border effects
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const directionX = (x - centerX) / centerX;
      const directionY = (y - centerY) / centerY;

      setMouseDirection({ x: directionX, y: directionY });

      // Update cursor visibility
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    },
    [mouseX, mouseY, lastMouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    document.addEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    document.removeEventListener("mousemove", handleMouseMove);
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
    }
  }, [handleMouseMove]);

  useEffect(() => {
    if (!isClient) return;

    const initTyped = () => {
      try {
        if (typedRef.current && !typedInstance.current) {
          typedRef.current.innerHTML = "";

          typedInstance.current = new Typed(typedRef.current, {
            strings: services,
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
          });
        }
      } catch (error) {
        console.warn("Typed.js initialization error:", error);
        if (typedRef.current) {
          typedRef.current.textContent = "Digital Solutions";
        }
      }
    };

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
  }, [isClient, services]);

  // Get border styles based on mouse direction
  const getBorderStyles = () => {
    const intensity = 0.3;
    const baseOpacity = 0.2;

    return {
      borderTopColor:
        mouseDirection.y < -intensity
          ? `rgba(251, 113, 0, ${Math.abs(mouseDirection.y) * 0.8})`
          : `rgba(255, 255, 255, ${baseOpacity})`,
      borderBottomColor:
        mouseDirection.y > intensity
          ? `rgba(156, 39, 176, ${Math.abs(mouseDirection.y) * 0.8})`
          : `rgba(255, 255, 255, ${baseOpacity})`,
      borderLeftColor:
        mouseDirection.x < -intensity
          ? `rgba(243, 21, 84, ${Math.abs(mouseDirection.x) * 0.8})`
          : `rgba(255, 255, 255, ${baseOpacity})`,
      borderRightColor:
        mouseDirection.x > intensity
          ? `rgba(251, 113, 0, ${Math.abs(mouseDirection.x) * 0.8})`
          : `rgba(255, 255, 255, ${baseOpacity})`,
    };
  };

  return (
    <>
      {/* Custom Cursor - Egg Shape */}
      <motion.div
        ref={cursorRef}
        className="fixed w-12 h-16 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: 0,
        }}
        animate={{
          scale: isMouseMovingDown ? 1.2 : 1,
          rotate: isMouseMovingDown ? -20 : -15,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        <div
          className={`w-full h-full bg-gradient-to-br from-[#FB7100] via-[#f31554] to-[#9C27B0] blur-sm egg-cursor ${
            isMouseMovingDown ? "animate-pulse" : ""
          }`}
        />
      </motion.div>

      <motion.section
        ref={sectionRef}
        className="relative z-10 py-20 sm:py-16 px-4 services-section cursor-none"
        data-scroll
        data-scroll-speed="0.4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          y: depthValue,
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto relative z-20">
          <motion.div
            className="bg-black/20 backdrop-blur-sm p-6 sm:p-6 md:p-8 lg:p-12 mx-2 sm:mx-4 overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              border: "2px solid",
              ...getBorderStyles(),
              boxShadow: isHovered
                ? `0 0 30px rgba(251, 113, 0, 0.3), 0 0 60px rgba(243, 21, 84, 0.2), 0 0 90px rgba(156, 39, 176, 0.1)`
                : "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            {/* Content */}
            <div className="text-center">
              <motion.h2
                className="animate-heading text-4xl sm:text-4xl md:text-6xl font-bold text-white mb-8 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our{" "}
                <span className="gradient-underline bg-gradient-to-r from-[#FB7100] via-[#f31554] to-[#9C27B0] bg-clip-text text-transparent text-4xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">
                  Services
                </span>
              </motion.h2>

              <motion.div
                className="text-lg sm:text-lg md:text-xl lg:text-3xl text-gray-300 mb-10 sm:mb-8 min-h-[120px] sm:min-h-[80px] md:min-h-[60px] flex flex-col items-center justify-center gap-4 sm:gap-3 px-2 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
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
              </motion.div>

              <motion.p
                className="text-base sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10 sm:mb-8 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Transform your ideas into reality with our comprehensive range
                of digital solutions. From concept to deployment, we&apos;ve got
                you covered with cutting-edge technology and creative expertise.
              </motion.p>

              {/* Services Swiper */}
              <motion.div
                className="mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Swiper
                  effect="cards"
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="w-64 h-32"
                >
                  {services.map((service, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-full bg-gradient-to-br from-[#FB7100]/20 via-[#f31554]/20 to-[#9C27B0]/20 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center p-4">
                        <span className="text-white text-sm font-medium text-center">
                          {service}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>

              {/* Enhanced decorative elements */}
              <motion.div
                className="mt-8 flex justify-center space-x-4 sm:space-x-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#FB7100] to-[#f31554] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0,
                  }}
                />
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#f31554] to-[#9C27B0] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                />
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#9C27B0] to-[#FB7100] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.7,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
