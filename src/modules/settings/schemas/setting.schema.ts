import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema({ timestamps: true })
export class Setting {
  @Prop({ required: true })
  siteName: string;

  @Prop()
  logo: string;

  @Prop()
  hotline: string;

  @Prop()
  email: string;

  @Prop()
  address: string;

  @Prop()
  mapEmbed: string;

  @Prop()
  workingHours: string;

  @Prop({
    type: {
      facebook: String,
      youtube: String,
    },
    default: {},
  })
  socialLinks: {
    facebook: string;
    youtube: string;
  };
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
