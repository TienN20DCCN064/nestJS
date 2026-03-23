import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsDate()
  startTime: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;
}
