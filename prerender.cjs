const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

if (process.env.VERCEL) {
  console.log('Skipping Puppeteer prerender on Vercel...');
  process.exit(0);
}

const getDynamicRoutes = () => {
  const parseSlugs = (filePath, prefix) => {
    try {
      const content = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
      const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
      return matches.map(m => `${prefix}/${m[1]}`);
    } catch (e) {
      console.error(`Error reading ${filePath}:`, e);
      return [];
    }
  };

  const projectRoutes = parseSlugs('src/data/projects.js', '/projects');
  const productRoutes = parseSlugs('src/data/products.js', '/products');
  const blogRoutes = parseSlugs('src/data/blog.js', '/blog');

  return [...projectRoutes, ...productRoutes, ...blogRoutes];
};

const staticRoutes = [
  '/', '/about', '/projects', '/products', '/contact', '/blog', '/faq',
  '/downloads', '/brands', '/gallery',
  // Money Pages
  '/lighting-company-dubai', '/lighting-showroom-dubai',
  '/ceiling-lights-dubai', '/outdoor-lighting-dubai',
  '/pendant-lights-dubai', '/led-strip-lights-dubai'
];
const allRoutes = [...staticRoutes, ...getDynamicRoutes()];
const routes = allRoutes;

const app = express();
// Serve the dist directory
app.use(express.static(path.join(__dirname, 'dist')));
// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = app.listen(3000, async () => {
  console.log('Starting custom prerenderer...');
  const browser = await puppeteer.launch({ headless: "new" });
  
  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    const page = await browser.newPage();
    
    // Set the global property so our React components know we are prerendering
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER_INJECTED = true;
    });

    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
    
    // Wait an additional 2 seconds to ensure all animations/data are loaded
    await new Promise(r => setTimeout(r, 2000));
    
    const content = await page.content();
    
    // Write to file
    const outputDir = path.join(__dirname, 'dist', route);
    if (route !== '/') {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(route === '/' ? path.join(__dirname, 'dist') : outputDir, 'index.html');
    fs.writeFileSync(outputPath, content);
    
    await page.close();
  }
  
  await browser.close();
  server.close();
  console.log('Prerendering complete!');
});
