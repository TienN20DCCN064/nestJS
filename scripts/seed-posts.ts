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

  console.log('Connected to MySQL for seeding sample posts');

  const news = [
    {
      title: 'Khai mạc tuần lễ Chuyển đổi số quốc gia 2024 tại Hà Nội',
      slug: 'khai-mac-tuan-le-cds-2024',
      summary: 'Sự kiện thu hút hơn 500 đại biểu và các chuyên gia công nghệ hàng đầu tham dự.',
      content: 'Chương trình diễn ra với nhiều hoạt động hội thảo chuyên sâu về trí tuệ nhân tạo và dữ liệu số.\n\nPhát biểu tại buổi lễ, đại diện Ủy ban nhấn mạnh tầm quan trọng của việc kết nối dữ liệu giữa các địa phương.',
      author: 'Nguyễn Văn A',
      type: 'news',
      thumbnail: 'https://vnanet.vn/Data/Images/logo.png',
      is_published: 1,
      is_featured: 1
    },
    {
      title: 'Ra mắt ứng dụng công dân số tích hợp nhiều tiện ích mới',
      slug: 'ra-mat-app-cong-dan-so',
      summary: 'Người dân có thể thực hiện 100% thủ tục hành chính qua ứng dụng di động.',
      content: 'Ứng dụng mới giúp giảm thiểu thời gian chờ đợi và minh bạch hóa quá trình xử lý hồ sơ.\n\nHệ thống hỗ trợ xác thực bằng khuôn mặt và vân tay bảo mật cao.',
      author: 'Trần Thị B',
      type: 'news',
      thumbnail: '',
      is_published: 1,
      is_featured: 0
    }
  ];

  const announcements = [
    {
      title: 'Thông báo về việc tạm ngưng hệ thống để bảo trì định kỳ',
      slug: 'thong-bao-bao-tri-he-thong',
      summary: 'Hệ thống dịch vụ công sẽ tạm ngưng từ 22h tối thứ 7 đến 4h sáng chủ nhật.',
      content: 'Để nâng cấp hạ tầng mạng và đảm bảo an toàn thông tin, chúng tôi xin thông báo lịch bảo trì như sau:\n\n1. Thời gian: 22:00 ngày 05/04 đến 04:00 ngày 06/04.\n2. Các dịch vụ ảnh hưởng: Cổng dịch vụ công, Hệ thống một cửa điện tử.\n\nTrân trọng cảm ơn sự hợp tác của quý dân cư.',
      author: 'Trung tâm CNTT',
      type: 'announcement',
      thumbnail: '',
      is_published: 1,
      is_featured: 0
    }
  ];

  try {
    const allPosts = [...news, ...announcements];

    for (const post of allPosts) {
      const [existing]: any = await connection.execute('SELECT id FROM posts WHERE slug = ?', [post.slug]);
      
      if (existing.length > 0) {
        await connection.execute(
          'UPDATE posts SET title = ?, summary = ?, content = ?, author = ?, type = ?, thumbnail = ?, is_published = ?, is_featured = ?, published_at = NOW() WHERE id = ?',
          [post.title, post.summary, post.content, post.author, post.type, post.thumbnail, post.is_published, post.is_featured, existing[0].id]
        );
        console.log(`Updated post: ${post.title}`);
      } else {
        await connection.execute(
          'INSERT INTO posts (title, slug, summary, content, author, type, thumbnail, is_published, is_featured, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
          [post.title, post.slug, post.summary, post.content, post.author, post.type, post.thumbnail, post.is_published, post.is_featured]
        );
        console.log(`Inserted post: ${post.title}`);
      }
    }

    console.log('--- Sample Posts Seeding Complete ---');

  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await connection.end();
  }
}

run();
