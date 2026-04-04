import { IsEmail, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsEmail({}, { message: 'email không đúng định dạng' })
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  isActive?: boolean;
}