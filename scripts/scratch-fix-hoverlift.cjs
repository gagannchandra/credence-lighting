const fs = require('fs');

const files = [
  './src/components/home/ProjectsSection.jsx',
  './src/components/home/ProductsSection.jsx',
  './src/components/home/BrandsSection.jsx',
  './src/components/home/AboutSection.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Remove HoverLift
  if (content.includes('import HoverLift from')) {
    content = content.replace(/import HoverLift from [^\n]+\n/g, '');
    changed = true;
  }
  if (content.includes('<HoverLift>')) {
    content = content.replace(/<HoverLift>/g, '<div className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300">');
    changed = true;
  }
  if (content.includes('<HoverLift className=')) {
    content = content.replace(/<HoverLift className="([^"]+)">/g, '<div className="$1 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">');
    changed = true;
  }
  if (content.includes('</HoverLift>')) {
    content = content.replace(/<\/HoverLift>/g, '</div>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed HoverLift in', file);
  }
});
