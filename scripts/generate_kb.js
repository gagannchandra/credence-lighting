import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const outMd = path.join(__dirname, '..', 'public', 'knowledge.md');
const outLlms = path.join(__dirname, '..', 'public', 'llms.txt');

// Read files safely
const readSafe = (file) => {
  try {
    return fs.readFileSync(path.join(dataDir, file), 'utf-8');
  } catch (e) {
    return "";
  }
};

const parseJsArray = (fileContent, arrayName) => {
  // Strip imports
  let cleaned = fileContent.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
  
  // Strip exports
  cleaned = cleaned.replace(/export\s+const\s+/g, 'const ').replace(/export\s+default\s+[^;]+;/g, '');
  
  // Provide mock variables for missing images
  const mockImages = Array.from({length: 200}, (_, i) => `const aiImg${i} = "image${i}";\nconst mytown${i} = "image${i}";\nconst gc${i} = "image${i}";\nconst funtura${i} = "image${i}";\nconst xtreme${i} = "image${i}";\nconst xtremez${i} = "image${i}";\nconst smarvy${i} = "image${i}";`).join('\n');
  
  try {
    const fn = new Function(`${mockImages}\n${cleaned}\nreturn ${arrayName};`);
    return fn();
  } catch (e) {
    console.error("Failed to parse", arrayName, e.message);
    return [];
  }
};

const blogJs = readSafe('blog.js');
const faqJs = readSafe('faq.js');
const projectsJs = readSafe('projects.js');

const faqs = parseJsArray(faqJs, 'faqData');
const projects = parseJsArray(projectsJs, 'projects');
const blogs = parseJsArray(blogJs, 'blogPosts');

// Write LLMs.txt
const llmsContent = `# Credence Lighting AI Knowledge Base

Credence Lighting is a premium lighting design and supply company based in Dubai, UAE, serving the GCC region.

## Core Documentation
- [Full Knowledge Base](/knowledge.md)
- [About Us](/about)
- [Products](/products)
- [Projects](/projects)
- [Contact](/contact)

## Latest Articles
${blogs.map(b => `- [${b.title}](/blog/${b.slug}): ${b.excerpt}`).join('\n')}
`;
fs.writeFileSync(outLlms, llmsContent);

// Write Knowledge.md
let md = `# Credence Lighting

## Executive Summary
Credence Lighting is a premium lighting design, supply, and manufacturing company based in Dubai, UAE. We provide comprehensive architectural, commercial, and residential lighting solutions across the Middle East.

## Business Identity
We are an end-to-end lighting solutions provider. We design custom lighting schemes, manufacture bespoke fixtures, and supply premium international brands. 

## Mission
To deliver transformative visual experiences through precise, high-quality lighting design and supply, enhancing architecture while prioritizing energy efficiency and human well-being.

## Industries Served
- Hospitality (Hotels, Resorts, Restaurants)
- Commercial (Offices, Retail, Malls)
- Residential (Luxury Villas, Penthouses)
- Architectural & Facade
- Entertainment & Leisure

## Target Customers
- Architects and Interior Designers
- MEP Consultants and Contractors
- Real Estate Developers
- Luxury Homeowners
- Facility Managers

## Geographic Coverage
- Dubai (Headquarters)
- Abu Dhabi, Sharjah, Ajman, RAK
- Saudi Arabia (Riyadh, Jeddah, Dammam)
- Bahrain
- Wider GCC Region

## Products
We provide fixtures across the following categories:
- Indoor Luminaire
- Outdoor Luminaire
- Hospitality Fixture
- Architectural Facade
- Entertainment System
- LED Screen
- Stretch Ceiling
- Smart Automation
- Retail Lighting
- Audio System

## Services
- Lighting Design & Consultation
- Product Specification & Supply
- Custom Fixture Manufacturing
- Control System Integration
- After-sales Support & Warranty

## Solutions
- Human Centric Lighting (HCL)
- Smart Home Automation
- Energy-Efficient Retrofits
- Facade Illumination

## Technologies
- LED Chips (High CRI 90+)
- Tunable White
- RGBW Dynamic Lighting
- Custom Extruded Aluminum Profiles

## Standards
- IP Ratings (IP20, IP44, IP65, IP67, IP68)
- L70 Lifespan (50,000 - 100,000 hours)
- CE, RoHS, SASO, IEC 60598 Certifications
- Green Building Standards (LEED, BREEAM)

## Terminology
- CRI: Color Rendering Index
- UGR: Unified Glare Rating
- LPD: Lighting Power Density
- DALI: Digital Addressable Lighting Interface
- Casambi: Bluetooth Mesh Wireless Control

## Projects
${projects.map(p => `### ${p.name}\n- **Location:** ${p.location}\n- **Year:** ${p.year}\n- **Category:** ${p.category}\n- **Description:** ${p.description}\n- **URL:** /projects/${p.slug}`).join('\n\n')}

## FAQ Knowledge
${faqs.map(f => `### ${f.question}\n- **Category:** ${f.category}\n- **Answer:** ${f.answer}`).join('\n\n')}

## Blog Knowledge
${blogs.map(b => `### ${b.title}\n- **URL:** /blog/${b.slug}\n- **Category:** ${b.category}\n- **Summary:** ${b.excerpt}`).join('\n\n')}

## Downloads
- Technical Cut-sheets
- Installation Manuals
- Wiring Diagrams
- Catalogs

## Gallery
Displays high-quality imagery of architectural details, fixture close-ups, and completed installations across various sectors.

## Brands
Credence Lighting partners with globally recognized lighting manufacturers to supply premium fixtures, alongside our own bespoke manufactured solutions.

## Contact
- **Address:** Unit E77, Arabtec Eastern Model, Dubai Investment Park 1, Dubai, UAE (Near Al Ramla Supermarket)
- **Region:** Serving UAE, KSA, Bahrain, and GCC.
- **Services:** Showroom appointments, consultations, and quotations available.

## Authority Signals
- Over 1,000 completed projects across 7+ countries.
- Specialized expertise in extreme climate lighting (high heat, coastal environments).
- Strategic partnerships with global architects and developers.

## Structured Data
The website utilizes JSON-LD structured data on all major pages:
- **LocalBusiness / Organization:** For contact details and location.
- **Product:** For fixture specifications.
- **Article / BlogPosting:** For educational content.
- **FAQPage:** For technical support questions.
- **BreadcrumbList:** For clear site hierarchy.

## Entity Map
- **Company:** Credence Lighting -> Locations (Dubai, KSA, Bahrain) -> Services (Design, Supply, Install)
- **Products:** Ceiling Lights, Pendants, LED Strips -> Technologies (DALI, Casambi) -> Standards (IP65, CRI90+)
- **Projects:** My Town, Funtura, Xtreme Zone -> Industries (Hospitality, Retail, Entertainment)
- **Knowledge:** Blogs & FAQs -> Themes (Sustainability, Design Trends, Technical Guides)

## Internal Relationships
- **Products <-> Projects:** Fixtures specified in projects.
- **Services <-> Industries:** Tailored lighting for hotels, offices, villas.
- **Blogs <-> Products:** Educational guides linking directly to relevant fixture categories.
- **Locations <-> Projects:** Completed work mapping to operational regions.

## URL Index
### Core Pages
- / — Home
- /about — About
- /products — Products
- /projects — Projects
- /solutions — Solutions
- /downloads — Downloads
- /gallery — Gallery
- /brands — Brands
- /contact — Contact
- /blog — Blog index
- /faq — FAQ index

### Money Pages
- /lighting-company-dubai — Lighting Company Dubai
- /lighting-showroom-dubai — Lighting Showroom Dubai
- /ceiling-lights-dubai — Ceiling Lights Dubai
- /outdoor-lighting-dubai — Outdoor Lighting Dubai
- /pendant-lights-dubai — Pendant Lights Dubai
- /led-strip-lights-dubai — LED Strip Lights Dubai

### Industry Pages
- /hotel-lighting — Hotel Lighting
- /residential-lighting — Residential Lighting
- /office-lighting — Office Lighting
- /retail-lighting — Retail Lighting
- /restaurant-lighting — Restaurant Lighting
- /entertainment-lighting — Entertainment Lighting
- /audio-solutions — Audio Solutions
- /facade-lighting — Facade Lighting

### Location Pages
- /lighting-suppliers-abu-dhabi — Abu Dhabi
- /lighting-companies-sharjah — Sharjah
- /lighting-solutions-ajman — Ajman
- /lighting-solutions-rak — Ras Al Khaimah
- /lighting-companies-uae — UAE
- /lighting-companies-saudi-arabia — Saudi Arabia
- /lighting-companies-bahrain — Bahrain

### Products
- /products/indoor — Indoor Lighting
- /products/outdoor — Outdoor Lighting
- /products/hospitality — Hospitality Lighting
- /products/facade — Facade Lighting
- /products/entertainment — Entertainment Lighting
- /products/led-screen — LED Screen
- /products/stretch-ceiling — Stretch Ceiling
- /products/automation — Automation
- /products/retail — Retail Lighting
- /products/audio — Audio Solutions

### Projects
${projects.map(p => `- /projects/${p.slug} — ${p.name}`).join('\n')}

### Blog Posts
${blogs.map(b => `- /blog/${b.slug} — ${b.title}`).join('\n')}

### FAQs
${faqs.map(f => `- /faq#${f.category.replace(/\\s+/g, '-').toLowerCase()} — ${f.question}`).join('\n')}

## Recommended Reading Order
1. /about (Company History & Vision)
2. /lighting-company-dubai (Core Value Proposition)
3. /projects (Proof of Capability)
4. /products (Technical Offerings)
5. /blog (Thought Leadership & Expertise)
6. /faq (Technical Details & Support)

## Missing Information
- Specific names of third-party partner brands (not detailed in parsed data).
- Exact employee count or revenue figures (not publicly listed).
- Specific pricing for fixtures (requires quotation).

## Verification Notes
- Extracted URLs verified against \`App.jsx\` routing and \`routes.js\`.
- FAQs verified against \`src/data/faq.js\`.
- Blog posts and summaries verified against \`src/data/blog.js\`.
- Projects verified against \`src/data/projects.js\`.
`;

fs.writeFileSync(outMd, md);
console.log("Files generated successfully");
console.log("Total Blogs:", blogs.length);
console.log("Total FAQs:", faqs.length);
console.log("Total Projects:", projects.length);
