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

  console.log('Connected to MySQL for cleanup and metadata setup');

  const systemData = [
    { type: 'logo', content: 'https://vnanet.vn/Data/Images/logo.png', title: 'Logo', slug: 'system-logo' },
    { type: 'name', content: 'CỔNG THÔNG TIN ĐIỆN TỬ CHUYỂN ĐỔI SỐ QUỐC GIA', title: 'Tên hệ thống', slug: 'system-name' },
    { type: 'agency', content: 'Cơ quan thường trực: Văn phòng Ủy ban Quốc gia về chuyển đổi số', title: 'Cơ quan thường trực', slug: 'system-agency' },
    { type: 'address', content: 'Tòa nhà VNTA, 68 Dương Đình Nghệ, Cầu Giấy, Hà Nội', title: 'Địa chỉ liên hệ', slug: 'system-address' },
    { type: 'phone', content: '(024) 3782 1766', title: 'Số điện thoại', slug: 'system-phone' },
    { type: 'email', content: 'ubqg.cds@mic.gov.vn', title: 'Email liên hệ', slug: 'system-email' },
    { type: 'title', content: 'ỦY BAN QUỐC GIA VỀ CHUYỂN ĐỔI SỐ', title: 'Tiêu đề trang', slug: 'system-title' }
  ];

  try {
    // 1. Cleanup duplicates for each type
    const [allTypes]: any = await connection.execute('SELECT DISTINCT type FROM pages WHERE type IS NOT NULL AND type != ""');
    
    for (const row of allTypes) {
      const type = row.type;
      console.log(`Cleaning up duplicates for type: ${type}`);
      const [entries]: any = await connection.execute('SELECT id FROM pages WHERE type = ? ORDER BY id DESC', [type]);
      
      if (entries.length > 1) {
        const idsToDelete = entries.slice(1).map((e: any) => e.id);
        console.log(`  Deleting duplicates with IDs: ${idsToDelete.join(', ')}`);
        await connection.query('DELETE FROM pages WHERE id IN (?)', [idsToDelete]);
      }
    }

    // 2. Insert or update system data
    for (const item of systemData) {
      const [existing]: any = await connection.execute('SELECT id FROM pages WHERE LOWER(type) = ?', [item.type.toLowerCase()]);
      
      if (existing.length > 0) {
        await connection.execute(
          'UPDATE pages SET content = ?, title = ?, slug = ?, is_published = 1 WHERE id = ?', 
          [item.content, item.title, item.slug, existing[0].id]
        );
        console.log(`Updated dynamic metadata for type: ${item.type}`);
      } else {
        await connection.execute(
          'INSERT INTO pages (type, slug, title, content, is_published) VALUES (?, ?, ?, ?, 1)', 
          [item.type, item.slug, item.title, item.content]
        );
        console.log(`Inserted new metadata for type: ${item.type}`);
      }
    }

    console.log('--- Cleanup and Setup Complete ---');

  } catch (err) {
    console.error('Operation failed:', err);
  } finally {
    await connection.end();
  }
}

run();
