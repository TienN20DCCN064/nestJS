import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name) private pageModel: Model<PageDocument>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    // Nếu đã có slug thì update, chưa có thì tạo mới
    const existing = await this.pageModel.findOne({ slug: createPageDto.slug });
    if (existing) {
      return this.pageModel.findOneAndUpdate(
        { slug: createPageDto.slug },
        createPageDto,
        { new: true }
      );
    }
    return this.pageModel.create(createPageDto);
  }

  async findAll() {
    return this.pageModel.find({ isPublished: true });
  }

  async findOne(id: string) {
    return this.pageModel.findById(id);
  }

  async findBySlug(slug: string) {
    return this.pageModel.findOne({ slug });
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    return this.pageModel.findByIdAndUpdate(id, updatePageDto, { new: true });
  }

  async updateBySlug(slug: string, updatePageDto: UpdatePageDto) {
    return this.pageModel.findOneAndUpdate({ slug }, updatePageDto, { new: true, upsert: false });
  }

  async remove(id: string) {
    return this.pageModel.findByIdAndDelete(id);
  }
}
