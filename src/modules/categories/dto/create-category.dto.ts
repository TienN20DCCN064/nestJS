import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsEnum(['news', 'document', 'procedure'])
  type: string;
}
