import fs from 'fs';

function extractSlugs(file) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/slug:\s*(["'])(.*?)\1/g)];
  return matches.map(m => m[2]);
}

const projects = extractSlugs('src/data/projects.js');
const blogs = extractSlugs('src/data/blog.js');

function extractCategories() {
  const content = fs.readFileSync('src/data/products.js', 'utf8');
  const match = content.match(/const categoryOrder\s*=\s*(\[[\s\S]*?\]);/);
  if (match) {
    return new Function(`return ${match[1]};`)();
  }
  return [];
}

const categoriesList = extractCategories();

const routesJs = `
// Single source of truth for dynamic route slugs
export const projectSlugs = ${JSON.stringify(projects, null, 2)};
export const blogSlugs = ${JSON.stringify(blogs, null, 2)};
export const productCategories = ${JSON.stringify(categoriesList, null, 2)};
`;

fs.writeFileSync('src/data/routes.js', routesJs);
console.log('routes.js generated');
