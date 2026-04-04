import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAboutPage = async () => {
    const connection = await createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'thong_tin_xa',
    });

    try {
        console.log('Checking for "about" page...');
        const [rows]: any = await connection.execute('SELECT * FROM pages WHERE slug = "about"');

        const aboutContent = `Chào mừng quý vị đến với Cổng thông tin điện tử của xã. Chúng tôi cam kết cung cấp thông tin minh bạch, kịp thời và chính xác nhất về các hoạt động chính trị, kinh tế, văn hóa và xã hội tại địa phương. 

Xã chúng tôi là một vùng đất giàu truyền thống cách mạng và tiềm năng phát triển. Với đội ngũ cán bộ năng động, sáng tạo và sự đồng lòng của toàn thể nhân dân, chúng tôi đang ngày càng thay đổi diện mạo, xây dựng quê hương giàu đẹp, văn minh. 

Cổng thông tin này là cầu nối quan trọng giữa chính quyền và người dân, giúp hiện đại hóa thủ tục hành chính và nâng cao hiệu quả tương tác công ích.`;

        if (rows.length === 0) {
            console.log('Inserting default "about" page...');
            await connection.execute(
                'INSERT INTO pages (title, slug, content, type, is_published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                ['Giới thiệu chung về Xã', 'about', aboutContent, 'intro', 1]
            );
            console.log('Seed "about" page successfully!');
        } else {
            console.log('Updating existing "about" page to ensure it is published...');
            await connection.execute(
                'UPDATE pages SET is_published = 1, updated_at = NOW() WHERE slug = "about"'
            );
            console.log('Update "about" page successful!');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await connection.end();
    }
};

seedAboutPage();
