import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
import { jwtConstants } from './jwtconstants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '30s'},
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    
  ],
  controllers: [AuthController],
  providers: [AuthService],
 
})
export class AuthModule {}