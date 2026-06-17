import fs from 'fs';
import path from 'path';

const destinations = [
  { file: 'Paris.tsx', c500: '#ec4899', c400: '#f472b6' }, // Rose
  { file: 'Kyoto.tsx', c500: '#ef4444', c400: '#f87171' }, // Rouge
  { file: 'Maldives.tsx', c500: '#0ea5e9', c400: '#38bdf8' }, // Bleu
  { file: 'Dubai.tsx', c500: '#eab308', c400: '#facc15' }, // Sable/Or
  { file: 'NewYork.tsx', c500: '#64748b', c400: '#94a3b8' }, // Slate/Gris
  { file: 'Bali.tsx', c500: '#10b981', c400: '#34d399' }, // Emeraude/Vert
];

for (const dest of destinations) {
  const filePath = path.join('./src/pages/destinations', dest.file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('document.documentElement.style.setProperty')) {
    const hookCode = `
  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-500', '${dest.c500}');
    document.documentElement.style.setProperty('--color-brand-400', '${dest.c400}');
    return () => {
      document.documentElement.style.removeProperty('--color-brand-500');
      document.documentElement.style.removeProperty('--color-brand-400');
    };
  }, []);
`;
    // Inject just before the existing fetch useEffect
    content = content.replace("  useEffect(() => {", hookCode + "\n  useEffect(() => {");
    fs.writeFileSync(filePath, content);
    console.log("Updated", dest.file);
  } else {
    console.log("Already updated", dest.file);
  }
}
