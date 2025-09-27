import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#5721B7]/20 to-[#D668CD]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#D668CD]/20 to-[#5721B7]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center p-8">
        <div className="animated-border glass-card p-12 max-w-md mx-auto">
          <h1 className="text-8xl font-bold gradient-text mb-6">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4 gradient-underline">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            className="animated-border glass-card hover:scale-105 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5721B7]/50"
          >
            <span className="gradient-text">Go Back Home</span>
            <span aria-hidden="true" className="gradient-text">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
