import { IsString, IsOptional, IsMongoId, IsDate } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  documentNumber?: string;

  @IsOptional()
  @IsDate()
  issuedDate?: Date;

  @IsString()
  fileUrl: string;

  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
