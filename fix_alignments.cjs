const fs = require('fs');

const files = [
  'src/components/home/AboutSection.jsx',
  'src/components/home/GlobalPresence.jsx',
  'src/components/seo/InlineFAQ.jsx',
  'src/components/blog/ArticleBody.jsx',
  'src/components/blog/ArticleTOC.jsx',
  'src/components/faq/FaqAccordionItem.jsx',
  'src/pages/Faq.jsx',
  'src/pages/CeilingLightsDubai.jsx',
  'src/pages/LEDStripLightsDubai.jsx',
  'src/pages/OutdoorLightingDubai.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace text-left with text-center md:text-left IF it isn't already preceded by md:
  content = content.replace(/(?<!md:)\btext-left\b/g, 'text-center md:text-left');
  // Avoid doubling text-center
  content = content.replace(/text-center\s+text-center/g, 'text-center');
  content = content.replace(/md:text-left\s+md:text-left/g, 'md:text-left');
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
