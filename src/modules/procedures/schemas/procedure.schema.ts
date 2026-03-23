import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcedureDocument = Procedure & Document;

@Schema({ timestamps: true })
export class Procedure {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  requiredDocuments: string[];

  @Prop()
  processingTime: string;

  @Prop()
  fee: string;

  @Prop()
  formUrl: string;
}

export const ProcedureSchema = SchemaFactory.createForClass(Procedure);
