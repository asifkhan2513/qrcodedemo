export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
}

export interface CardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  hoverColor: string;
  directLink: string;
  content: {
    description: string;
    details: string[];
    link: string;
    linkText: string;
  };
}
