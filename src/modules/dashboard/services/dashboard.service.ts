import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class DashboardService {
  async getDashboards() {
    try {
    } catch (error) {}
  }
  async getUserData() {
    try {
      const userData = await prisma.users.findMany({
        include: { Users_has_Roles: true },
      });
      const data = userData
        .map((d) => {
          if (
            d.Users_has_Roles?.length > 0 &&
            d?.Users_has_Roles[0].roleId != 1 &&
            d?.name !== 'admin'
          ) {
            return {
              ...d,
              ...d?.Users_has_Roles[0],
            };
          }
        })
        .filter((e) => e);
      return {
        data,
      };
    } catch (error) {
      return new ForbiddenException();
    }
  }

  async DeleteUserAction(data: any) {
    try {
      console.log('id:::::::', data.id);
      const findUser = await prisma.users_has_Roles.findFirst({
        where: { userId: Number(data?.id) },
      });
      if (findUser) {
        const deleteUserRoles = await prisma.users_has_Roles.deleteMany({
          where: { userId: findUser.userId },
        });
        if (deleteUserRoles) {
          const deleteUser = await prisma.users.delete({
            where: { id: findUser.userId },
          });
          return deleteUser;
        } else {
          return new BadRequestException();
        }
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: dashboard.service.ts:74 ~ DashboardService ~ DeleteUserAction ~ error:',
        error,
      );
      return new ForbiddenException();
    }
  }
  async getLogOutAdmin(req) {
    try {
      const token = req.clearCookie['auth_token'];
      console.log(token);
    } catch (error) {
      console.log(
        '🚀 ~ file: dashboard.service.ts:74 ~ DashboardService ~ DeleteUserAction ~ error:',
        error,
      );
      return new ForbiddenException();
    }
  }
}
