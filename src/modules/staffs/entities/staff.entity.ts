import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staffs')
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name?: string;

  @Column({ length: 100, nullable: true })
  position?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ type: 'int', nullable: true, name: 'department_id' })
  departmentId?: number;

  @Column({ type: 'longtext', nullable: true })
  image?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;
}
