import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { addCategories } from '../dto/addCatagoryDTO';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class CategoriesService {
  async AddCategory(args: addCategories) {
    try {
      const data = await prisma.categories.create({
        data: {
          name: args.category_name,
          description: args.category_description,
        },
      });
      return data;
    } catch (error) {
      return new BadRequestException();
    }
  }
  async getAllCategory(payload) {
    try {
      if (payload.role == 1) {
        const data = await prisma.categories.findMany({});
        return data;
      } else {
        const data = await prisma.categories.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        return data;
      }
    } catch (error) {
      return new BadRequestException();
    }
  }
  async DeleteUserAction(data) {
    try {
      console.log('id:::::::', data.id);
      const findCategory = await prisma.categories.findFirst({
        where: { id: Number(data?.id) },
      });
      if (findCategory) {
        const deleteCategoryAction =
          await prisma.productsOnCategories.deleteMany({
            where: { c_Id: Number(data?.id) },
          });
        if (deleteCategoryAction) {
          const deleteCategory = await prisma.categories.deleteMany({
            where: {
              id: Number(data?.id),
            },
          });
          if (deleteCategory) {
            return deleteCategoryAction;
          } else {
            return new BadRequestException();
          }
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
}
