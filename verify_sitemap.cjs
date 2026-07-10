const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const sitemapPath = path.join(distPath, 'sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error("sitemap.xml not found!");
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

const locRegex = /<loc>(.*?)<\/loc>/g;
let match;
const urls = [];

while ((match = locRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

console.log(`Found ${urls.length} URLs in sitemap.xml.`);

let missing = 0;
let valid = 0;

urls.forEach(url => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  
  let filePath;
  if (pathname === '/') {
    filePath = path.join(distPath, 'index.html');
  } else {
    const withoutSlash = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const pathHtml = path.join(distPath, `${withoutSlash}.html`);
    const pathIndexHtml = path.join(distPath, withoutSlash, 'index.html');
    
    // Check pathHtml first, then pathIndexHtml, then pathIndexHtml but nested
    // In our prerenderer, it outputs to dist/path... let's check both
    if (fs.existsSync(pathIndexHtml)) {
      filePath = pathIndexHtml;
    } else if (fs.existsSync(pathHtml)) {
      filePath = pathHtml;
    } else {
      // Sometimes Vite prerender uses index.html in subfolders
      const rawPath = path.join(distPath, pathname);
      if(fs.existsSync(rawPath) && fs.statSync(rawPath).isFile()) {
        filePath = rawPath;
      } else {
         filePath = pathIndexHtml; // default to index.html for error message
      }
    }
  }

  if (fs.existsSync(filePath)) {
    valid++;
  } else {
    console.error(`❌ Missing file for URL: ${url} (Expected: ${filePath})`);
    missing++;
  }
});

console.log(`\nVerification complete:`);
console.log(`✅ Valid links: ${valid}`);
console.log(`❌ Broken links: ${missing}`);

if (missing > 0) {
  process.exit(1);
}
