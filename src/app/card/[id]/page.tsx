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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="p-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
          aria-label="Go back to home page"
        >
          <span className="mr-2" aria-hidden="true">
            ←
          </span>
          Back to Home
        </Link>
      </nav>

      {/* Card Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div
          className={`${card.color} text-white rounded-2xl p-8 mb-8 text-center animate-fadeIn`}
        >
          <div className="text-6xl mb-4" role="img" aria-label={card.title}>
            <card.icon />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{card.title}</h1>
          <p className="text-xl opacity-90 responsive-text">
            {card.content.description}
          </p>
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Details & Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {card.content.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <span
                  className="text-2xl mr-3 flex-shrink-0"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300 responsive-text">
                  {detail}
                </span>
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
            className={`
              ${card.color} hover:opacity-90
              text-white font-bold py-4 px-8 rounded-xl
              transform transition-all duration-300 hover:scale-105
              inline-flex items-center gap-2
              focus:outline-none focus:ring-4 focus:ring-opacity-50
              shadow-lg hover:shadow-xl
            `}
            aria-label={`${card.content.linkText} (opens in new tab)`}
          >
            {card.content.linkText}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile Responsive Grid for Other Cards */}
        <div className="animate-fadeIn">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            Explore Other Sections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherCards.map((otherCard) => (
              <Link
                key={otherCard.id}
                href={`/card/${otherCard.id}`}
                className={`
                  ${otherCard.color} hover:opacity-90
                  text-white rounded-lg p-4 text-center
                  transform transition-all duration-300 hover:scale-105
                  focus:outline-none focus:ring-4 focus:ring-opacity-50
                  shadow-md hover:shadow-lg
                `}
                aria-label={`Navigate to ${otherCard.title} page`}
              >
                <div
                  className="text-2xl mb-2"
                  role="img"
                  aria-label={otherCard.title}
                >
                  <otherCard.icon />
                </div>
                <div className="font-semibold">{otherCard.title}</div>
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
