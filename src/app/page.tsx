"use client";

import Card from "@/components/Card";
import ServicesSection from "@/components/ServicesSection";
import { cardsData } from "@/data/cards";
import logo from "../app/assests/Logo.png";
import logoframe from "../app/assests/Logoframe.png";
import Image from "next/image";

export default function Home() {
  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Floating Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src={logoframe}
          alt="background logo"
          className="absolute w-38 h-38 animate-float top-24 left-4 opacity-50"
        />
        <Image
          src={logoframe}
          alt="background logo"
          className="absolute w-40 h-40 animate-float-slow bottom-20 right-20 opacity-60"
        />
        <Image
          src={logoframe}
          alt="background logo"
          className="absolute w-32 h-32 animate-float top-1/3 left-1/2 opacity-60"
        />
        <Image
          src={logoframe}
          alt="background logo"
          className="absolute w-36 h-36 animate-float-slow bottom-10 left-1/4 opacity-60"
        />
        <Image
          src={logoframe}
          alt="background logo"
          className="absolute w-36 h-36 animate-float-slow top-1/4 right-5 opacity-60"
        />
      </div>

      {/* Header */}
      <header className="p-4 sm:p-6 text-center animate-fadeIn relative z-10">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4 flex justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-48 md:w-48"
          />
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#ffb347] font-bold mb-1 sm:mb-2">
          Mohammad Maaz
        </h2>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2 font-medium">
          Founder & CEO
        </p>
        <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
          Connect with me through different platforms
        </p>
      </header>

      {/* Cards Grid */}
      <main className="container mx-auto px-4 py-6 sm:py-8 mb-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
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
      <div className=" flex justify-center text-center py-4 h-12 text-gray-600 dark:text-gray-400 relative z-10">
        {/* <span className="text-start flex text-lg">Note:  */}
        {/* <span ref={textRef} className="text-lg md:text-xl text-gray-600 dark:text-gray-300"></span> */}
        {/* </span> */}
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Footer */}
      <footer className="text-center py-4  text-gray-600  dark:text-gray-300 relative z-10">
        <p>
          &copy; {currentYear} Maazster Next-GenX Technology. All rights
          reserved.
        </p>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(20deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        @keyframes float-slow {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-15deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
