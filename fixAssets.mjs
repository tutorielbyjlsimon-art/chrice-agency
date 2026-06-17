import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('"/assets/') || content.includes("'/assets/")) {
    let newContent = content.replace(/"\/assets\//g, '"./assets/');
    newContent = newContent.replace(/'\/assets\//g, "'./assets/");
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
    changedCount++;
  }
}
console.log(`Done. Changed ${changedCount} files.`);
