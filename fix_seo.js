import fs from 'fs';
import path from 'path';

const filesToUpdate = {
  "src/pages/LocationAjman.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Lighting Solutions in Ajman | Credence Lighting"'
  },
  "src/pages/LocationRAK.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Resort Lighting in Ras Al Khaimah | Credence"'
  },
  "src/pages/LocationAbuDhabi.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Lighting Suppliers in Abu Dhabi | Credence Lighting"'
  },
  "src/pages/LocationSharjah.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Lighting Companies in Sharjah | Credence Lighting"'
  },
  "src/pages/LocationUAE.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Top Lighting Companies in UAE | Credence Lighting"'
  },
  "src/pages/OfficeLighting.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Commercial Office Lighting Solutions | Credence"'
  },
  "src/pages/ResidentialLighting.jsx": {
    old: /title:\s*"[^"]+"/g,
    new: 'title: "Luxury Residential Lighting Design | Credence"'
  }
};

for (const [filePath, replacement] of Object.entries(filesToUpdate)) {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(replacement.old, replacement.new);
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}
