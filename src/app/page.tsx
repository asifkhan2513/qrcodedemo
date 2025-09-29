"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import ServicesSection from "@/components/ServicesSection";
import AddressSection from "@/components/AddressSection";
import LoadingScreen from "@/components/LoadingScreen";
import { cardsData } from "@/data/cards";
import logo from "../app/assests/Logo.webp";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const today = new Date();
  // const currentYear = today.getFullYear();
  const currentYear = 2024;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen  relative">
      {/* Header */}
      <header
        className="relative z-10 pt-4 pb-4 text-center"
        data-scroll
        data-scroll-speed="0.5"
      >
        <div className="flex justify-center items-center mb-6">
          <Image
            src={logo}
            alt="Maazster Tech Logo"
            className="logo-animation h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-64 lg:w-64 filter drop-shadow-2xl floating-element"
            loading="lazy"
          />
        </div>

        <h1
          className="main-heading text-3xl sm:text-5xl md:text-7xl font-bold 
             mb-4 bg-gradient-to-r from-[#ffffff] via-[#ffffff] to-[#ffffff] 
             bg-clip-text text-white"
        >
          Er. Mohd <span className="text-[#FB7100]
                   
                   ">Maaz</span>
        </h1>

        <p className="subtitle text-lg sm:text-xl text-gray-300 mb-2 font-medium">
          Founder & CEO
        </p>

        <p className="description text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
          Connect with me through different platforms and explore our digital
          solutions
        </p>
      </header>

      {/* Cards Grid */}
      <main
        className="relative z-10 container mx-auto px-6 sm:px-4 py-4 mb-8"
        data-scroll
        data-scroll-speed="0.2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pl-4 sm:pl-0">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className="card-animation"
              data-scroll
              data-scroll-speed={0.2 + index * 0.1}
              data-scroll-delay={index * 0.1}
            >
              <Card
                id={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                color={card.color}
                hoverColor={card.hoverColor}
                directLink={card.directLink}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Services Section */}
      <div className="services-section" data-scroll data-scroll-speed="0.3">
        <ServicesSection />
      </div>

      {/* Address Section */}
      <div className="address-section" data-scroll data-scroll-speed="0.2">
        <AddressSection />
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 border-t border-gray-800">
        <p className="text-sm">
          &copy; {currentYear} Maazster Tech Next-GenX Private Limited 
        </p>
        <div>All right reserved.</div>
      </footer>
    </div>
  );
}
