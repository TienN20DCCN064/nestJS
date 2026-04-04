import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('procedures')
export class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
