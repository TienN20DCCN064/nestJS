import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateSettingDto {
  @IsString()
  siteName: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  hotline?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  mapEmbed?: string;

  @IsOptional()
  @IsString()
  workingHours?: string;

  @IsOptional()
  @IsObject()
  socialLinks?: {
    facebook?: string;
    youtube?: string;
  };
}
