import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedContactPage = async () => {
    const connection = await createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'thong_tin_xa',
    });

    try {
        console.log('Seeding "contact" page with real data...');
        
        const title = 'Thông tin liên hệ & Vị trí';
        const slug = 'contact';
        const content = `Trụ sở Hội đồng Nhân dân và Ủy ban Nhân dân xã là trung tâm hành chính phục vụ nhân dân. Chúng tôi tiếp nhận và giải quyết các thủ tục hành chính, phản ánh kiến nghị và cung cấp thông tin chính thức.

Địa chỉ: Tiểu khu 1, Thị trấn Hát Lót, Huyện Mai Sơn, Tỉnh Sơn La (Ví dụ)
Giờ làm việc: 
- Sáng: 07:30 - 11:30
- Chiều: 13:30 - 17:00
(Từ thứ Hai đến thứ Sáu hàng tuần)`;

        // Coordinates for Mai Sơn, Sơn La as an example
        const latitude = 21.2185; 
        const longitude = 104.0253;
        const phone = '0212 3843 123';
        const email = 'ubnd-maison@sonla.gov.vn';
        const address = 'Tiểu khu 1, Thị trấn Hát Lót, Mai Sơn, Sơn La';

        const [rows]: any = await connection.execute('SELECT id FROM pages WHERE slug = "contact"');

        if (rows.length === 0) {
            console.log('Inserting new "contact" page...');
            await connection.execute(
                `INSERT INTO pages (title, slug, content, type, is_published, latitude, longitude, phone, email, address, created_at, updated_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [title, slug, content, 'contact', 1, latitude, longitude, phone, email, address]
            );
        } else {
            console.log('Updating existing "contact" page...');
            await connection.execute(
                `UPDATE pages SET 
                    title = ?, 
                    content = ?, 
                    latitude = ?, 
                    longitude = ?, 
                    phone = ?, 
                    email = ?, 
                    address = ?, 
                    is_published = 1, 
                    updated_at = NOW() 
                 WHERE slug = "contact"`,
                [title, content, latitude, longitude, phone, email, address]
            );
        }

        console.log('Seed "contact" page successful!');
    } catch (error) {
        console.error('Error seeding contact data:', error);
    } finally {
        await connection.end();
    }
};

seedContactPage();
