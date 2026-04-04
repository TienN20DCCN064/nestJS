import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Procedure } from './entities/procedure.entity';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectRepository(Procedure)
    private procedureRepository: Repository<Procedure>,
  ) {}

  async create(createProcedureDto: CreateProcedureDto) {
    const procedure = this.procedureRepository.create(createProcedureDto as any);
    return this.procedureRepository.save(procedure);
  }

  async findAll(skip = 0, limit = 10) {
    return this.procedureRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: string) {
    return this.procedureRepository.findOneBy({ id: parseInt(id, 10) });
  }

  async update(id: string, updateProcedureDto: UpdateProcedureDto) {
    const procedureId = parseInt(id, 10);
    await this.procedureRepository.update(procedureId, updateProcedureDto as any);
    return this.procedureRepository.findOneBy({ id: procedureId });
  }

  async count() {
    return this.procedureRepository.count();
  }

  async remove(id: string) {
    const result = await this.procedureRepository.delete(parseInt(id, 10));
    return result;
  }
}
