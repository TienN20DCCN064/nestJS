import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './schemas/banner.schema';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    return this.bannerModel.create(createBannerDto);
  }

  async findAll() {
    return this.bannerModel.find({ isActive: true }).sort({ order: 1 });
  }

  async findOne(id: string) {
    return this.bannerModel.findById(id);
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    return this.bannerModel.findByIdAndUpdate(id, updateBannerDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.bannerModel.findByIdAndDelete(id);
  }

  async reorder(banners: { id: string; order: number }[]) {
    const updates = banners.map((banner) =>
      this.bannerModel.findByIdAndUpdate(
        banner.id,
        { order: banner.order },
        { new: true },
      ),
    );
    return Promise.all(updates);
  }
}
