import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedSystemInfo = async () => {
    const connection = await createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'thong_tin_xa',
    });

    try {
        console.log('Seeding individual system info records...');

        const systemRecords = [
            { type: 'title', title: 'Tiêu đề trang', slug: 'sys-title', content: 'ỦY BAN NHÂN DÂN XÃ' },
            { type: 'phone', title: 'Số điện thoại', slug: 'sys-phone', content: '0212 3843 123' },
            { type: 'email', title: 'Email liên hệ', slug: 'sys-email', content: 'ubnd-maison@sonla.gov.vn' },
            { type: 'address', title: 'Địa chỉ trụ sở', slug: 'sys-address', content: 'Tiểu khu 1, Thị trấn Hát Lót, Mai Sơn, Sơn La' },
            { type: 'location', title: 'Tọa độ bản đồ', slug: 'sys-location', content: '21.2185, 104.0253' },
            { type: 'logo', title: 'Logo hệ thống', slug: 'sys-logo', content: 'https://vnanet.vn/Data/Images/logo.png', image: '' },
            { type: 'agency', title: 'Cơ quan chủ quản', slug: 'sys-agency', content: 'Ủy ban nhân dân - Hội đồng nhân dân xã' },
            { type: 'name', title: 'Tên cổng thông tin', slug: 'sys-name', content: 'CỔNG THÔNG TIN ĐIỆN TỬ HUYỆN MAI SƠN' },
        ];

        for (const record of systemRecords) {
            const [rows]: any = await connection.execute('SELECT id FROM pages WHERE type = ?', [record.type]);
            if (rows.length === 0) {
                console.log(`Inserting [${record.type}]...`);
                await connection.execute(
                    `INSERT INTO pages (type, title, slug, content, image, is_published, created_at, updated_at) 
                     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                    [record.type, record.title, record.slug, record.content, record.image || '', 1]
                );
            } else {
                console.log(`Updating [${record.type}]...`);
                await connection.execute(
                    `UPDATE pages SET 
                        title = ?, 
                        content = ?, 
                        image = ?, 
                        is_published = 1, 
                        updated_at = NOW() 
                     WHERE type = ?`,
                    [record.title, record.content, record.image || '', record.type]
                );
            }
        }

        console.log('Seeding system info successful!');
    } catch (error) {
        console.error('Error seeding system info:', error);
    } finally {
        await connection.end();
    }
};

seedSystemInfo();
