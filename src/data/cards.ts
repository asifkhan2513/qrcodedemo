import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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

export const cardsData: CardData[] = [
  {
    id: "contact",
    title: "Contact",
    description: "Call Me Now",
    icon: MdCall,
    color: "bg-orange-600",
    hoverColor: "hover:bg-orange-700",
    directLink: "tel:+917651852015",
    content: {
      description:
        "Get in touch with me directly via phone call for immediate assistance and discussions.",
      details: [
        "Direct Phone: +917651852015",
        "Available: 9 AM - 8 PM IST",
        "Emergency Support Available",
        "Business Hours: Monday - Saturday",
      ],
      link: "tel:+917651852015",
      linkText: "Call Now",
    },
  },
  {
    id: "email",
    title: "Email",
    description: "Send an email",
    icon: MdEmail,
    color: "bg-red-600",
    hoverColor: "hover:bg-green-700",
    directLink: "mailto:info@maazstertech.com",
    content: {
      description:
        "Get in touch with me directly via email for inquiries, support, or collaborations.",
      details: [
        "Email: info@maazstertech.com",
        "Response Time: Usually within 24 hours",
        "Professional & Prompt Communication",
        "Business Hours: Monday - Saturday",
      ],
      link: "mailto:info@maazstertech.com",
      linkText: "Email Now",
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
    id: "whatsapp",
    title: "WhatsApp",
    description: "Connect on WhatsApp",
    icon: FaWhatsapp,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    directLink: "https://wa.me/+917651852015",
    content: {
      description:
        "Connect with me on WhatsApp for quick communication and collaboration.",
      details: [
        "Quick Response: Usually within 1 hour",
        "Available: 9 AM - 9 PM IST",
        "Business Inquiries Welcome",
        "Project Discussions Available",
      ],
      link: "https://wa.me/+917651852015",
      linkText: "Start WhatsApp Chat",
    },
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect on LinkedIn",
    icon: FaLinkedin,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    directLink:
      "https://www.linkedin.com/in/maazstertechfounder/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    content: {
      description:
        "Connect with me on LinkedIn to see my professional journey, skills, and network.",
      details: [
        "Professional Experience & Career History",
        "Technical Skills & Endorsements",
        "Recommendations from Colleagues",
        "Professional Network & Connections",
      ],
      link: "https://www.linkedin.com/in/maazstertechfounder/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      linkText: "Visit LinkedIn Profile",
    },
  },

  // testing pending
  {
    id: "Instagram",
    title: "Instagram",
    description: "Connect on Instagram",
    icon: FaInstagram,
    color:
      "bg-gradient-to-t from-[#fa7e1e] via-[#d62976] via-[#962fbf] to-[#261c5b]",
    hoverColor: "hover:",
    directLink: "https://www.instagram.com/maazstertech",
    content: {
      description:
        "Connect with me on Instagram for quick communication and collaboration.",
      details: [
        "Quick Response: Usually within 1 hour",
        "Available: 9 AM - 9 PM IST",
        "Business Inquiries Welcome",
        "Project Discussions Available",
      ],
      link: "https://www.instagram.com/maazstertech",
      linkText: "Start Instagram Chat",
    },
  },
  {
    id: "Whatsapcahnnel",
    title: "WhatsApp Channel",
    description: "Connect on WhatsApp Channel",
    icon: FaWhatsapp,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    directLink: "https://whatsapp.com/channel/0029Vb58oj6C6ZvjZl1bma0Y",
    content: {
      description:
        "Connect with me on LinkedIn to see my professional journey, skills, and network.",
      details: [
        "Professional Experience & Career History",
        "Technical Skills & Endorsements",
        "Recommendations from Colleagues",
        "Professional Network & Connections",
      ],
      link: "https://whatsapp.com/channel/0029Vb58oj6C6ZvjZl1bma0Y",
      linkText: "Visit whatsapp  Channel ",
    },
  },

  {
    id: "facebook",
    title: "Facebook",
    description: "Connect on Facebook",
    icon: FaFacebook,
    color: "bg-[#3b5998]",
    hoverColor: "hover:bg-[#8b9dc3]",
    directLink:
      "https://www.facebook.com/p/Maazster-Tech-Pvt-Ltd-100067027774467/",
    content: {
      description:
        "Connect with me on LinkedIn to see my professional journey, skills, and network.",
      details: [
        "Professional Experience & Career History",
        "Technical Skills & Endorsements",
        "Recommendations from Colleagues",
        "Professional Network & Connections",
      ],
      link: "https://www.facebook.com/p/Maazster-Tech-Pvt-Ltd-100067027774467/",
      linkText: "Visit facebook Profile",
    },
  },
];

export const getCardById = (id: string): CardData | undefined => {
  return cardsData.find((card) => card.id === id);
};

export const getOtherCards = (currentId: string): CardData[] => {
  return cardsData.filter((card) => card.id !== currentId);
};
