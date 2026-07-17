const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('No sitemap found.');
  process.exit(0);
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
  if (!seen.has(loc)) {
    seen.add(loc);
    deduped.push(block);
  }
}

console.log(`Sitemap: ${seen.size + (sitemap.match(/<url>/g) || []).length - deduped.length - seen.size} duplicates removed. ${seen.size} unique URLs retained.`);

// ── 3. Calibrate changefreq per page type ────────────────────────────────────
const changefreqRules = [
  // Homepage — changes most
  { pattern: /^https:\/\/credencelighting\.com\/$/, changefreq: 'daily' },
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
  const urlPath = locMatch[1].replace('https://credencelighting.com', '') || '/';
  const priority = priorityPages.includes(urlPath) ? '1.0' : '0.6';
  return block.replace(/<priority>[^<]+<\/priority>/, `<priority>${priority}</priority>`);
});

// ── 5. Reconstruct sitemap ───────────────────────────────────────────────────
const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const urlsetOpen = sitemap.match(/<urlset[^>]*>/)?.[0] || '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
const newSitemap = `${xmlHeader}\n${urlsetOpen}\n${prioritizedBlocks.join('\n')}\n</urlset>`;

fs.writeFileSync(sitemapPath, newSitemap);
console.log(`Sitemap written: ${prioritizedBlocks.length} URLs, deduplicated, typo fixed, changefreq calibrated.`);
