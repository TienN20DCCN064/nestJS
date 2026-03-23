import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Procedure, ProcedureDocument } from './schemas/procedure.schema';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Injectable()
export class ProceduresService {
  constructor(
    @InjectModel(Procedure.name) private procedureModel: Model<ProcedureDocument>,
  ) {}

  async create(createProcedureDto: CreateProcedureDto) {
    return this.procedureModel.create(createProcedureDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.procedureModel.find().skip(skip).limit(limit);
  }

  async findOne(id: string) {
    return this.procedureModel.findById(id);
  }

  async update(id: string, updateProcedureDto: UpdateProcedureDto) {
    return this.procedureModel.findByIdAndUpdate(id, updateProcedureDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.procedureModel.findByIdAndDelete(id);
  }
}
