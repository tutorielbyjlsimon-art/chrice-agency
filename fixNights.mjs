import fs from 'fs';
import path from 'path';

const destinationsDir = './src/pages/destinations';
const destFiles = fs.readdirSync(destinationsDir).filter(f => f.endsWith('.tsx'));

for (const file of destFiles) {
  const filePath = path.join(destinationsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert nights calculation after passengers and userCity
  if (!content.includes('let nights = 3;')) {
    const nightsCode = `
  let nights = 3;
  if (dateAller && dateRetour && tripType === 'aller-retour') {
    const diff = Math.ceil((new Date(dateRetour).getTime() - new Date(dateAller).getTime()) / (1000 * 60 * 60 * 24));
    if (diff > 0) nights = diff;
  }
  const baseFlightPrice`;
    content = content.replace('const baseFlightPrice', nightsCode);
  }

  // Update hotelTotal
  content = content.replace(/const hotelTotal = hotelPrice \* 3;/g, 'const hotelTotal = hotelPrice * nights;');
  
  // Update mealTotal
  content = content.replace(/const mealTotal = mealPlan \* 3 \* passengers;/g, 'const mealTotal = mealPlan * nights * passengers;');

  // Update UI Hôtel (3 nuits) -> Hôtel ({nights} nuits)
  content = content.replace(/Hôtel \(3 nuits\)/g, "Hôtel ({nights} nuit{nights > 1 ? 's' : ''})");

  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
}
