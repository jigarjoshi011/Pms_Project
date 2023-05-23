import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [ProductController],
  providers: [ProductService, JwtService],
})
export class ProductModule {}
