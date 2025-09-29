"use client";

import { MapPin } from "lucide-react";

const AddressSection = () => {
  const addresses = [
    {
      id: 2,
      title: "Lucknow Office",
      address:
        "D-1099, Sector 5, D-Block, Indira Nagar, Lucknow, Uttar Pradesh 226016",
      icon: <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      id: 1,
      title: "Ambedkar Nagar Office",
      address:
        "Ambedkar Nagar, Naipura Road, Tanda, Ambedkar Nagar, Uttar Pradesh, 224190",
      icon: <MapPin className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
  ];

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12">
          Our Locations
        </h2>

        {/* Desktop Layout - Row wise */}
        <div className="hidden md:flex gap-8 justify-center">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="address-card group relative flex-1 max-w-lg min-h-[280px]"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl animate-border-gradient p-[3px]">
                <div className="h-full w-full rounded-2xl bg-[#0E0E0E] flex items-center justify-center">
                  <div className="p-8 text-center w-full">
                    <div className="flex justify-center mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {address.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {address.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {address.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Column wise */}
        <div className="md:hidden space-y-8">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="address-card group relative w-full min-h-[240px]"
            >
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl animate-border-gradient p-[3px]">
                <div className="h-full w-full rounded-2xl bg-[#0E0E0E] flex items-center justify-center">
                  <div className="p-8 text-center w-full">
                    <div className="flex justify-center mb-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {address.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {address.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {address.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
