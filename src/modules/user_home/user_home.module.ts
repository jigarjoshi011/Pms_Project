import { Module } from '@nestjs/common';
import { user_homeService } from './services/user_home.service';
import { user_homeController } from '../user_home/controller/user_home.controller';

@Module({
  controllers: [user_homeController],
  providers: [user_homeService],
})
export class user_home {}
