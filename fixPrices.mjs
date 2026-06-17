import fs from 'fs';
import path from 'path';

const destinationsDir = './src/pages/destinations';
const destFiles = fs.readdirSync(destinationsDir).filter(f => f.endsWith('.tsx'));

for (const file of destFiles) {
  const filePath = path.join(destinationsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('text-brand-500">{formatPrice(totalPrice)}')) {
    content = content.replace(/text-brand-500">\{formatPrice\(totalPrice\)\}/g, 'text-white">{formatPrice(totalPrice)}');
    changed = true;
  }
  
  if (content.includes('text-brand-500">+{formatPrice')) {
    content = content.replace(/text-brand-500">\+\{formatPrice/g, 'text-white">+{formatPrice');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
}

const successPath = './src/pages/Success.tsx';
let successContent = fs.readFileSync(successPath, 'utf8');
if (successContent.includes('text-emerald-500">{formatPrice')) {
  successContent = successContent.replace('text-emerald-500">{formatPrice', 'text-white">{formatPrice');
  fs.writeFileSync(successPath, successContent);
  console.log('Fixed Success.tsx');
}
