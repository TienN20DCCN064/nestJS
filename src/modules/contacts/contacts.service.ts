import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return this.contactModel.create(createContactDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.contactModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async findByStatus(status: string) {
    return this.contactModel.find({ status }).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return this.contactModel.findById(id);
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactModel.findByIdAndUpdate(id, updateContactDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.contactModel.findByIdAndDelete(id);
  }
}
