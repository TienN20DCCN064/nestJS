import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 150, nullable: true })
  name?: string;

  @Column({ length: 50, default: 'USER' })
  role: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  address?: string;

  @Column({ type: 'longtext', nullable: true })
  image?: string;

  @Column({ default: false, name: 'is_active' })
  isActive: boolean;

  @Column({ length: 100, nullable: true, name: 'code_id' })
  codeId?: string;

  @Column({ type: 'timestamp', nullable: true, name: 'code_expired' })
  codeExpired?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
