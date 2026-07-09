const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

if (process.env.VERCEL) {
  console.log('Skipping Puppeteer prerender on Vercel...');
  process.exit(0);
}

const getDynamicRoutes = () => {
  try {
    const content = fs.readFileSync(path.resolve(__dirname, 'src/data/routes.js'), 'utf-8');
    
    const extractArray = (name) => {
      const regex = new RegExp(`export const ${name}\\s*=\\s*\\[([^\\]]+)\\];`);
      const match = content.match(regex);
      if (!match) return [];
      return [...match[1].matchAll(/["']([^"']+)["']/g)].map(m => m[1]);
    };
    
    const projectSlugs = extractArray('projectSlugs');
    const blogSlugs = extractArray('blogSlugs');
    const productCategories = extractArray('productCategories');
    
    const slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
    
    const projectRoutes = projectSlugs.map(slug => `/projects/${slug}`);
    const blogRoutes = blogSlugs.map(slug => `/blog/${slug}`);
    const productRoutes = productCategories.map(cat => `/products/${slugify(cat)}`);
    
    return [...projectRoutes, ...productRoutes, ...blogRoutes];
  } catch (e) {
    console.error("Error reading routes.js:", e);
    return [];
  }
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
const originalIndexHtml = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf8');

// Serve the dist directory
app.use(express.static(path.join(__dirname, 'dist')));
// Fallback to original index.html for SPA routing
app.use((req, res) => {
  res.send(originalIndexHtml);
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

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

    await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
    
    // Wait for the app to render real content into #root
    await page.waitForFunction(() => {
      const root = document.querySelector('#root');
      return root && root.children.length > 0 && !root.innerHTML.includes('Initializing Experience');
    }, { timeout: 10000 });
    
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
