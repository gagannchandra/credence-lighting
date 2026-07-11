const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Footer.jsx', 'utf-8');

// The columns use FadeUp. I will add text-center md:text-left to them.
content = content.replace(/<FadeUp delay={(\d)}>/g, '<FadeUp delay={$1} className="text-center md:text-left">');

fs.writeFileSync('src/components/layout/Footer.jsx', content);
console.log('Footer updated');
