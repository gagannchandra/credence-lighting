import puppeteer from 'puppeteer';
import fs from 'fs';

const URLS = [
  'http://localhost:5173/',
  'http://localhost:5173/about',
  'http://localhost:5173/faq',
  'http://localhost:5173/lighting-company-dubai',
  'http://localhost:5173/blog/evolution-of-architectural-lighting'
];

async function analyzeUrl(browser, url) {
  const page = await browser.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (e) {
    console.error(`Failed to load ${url}:`, e.message);
    await page.close();
    return null;
  }

  const seoData = await page.evaluate(() => {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.content;
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
    const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim());
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
    const ogDesc = document.querySelector('meta[property="og:description"]')?.content;
    
    // JSON-LD Scripts
    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try {
        return JSON.parse(s.innerText);
      } catch (e) {
        return "Invalid JSON";
      }
    });

    // Images without alt
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt]), img[alt=""]').length;
    const totalImages = document.querySelectorAll('img').length;

    // Semantic HTML checks
    const hasArticle = document.querySelector('article') !== null;
    const hasDetails = document.querySelector('details') !== null;
    const hasNav = document.querySelector('nav') !== null;
    const hasMain = document.querySelector('main') !== null;

    return {
      title, description, canonical, h1Count: h1s.length, h1s, h2s: h2s.slice(0, 3),
      ogTitle, ogDesc, jsonLd: jsonLdScripts,
      imagesWithoutAlt, totalImages,
      semanticTags: { hasArticle, hasDetails, hasNav, hasMain }
    };
  });

  await page.close();
  return { url, ...seoData };
}

async function run() {
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  const results = [];
  for (const url of URLS) {
    console.log(`Analyzing ${url}...`);
    const res = await analyzeUrl(browser, url);
    if (res) results.push(res);
  }
  
  await browser.close();
  
  fs.writeFileSync('seo_audit_results.json', JSON.stringify(results, null, 2));
  console.log("Audit complete. Results saved to seo_audit_results.json");
}

run();
