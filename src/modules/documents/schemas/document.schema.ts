import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentDocument = Document & BaseDocument;

@Schema({ timestamps: true })
export class BaseDocument {
  @Prop({ required: true })
  title: string;

  @Prop()
  documentNumber: string;

  @Prop()
  issuedDate: Date;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop()
  description: string;
}

export const DocumentSchema = SchemaFactory.createForClass(BaseDocument);
