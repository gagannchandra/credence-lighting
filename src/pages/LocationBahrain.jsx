import { Waves, Building2, HardHat, Lightbulb } from "lucide-react";
import LocationTemplate from "../components/templates/LocationTemplate";
import indoorImg from "../assets/images/Smarvy Spot/150.webp"; 
import outdoorImg from "../assets/images/xtremezone/136.webp"; 

const seo = {
  title: "Lighting Companies in Bahrain | Credence Lighting",
  description: "Specialized architectural lighting supplier for Bahrain. We provide complete lighting solutions for commercial towers, luxury hospitality, and high-end residential projects."
};

const faqs = [
  { id: "bh1", question: "Do you supply lighting to Bahrain from the UAE?", answer: "Yes, we regularly export and supply lighting packages to Bahrain. Thanks to the GCC customs union and our established logistics providers, we ensure rapid and cost-effective delivery via the King Fahd Causeway." },
  { id: "bh2", question: "Are your fixtures suitable for Bahrain's high humidity?", answer: "Absolutely. Bahrain's island geography means exterior lighting must be highly resistant to humidity and salt. We specify IP66/IP67 rated fixtures with anti-corrosion marine-grade treatments specifically for these environments." },
  { id: "bh3", question: "Can you assist with the lighting design for my project in Manama?", answer: "Yes, our in-house design team provides comprehensive lighting calculations (DIALux), 3D renderings, and AutoCAD layouts for projects located anywhere in Bahrain." }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Credence Lighting",
      "url": "https://credencelighting.com/lighting-companies-bahrain",
      "areaServed": {
        "@type": "Country",
        "name": "Bahrain"
      },
      "description": "Architectural and commercial lighting supplier for Bahrain."
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
  location: "Kingdom of Bahrain",
  title: "Architectural Lighting for the",
  titleItalic: "Island Kingdom",
  description: "Delivering world-class lighting design and robust, marine-grade fixtures for Bahrain's commercial, residential, and hospitality sectors."
};

const services = [
  { icon: Waves, title: "Marine-Grade Exteriors", description: "Corrosion-resistant landscape and facade lighting built for island environments." },
  { icon: Building2, title: "Commercial Infrastructure", description: "Energy-efficient interior lighting and smart controls for Manama's corporate towers." },
  { icon: Lightbulb, title: "Hospitality & Retail", description: "High-CRI architectural and decorative lighting to elevate the guest and shopper experience." },
  { icon: HardHat, title: "Contractor Support", description: "Seamless cross-border logistics and dedicated technical support for Bahraini contractors." }
];

const contentBlocks = [
  { type: "heading2", content: "Lighting Bahrain's Skyline" },
  { type: "paragraph", content: "Bahrain’s unique blend of deep historical roots and modern urban development requires a nuanced approach to lighting. From illuminating heritage sites in Muharraq to providing cutting-edge dynamic lighting for skyscrapers in Bahrain Bay, our solutions are tailored to the specific climatic and aesthetic demands of the Kingdom." },
  { type: "list", items: [
    "Efficient Logistics: Fast GCC ground transport directly to site.",
    "Custom Manufacturing: Bespoke fixtures to meet unique architectural requirements.",
    "Comprehensive Support: Remote programming and on-site commissioning services."
  ]}
];

const relatedProjects = [
  {
    title: "Luxury Island Villa",
    description: "Complete interior and landscape lighting utilizing trimless, glare-free fixtures.",
    image: indoorImg,
    link: "/projects"
  },
  {
    title: "Manama Retail Mall",
    description: "High-contrast track lighting and dynamic facade illumination.",
    image: outdoorImg,
    link: "/projects"
  }
];

export default function LocationBahrain() {
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
