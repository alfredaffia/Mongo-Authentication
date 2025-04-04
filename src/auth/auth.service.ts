import { Injectable, UnauthorizedException, HttpException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto)
  //   : Promise<{ token: string }> 
  {
    try {
      const existingUser = await this.userModel.findOne({ email: signUpDto.email });
      if (existingUser) {
        throw new ConflictException('email already exists, login or input new email address');
      }
      const { firstName, lastName, email, password, address, phoneNumber } = signUpDto;

      // const existingUser =await this.userModel.findOne({ where: { email } });
      // if(existingUser){
      //   throw new HttpException('user alredy exists' ,404 )
      // }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phoneNumber
      });


      const token = this.jwtService.sign({ id: user._id, userDetails: user.email });

      return {
        userDetails: user,
        access_token: token
      };
    }

    catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOne(id: string) {
    const find = await this.userModel.findOne({ where: { id: id } });
    if (!find) {
      throw new HttpException('User not found', 400);
    }
    return find;
  }

  update(id: string, updateBookDto: UpdateUserDto) {

    const update = this.userModel.findByIdAndUpdate(id, updateBookDto);
    if (!update) {
      throw new NotFoundException('User not found')
    }
    return update;
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const result = await this.userModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`User record with ID ${id} not found`);
    }

    return {
      message: `User record with ID ${id} deleted successfully`,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return {
      userId: user.id,
      useremail: user.email,
      access_token: token
    };
  }
}