import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    return this.eventModel.create(createEventDto);
  }

  async findAll(skip = 0, limit = 10) {
    return this.eventModel
      .find()
      .sort({ startTime: 1 })
      .skip(skip)
      .limit(limit);
  }

  async findUpcoming(limit = 5) {
    return this.eventModel
      .find({ startTime: { $gte: new Date() } })
      .sort({ startTime: 1 })
      .limit(limit);
  }

  async findOne(id: string) {
    return this.eventModel.findById(id);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
  }

  async remove(id: string) {
    return this.eventModel.findByIdAndDelete(id);
  }
}
