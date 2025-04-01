import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
   uri: configService.get<string>('DB_URI'),
   
      })
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
