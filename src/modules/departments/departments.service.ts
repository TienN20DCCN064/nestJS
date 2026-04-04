import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto as any);
    return this.departmentRepository.save(department);
  }

  async findAll() {
    return this.departmentRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    return this.departmentRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const departmentId = parseInt(id, 10);
    await this.departmentRepository.update(departmentId, updateDepartmentDto as any);
    return this.departmentRepository.findOneBy({ id: departmentId });
  }

  async remove(id: string) {
    return this.departmentRepository.delete(parseInt(id, 10));
  }
}
