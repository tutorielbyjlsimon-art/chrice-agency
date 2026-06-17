import fs from 'fs';
import path from 'path';

const downloads = [
  { url: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=800&auto=format&fit=crop', dest: 'maldives_2.jpg' },
  { url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=800&auto=format&fit=crop', dest: 'maldives_3.jpg' },
  { url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800&auto=format&fit=crop', dest: 'maldives_4.jpg' },
  
  { url: 'https://images.unsplash.com/photo-1582662058428-1b2cce428c03?q=80&w=800&auto=format&fit=crop', dest: 'dubai_1.jpg' },
  { url: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=800&auto=format&fit=crop', dest: 'dubai_2.jpg' },
  { url: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=800&auto=format&fit=crop', dest: 'dubai_3.jpg' },
  { url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop', dest: 'dubai_4.jpg' },

  { url: 'https://images.unsplash.com/photo-1568684333877-4d3254e4cb56?q=80&w=800&auto=format&fit=crop', dest: 'ny_1.jpg' },
  { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop', dest: 'ny_2.jpg' },
  { url: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=800&auto=format&fit=crop', dest: 'ny_3.jpg' },
  { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', dest: 'ny_4.jpg' },

  { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop', dest: 'bali_1.jpg' },
  { url: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?q=80&w=800&auto=format&fit=crop', dest: 'bali_2.jpg' },
  { url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=800&auto=format&fit=crop', dest: 'bali_3.jpg' },
  { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop', dest: 'bali_4.jpg' },
];

async function run() {
  for (const d of downloads) {
    const destPath = path.join(process.cwd(), 'public', 'assets', d.dest);
    try {
      const res = await fetch(d.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
      console.log(`Downloaded ${d.dest}`);
    } catch (e) {
      console.error(`Failed ${d.dest}`, e.message);
      fs.copyFileSync(path.join(process.cwd(), 'public', 'assets', 'hotel_modern.jpg'), destPath);
    }
  }
}
run();
