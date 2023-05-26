import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [CartController],
  providers: [CartService, JwtService],
})
export class CartModule {}
