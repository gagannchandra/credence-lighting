const express = require('express');
const path = require('path');
const fs = require('fs');
const Critters = require('critters');

const puppeteer = process.env.VERCEL ? require('puppeteer-core') : require('puppeteer');
const chromium = process.env.VERCEL ? require('@sparticuz/chromium').default || require('@sparticuz/chromium') : null;

const getDynamicRoutes = () => {
  try {
    const content = fs.readFileSync(path.resolve(__dirname, '..', 'src/data/routes.js'), 'utf-8');
    
    const extractArray = (name) => {
      const regex = new RegExp(`export const ${name}\\s*=\\s*(\\[[\\s\\S]*?\\]);`);
      const match = content.match(regex);
      if (!match) return [];
      try {
        // Use Function to evaluate the JS array literal. 
        // This gracefully handles single quotes, trailing commas, and comments, unlike JSON.parse.
        return new Function(`return ${match[1]};`)();
      } catch (err) {
        console.error(`Failed to parse array for ${name}:`, err);
        return [];
      }
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
  '/', '/about', '/projects', '/products', '/solutions', '/contact', '/blog', '/faq',
  '/downloads', '/brands', '/gallery',
  // Money Pages
  '/lighting-company-dubai', '/lighting-showroom-dubai',
  '/ceiling-lights-dubai', '/outdoor-lighting-dubai',
  '/pendant-lights-dubai', '/led-strip-lights-dubai',
  // Industry Pages
  '/hotel-lighting', '/residential-lighting', '/office-lighting',
  '/retail-lighting', '/restaurant-lighting', '/entertainment-lighting',
  '/audio-solutions', '/facade-lighting',
  // Location Pages
  '/lighting-suppliers-abu-dhabi', '/lighting-companies-sharjah',
  '/lighting-solutions-ajman', '/lighting-solutions-rak',
  '/lighting-companies-uae', '/lighting-companies-saudi-arabia',
  '/lighting-companies-bahrain'
];
const allRoutes = [...staticRoutes, ...getDynamicRoutes()];
const routes = allRoutes;

const app = express();
const originalIndexHtml = fs.readFileSync(path.join(__dirname, '..', 'dist', 'index.html'), 'utf8');

// Serve the dist directory
app.use(express.static(path.join(__dirname, '..', 'dist')));
// Fallback to original index.html for SPA routing
app.use((req, res) => {
  res.send(originalIndexHtml);
});

const server = app.listen(3000, async () => {
  console.log('Starting custom prerenderer...');
  
  let browser;
  if (process.env.VERCEL) {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
  } else {
    browser = await puppeteer.launch({ headless: "new" });
  }

  const page = await browser.newPage();
  
  // Set the global property so our React components know we are prerendering
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER_INJECTED = true;
  });

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

  const critters = new Critters({
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    preload: 'swap',
    inlineThreshold: 0
  });

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    try {
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait for the app to render real content into #root
      await page.waitForFunction(() => {
        const root = document.querySelector('#root');
        return root && root.children.length > 0 && !root.innerHTML.includes('Initializing Experience');
      }, { timeout: 15000 });
      
      let content = await page.content();
      
      // Fix CORS: Puppeteer sometimes bakes absolute localhost URLs into the HTML (e.g. for modulepreloads)
      content = content.replace(/http:\/\/localhost:3000/g, '');
      
      // Inline critical CSS and defer the rest
      content = await critters.process(content);
      
      // Fix: critters outputs <link rel="stylesheet" ... onload="this.rel='stylesheet'">
      // which is still render-blocking. Convert to proper preload pattern.
      // Match the exact critters output format with bare crossorigin attribute.
      content = content.replaceAll(
        `<link rel="stylesheet" crossorigin href="/assets/style-`,
        `<link rel="preload" as="style" crossorigin href="/assets/style-`
      );
      // Fix the noscript fallback — remove the onload handler
      content = content.replace(
        /<noscript>(<link[^>]*href="\/assets\/style-[^"]*\.css"[^>]*)onload="this\.rel='stylesheet'"([^>]*>)<\/noscript>/g,
        '<noscript>$1$2</noscript>'
      );
      
      // Write to file
      const outputDir = path.join(__dirname, '..', 'dist', route);
      if (route !== '/') {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const outputPath = path.join(route === '/' ? path.join(__dirname, '..', 'dist') : outputDir, 'index.html');
      fs.writeFileSync(outputPath, content);
    } catch (err) {
      console.error(`Failed to prerender ${route}:`, err.message);
    }
  }
  
  await page.close();
  await browser.close();
  server.close();

  // Restore the full robots.txt (the build process can strip Disallow rules)
  const robotsSrc = path.join(__dirname, '..', 'public', 'robots.txt');
  const robotsDest = path.join(__dirname, '..', 'dist', 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDest);
    console.log('robots.txt restored from public/');
  }

  console.log('Prerendering complete!');

  // ── Sitemap Fix Logic ──

const sitemapPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('No sitemap found.');
  return;
}

let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// ── 1. Fix the strech-ceiling typo ──────────────────────────────────────────
sitemap = sitemap.replace(/strech-ceiling/g, 'stretch-ceiling');

// ── 2. Deduplicate <url> blocks ──────────────────────────────────────────────
// Parse all <url>...</url> blocks, keep only the first occurrence of each <loc>
const urlBlockRegex = /<url>([\s\S]*?)<\/url>/g;
const seen = new Set();
const deduped = [];
let match;

while ((match = urlBlockRegex.exec(sitemap)) !== null) {
  const block = match[0];
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  if (!locMatch) continue;
  const loc = locMatch[1];
  
  // Exclude internal/fallback links
  if (loc.includes('/sitemap-links')) continue;

  if (!seen.has(loc)) {
    seen.add(loc);
    deduped.push(block);
  }
}

console.log(`Sitemap: ${seen.size + (sitemap.match(/<url>/g) || []).length - deduped.length - seen.size} duplicates removed. ${seen.size} unique URLs retained.`);

// ── 3. Calibrate changefreq per page type ────────────────────────────────────
const changefreqRules = [
  // Homepage — changes most
  { pattern: /^\/$/, changefreq: 'daily' },
  // Core money/commercial pages
  { pattern: /\/(lighting-company-dubai|lighting-showroom-dubai|ceiling-lights-dubai|outdoor-lighting-dubai|pendant-lights-dubai|led-strip-lights-dubai)$/, changefreq: 'weekly' },
  // Industry solution pages
  { pattern: /\/(hotel-lighting|residential-lighting|office-lighting|retail-lighting|restaurant-lighting|entertainment-lighting|audio-solutions|facade-lighting)$/, changefreq: 'weekly' },
  // Core nav pages
  { pattern: /\/(products|projects|solutions|about|brands|contact|gallery|downloads|faq|blog)$/, changefreq: 'weekly' },
  // Product category pages
  { pattern: /\/products\/.+/, changefreq: 'weekly' },
  // Project detail pages
  { pattern: /\/projects\/.+/, changefreq: 'monthly' },
  // Blog posts — published once, rarely change
  { pattern: /\/blog\/.+/, changefreq: 'monthly' },
  // Location pages — very stable
  { pattern: /\/(lighting-suppliers-abu-dhabi|lighting-companies-sharjah|lighting-solutions-ajman|lighting-solutions-rak|lighting-companies-uae|lighting-companies-saudi-arabia|lighting-companies-bahrain)$/, changefreq: 'monthly' },
];

const calibratedBlocks = deduped.map(block => {
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  if (!locMatch) return block;
  const loc = locMatch[1];

  let newChangefreq = 'monthly'; // safe default
  for (const rule of changefreqRules) {
    const urlPath = loc.replace('https://credencelighting.com', '');
    if (rule.pattern.test(urlPath === '' ? '/' : urlPath)) {
      newChangefreq = rule.changefreq;
      break;
    }
  }
  return block.replace(/<changefreq>[^<]+<\/changefreq>/, `<changefreq>${newChangefreq}</changefreq>`);
});

// ── 4. Set priorities ────────────────────────────────────────────────────────
const priorityPages = ['/', '/products', '/contact', '/solutions', '/brands', '/about', '/projects'];

const prioritizedBlocks = calibratedBlocks.map(block => {
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  if (!locMatch) return block;
  const urlPath = locMatch[1].replace('https://credencelighting.com', '').replace(/\/$/, '') || '/';
  const priority = priorityPages.includes(urlPath) ? '1.0' : '0.6';
  return block.replace(/<priority>[^<]+<\/priority>/, `<priority>${priority}</priority>`);
});

// ── 5. Reconstruct sitemap ───────────────────────────────────────────────────
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const urlsetOpen = sitemap.match(/<urlset[^>]*>/)?.[0] || '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
const newSitemap = `${xmlHeader}\n${urlsetOpen}\n${prioritizedBlocks.join('\n')}\n</urlset>`;

fs.writeFileSync(sitemapPath, newSitemap);
console.log(`Sitemap written: ${prioritizedBlocks.length} URLs, deduplicated, typo fixed, changefreq calibrated.`);

});
