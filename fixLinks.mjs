import fs from 'fs';

const fallback = '/assets/dl_asset_1781709140534_4.jpg'; // The successful Paris hotel image
const files = ['src/pages/destinations/Paris.tsx', 'src/pages/destinations/Kyoto.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/https:\/\/images\.unsplash\.com\/[^'"]+/g, fallback);
    fs.writeFileSync(file, content);
    console.log("Fixed", file);
  }
});
