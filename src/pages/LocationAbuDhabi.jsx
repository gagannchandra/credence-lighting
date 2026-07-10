import { Building2, Lightbulb, Ship, Landmark } from "lucide-react";
import LocationTemplate from "../components/templates/LocationTemplate";
import indoorImg from "../assets/images/ground-control/154.webp"; 
import outdoorImg from "../assets/images/xtremezone/136.webp"; 

const seo = {
  title: "Lighting Suppliers in Abu Dhabi | Credence Lighting",
  description: "Premier lighting supplier and design firm serving Abu Dhabi and Al Ain. We provide bespoke architectural, commercial, and hospitality lighting solutions."
};

const faqs = [
  { id: "ad1", question: "Do you supply lighting for government and commercial projects in Abu Dhabi?", answer: "Yes, we regularly provide services to main contractors and government entities in Abu Dhabi to supply ESTIDAMA-compliant lighting for commercial buildings, public spaces, and infrastructure projects." },
  { id: "ad2", question: "What is ESTIDAMA and how does your lighting comply?", answer: "ESTIDAMA is Abu Dhabi's sustainability framework. We ensure our LED fixtures meet strict luminous efficacy standards (lumens per watt) and integrate with smart controls to fulfill the Pearl Rating System requirements for energy efficiency." },
  { id: "ad3", question: "Can you deliver lighting fixtures directly to sites in Al Ain or Ruwais?", answer: "Absolutely. Our logistics network covers the entirety of the Abu Dhabi emirate, ensuring safe and timely delivery to construction sites in Abu Dhabi city, Al Ain, and the Western Region." }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Credence Lighting",
      "url": "https://credencelighting.com/lighting-suppliers-abu-dhabi",
      "areaServed": {
        "@type": "City",
        "name": "Abu Dhabi"
      },
      "description": "Architectural and commercial lighting suppliers serving Abu Dhabi."
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

const hero = {
  location: "Abu Dhabi",
  title: "Lighting Suppliers in Abu Dhabi | Credence Lighting",
  titleItalic: "Capital",
  description: "Delivering world-class lighting design and supply for Abu Dhabi's growing commercial, hospitality, and cultural sectors."
};

const services = [
  { icon: Landmark, title: "Lighting Suppliers in Abu Dhabi | Credence Lighting", description: "Precision framing projectors and high-CRI lighting for delicate artifacts and expansive exhibitions." },
  { icon: Building2, title: "Lighting Suppliers in Abu Dhabi | Credence Lighting", description: "ESTIDAMA-compliant LED systems and smart controls for corporate headquarters." },
  { icon: Ship, title: "Lighting Suppliers in Abu Dhabi | Credence Lighting", description: "Corrosion-resistant, 316L stainless steel fixtures engineered for Abu Dhabi's coastal developments." },
  { icon: Lightbulb, title: "Lighting Suppliers in Abu Dhabi | Credence Lighting", description: "Bespoke decorative and architectural lighting for high-end resorts and hotels." }
];

const contentBlocks = [
  { type: "heading2", content: "Lighting Solutions for Abu Dhabi's Vision 2030" },
  { type: "paragraph", content: "Abu Dhabi is characterized by its commitment to sustainability, cultural heritage, and modern infrastructure. Lighting projects here require a deep understanding of ESTIDAMA building regulations and a focus on long-term reliability in harsh coastal environments. At Credence Lighting, we supply robust, highly efficient lighting systems that align with the capital's ambitious development goals." },
  { type: "list", items: [
    "Sustainability: High-efficacy LED chips exceeding local energy codes.",
    "Durability: Specialized coatings and marine-grade materials for coastal proximity.",
    "Control Integration: KNX and DALI systems for centralized building management."
  ]}
];

const relatedProjects = [
  {
    title: "Lighting Suppliers in Abu Dhabi | Credence Lighting",
    description: "Dynamic facade lighting and human-centric office illumination.",
    image: indoorImg,
    link: "/projects"
  },
  {
    title: "Lighting Suppliers in Abu Dhabi | Credence Lighting",
    description: "Landscape and pathway lighting designed to withstand coastal conditions.",
    image: outdoorImg,
    link: "/projects"
  }
];

export default function LocationAbuDhabi() {
  return (
    <LocationTemplate 
      seo={seo}
      schema={schema}
      hero={hero}
      services={services}
      contentBlocks={contentBlocks}
      relatedProjects={relatedProjects}
      faqs={faqs}
    />
  );
}
