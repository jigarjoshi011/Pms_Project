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
  async getAllProductsDataFinal(page, payload) {
    try {
      if (payload.role == 1) {
        const data = await this.getAllProducts(payload);
        //pagination
        let PageNumber: number = page.page;
        let offSet = 10;
        const limit = page.limit;

        const allProductArr = data;
        if (PageNumber == 0) {
          PageNumber = 1;
        }
        offSet = (PageNumber - 1) * limit;

        const products = await prisma.products.findMany({
          skip: Number(offSet),
          take: Number(limit),
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
  async getProductEdited(data, payload) {
    try {
      const findCategory = await prisma.categories.findFirst({
        where: {
          name: data.product_categorie,
        },
      });

      if (findCategory) {
        const UpdateProduct = await prisma.products.update({
          where: {
            id: Number(data.id),
          },
          data: {
            name: data.product_name,
            price: Number(data.product_price),
            Quantity: Number(data.available_quantity),
            image: data.filebutton,
            description: data.product_description,
            ProductsOnCategories: {
              deleteMany: {
                p_Id: Number(data.id),
              },
              create: {
                c_Id: findCategory.id,
              },
            },
          },
          include: {
            ProductsOnCategories: true,
          },
        });

        if (UpdateProduct) {
          return UpdateProduct;
        } else {
          return new BadRequestException();
        }
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async EditProductGetData(id) {
    try {
      const ProductId = id.id;
      const findEditProductData = await prisma.products.findMany({
        where: {
          id: Number(ProductId),
        },
      });
      if (findEditProductData) {
        const findCategoryIdForProduct =
          await prisma.productsOnCategories.findMany({
            where: {
              p_Id: Number(ProductId),
            },
            select: {
              c_Id: true,
            },
          });
        const findCategoryName = await prisma.categories.findMany({
          where: {
            id: Number(findCategoryIdForProduct[0].c_Id),
          },
          select: {
            name: true,
          },
        });
        findEditProductData[0]['categoryName'] = findCategoryName[0].name;

        return findEditProductData;
      }
    } catch (error) {
      return new BadRequestException();
    }
  }
  async SearchProducts(params) {
    try {
      const searchData = params.val;
      const searchQry = await prisma.products.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: searchData,
              },
            },
            {
              description: {
                startsWith: searchData,
              },
            },
          ],
        },
      });
      return searchQry;
    } catch (error) {}
  }
}
