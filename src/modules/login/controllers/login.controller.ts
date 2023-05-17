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
} from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { getUserLoginDTO } from '../dto/getUserLoginDTO.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import express, { Request, Response, request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private jwtService: JwtService,
  ) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Login Page Loaded.' })
  @ApiOperation({ summary: 'SignIn-page' })
  @Render('login')
  root() {
    return;
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Success.' })
  @ApiOperation({ summary: 'SignIn' })
  public async getUserLogin(
    @Req()
    req: Request,
    @Res()
    res: Response,
    @Body() Dto: getUserLoginDTO,
  ): Promise<any> {
    const result: any = await this.loginService.getLogin(Dto);
    if (result.token) {
      res.cookie('auth_token', result.token, { httpOnly: true });
      //
      const payload: any = await this.jwtService.verifyAsync(result.token, {
        secret: process.env.JWT_SECRET,
      });

      res.cookie('data', payload, { httpOnly: true });
      return res.status(HttpStatus.OK).json({
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
