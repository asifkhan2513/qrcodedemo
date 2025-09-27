interface CardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  hoverColor: string;
  directLink: string;
}

export default function Card({
  title,
  description,
  icon: IconComponent,
  color,
  hoverColor,
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
      className={`
        ${color} ${hoverColor}
        group relative overflow-hidden rounded-xl
        shadow-lg hover:shadow-2xl
        transform transition-all duration-500 ease-out
        hover:scale-105 hover:-translate-y-2
        h-[100px] sm:h-[160px] md:h-[200px]
        cursor-pointer
        focus:outline-none focus:ring-4 focus:ring-opacity-50
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title} in new tab`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      }}
    >
      {/* Content */}
      <div
        className="
          relative z-10 p-2 sm:p-4 md:p-6 h-full
          flex flex-row items-center justify-start  px-8    
           sm:flex-col sm:items-center sm:justify-center         
          gap-2 sm:gap-4
        "
      >
        {/* Icon */}
        <div className="text-4xl sm:text-3xl md:text-4xl text-white transform group-hover:scale-110 transition-transform duration-300">
          <IconComponent />
        </div>

        {/* Title + Description */}
        <div className="flex flex-col sm:items-center sm:text-center">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight">
            {title}
          </h3>

          {/* Description - Hidden on mobile, visible on larger screens */}
          <p className=" text-xs md:text-sm text-white opacity-90 leading-relaxed mt-1 sm:mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
