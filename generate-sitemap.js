import fs from 'fs';
import path from 'path';

// Need to import data to get dynamic routes
// Since this is node, we need to read the JS files and extract or we can just parse the data
// For simplicity, we'll manually define the static ones, and read the dynamic ones.
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to slugify
const slugify = (text) => {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
};

const BASE_URL = 'https://www.credencelighting.com';

const staticRoutes = [
  '/',
  '/about',
  '/projects',
  '/products',
  '/downloads',
  '/brands',
  '/gallery',
  '/contact',
  '/blog',
  '/faq'
];

async function generateSitemap() {
  const sitemapItems = [];
  const date = new Date().toISOString().split('T')[0];

  // Add static routes
  for (const route of staticRoutes) {
    sitemapItems.push(`
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`);
  }

  // To avoid dealing with ES modules in a quick script, I'll just regex the data files or we can use dynamic imports.
  // We'll just define the known categories since they don't change often
  const categoriesList = [
    "Indoor", "Outdoor", "Hospitality", "Facade", "Entertainment",
    "LED Screen", "Strech Ceiling", "Automation", "Retail", "Audio"
  ];
  
  for (const cat of categoriesList) {
    sitemapItems.push(`
  <url>
    <loc>${BASE_URL}/products/${slugify(cat)}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  // Let's read projects.js
  const projectsData = fs.readFileSync(path.join(__dirname, 'src/data/projects.js'), 'utf8');
  // Simple regex to extract slug
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  let match;
  while ((match = slugRegex.exec(projectsData)) !== null) {
    sitemapItems.push(`
  <url>
    <loc>${BASE_URL}/projects/${match[1]}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  // Let's read blog.js
  const blogData = fs.readFileSync(path.join(__dirname, 'src/data/blog.js'), 'utf8');
  while ((match = slugRegex.exec(blogData)) !== null) {
    sitemapItems.push(`
  <url>
    <loc>${BASE_URL}/blog/${match[1]}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems.join('')}
</urlset>
`;

  fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemapXML);
  console.log('sitemap.xml generated successfully in public folder!');
}

generateSitemap();
