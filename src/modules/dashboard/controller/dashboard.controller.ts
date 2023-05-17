import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}
  @Get('')
  @Render('dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard Render.' })
  @ApiOperation({ summary: 'Dashboard' })
  async getDashboard(@Req() req: Request, @Res() res: Response): Promise<any> {
    const result: any = await this.dashboardService.getDashboards();
  }
}
