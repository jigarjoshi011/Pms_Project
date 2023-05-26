import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private jwtService: JwtService,
  ) {}
  @Get('')
  @Render('cart')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of page',
  })
  async getCartPage() {
    return;
  }

  @Get('cartData')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of products',
  })
  async getCartData(@Req() req: Request, @Res() res: Response): Promise<any> {
    const UserData = req.cookies['data'];
    const UserID = UserData.id;

    const result: any = await this.cartService.getCartItems(UserID);

    const products = result.findProductDetails;
    const Quantity = result.Quantity;

    if (result.findProductDetails.length) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: { products, Quantity },
        message: `List of Products`,
      });
    } else if (result.status === 400) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went wrong`,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: { products, Quantity },
        message: `List Products found`,
      });
    }
  }

  @Get('totalItemsInCart')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of products',
  })
  async getTotalItemsInCart(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const UserData = req.cookies['data'];
    console.log(
      '🚀 ~ file: cart.controller.ts:29 ~ CartController ~ getCartData ~ UserData:',
      UserData,
    );
    const UserID = UserData.id;
    const result: any = await this.cartService.getCartItemsTotal(UserID);
  }

  @Post('addItemsInCart')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'products ADD TO Cart ',
  })
  async getAddInCart(
    @Req() req: Request,
    @Res() res: Response,
    @Body() id: number,
  ): Promise<any> {
    const UserData = req.cookies['data'];
    const UserID = UserData.id;
    const result: any = await this.cartService.AddItemsCart(UserID, id);
    if (result.id) {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Product Added to Cart`,
      });
    } else if (result.status == 400) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Product is out of Stock, please try again later !`,
      });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    }
  }

  @Post('deleteCartRecord')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of products',
  })
  async getDeleteItemsInCart(
    @Req() req: Request,
    @Res() res: Response,
    @Body() id: number,
  ): Promise<any> {
    const UserData = req.cookies['data'];
    const UserID = UserData.id;
    const result: any = await this.cartService.DeleteItemsInCart(UserID, id);

    if (result.status == 400) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else if (result.status == 403) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Product Removed !`,
      });
    }
  }

  @Post('addOrder')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of products',
  })
  async addOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Body() id: number,
  ): Promise<any> {
    const UserData = req.cookies['data'];
    const UserID = UserData.id;
    const result: any = await this.cartService.OrderProduct(UserID, id);

    if (result.status == 400) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else if (result.status == 403) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else if (result.status == 409) {
      return res.status(HttpStatus.CONFLICT).json({
        status: HttpStatus.CONFLICT,
        data: result,
        message: `Product is already Ordered !`,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Product Ordered !`,
      });
    }
  }
  @Get('getAllOrder')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of products',
  })
  async getAllOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Body() id: number,
  ): Promise<any> {
    const UserData = req.cookies['data'];
    const UserID = UserData.id;
    const result: any = await this.cartService.allOrderProduct(UserID, id);

    if (result.status == 400) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else if (result.status == 403) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Product Removed !`,
      });
    }
  }
  @Get('orders')
  @HttpCode(HttpStatus.OK)
  @Render('order')
  @ApiResponse({ status: HttpStatus.OK, description: 'Order Page render' })
  @ApiOperation({
    summary: 'Order Page render',
  })
  async getOrderpage() {
    return;
  }

  @Post('deleteOrder')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Cart Render.' })
  @ApiOperation({
    summary: 'Cart of products',
  })
  async deleteOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Body() id: number,
  ): Promise<any> {
    const UserData = req.cookies['data'];
    const UserID = UserData.id;
    const result: any = await this.cartService.DeleteOrder(UserID, id);

    if (result.status == 400) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else if (result.status == 403) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: result,
        message: `Something went false !`,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Order is Removed !`,
      });
    }
  }
}
