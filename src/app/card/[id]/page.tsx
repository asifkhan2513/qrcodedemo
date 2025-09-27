import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardById, getOtherCards, cardsData } from "@/data/cards";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CardPage({ params }: PageProps) {
  const card = getCardById(params.id);
  const otherCards = getOtherCards(params.id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] relative overflow-hidden">
      {/* Gradient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#5721B7]/20 to-[#D668CD]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#D668CD]/20 to-[#5721B7]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#5721B7]/50 rounded-lg px-3 py-2 glass-card"
          aria-label="Go back to home page"
        >
          <span className="mr-2" aria-hidden="true">
            ←
          </span>
          Back to Home
        </Link>
      </nav>

      {/* Card Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="visible-animated-border glass-card p-8 mb-8 text-center animate-fadeIn">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5721B7] to-[#D668CD] rounded-full blur-lg opacity-30 scale-110"></div>
            <div className="relative bg-gradient-to-r from-[#5721B7] to-[#D668CD] p-6 rounded-full inline-block">
              <div className="text-6xl text-white">
                <card.icon />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white gradient-underline">
            {card.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {card.content.description}
          </p>
        </div>

        {/* Details Section */}
        <div className="visible-animated-border glass-card p-8 mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6 text-white gradient-underline">
            Details & Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {card.content.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start p-4 glass-card rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span
                  className="text-2xl mr-3 flex-shrink-0 gradient-text"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-gray-300 leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mb-12">
          <a
            href={card.content.link}
            target="_blank"
            rel="noopener noreferrer"
            className="visible-animated-border glass-card hover:scale-105 text-white font-bold py-4 px-8 rounded-xl transform transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#5721B7]/50"
            aria-label={`${card.content.linkText} (opens in new tab)`}
          >
            <span className="gradient-text">{card.content.linkText}</span>
            <span aria-hidden="true" className="gradient-text">
              →
            </span>
          </a>
        </div>

        {/* Other Cards Grid */}
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold mb-6 text-white text-center gradient-underline">
            Explore Other Sections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherCards.map((otherCard) => (
              <Link
                key={otherCard.id}
                href={`/card/${otherCard.id}`}
                className="visible-animated-border glass-card p-4 text-center transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5721B7]/50 rounded-lg"
                aria-label={`Navigate to ${otherCard.title} page`}
              >
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5721B7] to-[#D668CD] rounded-full blur-lg opacity-30 scale-110"></div>
                  <div className="relative bg-gradient-to-r from-[#5721B7] to-[#D668CD] p-3 rounded-full inline-block">
                    <div className="text-2xl text-white">
                      <otherCard.icon />
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-white">
                  {otherCard.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for all card IDs
export async function generateStaticParams() {
  return cardsData.map((card) => ({
    id: card.id,
  }));
}
