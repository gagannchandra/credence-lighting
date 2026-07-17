const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('No sitemap found.');
  process.exit(0);
}

let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Lower the priority of all pages to 0.6 by default
sitemap = sitemap.replace(/<priority>[^<]+<\/priority>/g, '<priority>0.6</priority>');

// These are the exact pages you want to show up as Sitelinks
const priorityPages = [
  '/', 
  '/products',
  '/contact', 
  '/solutions', 
  '/brands',    // "Our Clients & Brands"
  '/about',
  '/projects'   // "Featured Projects"
];

// Boost the priority of the important pages to 1.0
for (const route of priorityPages) {
  const urlPath = route === '/' ? '/?' : route;
  const regex = new RegExp(`(<loc>https:\\/\\/credencelighting\\.com${urlPath}<\\/loc>[\\s\\S]*?<priority>)0\\.6(<\\/priority>)`, 'g');
  sitemap = sitemap.replace(regex, '$11.0$2');
}

fs.writeFileSync(sitemapPath, sitemap);
console.log('Sitemap priorities updated successfully!');
