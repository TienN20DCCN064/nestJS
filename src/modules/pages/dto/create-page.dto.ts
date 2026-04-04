import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePageDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
