import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
