const fs = require('fs');
const path = require('path');

const directory = './src';

// We map common hardcoded typography classes to our fluid typography classes
const regexes = [
  // H1 Replacements
  {
    regex: /text-4xl sm:text-5xl md:text-8xl/g,
    replacement: 'text-fluid-h1'
  },
  {
    regex: /text-5xl md:text-7xl lg:text-\[5\.5rem\]/g,
    replacement: 'text-fluid-h1'
  },
  {
    regex: /text-4xl sm:text-5xl md:text-7xl/g,
    replacement: 'text-fluid-h1'
  },
  {
    regex: /text-5xl md:text-7xl/g,
    replacement: 'text-fluid-h1'
  },
  {
    regex: /text-4xl sm:text-5xl md:text-6xl lg:text-\[4\.5rem\]/g,
    replacement: 'text-fluid-h1'
  },
  {
    regex: /text-4xl md:text-6xl/g,
    replacement: 'text-fluid-h1'
  },
  {
    regex: /text-3xl md:text-7xl/g,
    replacement: 'text-fluid-h1'
  },
  // H2 Replacements
  {
    regex: /text-3xl md:text-5xl/g,
    replacement: 'text-fluid-h2'
  },
  {
    regex: /text-4xl md:text-5xl/g,
    replacement: 'text-fluid-h2'
  },
  {
    regex: /text-3xl md:text-4xl lg:text-5xl/g,
    replacement: 'text-fluid-h2'
  },
  {
    regex: /text-3xl md:text-4xl/g,
    replacement: 'text-fluid-h2'
  },
  // Cleanups for redundant classes since text-fluid-h1/h2 already include leading and tracking
  {
    regex: /text-fluid-h1 font-serif text-white leading-tight/g,
    replacement: 'text-fluid-h1 font-serif text-white'
  },
  {
    regex: /text-fluid-h1 font-serif text-white leading-\[1\.1\] tracking-tight/g,
    replacement: 'text-fluid-h1 font-serif text-white'
  },
  {
    regex: /text-white text-fluid-h1 font-serif leading-\[1\.1\] mb-6 tracking-tight/g,
    replacement: 'text-white text-fluid-h1 font-serif mb-6'
  },
  {
    regex: /text-fluid-h2 font-serif text-white tracking-wide/g,
    replacement: 'text-fluid-h2 font-serif text-white'
  }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      regexes.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });
      
      // Secondary cleanup loop just in case
      content = content.replace(/text-fluid-h[12]([\w\s-]+?)leading-(?:tight|\[[\d\.]+\])/g, 'text-fluid-h1$1');
      content = content.replace(/text-fluid-h[12]([\w\s-]+?)tracking-(?:tight|wide)/g, 'text-fluid-h1$1');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated typography in ${filePath}`);
      }
    }
  });
}

processDirectory(directory);
