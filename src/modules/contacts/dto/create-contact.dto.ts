import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(['pending', 'replied'])
  status?: string;
}
