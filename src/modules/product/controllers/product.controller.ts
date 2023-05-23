import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('')
  @Render('products')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard products render.',
  })
  @ApiOperation({ summary: 'Dashboard products render.' })
  root() {
    return;
  }
}
