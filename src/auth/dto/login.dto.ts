import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
@ApiProperty({example:"alfred@gmail.com",description:"user email"})
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({example:"alfred1",description:"user's password"})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}