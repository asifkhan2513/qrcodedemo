"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    try {
      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      // GSAP animations
      if (containerRef.current) {
        const tl = gsap.timeline();

        tl.from(".loading-logo", {
          scale: 0,
          rotation: 360,
          duration: 1.5,
          ease: "back.out(1.7)",
        })
          .from(
            ".loading-text",
            {
              opacity: 0,
              y: 30,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.5"
          )
          .from(
            ".loading-progress",
            {
              opacity: 0,
              y: 20,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.3"
          );
      }

      return () => {
        clearInterval(progressInterval);
      };
    } catch (error) {
      console.warn("Loading screen error:", error);
      // Fallback: complete immediately
      setTimeout(onComplete, 1000);
    }
  }, [isClient, onComplete]);

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0E0E]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0E0E] overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#5721B7]/30 to-[#D668CD]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#D668CD]/30 to-[#5721B7]/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo placeholder */}
        <div className="loading-logo mb-8 mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-[#5721B7] to-[#D668CD] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#0E0E0E] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#5721B7] to-[#D668CD]"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="loading-text mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 gradient-text">
            Maazster Tech
          </h2>
          <p className="text-gray-400 text-lg">Loading Experience...</p>
        </div>

        {/* Progress bar */}
        <div className="loading-progress w-80 mx-auto">
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#5721B7] to-[#D668CD] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-sm">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
