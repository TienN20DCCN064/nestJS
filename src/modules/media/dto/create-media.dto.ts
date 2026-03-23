import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  title: string;

  @IsEnum(['image', 'video'])
  type: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;
}
