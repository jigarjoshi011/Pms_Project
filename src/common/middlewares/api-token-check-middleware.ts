import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class api_token_check_middleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.cookies);
      const accesstoken = req.cookies.auth_token;

      if (!accesstoken || accesstoken == undefined) {
        res.json({
          HttpStatus: HttpStatus.UNAUTHORIZED,
          ErrrorCode: HttpErrorByCode[401],
          Message: 'Unauthorized access',
          data: null,
        });
      }
      const SECRET: any = process.env.JWT_SECRET;

      const payload = await this.jwtService.verify(accesstoken);
      console.log(
        '🚀 ~ file: api-token-check-middleware.ts:27 ~ api_token_check_middleware ~ use ~ payload:',
        payload,
      );
      // if (token && getCurrentTimeStampUnix() > token.exp) {
      //   return {
      //     isValid: false,
      //     reason: 'Token expired',
      //   };
      // } else if (token && getCurrentTimeStampUnix() < token.exp) {
      //   return {
      //     isValid: true,
      //     ...token,
      //   };
      // }
      // if (!token.isValid) {
      //   res.json({
      //     HttpStatus: HttpStatus.UNAUTHORIZED,
      //     ErrrorCode: HttpErrorByCode[401],
      //     Message: 'Unauthorized access',
      //     data: null,
      //   });
      // }
      // const userRecords = await prisma.users.findUnique({
      //   where: token.id,
      // });
      // console.log(
      //   '🚀 ~ file: api-token-check-middleware.ts:50 ~ api_token_check_middleware ~ use ~ userRecords:',
      //   userRecords,
      // );
      // if (!userRecords) {
      //   res.json({
      //     HttpStatus: HttpStatus.UNAUTHORIZED,
      //     ErrrorCode: HttpErrorByCode[401],
      //     Message: 'Unauthorized access',
      //     data: null,
      //   });
      // }

      // req.authUser = userRecords;
      return next();
    } catch (error) {
      console.log(
        '🚀 ~ file: api-token-check-middleware.ts:15 ~ api_token_check_middleware ~ use ~ error:',
        error,
      );
    }
  }
}

function getCurrentTimeStampUnix() {
  return moment().unix();
}
