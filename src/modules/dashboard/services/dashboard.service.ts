import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

@Injectable()
export class DashboardService {
  async getDashboards() {
    try {
    } catch (error) {}
  }
  async getUserDatalength(payload){
    try {
      const userData = await prisma.users.findMany({
        include: { Users_has_Roles: true },
      });
      const data = userData
        .map((d) => {
          if (
            d.Users_has_Roles?.length > 0 &&
            d?.Users_has_Roles[0].roleId != Number(payload.role) &&
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
  async getUserData(page,payload) {
    try {
     
      
      const userData = await prisma.users.findMany({
        include: { Users_has_Roles: true },
      });
      const data1 = userData
        .map((d) => {
          if (
            d.Users_has_Roles?.length > 0 &&
            d?.Users_has_Roles[0].roleId != Number(payload.role) &&
            
            d?.name !== 'admin'
          ) {
            return {
              ...d,
              ...d?.Users_has_Roles[0],
            };
          }
        })
        .filter((e) => e);
             //pagination
             let PageNumber: number = page.page;
             let offSet = 0;
             const limit = page.limit;
     
             const allUsertArr = data1;
             if (PageNumber == 0) {
               PageNumber = 1;
             }
        
             offSet = (PageNumber - 1) * limit;

             const SearchedUserRecord = await prisma.users.findMany({
              include: { Users_has_Roles: true },
               skip: Number(offSet),
               take: Number(limit),
             });
            
             const data = SearchedUserRecord.map((d)=>{
              if (
                d.Users_has_Roles?.length > 0 &&
                d?.Users_has_Roles[0].roleId != 1 &&
                d?.Users_has_Roles[0].roleId != Number(payload.role) &&
                d?.name !== 'admin'
              ) {
                return {
                  ...d,
                  ...d?.Users_has_Roles[0],
                };
              }
             }).filter((e) => e);
             
      return data;
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async getUserDataSearch(params) {
    try {
      const searchValue = params.val;
      const searchUserQry= await prisma.users.findMany({
        where:{
            OR:[
              {
                name:{
                  contains:searchValue
                }
              }
              ,{
                email:{
                  startsWith:searchValue
                } 
              },
           ],
           NOT:[
            {
              name:'admin'
            },
            {
              email:'admin@gmail.com'
            }
           ],
        },
        include:{
          Users_has_Roles:true
        }
      })
      const data = searchUserQry.map((d)=>{
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
       }).filter((e) => e);
     
      
      return data
      
    } catch (error) {
      return new ForbiddenException();
    }
  }

  async DeleteUserAction(data: any) {
    try {
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

      return findUserRole;
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async getEditPageAllRole() {
    try {
      const findUserRole = await prisma.roles.findMany({});
      return findUserRole;
    } catch (error) {
      return new ForbiddenException();
    }
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
     
        if (updateUserRecord) {
          return updateUserRecord;
        }
      });
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async addRolePermissions(data){
    try {
        const roleName = data.name;
        const rolePermission = data.permissions
        await prisma.$transaction(async (tx) => {
          const addRole = await tx.roles.create({
            data:{
              name:roleName
            }
          })
          const role_permissions: {
            roleId: number;
            permissionId: number;
            assignedBy: string;
          }[]=[]

          for (let i = 0; i < rolePermission.length; i++) {
            role_permissions.push( { roleId: addRole.id, permissionId: rolePermission[i], assignedBy: 'Admin' })
          }
          
          for (const r_p of role_permissions) {
            const data =await tx.roles_has_Permissions.create({
              data: r_p,
            });
          }
          
          return data;
        })

      } catch (error) {
        return new ForbiddenException();
          
      }
  }
  async addUserByAdmin(data){
    try {
      const name:string = data.name;
      const email:string = data.email
      const password:string = data.password
      const role = data.role
      await prisma.$transaction(async (tx) => {
        const checkEmail = await tx.users.findUnique({
          where: { email: email },
        });
        console.log(checkEmail);

        const checkRole = await tx.roles.findMany({
          where:{
            name:role
          }
        })
        if (checkEmail) {
          return new BadRequestException()
        } else {
          const saltOrRounds = 10;
          const hash = await bcrypt.hash(password, saltOrRounds);
          const newUser = await tx.users.create({
            data: {
              name: name,
              email: email,
              password: hash,
              created_at: `${new Date()}`,
              updated_at: `${new Date()}`,
              Users_has_Roles: {
                create: [
                  {
                    assignedBy: 'Admin',
                    assignedAt: new Date(),
                    roleId:  checkRole[0].id,
                  },
                ],
              },
            },
          });
          return newUser;
        }
      })
      
    } catch (error) {
      console.log(error);
      return new ForbiddenException();
    }
  }

}