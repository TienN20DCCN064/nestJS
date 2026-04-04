import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 150, nullable: true })
  email?: string;
}
