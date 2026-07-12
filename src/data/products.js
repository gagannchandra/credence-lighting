const imageModules = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' });

const categoryMap = {
  'indoor': { category: 'Indoor', title: 'Indoor Luminaire', subtitle: 'PREMIUM • INDOOR' },
  'outdoor': { category: 'Outdoor', title: 'Outdoor Luminaire', subtitle: 'PREMIUM • OUTDOOR' },
  'hospitality': { category: 'Hospitality', title: 'Hospitality Fixture', subtitle: 'LUXURY • HOSPITALITY' },
  'facade': { category: 'Facade', title: 'Architectural Facade', subtitle: 'ARCHITECTURAL • EXTERIOR' },
  'entertainment': { category: 'Entertainment', title: 'Entertainment System', subtitle: 'DYNAMIC • VIBRANT' },
  'led-screen': { category: 'LED Screen', title: 'LED Screen', subtitle: 'HIGH RES • DISPLAY' },
  'strech-ceiling': { category: 'Strech Ceiling', title: 'Stretch Ceiling', subtitle: 'ELEGANT • CEILING' },
  'Home Automation': { category: 'Automation', title: 'Smart Automation', subtitle: 'SMART • CONTROL' },
  'Retail Lighting': { category: 'Retail', title: 'Retail Lighting', subtitle: 'SHOWCASE • RETAIL' },
  'sound': { category: 'Audio', title: 'Audio System', subtitle: 'AUDIO • PREMIUM' }
};

const categoryOrder = [
  'Indoor', 'Outdoor', 'Hospitality', 'Facade', 
  'Entertainment', 'LED Screen', 'Strech Ceiling', 
  'Automation', 'Retail', 'Audio'
];

let idCounter = 1;
const tempProducts = [];

for (const path in imageModules) {
  const match = path.match(/\.\.\/assets\/images\/([^/]+)\//);
  if (match) {
    const dirName = match[1];
    if (categoryMap[dirName]) {
      tempProducts.push({
        category: categoryMap[dirName].category,
        title: categoryMap[dirName].title,
        subtitle: categoryMap[dirName].subtitle,
        image: imageModules[path],
        large: false,
        _path: path
      });
    }
  }
}

// Sort by category order, then alphabetically by path to ensure consistent ordering
tempProducts.sort((a, b) => {
  const catDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
  if (catDiff !== 0) return catDiff;
  return a._path.localeCompare(b._path);
});

const products = tempProducts.map(p => ({
  id: idCounter++,
  category: p.category,
  title: p.title,
  subtitle: p.subtitle,
  image: p.image,
  large: p.large
}));

export default products;
