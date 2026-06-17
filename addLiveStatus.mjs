import fs from 'fs';
import path from 'path';

const destinations = [
  { file: 'Paris.tsx', city: 'Paris', timezone: 'Europe/Paris', weather: 'sun', temp: 22 },
  { file: 'Kyoto.tsx', city: 'Kyoto', timezone: 'Asia/Tokyo', weather: 'cloud', temp: 18 },
  { file: 'Maldives.tsx', city: 'Les Maldives', timezone: 'Indian/Maldives', weather: 'sun', temp: 30 },
  { file: 'Dubai.tsx', city: 'Dubaï', timezone: 'Asia/Dubai', weather: 'sun', temp: 35 },
  { file: 'NewYork.tsx', city: 'New York', timezone: 'America/New_York', weather: 'cloud', temp: 15 },
  { file: 'Bali.tsx', city: 'Bali', timezone: 'Asia/Makassar', weather: 'sun', temp: 28 },
];

for (const dest of destinations) {
  const filePath = path.join('./src/pages/destinations', dest.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not present
  if (!content.includes('LiveLocalStatus')) {
    content = content.replace(
      "import { useNavigate } from 'react-router-dom';",
      "import { useNavigate } from 'react-router-dom';\nimport { LiveLocalStatus } from '../../components/LiveLocalStatus';"
    );

    const injectionPoint = `      </div>\n\n      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">`;
    const injectionCode = `      </div>\n\n      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-12 relative z-10">\n        <LiveLocalStatus city="${dest.city}" timezone="${dest.timezone}" weather="${dest.weather}" temp={${dest.temp}} />\n      </div>\n\n      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">`;
    
    if (content.includes(injectionPoint)) {
      content = content.replace(injectionPoint, injectionCode);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${dest.file}`);
    } else {
      console.log(`Could not find injection point in ${dest.file}`);
    }
  } else {
    console.log(`Already has LiveLocalStatus in ${dest.file}`);
  }
}
