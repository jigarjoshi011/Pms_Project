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
import { DashboardService } from '../services/dashboard.service';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { checkDelete } from '../dto/getDashboardDTO';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}
  @Get('')
  @Render('dashboard')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard Render.' })
  @ApiOperation({ summary: 'Dashboard' })
  async getDashboard(@Req() req: Request, @Res() res: Response): Promise<any> {
    const result: any = await this.dashboardService.getDashboards();
  }

  @Get('listUsers')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'UserData-page Loaded.' })
  @ApiOperation({ summary: 'UserData-page' })
  @Render('listUsers')
  root() {
    return;
  }

  @Get('UserRecords')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'User Data' })
  @ApiOperation({ summary: 'User Data for admin' })
  async getUsers(@Req() req: Request, @Res() res: Response): Promise<any> {
    const result: any = await this.dashboardService.getUserData();

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: result,
      message: `User Record Fetched`,
    });
  }
  @Get('logout')
  logout(@Req() req, @Res({ passthrough: true }) res) {
    res.clearCookie('auth_token');
    res.clearCookie('data');
    res.redirect('/login');
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
    const result: any = await this.dashboardService.DeleteUserAction(Dto);
    console.log(
      '🚀 ~ file: dashboard.controller.ts:67 ~ DashboardController ~ result:',
      result,
    );
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: null,
      message: `User Record deleted successfully`,
    });
  }
}
