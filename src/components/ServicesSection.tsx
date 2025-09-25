"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import {
  FaCode,
  FaMobile,
  FaCloud,
  FaDatabase,
  FaPaintBrush,
  FaRocket,
  FaLaptopCode,
  FaServer,
} from "react-icons/fa";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
}

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
            digital solutions. From concept to deployment, we've got you
            covered.
          </p>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = service.icon;

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl
        bg-white dark:bg-gray-800 
        shadow-lg hover:shadow-2xl
        transform transition-all duration-500 ease-out
        hover:scale-105 hover:-translate-y-2
        border border-gray-200 dark:border-gray-700
        h-24 sm:h-32 md:h-40 lg:h-48
        cursor-pointer
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Gradient Background */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-br ${service.gradient} 
        opacity-0 group-hover:opacity-10 transition-opacity duration-300
      `}
      />

      {/* Content */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6 h-full flex flex-col justify-center items-center text-center">
        {/* Icon */}
        <div
          className={`
          mb-2 sm:mb-3 md:mb-4 
          text-2xl sm:text-3xl md:text-4xl
          bg-gradient-to-br ${service.gradient} 
          bg-clip-text text-transparent
          transform group-hover:scale-110 transition-transform duration-300
        `}
        >
          <IconComponent className="mx-auto" />
        </div>

        {/* Title */}
        <h3
          className="
          text-sm sm:text-base md:text-lg lg:text-xl 
          font-bold text-gray-800 dark:text-white 
          mb-1 sm:mb-2 
          group-hover:text-[#fb7100] transition-colors duration-300
          leading-tight
        "
        >
          {service.title}
        </h3>

        {/* Description - Hidden on mobile, visible on larger screens */}
        <p
          className="
          hidden sm:block 
          text-xs md:text-sm 
          text-gray-600 dark:text-gray-400 
          mb-2 md:mb-4
          leading-relaxed
        "
        >
          {service.description}
        </p>

        {/* Features - Only visible on larger screens */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap gap-1 justify-center">
            {service.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="
                  text-xs px-2 py-1 
                  bg-gray-100 dark:bg-gray-700 
                  text-gray-700 dark:text-gray-300
                  rounded-full
                  group-hover:bg-[#fb7100] group-hover:text-white
                  transition-colors duration-300
                "
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div
        className={`
        absolute inset-0 rounded-2xl
        bg-gradient-to-br ${service.gradient}
        opacity-0 group-hover:opacity-20
        transition-opacity duration-300
        pointer-events-none
      `}
      />
    </div>
  );
}
