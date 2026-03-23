import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './schemas/setting.schema';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async findOrCreate() {
    let setting = await this.settingModel.findOne();
    if (!setting) {
      setting = await this.settingModel.create({
        siteName: 'UBND xã',
        socialLinks: { facebook: '', youtube: '' },
      });
    }
    return setting;
  }

  async update(updateSettingDto: UpdateSettingDto) {
    const setting = await this.settingModel.findOne();
    if (setting) {
      return await this.settingModel.findByIdAndUpdate(
        setting._id,
        updateSettingDto,
        { new: true },
      );
    }
    return await this.settingModel.create(updateSettingDto);
  }

  async findAll() {
    return this.settingModel.find();
  }

  async findOne(id: string) {
    return this.settingModel.findById(id);
  }

  async create(createSettingDto: CreateSettingDto) {
    return this.settingModel.create(createSettingDto);
  }

  async remove(id: string) {
    return this.settingModel.findByIdAndDelete(id);
  }
}
