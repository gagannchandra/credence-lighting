import { Building2, Factory, Shield, Hammer } from "lucide-react";
import LocationTemplate from "../components/templates/LocationTemplate";
import indoorImg from "../assets/images/Funtura/134.webp"; 
import outdoorImg from "../assets/images/xtremezone/136.webp"; 

const seo = {
  title: "Lighting Companies in Sharjah | Industrial & Commercial | Credence",
  description: "Leading lighting supplier for Sharjah and the Northern Emirates. Specializing in heavy-duty industrial, warehousing, and commercial lighting solutions."
};

const faqs = [
  { id: "shj1", question: "Do you supply high-bay lighting for warehouses in Sharjah Industrial Area?", answer: "Yes, we specialize in high-output, durable high-bay LED fixtures designed specifically for logistics centers, factories, and warehouses across Sharjah Industrial Area and SAIF Zone." },
  { id: "shj2", question: "Can you provide explosion-proof lighting for manufacturing facilities?", answer: "Absolutely. For hazardous environments, we supply certified explosion-proof (ATEX) lighting that guarantees safety without compromising on illumination quality." },
  { id: "shj3", question: "Are your lighting products approved by SEWA?", answer: "Our lighting products comply with the standards set by the Sharjah Electricity, Water and Gas Authority (SEWA), ensuring high power factors and minimal harmonic distortion to the grid." }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Credence Lighting",
      "url": "https://credencelighting.com/lighting-companies-sharjah",
      "areaServed": {
        "@type": "City",
        "name": "Sharjah"
      },
      "description": "Industrial and commercial lighting specialists serving Sharjah and SAIF Zone."
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
  location: "Sharjah",
  title: "Robust Lighting for",
  titleItalic: "Industry & Commerce",
  description: "Engineered lighting solutions built to withstand the demands of Sharjah's bustling industrial zones and commercial hubs."
};

const services = [
  { icon: Factory, title: "Industrial & Warehouse", description: "High-bay UFO LEDs and linear trunking systems optimized for tall racking and heavy machinery." },
  { icon: Shield, title: "Hazardous Area Lighting", description: "ATEX-certified fixtures for oil & gas, chemical, and manufacturing facilities." },
  { icon: Building2, title: "Commercial Spaces", description: "Energy-efficient panel lights and downlights for corporate offices and retail centers." },
  { icon: Hammer, title: "Facade Upgrades", description: "Exterior lighting retrofits that modernize older commercial buildings along major highways." }
];

const contentBlocks = [
  { type: "heading2", content: "Powering the Industrial Heart of the UAE" },
  { type: "paragraph", content: "Sharjah is home to some of the largest industrial and manufacturing zones in the Middle East. Lighting in these environments is about safety, productivity, and extreme reliability. Dust, heat, and vibration quickly destroy standard fixtures. At Credence Lighting, we supply industrial-grade luminaires that feature die-cast aluminum heat sinks, IK10 impact resistance, and IP66 dust/water protection." },
  { type: "list", items: [
    "SEWA Compliance: Ensuring electrical safety and grid harmony.",
    "Thermal Management: Fixtures rated for ambient temperatures up to 55°C.",
    "Smart Sensors: Microwave motion sensors for aisles to save energy when forklifts are absent."
  ]}
];

const relatedProjects = [
  {
    title: "SAIF Zone Logistics Center",
    description: "Intelligent high-bay lighting with aisle-specific occupancy sensing.",
    image: indoorImg,
    link: "/projects"
  },
  {
    title: "Commercial Retail Strip",
    description: "High-efficiency facade and parking lot illumination.",
    image: outdoorImg,
    link: "/projects"
  }
];

export default function LocationSharjah() {
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
