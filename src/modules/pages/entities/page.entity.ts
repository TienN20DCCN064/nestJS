import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  type?: string;

  @Column({ length: 255, nullable: true })
  title?: string;

  @Column({ length: 255, nullable: true, unique: true })
  slug?: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'longtext', nullable: true })
  image?: string;

  @Column({ default: true, name: 'is_published' })
  isPublished: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
