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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(directLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title} in new tab`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      className={`
        ${color} ${hoverColor}
        text-white rounded-xl p-4 shadow-lg
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl
        flex items-center justify-start gap-4       /* ✅ mobile horizontal */
        sm:flex-col sm:justify-center sm:items-center /* ✅ desktop centered */
        w-full max-w-md mx-auto
        min-h-[60px] sm:min-h-[200px]
        cursor-pointer
        focus:outline-none focus:ring-4 focus:ring-opacity-50
      `}
    >
      {/* Icon */}
      <div
        className="text-3xl sm:text-4xl sm:mb-4 flex-shrink-0"
        role="img"
        aria-label={title}
      >
        <IconComponent />
      </div>

      {/* Text */}
      <div className="flex flex-col text-left sm:text-center">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </div>
  );
}
