import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  to: string;

  @MinLength(5)
  subject: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  confirmURL: string;

  @IsString()
  @IsOptional()
  action?: string;
}
