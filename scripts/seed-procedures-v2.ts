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

  console.log('Connected to MySQL for seeding procedures v2 (structured steps)');

  const procedures = [
    {
      title: 'Đăng ký tạm trú cho công dân',
      description: 'Thủ tục đăng ký tạm trú khi công dân chuyển đến sinh sống tại địa bàn xã/phường.',
      content: 'Lưu ý: Công dân cần có tài khoản Định danh điện tử (VNeID) mức 2 để thực hiện nhanh nhất.',
      required_documents: '1. Tờ khai CT01;\n2. Hợp đồng thuê nhà/Sổ đỏ;\n3. CCCD gắn chip.',
      processing_time: '03 ngày làm việc',
      fee: 'Miễn phí',
      form_url: 'https://dichvucong.gov.vn/',
      steps: JSON.stringify([
        { title: 'Bước 1: Chuẩn bị hồ sơ', detail: 'Công dân chuẩn bị đầy đủ các giấy tờ theo danh mục hồ sơ yêu cầu.' },
        { title: 'Bước 2: Nộp hồ sơ', detail: 'Nộp trực tiếp tại Công an xã hoặc nộp trực tuyến qua Cổng dịch vụ công.' },
        { title: 'Bước 3: Tiếp nhận & Xử lý', detail: 'Cơ quan chức năng kiểm tra tính xác thực và cập nhật vào CSDL cư trú.' },
        { title: 'Bước 4: Trả kết quả', detail: 'Công dân nhận thông báo kết quả qua tin nhắn hoặc nhận trực tiếp.' }
      ])
    },
    {
      title: 'Cấp bản sao trích lục hộ tịch',
      description: 'Cấp bản sao các giấy tờ hộ tịch từ sổ gốc.',
      content: 'Có thể yêu cầu cấp nhiều bản sao cùng một lúc.',
      required_documents: '1. Tờ khai yêu cầu;\n2. Giấy tờ tùy thân.',
      processing_time: 'Ngay trong ngày',
      fee: '8.000 VNĐ / bản',
      form_url: '',
      steps: JSON.stringify([
        { title: 'Bước 1: Điền thông tin', detail: 'Điền thông tin vào tờ khai tại bộ phận Một cửa.' },
        { title: 'Bước 2: Kiểm tra sổ gốc', detail: 'Công chức tư pháp đối chiếu thông tin với sổ đăng ký hộ tịch gốc.' },
        { title: 'Bước 3: Đóng lệ phí', detail: 'Nộp lệ phí tại quầy thu ngân.' },
        { title: 'Bước 4: Nhận bản sao', detail: 'Ký tên vào sổ và nhận các bản sao trích lục.' }
      ])
    }
  ];

  try {
    for (const proc of procedures) {
      const [existing]: any = await connection.execute('SELECT id FROM procedures WHERE title = ?', [proc.title]);
      
      if (existing.length > 0) {
        await connection.execute(
          'UPDATE procedures SET description = ?, content = ?, required_documents = ?, processing_time = ?, fee = ?, form_url = ?, steps = ? WHERE id = ?',
          [proc.description, proc.content, proc.required_documents, proc.processing_time, proc.fee, proc.form_url, proc.steps, existing[0].id]
        );
        console.log(`Updated procedure v2: ${proc.title}`);
      } else {
        await connection.execute(
          'INSERT INTO procedures (title, description, content, required_documents, processing_time, fee, form_url, steps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [proc.title, proc.description, proc.content, proc.required_documents, proc.processing_time, proc.fee, proc.form_url, proc.steps]
        );
        console.log(`Inserted procedure v2: ${proc.title}`);
      }
    }
    console.log('--- Procedures Seeding v2 Complete ---');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await connection.end();
  }
}

run();
