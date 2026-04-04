import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from the root of nestJS
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const connection = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'thong_tin_xa',
  });

  console.log('Connected to MySQL for seeding categories');

  const categories = [
    { name: 'Chính trị - Xã hội', slug: 'chinh-tri-xa-hoi', description: 'Tin tức về chính trị, xã hội' },
    { name: 'Kinh tế', slug: 'kinh-te', description: 'Tình hình kinh tế, phát triển địa phương' },
    { name: 'Văn hóa - Thể thao', slug: 'van-hoa-the-thao', description: 'Hoạt động văn hóa, nghệ thuật, thể dục thể thao' },
    { name: 'Y tế - Giáo dục', slug: 'y-te-giao-duc', description: 'Thông tin về sức khỏe, y tế và giáo dục' },
    { name: 'An ninh - Quốc phòng', slug: 'an-ninh-quoc-phong', description: 'Tình hình an ninh trật tự, quốc phòng' },
    { name: 'Tin tổng hợp', slug: 'tin-tong-hop', description: 'Các tin tức tổng hợp nội bộ khác' }
  ];

  try {
    for (const cat of categories) {
      const [existing]: any = await connection.execute('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
      
      if (existing.length > 0) {
        await connection.execute(
          'UPDATE categories SET name = ?, description = ? WHERE id = ?',
          [cat.name, cat.description, existing[0].id]
        );
        console.log(`Updated category: ${cat.name}`);
      } else {
        await connection.execute(
          'INSERT INTO categories (name, slug, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
          [cat.name, cat.slug, cat.description]
        );
        console.log(`Inserted category: ${cat.name}`);
      }
    }

    console.log('--- Categories Seeding Complete ---');

  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await connection.end();
  }
}

run();
