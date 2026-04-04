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

  console.log('Connected to MySQL');

  const phone = '(024) 3782 1766';
  const email = 'ubqg.cds@mic.gov.vn';

  // 1. Update or Insert Phone
  try {
    const [phoneRows]: any = await connection.execute('SELECT id FROM pages WHERE LOWER(type) = ?', ['phone']);
    if (phoneRows.length > 0) {
      await connection.execute('UPDATE pages SET content = ?, is_published = 1 WHERE id = ?', [phone, phoneRows[0].id]);
      console.log(`Updated phone (ID: ${phoneRows[0].id})`);
    } else {
      await connection.execute('INSERT INTO pages (type, slug, title, content, is_published) VALUES (?, ?, ?, ?, ?)', 
        ['phone', 'contact-phone', 'Số điện thoại', phone, 1]);
      console.log('Inserted phone');
    }

    // 2. Update or Insert Email
    const [emailRows]: any = await connection.execute('SELECT id FROM pages WHERE LOWER(type) = ?', ['email']);
    if (emailRows.length > 0) {
      await connection.execute('UPDATE pages SET content = ?, is_published = 1 WHERE id = ?', [email, emailRows[0].id]);
      console.log(`Updated email (ID: ${emailRows[0].id})`);
    } else {
      await connection.execute('INSERT INTO pages (type, slug, title, content, is_published) VALUES (?, ?, ?, ?, ?)', 
        ['email', 'contact-email', 'Email', email, 1]);
      console.log('Inserted email');
    }
  } catch (err) {
    console.error('Database operation failed:', err);
  } finally {
    await connection.end();
  }
}

run();
