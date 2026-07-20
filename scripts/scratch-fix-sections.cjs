const fs = require('fs');

const files = [
  './src/components/home/ProjectsSection.jsx',
  './src/components/home/ProductsSection.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import { saveReturnState } from "\.\.\/\.\.\/utils\/navigationState";\n/g, '');
  content = content.replace(/onClick=\{[^}]*saveReturnState\(\{[^}]*\}\)[^}]*\}/g, '');
  
  // also handle standard onClicks if they were wrapped in block
  content = content.replace(/onClick=\{\(\) => \{[^}]*saveReturnState\(\{[^}]*\}\);[^}]*\}\}/g, '');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', file);
});
