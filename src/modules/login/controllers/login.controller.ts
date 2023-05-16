import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { getUserLoginDTO } from '../dto/getUserLoginDTO.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import express, { Request, Response, request } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('')
  @Render('login')
  root() {
    return;
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.' })
  @ApiOperation({ summary: 'SignIn' })
  public async getUserLogin(
    @Res() res: Response,
    @Body() Dto: getUserLoginDTO,
  ): Promise<any> {
    const result: any = await this.loginService.getLogin(Dto);
    console.log('result', typeof result);
    console.log('result', result);
    if (result.token) {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result,
        message: `Login Successfull`,
      });
    } else if (result.status === 401) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: `Login Unsuccessful`,
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: `Incorrect Credentials`,
      });
    }
  }
}
