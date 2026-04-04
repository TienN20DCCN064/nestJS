import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  type?: string;

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
  @IsDate()
  publishedAt?: Date;
}
