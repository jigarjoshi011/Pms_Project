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
import { user_homeService } from '../services/user_home.service';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('home')
export class user_homeController {
  constructor(private user_homeService: user_homeService) {}
  @Get('')
  @Render('home')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'user_home Render.' })
  @ApiOperation({ summary: '  ' })
  async getDashboard(@Req() req: Request, @Res() res: Response): Promise<any> {
    const result: any = await this.user_homeService.getuser_home();
  }
}
