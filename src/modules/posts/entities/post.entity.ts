import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, nullable: true, unique: true })
  slug?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column({ type: 'enum', enum: ['news', 'announcement', 'other'] })
  type: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 255, nullable: true })
  author?: string;

  @Column({ type: 'longtext', nullable: true })
  thumbnail?: string;

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
