import { Map, Truck, Lightbulb, Settings } from "lucide-react";
import LocationTemplate from "../components/templates/LocationTemplate";
import indoorImg from "../assets/images/Funtura/134.webp"; 
import outdoorImg from "../assets/images/xtremezone/136.webp"; 

const seo = {
  title: "Top Lighting Companies in UAE | Credence Lighting",
  description: "Credence Lighting is one of the top lighting companies in the UAE. We provide comprehensive lighting design, supply, and integration across all seven emirates."
};

const faqs = [
  { id: "uae1", question: "Which emirates do you provide lighting services for?", answer: "We supply and execute projects across all seven emirates of the UAE: Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah." },
  { id: "uae2", question: "Do you have local stock available in the UAE?", answer: "Yes, we maintain a significant inventory of architectural downlights, LED strips, drivers, and control systems at our central UAE warehouse, allowing us to support fast-track projects and immediate mock-up requests." },
  { id: "uae3", question: "Can you handle UAE-wide retail brand rollouts?", answer: "Absolutely. We are the designated lighting supplier for several major retail and F&B brands, ensuring strict consistency in color temperature, brightness, and aesthetic across all their UAE branches." }
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Credence Lighting",
      "url": "https://credencelighting.com/lighting-companies-uae",
      "areaServed": {
        "@type": "Country",
        "name": "United Arab Emirates"
      },
      "description": "Premier architectural lighting company serving the entire UAE."
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
  location: "United Arab Emirates",
  title: "Top Lighting Companies in UAE | Credence Lighting",
  titleItalic: "the UAE",
  description: "A trusted lighting supplier for architects, contractors, and developers driving innovation across all seven emirates."
};

const services = [
  { icon: Map, title: "Top Lighting Companies in UAE | Credence Lighting", description: "Dedicated sales and technical support teams serving projects from Abu Dhabi to Fujairah." },
  { icon: Truck, title: "Top Lighting Companies in UAE | Credence Lighting", description: "Fast-track delivery for standard architectural fixtures and control components from our UAE stock." },
  { icon: Lightbulb, title: "Top Lighting Companies in UAE | Credence Lighting", description: "In-house DIALux planning, 3D rendering, and local regulatory compliance (ESTIDAMA, Dubai Municipality)." },
  { icon: Settings, title: "Top Lighting Companies in UAE | Credence Lighting", description: "On-site aiming, focusing, and programming of smart lighting networks." }
];

const contentBlocks = [
  { type: "heading2", content: "A Decade of Excellence in the UAE" },
  { type: "paragraph", content: "The United Arab Emirates sets global benchmarks for architecture and infrastructure. To succeed here, a lighting company must deliver unparalleled quality, adapt to rapidly changing project timelines, and understand the nuances of local regulations. Credence Lighting has spent over a decade building a reputation for reliability. Whether it is a luxury villa in Dubai, a massive commercial tower in Abu Dhabi, or a sprawling resort in RAK, we deliver end-to-end solutions." },
  { type: "list", items: [
    "End-to-End Service: From concept design to post-installation maintenance.",
    "Global Brand Portfolio: Suppliers of top-tier European and Asian lighting manufacturers.",
    "Tailored Solutions: Custom fixture manufacturing for unique architectural details."
  ]}
];

const relatedProjects = [
  {
    title: "Top Lighting Companies in UAE | Credence Lighting",
    description: "Public realm and highway lighting engineered for extreme climates.",
    image: outdoorImg,
    link: "/projects"
  },
  {
    title: "Top Lighting Companies in UAE | Credence Lighting",
    description: "Multi-floor smart lighting rollout for a major UAE banking institution.",
    image: indoorImg,
    link: "/projects"
  }
];

export default function LocationUAE() {
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
