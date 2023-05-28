import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import {
  EditProduct,
  addProduct,
  checkDelete,
} from '../dtos/checkProductInput.dto';
import { JwtService } from '@nestjs/jwt';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private jwtService: JwtService,
  ) {}
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
  @Get('getProducts')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  public async getProducts(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.productService.getAllProducts(payload);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully Edited Product Data`,
    });
  }
  @Get('getProductpage')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  public async getProductsData(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Query() params,
  ): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.productService.getAllProductsDataFinal(
      params,
      payload,
    );

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully Edited Product Data`,
    });
  }
  @Post('edit-product/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product',
  })
  @ApiOperation({ summary: 'Edit Product' })
  public async getProductEdit(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Body() data: EditProduct,
  ): Promise<any> {
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.productService.getProductEdited(
      data,
      payload,
    );
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully Edit Product Data`,
    });
  }

  @Get('edit-product')
  @Render('edit_products')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product Page',
  })
  @ApiOperation({ summary: 'Edit Product Page' })
  public async getProductEditPage(@Query() params) {
    console.log(
      '🚀 ~ file: product.controller.ts:135 ~ ProductController ~ getProductEditPage ~ params:',
      params,
    );
    return;
  }

  @Get('edit-product-data/:id')
  @Render('edit_products')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product data',
  })
  @ApiOperation({ summary: 'Edit Product data' })
  public async getProductEditData(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Param() params: string,
  ): Promise<any> {
    const result: any = await this.productService.EditProductGetData(params);

    if (result[0].id) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Product Seacrched ...`,
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went wrong to Product`,
      });
    }
  }
  @Get('/search')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Edit Product data',
  })
  @ApiOperation({ summary: 'Edit Product data' })
  public async getProductSearch(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Query() params: number,
  ): Promise<any> {
    const result: any = await this.productService.SearchProducts(params);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Search Product done successfully`,
    });
  }

  @Post('addProduct')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.' })
  @ApiOperation({ summary: 'added category' })
  public async getAddProduct(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Body() Dto: addProduct,
  ): Promise<any> {
    const result: any = await this.productService.AddProduct(Dto);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Product added successfully`,
    });
  }

  @Post('deleteRecord')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete User Data' })
  @ApiOperation({ summary: 'Delete User Data by admin' })
  async getUsersDelete(
    @Req() req: Request,
    @Res() res: Response,
    @Body() Dto: checkDelete,
  ): Promise<any> {
    const result: any = await this.productService.DeleteProductAction(Dto);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Product Record deleted successfully`,
    });
  }
}
