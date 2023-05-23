import { BadRequestException, Injectable } from '@nestjs/common';
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
  async getAllCategory() {
    try {
      const data = await prisma.categories.findMany({});
      return data;
    } catch (error) {
      return new BadRequestException();
    }
  }
}
