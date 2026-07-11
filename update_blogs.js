import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/home/gagan-chandra/.gemini/antigravity-ide/brain/2e9e45c0-2ef1-4184-afdb-6a4641a2213c';
const DEST_DIR = 'src/assets/images/blog/ai';
const BLOG_FILE = 'src/data/blog.js';

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const imageMapping = {
  "evolution-of-architectural-lighting": "arch_light_evolve_1783600952937.png",
  "human-centric-lighting-office": "hcl_office_light_1783600963545.png",
  "luxury-residential-lighting-layering": "lux_resi_light_1783600977026.png",
  "led-retail-lighting-boost-sales": "retail_light_sales_1783600986786.png",
  "outdoor-landscape-lighting-guide": "outdoor_land_light_1783600998924.png",
  "understanding-led-dimming-protocols": "led_dimming_proto_1783601009206.png",
  "sustainable-lighting-leed-certification": "sust_light_leed_1783601020157.png",
  "hospitality-lighting-creating-experiences": "hosp_light_exp_1783601031210.png",
  "wireless-lighting-controls-casambi": "wire_light_casambi_1783601042124.png",
  "linear-lighting-design-trends": "linear_light_trends_1783601052072.png",
  "how-to-choose-lighting-company-dubai": "choose_light_company_1783601074596.png",
  "led-light-suppliers-dubai-guide": "led_suppliers_dubai_1783601085607.png",
  "visiting-lighting-showroom-dubai": "visit_showroom_dubai_1783601094608.png",
  "luxury-lighting-solutions-dubai": "luxury_light_sol_1783601104223.png",
  "types-of-ceiling-lights-guide": "ceiling_lights_guide_1783601114843.png",
  "led-ceiling-lights-how-to-choose": "led_ceiling_choose_1783601125727.png",
  "outdoor-wall-lights-buying-guide": "outdoor_wall_guide_1783601136390.png",
  // Reused below:
  "garden-lighting-ideas-dubai-villas": "outdoor_land_light_1783600998924.png",
  "led-strip-light-installation-guide": "linear_light_trends_1783601052072.png",
  "pendant-vs-chandelier-which-is-right": "ceiling_lights_guide_1783601114843.png",
  "modern-lighting-trends-dubai-interiors": "luxury_light_sol_1783601104223.png",
  "smart-lighting-homes-offices": "wire_light_casambi_1783601042124.png",
  "lumen-vs-lux-difference": "led_dimming_proto_1783601009206.png",
  "cri-explained-color-rendering": "retail_light_sales_1783600986786.png",
  "color-temperature-guide": "hcl_office_light_1783600963545.png",
  "ip-ratings-outdoor-bathroom": "outdoor_land_light_1783600998924.png",
  "hospitality-lighting-guest-experience": "hosp_light_exp_1783601031210.png",
  "office-lighting-standards-ugr": "hcl_office_light_1783600963545.png",
  "led-energy-savings-roi": "sust_light_leed_1783601020157.png",
  "lighting-maintenance-lifespan": "led_suppliers_dubai_1783601085607.png"
};

// Copy images
const uniqueImages = [...new Set(Object.values(imageMapping))];
for (const img of uniqueImages) {
  const src = path.join(ARTIFACTS_DIR, img);
  const dest = path.join(DEST_DIR, img);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${img}`);
  } else {
    console.error(`Missing: ${src}`);
  }
}

// Update blog.js
let blogContent = fs.readFileSync(BLOG_FILE, 'utf-8');

// 1. Remove old imports
blogContent = blogContent.replace(/import \w+ from "\.\.\/assets\/images\/.*?\.webp";\n/g, '');
blogContent = blogContent.replace(/import \w+ from "\.\.\/assets\/images\/.*?\.png";\n/g, '');
blogContent = blogContent.replace(/import \w+ from "\.\.\/assets\/images\/.*?\.jpg";\n/g, '');

// 2. Add new imports
let newImports = '';
const importNames = {};
uniqueImages.forEach((img, i) => {
  const importName = `aiImg${i}`;
  importNames[img] = importName;
  newImports += `import ${importName} from "../assets/images/blog/ai/${img}";\n`;
});

// Remove existing newImports if we run script twice
blogContent = blogContent.replace(/import aiImg\d+ from "\.\.\/assets\/images\/blog\/ai\/.*?\.png";\n/g, '');

blogContent = newImports + '\n' + blogContent;

// 3. Replace heroImage references
// We iterate through the file and replace heroImage: <something>, with heroImage: <new_import>
// based on the slug.
for (const [slug, imgFile] of Object.entries(imageMapping)) {
  const importName = importNames[imgFile];
  // Regex to find the block for the slug and replace its heroImage
  // This is a bit tricky, but since the structure is consistent:
  // slug: "...", \n ... \n heroImage: ...,
  const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?heroImage:\\s*)\\w+,`, 'g');
  blogContent = blogContent.replace(regex, `$1${importName},`);
}

fs.writeFileSync(BLOG_FILE, blogContent);
console.log('Updated blog.js');
