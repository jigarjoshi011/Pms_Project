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
      return data;
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async getUserDataSearch(params) {
    try {
      console.log('called getUserDataSearch');
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
  async getEditPageDataLoad(pramas) {
    try {
      const userId: number = pramas.id;

      const findUser = await prisma.users.findMany({
        where: {
          id: Number(userId),
        },
      });

      return findUser;
    } catch (error) {}
  }
  async getEditPageRole(pramas) {
    try {
      const userId: number = pramas.id;

      const findUserRole = await prisma.users_has_Roles.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          roles: {
            select: {
              name: true,
            },
          },
        },
      });

      console.log(
        '🚀 ~ file: dashboard.service.ts:91 ~ DashboardService ~ getEditPageRole ~ findUserRole:',
        findUserRole,
      );

      return findUserRole;
    } catch (error) {}
  }
  async getEditPageAllRole() {
    try {
      const findUserRole = await prisma.roles.findMany({});
      console.log(
        '🚀 ~ file: dashboard.service.ts:91 ~ DashboardService ~ getEditPageRole ~ findUserRole:',
        findUserRole,
      );

      return findUserRole;
    } catch (error) {}
  }
  async getUpdateDta(data) {
    try {
      await prisma.$transaction(async (tx) => {
        const userRoleId = await tx.roles.findMany({
          where: {
            name: data.role,
          },
          select: {
            id: true,
          },
        });

        const roleId: number = userRoleId[0].id;

        const updateUserRecord = await tx.users.update({
          where: {
            id: Number(data.id),
          },
          data: {
            name: data.name,
            email: data.email,
            Users_has_Roles: {
              deleteMany: {
                userId: Number(data.id),
              },
              create: [
                {
                  assignedBy: 'Admin',
                  assignedAt: new Date(),
                  roleId: roleId,
                },
              ],
            },
          },
        });
        console.log(
          '🚀 ~ file: dashboard.service.ts:141 ~ DashboardService ~ awaitprisma.$transaction ~ updateUserRecord:',
          updateUserRecord,
        );
        if (updateUserRecord) {
          return updateUserRecord;
        }
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: dashboard.service.ts:150 ~ DashboardService ~ getUpdateDta ~ error:',
        error,
      );
    }
  }
}
