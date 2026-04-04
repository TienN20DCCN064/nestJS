import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProcedureDto {
  @IsString()
  title: string;

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
}
