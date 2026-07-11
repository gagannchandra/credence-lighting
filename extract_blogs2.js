import fs from 'fs';

const content = fs.readFileSync('src/data/blog.js', 'utf-8');
const blocks = content.split('slug:').slice(1);
const blogs = blocks.map(block => {
  const slugMatch = block.match(/^\s*"([^"]+)"/);
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  return {
    slug: slugMatch ? slugMatch[1] : '',
    title: titleMatch ? titleMatch[1] : ''
  };
});
fs.writeFileSync('blogs_metadata.json', JSON.stringify(blogs, null, 2));
console.log(`Extracted ${blogs.length} blogs.`);
