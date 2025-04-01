import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @ApiProperty({example:"Alfred",description:"user's firstName"})
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({example:"Affia",description:"user's surname"})
  @IsNotEmpty()
  @IsString()
  lastName: string;

//   @IsNotEmpty()
//   @IsString()
//   @IsEmail({}, { message: 'Please enter correct email' })
//   confirmEmail: string;
@ApiProperty({example:"alfred@gmail.com",description:"user email"})
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({example:"alfred1",description:"user's password"})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({example:"08085956701",description:"user's phone Number"})
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  phoneNumber: string;
  
  @ApiProperty({example:"oron road",description:"this is users address"})
  @IsNotEmpty()
  @IsString()
  address: string;
}