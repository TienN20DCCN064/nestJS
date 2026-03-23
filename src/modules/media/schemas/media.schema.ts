import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class Media {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: ['image', 'video'] })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  thumbnail: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
