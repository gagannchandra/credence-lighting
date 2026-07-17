import fs from 'fs';
import path from 'path';

// Using regex to extract data from the JS files instead of evaluating them
// to avoid import issues.

function extractArrayOfObjects(fileContent, arrayName) {
  const match = fileContent.match(new RegExp(`(?:export\\s+const|const)\\s+${arrayName}\\s*=\\s*(\\[[\\s\\S]*?\\]);`));
  if (!match) return null;
  
  let stringified = match[1]
    .replace(/(?<!["'])\b([a-zA-Z0-9_]+)\b(?=\s*:)/g, '"$1"') // Quote keys
    .replace(/'/g, '"') // Replace single quotes with double quotes
    .replace(/,\s*(?=\])/g, '') // Remove trailing commas
    .replace(/aiImg\d+/g, '"image"') // Replace image variables with strings
    .replace(/mytown\d+|gc\d+|funtura\d+|xtreme\d+|xtremez\d+|smarvy\d+/g, '"image"');
  
  // This might still be unparseable if there are complex structures (e.g. nested variables).
  // An alternative is using Function or eval with mocked imports.
  return stringified;
}

const rootDir = '/home/gagan-chandra/Code/Credence-Lighting/src/data';
const blogJs = fs.readFileSync(path.join(rootDir, 'blog.js'), 'utf8');
const faqJs = fs.readFileSync(path.join(rootDir, 'faq.js'), 'utf8');
const projectsJs = fs.readFileSync(path.join(rootDir, 'projects.js'), 'utf8');

console.log("Read files successfully.");
