import { Module } from '@nestjs/common';
import { ShopService } from './services/shop.service';
import { ShopController } from './controllers/shop.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [ShopController],
  providers: [ShopService, JwtService],
})
export class ShopModule {}
