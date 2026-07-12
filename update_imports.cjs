const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');

const replacements = [
  { file: 'AudioSolutions.jsx', rules: [ [/\/generated\/audio_/g, '/sound/audio_'] ] },
  { file: 'EntertainmentLighting.jsx', rules: [ [/\/generated\/ent_/g, '/entertainment/ent_'] ] },
  { file: 'HotelLighting.jsx', rules: [
      [/\/generated\/hotel_facade\.webp/g, '/facade/hotel_facade.webp'],
      [/\/generated\/hotel_smart\.webp/g, '/Home Automation/hotel_smart.webp'],
      [/\/generated\/hotel_/g, '/hospitality/hotel_']
    ]
  },
  { file: 'OfficeLighting.jsx', rules: [
      [/\/generated\/office_sensor\.webp/g, '/Home Automation/office_sensor.webp'],
      [/\/generated\/office_/g, '/indoor/office_']
    ]
  },
  { file: 'ResidentialLighting.jsx', rules: [
      [/\/generated\/res_smart\.webp/g, '/Home Automation/res_smart.webp'],
      [/\/generated\/res_landscape\.webp/g, '/outdoor/res_landscape.webp'],
      [/\/generated\/res_/g, '/indoor/res_']
    ]
  },
  { file: 'RestaurantLighting.jsx', rules: [ [/\/generated\/rest_/g, '/hospitality/rest_'] ] }
];

for (const {file, rules} of replacements) {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [pattern, replacement] of rules) {
      content = content.replace(pattern, replacement);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
