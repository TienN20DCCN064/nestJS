import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseDocument, DocumentDocument } from './schemas/document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(BaseDocument.name) private documentModel: Model<DocumentDocument>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    return this.documentModel.create(createDocumentDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.documentModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate('categoryId');
  }

  async findOne(id: string) {
    return this.documentModel.findById(id).populate('categoryId');
  }

  async findByCategory(categoryId: string) {
    return this.documentModel.find({ categoryId }).populate('categoryId');
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.documentModel.findByIdAndUpdate(id, updateDocumentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.documentModel.findByIdAndDelete(id);
  }
}
