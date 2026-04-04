import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const connection = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'thong_tin_xa',
  });

  console.log('Connected to MySQL for seeding procedures');

  const procedures = [
    {
      title: 'Đăng ký tạm trú cho công dân',
      description: 'Thủ tục đăng ký tạm trú khi công dân chuyển đến sinh sống tại địa bàn xã/phường.',
      content: 'Bước 1: Chuẩn bị hồ sơ đầy đủ.\nBước 2: Nộp hồ sơ tại Công an xã/phường.\nBước 3: Nhận kết quả sau thời gian quy định.\n\nHệ thống hỗ trợ đăng ký trực tuyến tại Cổng dịch vụ công quốc gia.',
      required_documents: '1. Tờ khai thay đổi thông tin cư trú (Mẫu CT01);\n2. Giấy tờ chứng minh chỗ ở hợp pháp (Hợp đồng thuê nhà, sổ đỏ...);\n3. Bản chính CMND/CCCD.',
      processing_time: '03 ngày làm việc',
      fee: 'Miễn phí',
      form_url: 'https://dichvucong.gov.vn/'
    },
    {
      title: 'Cấp bản sao trích lục hộ tịch (Khai sinh, kết hôn...)',
      description: 'Cấp bản sao các giấy tờ hộ tịch từ sổ gốc của cơ quan nhà nước.',
      content: 'Bước 1: Người yêu cầu điền tờ khai theo mẫu.\nBước 2: Xuất trình giấy tờ tùy thân (CCCD).\nBước 3: Công chức tư pháp - hộ tịch kiểm tra và trích lục từ sổ gốc.',
      required_documents: '1. Tờ khai yêu cầu cấp bản sao trích lục hộ tịch;\n2. Bản chính hoặc bản sao có chứng thực CCCD của người yêu cầu.',
      processing_time: 'Trong ngày làm việc',
      fee: '8.000 VNĐ / bản sao',
      form_url: ''
    }
  ];

  try {
    for (const proc of procedures) {
      const [existing]: any = await connection.execute('SELECT id FROM procedures WHERE title = ?', [proc.title]);
      
      if (existing.length > 0) {
        await connection.execute(
          'UPDATE procedures SET description = ?, content = ?, required_documents = ?, processing_time = ?, fee = ?, form_url = ? WHERE id = ?',
          [proc.description, proc.content, proc.required_documents, proc.processing_time, proc.fee, proc.form_url, existing[0].id]
        );
        console.log(`Updated procedure: ${proc.title}`);
      } else {
        await connection.execute(
          'INSERT INTO procedures (title, description, content, required_documents, processing_time, fee, form_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [proc.title, proc.description, proc.content, proc.required_documents, proc.processing_time, proc.fee, proc.form_url]
        );
        console.log(`Inserted procedure: ${proc.title}`);
      }
    }
    console.log('--- Procedures Seeding Complete ---');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await connection.end();
  }
}

run();
