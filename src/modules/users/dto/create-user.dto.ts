import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    name?: string;

    @IsNotEmpty({ message: "email không được để trống" })
    @IsEmail({}, { message: 'email không đúng định dạng' })
    email: string;

    @IsNotEmpty({ message: "password không được để trống" })
    password: string;

    @IsOptional()
    role?: string;

    @IsOptional()
    phone?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    image?: string;

    @IsOptional()
    isActive?: boolean;
}
