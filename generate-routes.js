import fs from 'fs';

function extractSlugs(file) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return matches.map(m => m[1]);
}

const projects = extractSlugs('src/data/projects.js');
const blogs = extractSlugs('src/data/blog.js');

// For products, it uses categories
const categoriesList = [
    "Indoor", "Outdoor", "Hospitality", "Facade", "Entertainment",
    "LED Screen", "Strech Ceiling", "Automation", "Retail", "Audio"
];

const routesJs = `
// Single source of truth for dynamic route slugs
export const projectSlugs = ${JSON.stringify(projects, null, 2)};
export const blogSlugs = ${JSON.stringify(blogs, null, 2)};
export const productCategories = ${JSON.stringify(categoriesList, null, 2)};
`;

fs.writeFileSync('src/data/routes.js', routesJs);
console.log('routes.js generated');
