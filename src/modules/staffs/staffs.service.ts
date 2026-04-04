import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const staff = this.staffRepository.create(createStaffDto as any);
    return this.staffRepository.save(staff);
  }

  async findAll() {
    return this.staffRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    return this.staffRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staffId = parseInt(id, 10);
    await this.staffRepository.update(staffId, updateStaffDto as any);
    return this.staffRepository.findOneBy({ id: staffId });
  }

  async count() {
    return this.staffRepository.count();
  }

  async remove(id: string) {
    return this.staffRepository.delete(parseInt(id, 10));
  }
}
