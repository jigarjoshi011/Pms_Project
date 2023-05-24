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
import { addCategories, checkDelete } from '../dto/addCatagoryDTO';
import { Request, Response, response } from 'express';
import { JwtService } from '@nestjs/jwt';
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private jwtService: JwtService,
  ) {}
  @Get('')
  @Render('category')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dashboard category render.',
  })
  @ApiOperation({ summary: 'Dashboard category render.' })
  async root() {
    return;
  }
  @Get('getcategory')
  // @UseGuards(AuthGuard)
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
    const token = req.cookies['auth_token'];
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    const result: any = await this.categoriesService.getAllCategory(payload);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Successfully fetched category Data`,
    });
  }

  @Post('addCategory')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.' })
  @ApiOperation({ summary: 'added category' })
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
    const result: any = await this.categoriesService.DeleteUserAction(Dto);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `Category Record deleted successfully`,
    });
  }
}
