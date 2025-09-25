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
    // Direct redirect to external link
    window.open(directLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`
        ${color} ${hoverColor}
        text-white rounded-xl p-6 shadow-lg 
        transform transition-all duration-300
        hover:scale-105 hover:shadow-xl
        flex flex-col items-center text-center
        min-h-[200px] justify-center
        cursor-pointer card-hover
        focus:outline-none focus:ring-4 focus:ring-opacity-50
      `}
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
    >
      <div className="text-4xl mb-4" role="img" aria-label={title}>
        <IconComponent />
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}
