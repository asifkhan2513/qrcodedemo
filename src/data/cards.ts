import { FaLinkedin } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

export interface CardData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  color: string;
  hoverColor: string;
  directLink: string; // Direct external link for redirect
  content: {
    description: string;
    details: string[];
    link: string;
    linkText: string;
  };
}

export const cardsData: CardData[] = [
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect on Linkdin",
    icon: FaLinkedin,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    directLink:
      "https://www.linkedin.com/company/maazster-tech/?originalSubdomain=in",
    content: {
      description:
        "Connect with me on LinkedIn to see my professional journey, skills, and network.",
      details: [
        "Professional Experience & Career History",
        "Technical Skills & Endorsements",
        "Recommendations from Colleagues",
        "Professional Network & Connections",
      ],
      link: "https://www.linkedin.com/company/maazster-tech/?originalSubdomain=in",
      linkText: "Visit LinkedIn Profile",
    },
  },
  {
    id: "map",
    title: "WhatsApp",
    description: "Connect on Whatsapp",
    icon: FaWhatsapp,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    directLink: "https://wa.me/+917651852015",
    content: {
      description:
        "Find me on the map and see where I am located for potential collaborations.",
      details: [
        "Current Location: Available Worldwide",
        "Remote Work: Fully Available",
        "Open to Relocation: Yes",
        "Time Zone: Flexible (UTC+0 to UTC+8)",
      ],
      link: "https://wa.me/+917651852015",
      linkText: "connect on whatsapp",
    },
  },
  {
    id: "website",
    title: "Website",
    description: "Visit Website",
    icon: AiOutlineGlobal,
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700",
    directLink: "https://maazstertech.com/",
    content: {
      description:
        "Explore my portfolio website to see my projects, skills, and technical achievements.",
      details: [
        "Latest Projects & Case Studies",
        "Technical Skills & Technologies",
        "Open Source Contributions",
        "Blog Posts & Technical Articles",
      ],
      link: "https://maazstertech.com/",
      linkText: "Visit Our Website",
    },
  },
  {
    id: "contact",
    title: "Contact",
    description: "Save Contact Info",
    icon: MdCall,
    color: "bg-orange-600",
    hoverColor: "hover:bg-orange-700",
    directLink: "tel:+917651852015",
    content: {
      description:
        "Save Maazster Tech contact information directly to your phone contacts.",
      details: [
        "Company: Maazster Tech",
        "Phone: +917651852015",
        "Email: info@maazstertech.com",
        "Website: https://maazstertech.com",
      ],
      link: "mailto:info@maazstertech.com",
      linkText: "Send Email Now",
    },
  },
];

export const getCardById = (id: string): CardData | undefined => {
  return cardsData.find((card) => card.id === id);
};

export const getOtherCards = (currentId: string): CardData[] => {
  return cardsData.filter((card) => card.id !== currentId);
};
