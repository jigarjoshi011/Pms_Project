import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class ShopService {
  async getCategoryProducts(params) {
    try {
      const findCategory = await prisma.categories.findMany({
        where: params,
      });

      if (findCategory) {
        const findCategoryProducts = await prisma.productsOnCategories.findMany(
          {
            where: {
              c_Id: findCategory[0].id,
            },
          },
        );

        const productIdsArr = [];
        for (let i = 0; i < findCategoryProducts.length; i++) {
          productIdsArr.push(findCategoryProducts[i].p_Id);
        }

        const findProducts = await prisma.products.findMany({
          where: {
            id: {
              in: productIdsArr,
            },
          },
        });
        return findProducts;
      }
    } catch (error) {
      return new BadRequestException();
    }
  }
  async getAllProductsData() {
    try {
      const data = await prisma.products.findMany({});
      return data;
    } catch (error) {
      return new BadRequestException();
    }
  }
}
