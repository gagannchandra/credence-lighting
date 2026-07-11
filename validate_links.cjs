const fs = require('fs');
const { execSync } = require('child_process');

const appContent = fs.readFileSync('src/App.jsx', 'utf-8');
const routeRegex = /<Route\s+path="([^"]+)"/g;
let match;
const validRoutes = new Set();
while ((match = routeRegex.exec(appContent)) !== null) {
  let routePath = match[1];
  if (routePath === '*') continue;
  routePath = routePath.replace(/:\w+/g, '[^/]+');
  validRoutes.add(`^${routePath}$`);
}

validRoutes.add('^#.*$'); 
validRoutes.add('^https?://.*$');
validRoutes.add('^mailto:.*$');
validRoutes.add('^tel:.*$');

function isValidRoute(link) {
  for (const pattern of validRoutes) {
    if (new RegExp(pattern).test(link.split('?')[0].split('#')[0])) {
      return true;
    }
  }
  return false;
}

const findLinksCommand = `grep -rE '(to="[^"]+"|navigate\\("[^"]+"\\)|link:\\s*"[^"]+")' src/ --include="*.jsx"`;
const result = execSync(findLinksCommand, { encoding: 'utf-8' }).trim().split('\n');

const invalidLinks = [];
let totalCount = 0;
for (const line of result) {
  const fileMatch = line.match(/^([^:]+):(.*)$/);
  if (!fileMatch) continue;
  const file = fileMatch[1];
  const content = fileMatch[2];
  
  const linkRegex = /(?:to="|navigate\("|link:\s*")([^"]+)"/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(content)) !== null) {
    totalCount++;
    const link = linkMatch[1];
    if (!isValidRoute(link)) {
      invalidLinks.push({ file, link, line: content.trim() });
    }
  }
}

console.log(`Checked ${totalCount} links.`);
if (invalidLinks.length > 0) {
  console.log("Invalid links found:");
  console.log(JSON.stringify(invalidLinks, null, 2));
} else {
  console.log("All links are valid!");
}

const findHrefCommand = `grep -rE 'href="[^"]+"' src/ --include="*.jsx"`;
const resultHref = execSync(findHrefCommand, { encoding: 'utf-8' }).trim().split('\n');

for (const line of resultHref) {
  if (!line) continue;
  const fileMatch = line.match(/^([^:]+):(.*)$/);
  if (!fileMatch) continue;
  const file = fileMatch[1];
  const content = fileMatch[2];
  
  const linkRegex = /href="([^"]+)"/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(content)) !== null) {
    totalCount++;
    const link = linkMatch[1];
    if (!isValidRoute(link)) {
      invalidLinks.push({ file, link, line: content.trim() });
    }
  }
}

console.log(`Checked ${totalCount} links total (including href).`);
if (invalidLinks.length > 0) {
  console.log("Invalid links found:");
  console.log(JSON.stringify(invalidLinks, null, 2));
} else {
  console.log("All links are valid!");
}
