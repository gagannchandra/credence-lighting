import { Mountain, Hotel, Building2, Trees } from "lucide-react";
import LocationTemplate from "../components/templates/LocationTemplate";
import indoorImg from "../assets/images/mytown/141.webp"; 
import outdoorImg from "../assets/images/xtremezone/136.webp"; 

const seo = {
  title: "Resort Lighting in Ras Al Khaimah | Credence",
  description: "Specialized hospitality and resort lighting for Ras Al Khaimah. We supply IP-rated landscape, facade, and luxury hotel lighting for RAK's booming tourism sector."
};

const faqs = [
  { id: "rak1", question: "Do you provide lighting for coastal resorts and beach hotels in RAK?", answer: "Yes, Ras Al Khaimah's booming coastal tourism requires lighting that can withstand high humidity and salt spray. We supply marine-grade, 316L stainless steel and anodized aluminum fixtures specifically designed for beachfront environments." },
  { id: "rak2", question: "Can you design lighting that minimizes light pollution for mountain resorts?", answer: "Absolutely. For eco-tourism projects in the Hajar Mountains, we employ 'Dark Sky' compliant lighting strategies. We use heavily shielded, low-glare fixtures that illuminate pathways safely without obscuring the natural starlight." },
  { id: "rak3", question: "What smart controls do you recommend for large resorts?", answer: "We recommend a hybrid approach: DALI for precise indoor control of ballrooms and lobbies, combined with Casambi wireless mesh networks for outdoor landscape lighting, reducing the need for extensive trenching and cabling." }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Credence Lighting",
      "url": "https://credencelighting.com/lighting-solutions-rak",
      "areaServed": {
        "@type": "City",
        "name": "Ras Al Khaimah"
      },
      "description": "Hospitality and landscape lighting specialists for Ras Al Khaimah."
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
  location: "Ras Al Khaimah (RAK)",
  title: "Resort Lighting in Ras Al Khaimah | Credence",
  titleItalic: "Eco-Tourism",
  description: "Durable, Dark-Sky compliant, and luxurious lighting solutions for Ras Al Khaimah's expanding resorts, hotels, and mountain retreats."
};

const services = [
  { icon: Hotel, title: "Resort Lighting in Ras Al Khaimah | Credence", description: "Bespoke decorative and architectural lighting for 5-star beachfront properties." },
  { icon: Trees, title: "Resort Lighting in Ras Al Khaimah | Credence", description: "Marine-grade IP67/68 fixtures that resist salt, humidity, and extreme heat." },
  { icon: Mountain, title: "Resort Lighting in Ras Al Khaimah | Credence", description: "Dark Sky compliant designs that protect local wildlife and preserve night sky visibility." },
  { icon: Building2, title: "Resort Lighting in Ras Al Khaimah | Credence", description: "Dynamic, programmable DMX lighting for large-scale entertainment venues." }
];

const contentBlocks = [
  { type: "heading2", content: "Preserving Nature While Elevating Luxury" },
  { type: "paragraph", content: "Ras Al Khaimah represents a unique intersection of luxury hospitality and rugged natural beauty. Lighting projects here must respect the environment while delivering a 5-star guest experience. Our approach focuses on low-impact, highly durable illumination. We use specialized optics to push light exactly where it is needed—onto pathways, facades, and dining areas—while ensuring zero upward light spill." },
  { type: "list", items: [
    "Corrosion Resistance: All outdoor fixtures undergo 1,000+ hour salt-spray testing.",
    "Wildlife Sensitivity: Amber and red-spectrum LEDs available for turtle-nesting beaches.",
    "Integrated Smart Poles: Combining lighting, WiFi, and security cameras into single, aesthetic landscape poles."
  ]}
];

const relatedProjects = [
  {
    title: "Resort Lighting in Ras Al Khaimah | Credence",
    description: "Low-glare, Dark Sky compliant pathway and landscape lighting.",
    image: outdoorImg,
    link: "/projects"
  },
  {
    title: "Resort Lighting in Ras Al Khaimah | Credence",
    description: "Marine-grade facade lighting and warm-dimming restaurant interiors.",
    image: indoorImg,
    link: "/projects"
  }
];

export default function LocationRAK() {
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
