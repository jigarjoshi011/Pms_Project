import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class CartService {
  async getCartItems(UserID) {
    try {
      const getUserCartItems = await prisma.cart.findMany({
        where: {
          userId: UserID,
        },
      });
      const ProductsIDS = [];
      const Quantity = [];

      for (let i = 0; i < getUserCartItems.length; i++) {
        ProductsIDS.push(getUserCartItems[i].productId);
        Quantity.push(getUserCartItems[i].quantity);
      }

      if (getUserCartItems) {
        const findProductDetails = await prisma.products.findMany({
          where: {
            id: {
              in: ProductsIDS,
            },
          },
        });
        return { findProductDetails, Quantity };
      }
    } catch (error) {
      return new BadRequestException();
    }
  }
  async getCartItemsTotal(UserID) {
    try {
      console.log('Getting Cart total.....');
    } catch (error) {}
  }
  async AddItemsCart(UserID, data) {
    try {
      const productId: number = data.data.id;
      const Quantity: number = data.data.quantity || 1;

      const findProduct = await prisma.products.findUnique({
        where: {
          id: Number(productId),
        },
        select: {
          Quantity: true,
          price: true,
        },
      });

      if (findProduct.Quantity >= Quantity) {
        const CreateCart = await prisma.cart.create({
          data: {
            userId: UserID,
            quantity: Number(Quantity),
            productId: Number(productId),
            total: findProduct.price,
          },
        });

        return CreateCart;
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  async DeleteItemsInCart(UserID, ProductId) {
    try {
      const findProductFromCart = await prisma.cart.findMany({
        where: {
          productId: Number(ProductId.data),
          userId: UserID,
        },
      });

      if (findProductFromCart) {
        const DeleteProducTFromCart = await prisma.cart.delete({
          where: {
            id: findProductFromCart[0].id,
          },
        });

        return DeleteProducTFromCart;
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async DeleteOrder(UserID, ProductId) {
    try {
      const findProductFromOrder = await prisma.order.findMany({
        where: {
          productId: Number(ProductId.data),
          userId: UserID,
        },
      });

      if (findProductFromOrder) {
        const DeleteProducTFromOrder = await prisma.order.delete({
          where: {
            id: findProductFromOrder[0].id,
          },
        });

        return DeleteProducTFromOrder;
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }

  async OrderProduct(UserID, ProductId) {
    try {
      const ProductID = Number(ProductId.data);

      const findExistOrder = await prisma.order.findMany({
        where: {
          productId: Number(ProductId.data),
          userId: UserID,
        },
      });
      if (findExistOrder.length == 0) {
        const findProductFromCart = await prisma.cart.findMany({
          where: {
            productId: Number(ProductId.data),
            userId: UserID,
          },
        });
        if (findProductFromCart) {
          const object = findProductFromCart[0];

          function selectSomeProperties(object) {
            return Object.keys(object).reduce(function (obj, k) {
              if (['userId', 'productId', 'quantity', 'total'].includes(k)) {
                obj[k] = object[k];
              }
              return obj;
            }, {});
          }

          const selectedProperties: any = selectSomeProperties(object);

          const placeOrder = await prisma.order.create({
            data: { ...selectedProperties },
          });

          return placeOrder;
        } else {
          return new BadRequestException();
        }
      } else {
        return new ConflictException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
  async allOrderProduct(UserID, ProductId) {
    try {
      const listOderedProducts = await prisma.order.findMany({
        where: {
          userId: UserID,
        },
        select: {
          productId: true,
          quantity: true,
        },
      });
      if (listOderedProducts) {
        const ProductIDs = [];
        const Quantity = [];
        for (let i = 0; i < listOderedProducts.length; i++) {
          ProductIDs.push(listOderedProducts[i].productId);
          Quantity.push(listOderedProducts[i].quantity);
        }
        const findProductsPrice = await prisma.products.findMany({
          where: {
            id: {
              in: ProductIDs,
            },
          },
          select: {
            name: true,
            description: true,
            id: true,
            price: true,
          },
        });
        return { findProductsPrice, Quantity };
      } else {
        return new BadRequestException();
      }
    } catch (error) {
      return new ForbiddenException();
    }
  }
}
