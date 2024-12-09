import prisma from "../../prisma";

interface CreatePurchasingArgs {
  productItem: { productId: string; qty: number }[];
}

export const createPurchasingService = async (body: CreatePurchasingArgs) => {
  try {
    const { productItem } = body;

    const order = await prisma.$transaction(async (tx) => {
      await Promise.all(
        productItem.map(async (item) => {
          const product = await tx.product.findUnique({
            where: { id: Number(item.productId) },
          });

          if (!product) {
            throw new Error(`Product not found.`);
          }
          await tx.product.update({
            where: { id: Number(item.productId) },
            data: { stock: product.stock + Number(item.qty) },
          });
        })
      );
    });

    return order;
  } catch (error) {
    throw error;
  }
};
