import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true, unique: true })
  slug?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 100, nullable: true })
  type?: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true, name: 'required_documents' })
  requiredDocuments?: string;

  @Column({ length: 255, nullable: true, name: 'processing_time' })
  processingTime?: string;

  @Column({ length: 255, nullable: true })
  fee?: string;

  @Column({ length: 255, nullable: true, name: 'form_url' })
  formUrl?: string;

  @Column({ type: 'simple-json', nullable: true })
  steps?: { title: string; detail: string }[];

  @Column({ type: 'longtext', nullable: true })
  thumbnail?: string;

  @Column({ length: 255, nullable: true })
  author?: string;

  @Column({ type: 'int', nullable: true, name: 'category_id' })
  categoryId?: number;

  @Column({ default: false, name: 'is_featured' })
  isFeatured: boolean;

  @Column({ default: true, name: 'is_published' })
  isPublished: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'published_at' })
  publishedAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
