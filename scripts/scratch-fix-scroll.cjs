const fs = require('fs');

const files = [
  './src/pages/Projects.jsx',
  './src/pages/Solutions.jsx',
  './src/pages/Products.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/scrollToTop\(\)/g, 'window.scrollTo(0, 0)');
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed', file);
});
