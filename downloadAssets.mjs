import fs from 'fs';
import path from 'path';

const files = [
  'src/pages/Home.tsx',
  'src/pages/destinations/Paris.tsx',
  'src/pages/destinations/Kyoto.tsx',
  'src/pages/destinations/Maldives.tsx'
];

async function run() {
  let counter = 1;
  for (const file of files) {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      console.log("File not found:", file);
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const regex = /https:\/\/images\.unsplash\.com\/[^'"]+/g;
    const matches = content.match(regex);
    
    if (matches) {
      // Use a Set to unique the URLs
      const uniqueUrls = [...new Set(matches)];
      for (const url of uniqueUrls) {
        const filename = `dl_asset_${Date.now()}_${counter}.jpg`;
        const destPath = path.join(process.cwd(), 'public', 'assets', filename);
        
        console.log(`Downloading ${url} to ${filename}...`);
        try {
           const res = await fetch(url, {
             headers: {
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
             }
           });
           if (!res.ok) throw new Error(`Status ${res.status}`);
           const arrayBuffer = await res.arrayBuffer();
           const buffer = Buffer.from(arrayBuffer);
           fs.writeFileSync(destPath, buffer);
           content = content.replaceAll(url, `/assets/${filename}`);
           counter++;
        } catch (e) {
           console.error("Failed to download", url, e.message);
        }
      }
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`No Unsplash URLs found in ${file}`);
    }
  }
}

run();
