import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { getUserLoginDTO } from '../dto/getUserLoginDTO.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const ACCESS_TOKEN_EXPIRES_IN = '30d';
@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async getLogin(loginDetails: getUserLoginDTO) {
    try {
      console.log(loginDetails);

      const findUser = await prisma.users.findUnique({
        where: {
          email: loginDetails.email,
        },
        include: {
          Users_has_Roles: true,
        },
      });

      if (findUser == null) {
        return new UnauthorizedException();
      } else {
        const compare = await bcrypt.compare(
          loginDetails.password,
          findUser.password,
        );

        if (compare) {
          const payload = {
            id: findUser.id,
            role: findUser.Users_has_Roles[0].roleId,
          };

          return {
            token: await this.jwtService.sign(payload, {
              expiresIn: ACCESS_TOKEN_EXPIRES_IN,
              algorithm: 'HS256',
              secret: process.env.JWT_SECRET,
            }),
            userData: findUser,
            userRole: findUser.Users_has_Roles[0].roleId,
          };
        } else {
          return new BadRequestException();
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: login.service.ts:10 ~ LoginService ~ getLogin ~ error:',
        error,
      );
    }
  }
  async genrateCookie(token, req, res) {
    res.cookie('access_token', token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
  }
}
