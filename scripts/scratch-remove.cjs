const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
};

const files = walk('./src/pages');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace PageTransition with React Fragment
  if (content.includes('import PageTransition from')) {
    content = content.replace(/import PageTransition from [^\n]+\n/g, '');
    changed = true;
  }
  if (content.includes('<PageTransition>')) {
    content = content.replace(/<PageTransition>/g, '<>');
    changed = true;
  }
  if (content.includes('</PageTransition>')) {
    content = content.replace(/<\/PageTransition>/g, '</>');
    changed = true;
  }
  if (content.includes('<PageTransition className="')) {
    // If it has a className, maybe it needs a div
    content = content.replace(/<PageTransition className="([^"]+)">/g, '<div className="$1">');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
