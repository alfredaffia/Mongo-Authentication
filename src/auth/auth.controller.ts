import { Body, Controller, Get, Post, Delete, Patch, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'user signup' })
  @ApiResponse({ status: 200, description: 'create new user ' })
  signUp(@Body() signUpDto: SignUpDto)//: Promise<{ token: string }> 
  {
    return this.authService.signUp(signUpDto);
  };


  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, description: 'Return all Users.' })
  async getAllusers() //: Promise<Book[]> 
  {    
      return await this.authService.findAll();
  }


  @Get(':id')
  @ApiOperation({summary:'get a specific user'})
  @ApiResponse({status: 200,description:'user retrieved successfully'})
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:'update a specific user'})
  @ApiResponse({status: 200,description:'update a user'})
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'delete a specific user'})
  @ApiResponse({status: 200,description:'delete user'})
  async removeUser(@Param('id') id: string) {
    return this.authService.remove(id);
  }

  
  @Post('/login')
  @ApiOperation({ summary: ' user login ' })
  @ApiResponse({ status: 200, description: 'User login'})
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  };
}