interface CardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  hoverColor: string;
  directLink: string;
}

// Function to get icon color class based on title
const getIconColorClass = (title: string): string => {
  switch (title.toLowerCase()) {
    case "linkedin":
      return "text-[#0077b5]";
    case "whatsapp":
    case "whatsapp channel":
      return "text-[#25d366]";
    case "website":
      return "text-[#4285f4]";
    case "contact":
      return "text-[#ff6b35]";
    case "instagram":
      return "instagram-gradient";
    case "facebook":
      return "text-[#1877f2]";
    default:
      return "text-white";
  }
};

export default function Card({
  title,
  description,
  icon: IconComponent,
  directLink,
}: CardProps) {
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();

    // Special handling for contact card - make phone call
    if (title === "Contact") {
      // Direct phone call
      window.location.href = directLink;
    } else {
      // Direct redirect to external link for other cards
      window.open(directLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="glass-card group cursor-pointer h-[120px] sm:h-[180px] md:h-[200px] focus:outline-none focus:ring-2 focus:ring-[#5721B7]/50 border border-gray-800/30 rounded-2xl"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      }}
    >
      {/* Content - Mobile: Row layout, Desktop: Column layout */}
      <div className="relative z-10 p-4 sm:p-6 h-full flex flex-row sm:flex-col items-center justify-center sm:justify-center text-center gap-4 sm:gap-4">
        {/* Icon with original colors */}
        <div className="relative flex-shrink-0">
          <div className="icon-container relative p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <div
              className={`text-xl sm:text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300 ${getIconColorClass(
                title
              )}`}
            >
              <IconComponent />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center flex-1 sm:flex-none text-center sm:text-center">
          {/* Title */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#5721B7] group-hover:to-[#D668CD] group-hover:bg-clip-text transition-all duration-300 mb-2 sm:mb-3">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5721B7]/10 to-[#D668CD]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
}
