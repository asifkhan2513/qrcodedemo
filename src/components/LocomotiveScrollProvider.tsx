"use client";

import { useEffect, useRef, useState } from "react";

interface LocomotiveScrollProviderProps {
  children: React.ReactNode;
}

const LocomotiveScrollProvider: React.FC<LocomotiveScrollProviderProps> = ({
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    try {
      // Simple smooth scroll implementation as fallback
      if (scrollRef.current) {
        scrollRef.current.style.scrollBehavior = "smooth";
      }

      // Add smooth scrolling CSS
      document.documentElement.style.scrollBehavior = "smooth";

      return () => {
        try {
          document.documentElement.style.scrollBehavior = "auto";
        } catch (error) {
          console.warn("Scroll cleanup error:", error);
        }
      };
    } catch (error) {
      console.warn("LocomotiveScroll error:", error);
    }
  }, [isClient]);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="locomotive-scroll-container content-layer"
    >
      {children}
    </div>
  );
};

export default LocomotiveScrollProvider;
