import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles('./src');

const replacements = [
  // Golds -> brand-gold
  { regex: /text-\[#([cC]8[aA]96[bB]|[cC]8[aA]46[aA]|[bB]89[bB]5[eE]|[dD]4[bB]16[aA])\]/g, replacement: 'text-brand-gold' },
  { regex: /bg-\[#([cC]8[aA]96[bB]|[cC]8[aA]46[aA]|[bB]89[bB]5[eE]|[dD]4[bB]16[aA])\]/g, replacement: 'bg-brand-gold' },
  { regex: /border-\[#([cC]8[aA]96[bB]|[cC]8[aA]46[aA]|[bB]89[bB]5[eE]|[dD]4[bB]16[aA])\]/g, replacement: 'border-brand-gold' },
  { regex: /from-\[#([cC]8[aA]96[bB]|[cC]8[aA]46[aA]|[bB]89[bB]5[eE]|[dD]4[bB]16[aA])\]/g, replacement: 'from-brand-gold' },
  { regex: /to-\[#([cC]8[aA]96[bB]|[cC]8[aA]46[aA]|[bB]89[bB]5[eE]|[dD]4[bB]16[aA])\]/g, replacement: 'to-brand-gold' },
  { regex: /via-\[#([cC]8[aA]96[bB]|[cC]8[aA]46[aA]|[bB]89[bB]5[eE]|[dD]4[bB]16[aA])\]/g, replacement: 'via-brand-gold' },
  { regex: /shadow-\[0_0_10px_#([cC]8[aA]96[bB])\]/g, replacement: 'shadow-glow' },

  // Darks -> surface-base or elevated
  { regex: /bg-\[#(030408|050505|0a0a0a|111|111111)\]/g, replacement: 'bg-surface-elevated' },
  { regex: /border-\[#(030408|050505|0a0a0a|111|111111)\]/g, replacement: 'border-border-subtle' },
  { regex: /text-\[#(030408|050505|0a0a0a|111|111111)\]/g, replacement: 'text-surface-elevated' },
  
  // Whites/Greys
  { regex: /border-white\/5/g, replacement: 'border-border-subtle' },
  
  // Custom text colors
  { regex: /text-\[#F3F1EC\]/g, replacement: 'text-content-primary' },
  
  // Rounded arbitrary
  { regex: /rounded-2xl/g, replacement: 'rounded-panel' },
  { regex: /rounded-xl/g, replacement: 'rounded-card' },
  { regex: /rounded-full/g, replacement: 'rounded-button' }
];

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Updated ${changedFiles} files with semantic tokens.`);
