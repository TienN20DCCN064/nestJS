import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const postSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  summary: String,
  content: String,
  thumbnail: String,
  categoryId: mongoose.Types.ObjectId,
  isFeatured: Boolean,
  isPublished: Boolean,
  publishedAt: Date,
});

const categorySchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  description: String,
});

const Post = mongoose.model('Post', postSchema, 'posts');
const Category = mongoose.model('Category', categorySchema, 'categories');

const pageSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  thumbnail: String,
  isPublished: Boolean,
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
  isPublished: Boolean,
});

const documentSchema = new mongoose.Schema({
  title: String,
  documentNumber: String,
  issuedDate: Date,
  fileUrl: String,
  categoryId: mongoose.Types.ObjectId,
  description: String,
});

const procedureSchema = new mongoose.Schema({
  title: String,
  description: String,
  requiredDocuments: [String],
  processingTime: String,
  fee: String,
  formUrl: String,
});

const Page = mongoose.model('Page', pageSchema, 'pages');
const Faq = mongoose.model('Faq', faqSchema, 'faqs');
const Document = mongoose.model('Document', documentSchema, 'documents');
const Procedure = mongoose.model('Procedure', procedureSchema, 'procedures');

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in .env, set it to your Atlas connection string');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log('Connected to MongoDB');

  const existingCategory = await Category.findOne({ slug: 'tin-tuc' });
  let categoryId;
  if (existingCategory) {
    categoryId = existingCategory._id;
  } else {
    const createdCategory = await Category.create({
      name: 'Tin tức',
      slug: 'tin-tuc',
      description: 'Danh mục tin tức',
    });
    categoryId = createdCategory._id;
    console.log('Created category', categoryId.toString());
  }

  const posts = [
    {
      title: 'Khai mạc hội nghị địa phương',
      slug: 'khai-mac-hoi-nghi-dia-phuong',
      summary: 'Sự kiện quan trọng của địa phương tháng này',
      content: 'Nội dung chi tiết về hội nghị ...',
      thumbnail: '',
      categoryId,
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: 'Cập nhật thủ tục hành chính mới',
      slug: 'cap-nhat-thu-tuc-hanh-chinh-moi',
      summary: 'Thủ tục mới áp dụng từ ngày ...',
      content: 'Nội dung chi tiết thủ tục mới ...',
      thumbnail: '',
      categoryId,
      isFeatured: false,
      isPublished: true,
      publishedAt: new Date(),
    },
  ];

  for (const p of posts) {
    const existed = await Post.findOne({ slug: p.slug });
    if (!existed) {
      await Post.create(p);
      console.log('Inserted post', p.slug);
    } else {
      console.log('Post exists', p.slug);
    }
  }

  const aboutPage = await Page.findOne({ slug: 'about' });
  if (!aboutPage) {
    await Page.create({
      title: 'Giới thiệu về UBND Xã',
      slug: 'about',
      content: 'Nội dung demo trang giới thiệu...',
      thumbnail: '',
      isPublished: true,
    });
    console.log('Inserted about page');
  } else {
    console.log('About page exists');
  }

  const faqs = [
    { question: 'Thủ tục đăng ký là gì?', answer: 'Bạn cần chuẩn bị ...', isPublished: true },
    { question: 'Làm sao để liên hệ?', answer: 'Gọi số hotline hoặc email...', isPublished: true },
  ];
  for (const f of faqs) {
    const existed = await Faq.findOne({ question: f.question });
    if (!existed) {
      await Faq.create(f);
      console.log('Inserted faq', f.question);
    } else {
      console.log('Faq exists', f.question);
    }
  }

  const documents = [
    {
      title: 'Quyết định số 01',
      documentNumber: 'QD-01',
      issuedDate: new Date(),
      fileUrl: 'http://example.com/docs/qdd-01.pdf',
      categoryId,
      description: 'Doc mẫu 1',
    },
    {
      title: 'Thông báo số 02',
      documentNumber: 'TB-02',
      issuedDate: new Date(),
      fileUrl: 'http://example.com/docs/tb-02.pdf',
      categoryId,
      description: 'Doc mẫu 2',
    },
  ];

  for (const d of documents) {
    const existed = await Document.findOne({ title: d.title });
    if (!existed) {
      await Document.create(d);
      console.log('Inserted document', d.title);
    } else {
      console.log('Document exists', d.title);
    }
  }

  const procedures = [
    {
      title: 'Thông tin cấp xã',
      description: 'Cung cấp thông tin, thủ tục liên quan đến cấp xã',
      requiredDocuments: ['CMND/CCCD', 'Sổ hộ khẩu', 'Giấy tờ liên quan'],
      processingTime: '3-5 ngày làm việc',
      fee: 'Miễn phí',
      formUrl: 'http://example.com/forms/thong-tin-cap-xa.pdf',
    },
  ];

  for (const pr of procedures) {
    const existed = await Procedure.findOne({ title: pr.title });
    if (!existed) {
      await Procedure.create(pr);
      console.log('Inserted procedure', pr.title);
    } else {
      console.log('Procedure exists', pr.title);
    }
  }

  console.log('Done seeding all data.');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
