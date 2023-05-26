import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class ProductService {
  async getAllProducts(payload) {
    try {
      if (payload.role == 1) {
        const products = await prisma.products.findMany({
          include: {
            ProductsOnCategories: true,
          },
        });
        if (products) {
          const data = products
            .map((d) => {
              if (
                d.ProductsOnCategories?.length > 0 &&
                d?.ProductsOnCategories[0].c_Id
              ) {
                return {
                  ...d,
                  ...d?.ProductsOnCategories[0],
                };
              }
            })
            .filter((e) => e);

          for (let i = 0; i < data.length; i++) {
            const findCategoryName = await prisma.categories.findMany({
              where: { id: data[i].c_Id },
            });
            const names = findCategoryName[0].name;
            data[i]['catagoryName'] = names;
          }

          return {
            data,
          };
        }
      } else {
        const product = await prisma.products.findMany({
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            description: true,
            ProductsOnCategories: {
              select: {
                c_Id: true,
                p_Id: true,
              },
            },
          },
        });
        if (product) {
          const data = product
            .map((d) => {
              if (
                d.ProductsOnCategories?.length > 0 &&
                d?.ProductsOnCategories[0].c_Id
              ) {
                return {
                  ...d,
                  ...d?.ProductsOnCategories[0],
                };
              }
            })
            .filter((e) => e);
          return {
            data,
          };
        } else {
          return new BadRequestException();
        }
      }
    } catch (error) {
      return new BadRequestException();
    }
  }

  async AddProduct(data) {
    try {
      const findCategory = await prisma.categories.findFirst({
        where: {
          name: data.product_categorie,
        },
      });
      if (findCategory) {
        const addProduct = await prisma.products.create({
          data: {
            name: data.product_name,
            price: Number(data.product_price),
            Quantity: Number(data.available_quantity),
            image: data.filebutton,
            description: data.product_description,
            ProductsOnCategories: {
              create: {
                c_Id: findCategory.id,
              },
            },
          },
        });

        if (addProduct) {
          return addProduct;
        }
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async DeleteProductAction(data) {
    try {
      console.log('id:::::::', data.id);
      const findProduct = await prisma.products.findFirst({
        where: { id: Number(data?.id) },
      });
      if (findProduct) {
        const deleteProductAction =
          await prisma.productsOnCategories.deleteMany({
            where: { p_Id: Number(data?.id) },
          });
        if (deleteProductAction) {
          const deleteProduct = await prisma.products.deleteMany({
            where: {
              id: Number(data?.id),
            },
          });
          if (deleteProduct) {
            return deleteProduct;
          } else {
            return new BadRequestException();
          }
        } else {
          return new BadRequestException();
        }
      } else {
        return new BadRequestException();
      }
    } catch (error) {}
  }
  async getProductEdit(data) {
    try {
    } catch (error) {}
  }
  async EditProductGetData(id) {
    try {
      console.log('>>>>>>>>>>');
    } catch (error) {}
  }
}
