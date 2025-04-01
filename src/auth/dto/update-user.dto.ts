import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './signup.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(SignUpDto) {
    @ApiProperty({ example: "Alfred", description: "user's firstName" })
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty({ example: "Affia", description: "user's surname" })
    @IsNotEmpty()
    @IsString()
    lastName: string;


    @ApiProperty({ example: "alfred1", description: "user password" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "alfred1", description: "user password" })
    @IsNotEmpty()
    @IsString()
    password: string;


    @ApiProperty({ example: "08085956701", description: "user's phone Number" })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    phoneNumber: string;

    @ApiProperty({ example: "oron road", description: "this is users address" })
    @IsNotEmpty()
    @IsString()
    address: string;
}
