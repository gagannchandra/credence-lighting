import fs from 'fs';

const content = fs.readFileSync('src/data/blog.js', 'utf-8');
const slugRegex = /slug:\s*"([^"]+)"/g;
const titleRegex = /title:\s*"([^"]+)"/g;

let slugs = [];
let titles = [];
let match;
while ((match = slugRegex.exec(content)) !== null) {
  slugs.push(match[1]);
}
while ((match = titleRegex.exec(content)) !== null) {
  titles.push(match[1]);
}

const blogs = slugs.map((slug, index) => ({ slug, title: titles[index] }));
fs.writeFileSync('blogs_metadata.json', JSON.stringify(blogs, null, 2));
console.log(`Extracted ${blogs.length} blogs.`);
