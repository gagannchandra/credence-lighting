import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllHtmlFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

const distPath = path.join(process.cwd(), 'dist');
const htmlFiles = getAllHtmlFiles(distPath);

const results = [];
let totalWebsitesWeHave = htmlFiles.length; // Number of pages we have

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : 'No Title';
  
  // Categorize based on SEO best practices (approximate)
  let category = '';
  const len = title.length;
  if (len === 0 || title === 'No Title') {
    category = 'change required';
  } else if (len > 0 && len < 30) {
    category = 'bad';
  } else if (len >= 30 && len <= 60) {
    category = 'good';
  } else if (len > 60 && len <= 70) {
    category = 'okay';
  } else {
    category = 'change required'; // too long
  }

  // Also check if it's default generic title
  if (title.toLowerCase().includes('vite') || title === 'Credence Lighting') {
     category = 'change required';
  }

  let urlPath = file.replace(distPath, '');
  if (urlPath.endsWith('index.html')) {
    urlPath = urlPath.replace('index.html', '');
  }
  
  results.push({
    url: urlPath,
    title: title,
    length: len,
    category: category
  });
});

console.log(JSON.stringify({
  totalCrawled: totalWebsitesWeHave,
  results: results
}, null, 2));
