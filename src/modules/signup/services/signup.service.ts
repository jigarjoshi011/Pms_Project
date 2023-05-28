import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { getSignUpUserDTO } from '../DTOs/getSignUpUser.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';
@Injectable()
export class SignupService {
  async getSignUpUser(userDetails: getSignUpUserDTO) {
    try {
      const checkEmail = await prisma.users.findUnique({
        where: { email: userDetails.email },
      });
      console.log(checkEmail);
      
      if (checkEmail) {
        return new BadRequestException()
      } else {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDetails.password, saltOrRounds);
        const newUser = await prisma.users.create({
          data: {
            name: userDetails.name,
            email: userDetails.email,
            password: hash,
            created_at: `${new Date()}`,
            updated_at: `${new Date()}`,
            Users_has_Roles: {
              create: [
                {
                  assignedBy: 'Admin',
                  assignedAt: new Date(),
                  roleId: 2,
                },
              ],
            },
          },
        });
        return newUser;
      }
    } catch (error) {
     return new ForbiddenException()
    }
  }
}
