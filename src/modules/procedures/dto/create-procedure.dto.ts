import { IsString, IsOptional, IsArray, IsBoolean, IsNumber } from 'class-validator';

export class CreateProcedureDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  requiredDocuments?: string;

  @IsOptional()
  @IsString()
  processingTime?: string;

  @IsOptional()
  @IsString()
  fee?: string;

  @IsOptional()
  @IsString()
  formUrl?: string;

  @IsOptional()
  @IsArray()
  steps?: { title: string; detail: string }[];

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  publishedAt?: Date;
}
