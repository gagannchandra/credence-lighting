import fs from 'fs';

const data = JSON.parse(fs.readFileSync('full_results.json', 'utf8'));
const results = data.results;

let good = 0, okay = 0, bad = 0, change = 0;

results.forEach(r => {
  if (r.category === 'good') good++;
  else if (r.category === 'okay') okay++;
  else if (r.category === 'bad') bad++;
  else change++;
});

let md = `# SEO Meta Title Analysis Report

I have successfully deleted the \`dist\` folder, rebuilt the project, and crawled the static pages generated in the output. 

Here is the summary of the crawl:
- **Total pages (websites) found & analyzed:** ${data.totalCrawled}

## Meta Title Quality Summary
Based on SEO best practices (ideal length between 30 and 60 characters), here is how your meta titles are categorized:

- **Good (30-60 chars):** ${good} pages
- **Okay (61-70 chars):** ${okay} pages
- **Bad (< 30 chars):** ${bad} pages
- **Change Required (> 70 chars, default, or empty):** ${change} pages

---

## Detailed Page Analysis

| URL Path | Meta Title | Length | Category |
| :--- | :--- | :--- | :--- |
`;

results.forEach(r => {
  let catBold = `**${r.category.charAt(0).toUpperCase() + r.category.slice(1)}**`;
  if (r.category === 'change required') catBold = `**Change Required**`;
  
  // escape pipes
  let title = r.title.replace(/\|/g, '\\|');
  
  md += `| \`${r.url}\` | ${title} | ${r.length} | ${catBold} |\n`;
});

const artifactPath = '/home/gagan-chandra/.gemini/antigravity-ide/brain/2a8b0f82-b9d8-450c-bd99-56aaa0fed0a6/seo_meta_analysis.md';
fs.writeFileSync(artifactPath, md);
console.log('Artifact updated');
