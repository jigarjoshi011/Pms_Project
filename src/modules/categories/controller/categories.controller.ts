import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { addCategories } from '../dto/addCatagoryDTO';
import { Request, Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get('')
  @Render('category')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  root() {
    return;
  }
  @Get('getcategory')
  @Render('category')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  public async getCategory(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ): Promise<any> {
    const result: any = await this.categoriesService.getAllCategory();
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully fetched category Data`,
    });
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.' })
  @ApiOperation({ summary: 'SignIn' })
  public async getAddCategory(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Body() Dto: addCategories,
  ): Promise<any> {
    const result: any = await this.categoriesService.AddCategory(Dto);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully added category`,
    });
  }
}
