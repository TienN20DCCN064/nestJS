import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './schemas/media.schema';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    return this.mediaModel.create(createMediaDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.mediaModel.find().skip(skip).limit(limit);
  }

  async findByType(type: string, skip = 0, limit = 10) {
    return this.mediaModel.find({ type }).skip(skip).limit(limit);
  }

  async findOne(id: string) {
    return this.mediaModel.findById(id);
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    return this.mediaModel.findByIdAndUpdate(id, updateMediaDto, { new: true });
  }

  async remove(id: string) {
    return this.mediaModel.findByIdAndDelete(id);
  }
}
