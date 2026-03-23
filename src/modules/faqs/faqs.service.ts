import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './schemas/faq.schema';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(@InjectModel(Faq.name) private faqModel: Model<FaqDocument>) {}

  async create(createFaqDto: CreateFaqDto) {
    return this.faqModel.create(createFaqDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.faqModel.find({ isPublished: true }).skip(skip).limit(limit);
  }

  async findOne(id: string) {
    return this.faqModel.findById(id);
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    return this.faqModel.findByIdAndUpdate(id, updateFaqDto, { new: true });
  }

  async remove(id: string) {
    return this.faqModel.findByIdAndDelete(id);
  }
}
