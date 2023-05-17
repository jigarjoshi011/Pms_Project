import { Module } from '@nestjs/common';
import { user_homeService } from './services/user_home.service';
import { user_homeController } from '../user_home/controller/user_home.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [user_homeController],
  providers: [user_homeService, JwtService],
})
export class user_home {}
