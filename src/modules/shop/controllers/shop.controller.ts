import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { ShopService } from '../services/shop.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('/home/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @Get('')
  @Render('shopping')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'user_home Render.' })
  @ApiOperation({ summary: 'All Products Available Listing fot user' })
  async getshopPage() {
    return;
  }

  @Get(':name')
  @Render('shopping')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  async root() {
    return;
  }

  @Post(':name')
  @Render('shopping')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  async getShop(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: string,
  ): Promise<any> {
    const result: any = await this.shopService.getCategoryProducts(params);
    console.log(
      '🚀 ~ file: shop.controller.ts:32 ~ ShopController ~ result:',
      result,
    );
    if (result) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Successfully fetched category Data`,
      });
    }
  }
}
